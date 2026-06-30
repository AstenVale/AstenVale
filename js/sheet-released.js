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
          c.released = releasedIds.indexOf(c.id) !== -1;
        });
      });
    }
    callback();
  }

  function parseCSVLine(line) {
    var cells = [];
    var cell = '';
    var inQuotes = false;
    for (var i = 0; i < line.length; i++) {
      var ch = line[i];
      var next = line[i + 1];
      if (ch === '"' && inQuotes && next === '"') { cell += '"'; i++; continue; }
      if (ch === '"') { inQuotes = !inQuotes; continue; }
      if (ch === ',' && !inQuotes) { cells.push(cell); cell = ''; continue; }
      cell += ch;
    }
    cells.push(cell);
    return cells;
  }

  function cleanCell(value) {
    return (value || '').trim();
  }

  function parseCSV(csv) {
    var lines = csv.trim().split(/\r?\n/).filter(function(line) { return line.trim(); });
    if (!lines.length) return [];
    var rows    = lines.map(parseCSVLine);
    var headers = rows[0].map(function(h) { return cleanCell(h).toLowerCase(); });
    var idCol    = headers.indexOf('id');
    var linkCols = ['spotify','apple','youtube','amazon'].map(function(n) { return headers.indexOf(n); });
    if (idCol < 0) return [];

    var releasedIds = [];
    rows.slice(1).forEach(function(row) {
      var rawId = cleanCell(row[idCol]);
      var id = rawId ? rawId.padStart(3, '0') : null;
      if (!id) return;
      var hasLink = linkCols.some(function(col) {
        var v = col >= 0 ? cleanCell(row[col]) : '';
        return /^https?:\/\//i.test(v);
      });
      if (hasLink && releasedIds.indexOf(id) === -1) releasedIds.push(id);
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
