require('dotenv').config();
const express    = require('express');
const session    = require('express-session');
const fetch      = require('node-fetch');
const path       = require('path');
const fs         = require('fs');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 8 * 60 * 60 * 1000 } // 8 hours
}));

// Auth guard middleware
function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  res.redirect('/');
}

// Serve public files for unauthenticated routes
app.use('/public', express.static(path.join(__dirname, 'public')));

// ── Pages ─────────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  if (req.session && req.session.authenticated) return res.redirect('/dashboard');
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// ── Auth ──────────────────────────────────────────────────────────────────────
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.authenticated = true;
    return res.json({ ok: true });
  }
  res.status(401).json({ ok: false, error: 'Invalid credentials' });
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ ok: true });
});

// ── GitHub API helpers ────────────────────────────────────────────────────────
const GH_BASE = 'https://api.github.com';
const GH_HEADERS = () => ({
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
  'Content-Type': 'application/json'
});
const REPO_PATH = `${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}`;

async function ghGet(filePath) {
  const url = `${GH_BASE}/repos/${REPO_PATH}/contents/${filePath}?ref=${process.env.GITHUB_BRANCH || 'main'}`;
  const r = await fetch(url, { headers: GH_HEADERS() });
  if (!r.ok) throw new Error(`GitHub GET failed: ${r.status} ${r.statusText}`);
  return r.json();
}

async function ghPut(filePath, content, message, sha) {
  const url = `${GH_BASE}/repos/${REPO_PATH}/contents/${filePath}`;
  const body = {
    message,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch: process.env.GITHUB_BRANCH || 'main'
  };
  if (sha) body.sha = sha;
  const r = await fetch(url, { method: 'PUT', headers: GH_HEADERS(), body: JSON.stringify(body) });
  if (!r.ok) {
    const err = await r.text();
    throw new Error(`GitHub PUT failed: ${r.status} — ${err}`);
  }
  return r.json();
}

// ── API: load config ──────────────────────────────────────────────────────────
app.get('/api/config', requireAuth, async (req, res) => {
  try {
    const file = await ghGet('js/vault-data.json');
    const content = Buffer.from(file.content, 'base64').toString('utf8');
    res.json({ ok: true, data: JSON.parse(content), sha: file.sha });
  } catch (e) {
    // vault-data.json doesn't exist yet — return empty scaffold
    res.json({ ok: true, data: null, sha: null, message: 'No config found — use scaffold' });
  }
});

