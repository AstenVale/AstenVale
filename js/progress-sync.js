// Ashton Vale — Supabase-backed progress sync with magic link login (Phase 1-3).
//
// localStorage remains the fallback and source of truth for anonymous play.
// This file only reads from it, merges in whatever Supabase has, and writes
// the merged result back to both places once a player is logged in. It
// never deletes a completed case from either side.
//
// Self-contained: to remove this feature, delete this file, its <script>
// tag, and the "Save Progress" UI block that calls it.
(function () {
  var SUPABASE_URL = 'https://qtjdavuqytxqihwspchh.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0amRhdnVxeXR4cWlod3NwY2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMzg3NjksImV4cCI6MjA5ODYxNDc2OX0.Hyl9Rf62CHEEI7rK_iF5PjKzc0Xd93WC-YrhM-L4ohg';

  function getClient() {
    if (!window.supabase || !window.supabase.createClient) return null;
    if (!window.__avSupabaseClient) {
      window.__avSupabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return window.__avSupabaseClient;
  }

  function validCaseIds() {
    var ids = [];
    if (typeof SEASONS_CONFIG !== 'undefined') {
      SEASONS_CONFIG.forEach(function (season) {
        season.cases.forEach(function (c) { ids.push(c.id); });
      });
    }
    return ids;
  }

  function validVaultIds() {
    var ids = [];
    if (typeof SEASONS_CONFIG !== 'undefined') {
      SEASONS_CONFIG.forEach(function (season) {
        if (season.vault && season.vault.id) ids.push(season.vault.id);
      });
    }
    return ids;
  }

  function validBadgeIds() {
    if (typeof BADGES_CONFIG === 'undefined') return null; // unknown -> don't filter
    return BADGES_CONFIG.map(function (b) { return b.id; });
  }

  function uniqueMerge(a, b) {
    var out = (a || []).slice();
    (b || []).forEach(function (x) { if (out.indexOf(x) === -1) out.push(x); });
    return out;
  }

  // ---- localStorage side ----

  function getLocalProgress() {
    var solved = [];
    try { solved = JSON.parse(localStorage.getItem('av_solved') || '[]'); } catch (e) {}

    try {
      var p = JSON.parse(localStorage.getItem('ava_progress') || 'null');
      if (p && Array.isArray(p.solvedCases)) {
        p.solvedCases.forEach(function (id) { if (solved.indexOf(id) === -1) solved.push(id); });
      }
    } catch (e) {}

    var badges = [];
    try { badges = JSON.parse(localStorage.getItem('av_badges') || '[]'); } catch (e) {}

    var vaults = [];
    try { vaults = JSON.parse(localStorage.getItem('av_vault_claimed') || '[]'); } catch (e) {}

    var dates = {};
    try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch (e) {}

    var caseAllow = validCaseIds();
    var completedCases = caseAllow.length
      ? solved.filter(function (id) { return caseAllow.indexOf(id) !== -1; })
      : solved.filter(function (id) { return /^\d{3}$/.test(id); });

    var lastCase = null, lastTime = -1;
    completedCases.forEach(function (id) {
      var t = dates[id] ? Date.parse(dates[id]) : NaN;
      if (!isNaN(t) && t > lastTime) { lastTime = t; lastCase = id; }
    });
    if (!lastCase && completedCases.length) lastCase = completedCases[completedCases.length - 1];

    return {
      completed_cases: completedCases,
      unlocked_vaults: vaults,
      earned_badges: badges,
      last_completed_case: lastCase,
      total_cases_completed: completedCases.length,
      updated_at: lastTime > 0 ? new Date(lastTime).toISOString() : null
    };
  }

  function saveLocalProgress(progress) {
    localStorage.setItem('av_solved', JSON.stringify(progress.completed_cases || []));
    localStorage.setItem('av_badges', JSON.stringify(progress.earned_badges || []));
    localStorage.setItem('av_vault_claimed', JSON.stringify(progress.unlocked_vaults || []));
  }

  // ---- Supabase side ----

  function getSupabaseProgress(user) {
    var client = getClient();
    if (!client || !user) return Promise.resolve(null);
    return client.from('player_progress').select('*').eq('user_id', user.id).maybeSingle()
      .then(function (res) { return res.error ? null : res.data; });
  }

  function saveSupabaseProgress(user, progress) {
    var client = getClient();
    if (!client || !user) return Promise.resolve({ error: new Error('not signed in') });
    return client.from('player_progress').upsert({
      user_id: user.id,
      completed_cases: progress.completed_cases || [],
      unlocked_vaults: progress.unlocked_vaults || [],
      earned_badges: progress.earned_badges || [],
      last_completed_case: progress.last_completed_case || null,
      total_cases_completed: (progress.completed_cases || []).length
    }, { onConflict: 'user_id' });
  }

  function ensurePlayerRow(user) {
    var client = getClient();
    if (!client || !user) return Promise.resolve();
    return client.from('players').select('id').eq('user_id', user.id).maybeSingle()
      .then(function (res) {
        if (res.data) return;
        return client.from('players').insert({ user_id: user.id });
      });
  }

  // ---- merge ----

  // Rule: never drop a completed case, vault, or badge from either side.
  // last_completed_case comes from whichever side has the newer updated_at.
  function mergeProgress(local, remote) {
    var caseAllow = validCaseIds();
    var vaultAllow = validVaultIds();
    var badgeAllow = validBadgeIds();

    var mergedCases = uniqueMerge(local.completed_cases, remote ? remote.completed_cases : []);
    if (caseAllow.length) mergedCases = mergedCases.filter(function (id) { return caseAllow.indexOf(id) !== -1; });

    var mergedVaults = uniqueMerge(local.unlocked_vaults, remote ? remote.unlocked_vaults : []);
    if (vaultAllow.length) mergedVaults = mergedVaults.filter(function (id) { return vaultAllow.indexOf(id) !== -1; });

    var mergedBadges = uniqueMerge(local.earned_badges, remote ? remote.earned_badges : []);
    if (badgeAllow) mergedBadges = mergedBadges.filter(function (id) { return badgeAllow.indexOf(id) !== -1; });

    var localTime = local.updated_at ? Date.parse(local.updated_at) : -1;
    var remoteTime = remote && remote.updated_at ? Date.parse(remote.updated_at) : -1;
    var lastCase = remoteTime > localTime
      ? (remote && remote.last_completed_case)
      : local.last_completed_case;
    if (!lastCase || mergedCases.indexOf(lastCase) === -1) {
      lastCase = mergedCases.length ? mergedCases[mergedCases.length - 1] : null;
    }

    return {
      completed_cases: mergedCases,
      unlocked_vaults: mergedVaults,
      earned_badges: mergedBadges,
      last_completed_case: lastCase,
      total_cases_completed: mergedCases.length
    };
  }

  // ---- orchestration ----

  function getUser() {
    var client = getClient();
    if (!client) return Promise.resolve(null);
    return client.auth.getSession().then(function (res) {
      return (res.data && res.data.session) ? res.data.session.user : null;
    });
  }

  // Pulls local + remote, merges, writes the merged result back to both.
  // Safe to call repeatedly (e.g. right after login, or on demand from a
  // "Sync Now" button). If Supabase is unreachable, local data is left
  // untouched -- localStorage is always the fallback.
  function syncProgress(callback) {
    getUser().then(function (user) {
      if (!user) { callback(new Error('Not signed in.')); return; }
      ensurePlayerRow(user).then(function () {
        var local = getLocalProgress();
        getSupabaseProgress(user).then(function (remote) {
          var merged = mergeProgress(local, remote);
          saveSupabaseProgress(user, merged).then(function (res) {
            if (res.error) { callback(res.error); return; }
            saveLocalProgress(merged);
            callback(null, merged);
          });
        });
      });
    });
  }

  // ---- magic link auth ----

  function sendMagicLink(email, callback) {
    var client = getClient();
    if (!client) { callback(new Error('Sign-in is unavailable right now.')); return; }
    client.auth.signInWithOtp({
      email: email,
      options: { emailRedirectTo: window.location.href }
    }).then(function (res) {
      callback(res.error || null);
    });
  }

  function signOut(callback) {
    var client = getClient();
    if (!client) { callback && callback(); return; }
    client.auth.signOut().then(function () { callback && callback(); });
  }

  function setPublicProfile(user, displayName, isPublic, callback) {
    var client = getClient();
    if (!client || !user) { callback(new Error('Not signed in.')); return; }
    client.from('players').update({
      display_name: displayName || null,
      public_profile: !!isPublic && !!displayName
    }).eq('user_id', user.id).then(function (res) {
      callback(res.error || null);
    });
  }

  window.AVProgressSync = {
    getClient: getClient,
    getUser: getUser,
    getLocalProgress: getLocalProgress,
    saveLocalProgress: saveLocalProgress,
    getSupabaseProgress: getSupabaseProgress,
    saveSupabaseProgress: saveSupabaseProgress,
    mergeProgress: mergeProgress,
    syncProgress: syncProgress,
    sendMagicLink: sendMagicLink,
    signOut: signOut,
    setPublicProfile: setPublicProfile,
    ensurePlayerRow: ensurePlayerRow
  };
})();
