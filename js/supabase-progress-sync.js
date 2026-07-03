// Ashton Vale — optional progress sync (MVP)
//
// This file is fully self-contained. To remove the sync feature entirely,
// delete this file, the Supabase <script> tag and this file's <script> tag
// wherever they're included, and the "Sync Progress" UI block that calls it.
//
// localStorage remains the source of truth for anonymous play — this only
// reads from it and optionally pushes a copy to Supabase. It never deletes
// or rewrites any existing localStorage key.
(function () {
  var SUPABASE_URL = 'https://qtjdavuqytxqihwspchh.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0amRhdnVxeXR4cWlod3NwY2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMzg3NjksImV4cCI6MjA5ODYxNDc2OX0.Hyl9Rf62CHEEI7rK_iF5PjKzc0Xd93WC-YrhM-L4ohg';

  var PLAYER_ID_KEY = 'av_player_id';

  function getClient() {
    if (!window.supabase || !window.supabase.createClient) return null;
    if (!window.__avSupabaseClient) {
      window.__avSupabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return window.__avSupabaseClient;
  }

  function getOrCreatePlayerId() {
    var id = localStorage.getItem(PLAYER_ID_KEY);
    if (!id) {
      id = (window.crypto && crypto.randomUUID)
        ? crypto.randomUUID()
        : 'p-' + Date.now() + '-' + Math.random().toString(16).slice(2);
      localStorage.setItem(PLAYER_ID_KEY, id);
    }
    return id;
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

  function readLocalProgress() {
    var solved = [];
    try { solved = JSON.parse(localStorage.getItem('av_solved') || '[]'); } catch (e) {}

    // merge in the newer namespaced store the same way existing pages already do
    try {
      var p = JSON.parse(localStorage.getItem('ava_progress') || 'null');
      if (p && Array.isArray(p.solvedCases)) {
        p.solvedCases.forEach(function (id) {
          if (solved.indexOf(id) === -1) solved.push(id);
        });
      }
    } catch (e) {}

    var badges = [];
    try { badges = JSON.parse(localStorage.getItem('av_badges') || '[]'); } catch (e) {}

    var vaults = [];
    try { vaults = JSON.parse(localStorage.getItem('av_vault_claimed') || '[]'); } catch (e) {}

    var dates = {};
    try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch (e) {}

    return { solved: solved, badges: badges, vaults: vaults, dates: dates };
  }

  // Anti-cheat note: this filters out anything that isn't a real case,
  // vault, or badge id, and derives total/last-case from the filtered
  // list rather than trusting precomputed values. It cannot prove a case
  // was legitimately solved (that would need the puzzle logic to run
  // server-side). The database trigger re-validates everything again on
  // the way in, so this is defense in depth, not the only check.
  function buildPayload(displayName) {
    var local = readLocalProgress();
    var caseAllow = validCaseIds();
    var vaultAllow = validVaultIds();
    var badgeAllow = validBadgeIds();

    var completedCases = caseAllow.length
      ? local.solved.filter(function (id) { return caseAllow.indexOf(id) !== -1; })
      : local.solved.filter(function (id) { return /^\d{3}$/.test(id); });

    var unlockedVaults = vaultAllow.length
      ? local.vaults.filter(function (id) { return vaultAllow.indexOf(id) !== -1; })
      : local.vaults;

    var earnedBadges = badgeAllow
      ? local.badges.filter(function (id) { return badgeAllow.indexOf(id) !== -1; })
      : local.badges;

    var lastCase = null;
    var lastTime = -1;
    completedCases.forEach(function (id) {
      var t = local.dates[id] ? Date.parse(local.dates[id]) : NaN;
      if (!isNaN(t) && t > lastTime) { lastTime = t; lastCase = id; }
    });
    if (!lastCase && completedCases.length) lastCase = completedCases[completedCases.length - 1];

    var name = (displayName || '').trim();
    if (name.length > 40) name = name.slice(0, 40);

    return {
      player_id: getOrCreatePlayerId(),
      display_name: name || null,
      completed_cases: completedCases,
      unlocked_vaults: unlockedVaults,
      earned_badges: earnedBadges,
      last_completed_case: lastCase,
      total_cases_completed: completedCases.length // server recomputes this too; sent for convenience only
    };
  }

  function syncProgress(displayName, callback) {
    var client = getClient();
    if (!client) { callback(new Error('Sync is unavailable right now.')); return; }
    var payload = buildPayload(displayName);
    // Writes go through a SECURITY DEFINER function rather than a direct
    // table upsert -- anon has no raw INSERT/UPDATE/SELECT grant on
    // player_progress at all, only EXECUTE on this function. See
    // supabase/schema.sql for why (a plain RLS upsert policy can't work
    // without also exposing SELECT, since ON CONFLICT DO UPDATE needs to
    // check for an existing row).
    client.rpc('sync_player_progress', {
      p_player_id: payload.player_id,
      p_display_name: payload.display_name,
      p_completed_cases: payload.completed_cases,
      p_unlocked_vaults: payload.unlocked_vaults,
      p_earned_badges: payload.earned_badges,
      p_last_completed_case: payload.last_completed_case,
      p_total_cases_completed: payload.total_cases_completed
    }).then(function (res) {
      if (res.error) callback(res.error);
      else callback(null, payload);
    });
  }

  window.AVProgressSync = {
    getOrCreatePlayerId: getOrCreatePlayerId,
    syncProgress: syncProgress
  };
})();