// ── API: save config ──────────────────────────────────────────────────────────
app.post('/api/config', requireAuth, async (req, res) => {
  try {
    const { data, sha } = req.body;
    if (!data) return res.status(400).json({ ok: false, error: 'No data provided' });

    const json = JSON.stringify(data, null, 2);

    // 1. Write vault-data.json (source of truth)
    await ghPut('js/vault-data.json', json, 'admin: update vault config', sha || undefined);

    // 2. Regenerate vault-config.js from the data
    const jsContent = generateVaultConfig(data);
    let jsSha;
    try { const f = await ghGet('js/vault-config.js'); jsSha = f.sha; } catch(e) {}
    await ghPut('js/vault-config.js', jsContent, 'admin: regenerate vault-config.js', jsSha);

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── API: get settings ─────────────────────────────────────────────────────────
app.get('/api/settings', requireAuth, async (req, res) => {
  try {
    const file = await ghGet('js/site-settings.json');
    const content = Buffer.from(file.content, 'base64').toString('utf8');
    res.json({ ok: true, data: JSON.parse(content), sha: file.sha });
  } catch (e) {
    res.json({ ok: true, data: defaultSettings(), sha: null });
  }
});

app.post('/api/settings', requireAuth, async (req, res) => {
  try {
    const { data, sha } = req.body;
    const json = JSON.stringify(data, null, 2);
    let existingSha = sha;
    if (!existingSha) {
      try { const f = await ghGet('js/site-settings.json'); existingSha = f.sha; } catch(e) {}
    }
    await ghPut('js/site-settings.json', json, 'admin: update site settings', existingSha);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── API: scan song files ──────────────────────────────────────────────────────
// Reads all data/songs/song*.js from the local website folder and builds
// a full seasons config. Preserves existing release/digit/scene overrides
// from vault-data.json if present.
app.get('/api/scan', requireAuth, async (req, res) => {
  try {
    const songsDir = path.join(__dirname, '..', 'data', 'songs');
    const files = fs.readdirSync(songsDir)
      .filter(f => /^song\d+\.js$/.test(f))
      .sort();

    // Load existing vault-data to preserve overrides
    let existing = { seasons: [] };
    try {
      const vd = fs.readFileSync(path.join(__dirname, '..', 'js', 'vault-data.json'), 'utf8');
      existing = JSON.parse(vd);
    } catch(e) {}

    // Build a lookup of existing case overrides keyed by padded id
    const overrides = {};
    (existing.seasons || []).forEach(s => {
      (s.cases || []).forEach(c => { overrides[c.id] = c; });
    });
    const seasonOverrides = {};
    (existing.seasons || []).forEach((s, i) => { seasonOverrides[s.id || ('season' + (i+1))] = s; });

    // Parse each song file
    const seasons = {};
    for (const file of files) {
      const raw = fs.readFileSync(path.join(songsDir, file), 'utf8');
      // Strip the window.SONG_DATA = prefix and trailing semicolon
      const json = raw.replace(/^\s*window\.SONG_DATA\s*=\s*/, '').replace(/;\s*$/, '').trim();
      let d;
      try { d = JSON.parse(json); } catch(e) { continue; }

      const seriesNum  = d.series || 1;
      const seriesKey  = 'season' + seriesNum;
      const seriesName = d.seriesName || ('Season ' + seriesNum);
      const caseId     = String(d.chapter || d.sequentialNum || 1).padStart(3, '0');
      const paddedSeq  = String(d.sequentialNum || d.id || '1').padStart(3, '0');

      if (!seasons[seriesKey]) {
        const so = seasonOverrides[seriesKey] || {};
        seasons[seriesKey] = {
          id: seriesKey,
          title: 'Season ' + seriesNum,
          subtitle: seriesName,
          seriesNum,
          digits: so.digits || [],
          badges: so.badges || [],
          cases: []
        };
      }

      const prev = overrides[paddedSeq] || overrides[caseId] || {};
      const sl   = d.streamingLinks || {};

      seasons[seriesKey].cases.push({
        id:          paddedSeq,
        title:       d.chapterTitle || d.title || '',
        released:    prev.released  !== undefined ? prev.released  : false,
        scene:       prev.scene     || 'files',
        releaseDate: prev.releaseDate || null,
        desc:        prev.desc || [d.lore && d.lore.lines && d.lore.lines[0] ? d.lore.lines[0].substring(0,80) : '', ''],
        gradient:    prev.gradient || ['#3a3a2a', '#0c0a06'],
        streaming: {
          spotify:      prev.streaming && prev.streaming.spotify      || sl.spotify  || '',
          appleMusic:   prev.streaming && prev.streaming.appleMusic   || sl.apple    || '',
          youtubeMusic: prev.streaming && prev.streaming.youtubeMusic || sl.youtube  || '',
          amazonMusic:  prev.streaming && prev.streaming.amazonMusic  || sl.amazon   || ''
        }
      });
    }

    // Sort seasons by series number, cases already in file order
    const sortedSeasons = Object.values(seasons).sort((a, b) => a.seriesNum - b.seriesNum);
    sortedSeasons.forEach(s => { delete s.seriesNum; });

    // Fill in vault digits array length if missing
    sortedSeasons.forEach(s => {
      if (!s.digits || s.digits.length < s.cases.length) {
        const existing = s.digits || [];
        while (existing.length < s.cases.length) existing.push(0);
        s.digits = existing;
      }
    });

    res.json({ ok: true, data: { seasons: sortedSeasons }, count: files.length });
  } catch(e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ── vault-config.js generator ─────────────────────────────────────────────────
function generateVaultConfig(data) {
  const seasons = data.seasons.map(season => {
    const cases = season.cases.map(c => {
      return `      {
        id: "${c.id}",
        title: ${JSON.stringify(c.title)},
        url: "case.html?id=${parseInt(c.id, 10)}",
        released: ${c.released},
        scene: ${JSON.stringify(c.scene || 'files')},
        releaseDate: ${c.releaseDate ? JSON.stringify(c.releaseDate) : 'null'},
        desc: ${JSON.stringify(c.desc || [])},
        gradient: ${JSON.stringify(c.gradient || ['#3a3a2a', '#0c0a06'])},
        streaming: ${JSON.stringify(c.streaming || {})}
      }`;
    }).join(',\n');

    const digits = JSON.stringify(season.digits || Array(season.cases.length).fill(0));
    const badges = JSON.stringify(season.badges || [], null, 8);

    return `  {
    id: ${JSON.stringify(season.id)},
    title: ${JSON.stringify(season.title)},
    subtitle: ${JSON.stringify(season.subtitle || '')},
    totalCases: ${season.cases.length},
    digits: ${digits},
    cases: [\n${cases}\n    ],
    badges: ${badges},
    bonusRewards: [],
    completionText: [],
    stats: []
  }`;
  }).join(',\n');

  return `// ASTEN VALE ARCHIVES — Vault Configuration
// Auto-generated by admin panel. Edit via the admin dashboard, not directly.

const SEASONS_CONFIG = [
${seasons}
];
`;
}

function defaultSettings() {
  return {
    buyMeCoffeeUrl: 'https://buymeacoffee.com/YOUR_USERNAME',
    storeUrl: '#',
    vaultCouponCode: 'BLACKPINE',
    streaming: {
      spotify: '#',
      appleMusic: '#',
      youtubeMusic: '#',
      amazonMusic: '#'
    }
  };
}

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`Admin panel running on http://localhost:${PORT}`));
