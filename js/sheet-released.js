// Patches SEASONS_CONFIG so that any case marked "Yes" in the sheet's "active"
// column is marked released:true before the page renders. If no "active"
// column exists, falls back to checking for a valid https:// streaming link.
// Falls back to localStorage cache if the sheet fetch fails.
// Usage: applySheetReleased(callback) — runs callback after patching.
function applySheetReleased(callback) {
  var CACHE_KEY = 'av_released_ids';

  function applyIds(releasedIds) {
    if (typeof SEASONS_CONFIG !== 'undefined') {
      SEASONS_CONFIG.forEach(function(season) {
        season.cases.forEach(function(c) {
          c.released = releasedIds.indexOf(c.id) !== -1;
        });
      });
    }
    callback();
  }

  function parseCSV(csv) {
    var parsed = window.CSVUtils.parseCSV(csv);
    var headers = parsed.headers;
    var idCol     = headers.indexOf('id');
    var activeCol = headers.indexOf('active');
    var linkCols  = ['spotify','apple','youtube','amazon'].map(function(n) { return headers.indexOf(n); });
    if (idCol < 0) return [];

    var cleanCell = window.CSVUtils.cleanCell;
    var isYes = window.CSVUtils.isYes;

    var releasedIds = [];
    parsed.rows.forEach(function(row) {
      var rawId = cleanCell(row[idCol]);
      var id = rawId ? rawId.padStart(3, '0') : null;
      if (!id) return;
      var isReleased;
      if (activeCol >= 0) {
        isReleased = isYes(row[activeCol]);
      } else {
        isReleased = linkCols.some(function(col) {
          var v = col >= 0 ? cleanCell(row[col]) : '';
          return /^https?:\/\//i.test(v);
        });
      }
      if (isReleased && releasedIds.indexOf(id) === -1) releasedIds.push(id);
    });
    return releasedIds;
  }

  function useCacheOrVaultConfig() {
    try {
      var cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (Array.isArray(cached)) { applyIds(cached); return; }
    } catch(e) {}
    // No cache — preserve vault-config's own released flags unchanged
    callback();
  }

  fetch('js/site-settings.json')
    .then(function(r) { return r.json(); })
    .then(function(s) {
      var sheetUrl = s.streamingSheetUrl;
      if (!sheetUrl) { useCacheOrVaultConfig(); return; }
      return fetch(sheetUrl)
        .then(function(r) { return r.text(); })
        .then(function(csv) {
          var releasedIds = parseCSV(csv);
          // Always update cache so removals take effect immediately
          try { localStorage.setItem(CACHE_KEY, JSON.stringify(releasedIds)); } catch(e) {}
          applyIds(releasedIds);
        });
    })
    .catch(function() { useCacheOrVaultConfig(); });
}
