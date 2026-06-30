// Patches SEASONS_CONFIG so that any case with a valid https:// streaming link
// in the Google Sheet is marked released:true before the page renders.
// Falls back to localStorage cache if the sheet fetch fails.
// Usage: applySheetReleased(callback) — runs callback after patching.
function applySheetReleased(callback) {
  var CACHE_KEY = 'av_released_ids';

  function applyIds(releasedIds) {
    if (typeof SEASONS_CONFIG !== 'undefined') {
      SEASONS_CONFIG.forEach(function(season) {
        season.cases.forEach(function(c) {
          // Sheet adds releases on top of vault-config; never removes a vault-config true
          c.released = c.released || releasedIds.indexOf(c.id) !== -1;
        });
      });
    }
    callback();
  }

  function parseCSV(csv) {
    var rows    = csv.trim().split('\n').map(function(r) { return r.split(','); });
    var headers = rows[0].map(function(h) { return h.trim().toLowerCase(); });
    var idCol    = headers.indexOf('id');
    var linkCols = ['spotify','apple','youtube','amazon'].map(function(n) { return headers.indexOf(n); });
    var releasedIds = [];
    rows.slice(1).forEach(function(row) {
      var id = row[idCol] ? row[idCol].trim().padStart(3, '0') : null;
      if (!id) return;
      var hasLink = linkCols.some(function(col) {
        var v = col >= 0 && row[col] ? row[col].trim() : '';
        return /^https?:\/\//i.test(v);
      });
      if (hasLink) releasedIds.push(id);
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
