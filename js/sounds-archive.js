(function() {
  var allSounds = (window.SOUNDS_DATA || []).filter(function(s) { return s.audioFile; });
  var body = document.getElementById('soundBody');
  var countEl = document.getElementById('soundCount');
  var summaryEl = document.getElementById('archiveSummary');
  var searchEl = document.getElementById('soundSearch');
  var sortEl = document.getElementById('soundSort');
  var filterRow = document.getElementById('filterRow');
  var activeFilter = 'all';
  var activeSort = 'alpha';
  var searchQuery = '';

  function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch) { return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch]; }); }
  function pad(value) { return String(parseInt(value, 10) || 0).padStart(3, '0'); }
  function seasonNumber(caseId) { return Math.max(1, Math.floor(((parseInt(caseId, 10) || 1) - 1) / 12) + 1); }
  function seasonName(caseId) { var n = seasonNumber(caseId); var names = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten']; return 'Season ' + (names[n - 1] || n); }
  function formatTime(seconds) { if (!isFinite(seconds) || seconds < 0) seconds = 0; var m = Math.floor(seconds / 60); var s = Math.floor(seconds % 60); return m + ':' + String(s).padStart(2, '0'); }
  function readSolved() {
    var solved = [];
    try { var p = JSON.parse(localStorage.getItem('ava_progress') || '{}'); if (Array.isArray(p.solvedCases)) solved = solved.concat(p.solvedCases); } catch(e) {}
    try { var legacy = JSON.parse(localStorage.getItem('av_solved') || '[]'); if (Array.isArray(legacy)) solved = solved.concat(legacy); } catch(e) {}
    var map = {};
    solved.forEach(function(id) { map[pad(id)] = true; map[String(parseInt(id, 10) || 0)] = true; });
    return map;
  }
  function statusFor(s) { var d = (s.description || '').toLowerCase(); if (!s.description) return 'Unknown Source'; if (/unknown|unclear|not specified|never identified|not verified|not always|not on record/.test(d)) return 'Unverified'; return 'Verified'; }
  function locationFor(s) { var d = s.description || ''; var match = d.match(/(?:heard at|recorded at|recorded near|at) ([A-Z][A-Za-z' -]+?)(?: at \d|\.|,| during|$)/); return match ? match[1].trim() : 'Location Pending'; }
  function timeFor(s) { var match = (s.description || '').match(/\b\d{1,2}:\d{2}\b/); return match ? match[0] : 'Time Pending'; }
  function archiveId(s) { return (s.id || s.slug || s.name).toUpperCase().replace(/[^A-Z0-9]+/g, '-'); }
  function buildRecord(s) {
    var first = pad(s.firstCase || (s.cases && s.cases[0]) || '001');
    var status = statusFor(s);
    var location = locationFor(s);
    var appears = (s.cases || [first]).map(pad);
    var record = { raw:s, id:archiveId(s), name:s.name, category:s.category || 'Unknown', status:status, firstCase:first, season:seasonName(first), seasonNo:seasonNumber(first), location:location, recordedTime:timeFor(s), duration:'Pending Measurement', cases:appears, isRecurring:!!s.isRecurring || appears.length > 1, audioFile:s.audioFile, description:s.description || '' };
    record.archiveDescription = 'Recovered during the ' + location + ' investigation. The recording contains ' + s.name.toLowerCase() + ' preserved as audio evidence in Case ' + first + '.';
    record.archiveNotes = record.isRecurring ? 'Recurring Evidence. Appears in ' + appears.length + ' investigations.' : 'Source has not been cross-referenced beyond the original investigation.';
    if (status === 'Unverified') record.archiveNotes += ' Source has never been officially confirmed.';
    if (status === 'Unknown Source') record.archiveNotes = 'Unknown Source. Additional verification is pending.';
    record.searchText = [record.name, record.category, record.status, record.firstCase, 'case ' + record.firstCase, record.location, record.description, record.season, record.archiveDescription, record.archiveNotes].join(' ').toLowerCase();
    return record;
  }
  var solvedSet = readSolved();
  var records = allSounds.map(buildRecord);
  var unlockedRecords = records.filter(function(r) { return r.cases.some(function(c) { return solvedSet[c] || solvedSet[String(parseInt(c, 10) || 0)]; }); });
  var lockedCount = Math.max(0, records.length - unlockedRecords.length);
  var categoryMeta = { Animal:{icon:'&#128038;', label:'Animal'}, Weather:{icon:'&#9730;', label:'Weather'}, Human:{icon:'&#9673;', label:'Human'}, Mechanical:{icon:'&#9881;', label:'Mechanical'}, Structure:{icon:'&#8962;', label:'Structure'}, Nature:{icon:'&#10043;', label:'Nature'} };

  function renderSummary() {
    var cats = {};
    records.forEach(function(r) { cats[r.category] = true; });
    var recurring = unlockedRecords.filter(function(r) { return r.isRecurring; }).length;
    var categoryCount = Object.keys(cats).length + (records.some(function(r) { return r.isRecurring; }) ? 1 : 0);
    var items = [['Recovered', unlockedRecords.length], ['Locked', lockedCount], ['Categories', categoryCount], ['Recurring Recordings', recurring]];
    summaryEl.innerHTML = items.map(function(item) { return '<div class="summary-item"><span class="summary-label">' + esc(item[0]) + '</span><span class="summary-value">' + esc(item[1]) + '</span></div>'; }).join('');
  }
  function filteredRecords() {
    var q = searchQuery.toLowerCase();
    var list = unlockedRecords.filter(function(r) {
      if (activeFilter !== 'all') {
        if (activeFilter === 'recurring' && !r.isRecurring) return false;
        else if (['Verified','Unverified','Unknown Source'].indexOf(activeFilter) !== -1 && r.status !== activeFilter) return false;
        else if (activeFilter !== 'recurring' && ['Verified','Unverified','Unknown Source'].indexOf(activeFilter) === -1 && r.category !== activeFilter) return false;
      }
      if (q && r.searchText.indexOf(q) === -1) return false;
      return true;
    });
    return sortRecords(list);
  }
  function sortRecords(list) {
    list = list.slice();
    if (activeSort === 'alpha') list.sort(function(a,b) { return a.name.localeCompare(b.name); });
    else if (activeSort === 'newest') list.sort(function(a,b) { return parseInt(b.firstCase,10) - parseInt(a.firstCase,10); });
    else if (activeSort === 'oldest' || activeSort === 'case-number') list.sort(function(a,b) { return parseInt(a.firstCase,10) - parseInt(b.firstCase,10); });
    else if (activeSort === 'most-referenced') list.sort(function(a,b) { return b.cases.length - a.cases.length || a.name.localeCompare(b.name); });
    return list;
  }
  function waveformBars(record) {
    var seed = record.name.split('').reduce(function(total, ch) { return total + ch.charCodeAt(0); }, parseInt(record.firstCase, 10));
    var html = '';
    for (var i = 0; i < 42; i++) { var h = 18 + ((seed * (i + 3) + i * i * 7) % 72); html += '<span class="wave-bar" style="height:' + h + '%"></span>'; }
    return html;
  }
  function casesHtml(record) { return record.cases.map(function(c) { return '<a class="sound-case-link" href="case.html?id=' + esc(c) + '">Case ' + esc(c) + '</a>'; }).join(' <span style="opacity:0.32">&middot;</span> '); }
  function meta(label, value, cls) { return '<div class="meta-field"><span class="meta-label">' + esc(label) + '</span><span class="meta-value' + (cls ? ' ' + cls : '') + '">' + esc(value) + '</span></div>'; }

  function renderCard(record, idx) {
    var delay = (idx * 0.035) + 's';
    return '<article class="recording-card" style="animation:fade-up 0.4s ease both;animation-delay:' + delay + '">' +
      '<div class="recording-grid"><div class="cassette" aria-label="Cassette artwork"><div class="cassette-label"><span class="cassette-kicker">Asten Vale / Audio Evidence</span><span class="cassette-name">' + esc(record.name) + '</span></div><div class="cassette-reels"><span class="cassette-reel"></span><span class="cassette-reel"></span></div><div class="cassette-meta"><span>Case ' + esc(record.firstCase) + '</span><span>' + esc(record.id) + '</span></div></div>' +
      '<div class="recording-file"><div class="recording-head"><h3 class="recording-name">' + esc(record.name) + '</h3><span class="sound-stamp">' + esc(record.category) + '</span><span class="status-stamp">' + esc(record.status) + '</span>' + (record.isRecurring ? '<span class="recurring-stamp">Recurring Evidence</span>' : '') + '</div>' +
      '<div class="recording-metadata">' + meta('Archive Status', record.status) + meta('Recovered During', 'Case ' + record.firstCase) + meta('Recording Location', record.location) + meta('Recorded Time', record.recordedTime) + meta('Duration', record.duration, 'duration-readout') + meta('Season', record.season) + '</div>' +
      '<div class="archive-copy"><div class="archive-copy-block"><span class="copy-label">Archive Description</span><p class="copy-text">' + esc(record.archiveDescription) + '</p></div><div class="archive-copy-block"><span class="copy-label">Archive Notes</span><p class="copy-text">' + esc(record.archiveNotes) + '</p></div></div>' +
      '<div class="appears-row"><span>Appears In: </span>' + casesHtml(record) + '</div>' +
      '<div class="archive-player"><div class="waveform" aria-hidden="true">' + waveformBars(record) + '</div><div class="player-row"><button class="play-btn" type="button">Play</button><div class="progress-track"><div class="progress-fill"></div></div><span class="time-readout">0:00 / --:--</span><div class="volume-track" title="Volume"><div class="volume-fill" style="width:80%"></div></div></div><audio class="native-audio" preload="none"><source src="' + esc(record.audioFile) + '" type="audio/mpeg"></audio></div>' +
      '</div></div></article>';
  }
  function lockedMarkup() {
    return lockedCount > 0 ? '<div class="locked-tally"><span class="locked-tally-text">' + lockedCount + ' Evidence Recording' + (lockedCount === 1 ? '' : 's') + ' Awaiting Recovery. Continue solving investigations to recover additional archive recordings.</span></div>' : '';
  }
  function renderRecords() {
    var filtered = filteredRecords();
    countEl.textContent = filtered.length + ' Evidence Recording' + (filtered.length === 1 ? '' : 's') + ' Recovered';
    if (!unlockedRecords.length) {
      body.innerHTML = '<div class="cabinet-empty"><div class="cabinet-empty-title">No Evidence Recordings Recovered</div><div class="cabinet-empty-sub">Continue solving investigations to recover archive recordings.</div><a href="index.html" class="cabinet-empty-btn">Begin Investigation</a></div>' + lockedMarkup();
      wirePlayers();
      return;
    }
    if (!filtered.length) {
      body.innerHTML = '<div class="cabinet-empty"><div class="cabinet-empty-title">No Recordings Match</div><div class="cabinet-empty-sub">No recovered evidence recording matches this search or filter.</div></div>';
      return;
    }
    var groups = {}; var order = [];
    filtered.forEach(function(r) { if (!groups[r.category]) { groups[r.category] = []; order.push(r.category); } groups[r.category].push(r); });
    var html = '';
    order.forEach(function(cat, gi) {
      var items = groups[cat]; var meta = categoryMeta[cat] || {icon:'&#128266;', label:cat}; var isOpen = gi === 0;
      html += '<div class="category-group' + (isOpen ? ' open' : '') + '"><div class="category-toggle" role="button" tabindex="0" aria-expanded="' + isOpen + '"><span class="category-icon" aria-hidden="true">' + meta.icon + '</span><span class="category-label">' + esc(meta.label) + '</span><span class="category-badge">' + items.length + ' recording' + (items.length === 1 ? '' : 's') + '</span><span class="category-chevron" aria-hidden="true">&#9660;</span></div><div class="category-body"><div class="sound-list">' + items.map(renderCard).join('') + '</div></div></div>';
    });
    body.innerHTML = html + lockedMarkup();
    wireAccordions();
    wirePlayers();
  }

  function wireAccordions() {
    body.querySelectorAll('.category-toggle').forEach(function(toggle) {
      toggle.addEventListener('click', function() { var group = toggle.parentElement; var isOpen = group.classList.toggle('open'); toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false'); });
      toggle.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle.click(); } });
    });
  }
  function wirePlayers() {
    body.querySelectorAll('.archive-player').forEach(function(player) {
      var audio = player.querySelector('audio');
      var btn = player.querySelector('.play-btn');
      var progress = player.querySelector('.progress-track');
      var fill = player.querySelector('.progress-fill');
      var time = player.querySelector('.time-readout');
      var volume = player.querySelector('.volume-track');
      var vfill = player.querySelector('.volume-fill');
      var durationEl = player.closest('.recording-card') && player.closest('.recording-card').querySelector('.duration-readout');
      audio.volume = 0.8;
      audio.addEventListener('loadedmetadata', function() { if (durationEl) durationEl.textContent = formatTime(audio.duration); time.textContent = '0:00 / ' + formatTime(audio.duration); });
      audio.addEventListener('timeupdate', function() { var pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0; fill.style.width = pct + '%'; time.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration); });
      audio.addEventListener('ended', function() { btn.textContent = 'Play'; });
      btn.addEventListener('click', function() {
        body.querySelectorAll('audio').forEach(function(other) { if (other !== audio) { other.pause(); var ob = other.closest('.archive-player') && other.closest('.archive-player').querySelector('.play-btn'); if (ob) ob.textContent = 'Play'; } });
        if (audio.paused) { audio.play(); btn.textContent = 'Pause'; } else { audio.pause(); btn.textContent = 'Play'; }
      });
      progress.addEventListener('click', function(e) { if (!audio.duration) return; var rect = progress.getBoundingClientRect(); audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration; });
      volume.addEventListener('click', function(e) { var rect = volume.getBoundingClientRect(); var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)); audio.volume = pct; vfill.style.width = (pct * 100) + '%'; });
    });
  }
  filterRow.addEventListener('click', function(e) { var btn = e.target.closest('.filter-btn'); if (!btn) return; filterRow.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); }); btn.classList.add('active'); activeFilter = btn.dataset.filter; renderRecords(); });
  searchEl.addEventListener('input', function() { searchQuery = searchEl.value.trim(); renderRecords(); });
  sortEl.addEventListener('change', function() { activeSort = sortEl.value; renderRecords(); });
  renderSummary();
  renderRecords();
})();
