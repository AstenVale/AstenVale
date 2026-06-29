// Patches SEASONS_CONFIG so that any case with a valid https:// streaming link
// in the Google Sheet is marked released:true before the page renders.
// Usage: applySheetReleased(callback) — runs callback after patching.
function applySheetReleased(callback) {
  fetch('js/site-settings.json')
    .then(function(r) { return r.json(); })
    .then(function(s) {
      var sheetUrl = s.streamingSheetUrl;
      if (!sheetUrl) { callback(); return; }
      return fetch(sheetUrl).then(function(r) { return r.text(); }).then(function(csv) {
        var rows    = csv.trim().split('\n').map(function(r) { return r.split(','); });
        var headers = rows[0].map(function(h) { return h.trim().toLowerCase(); });
        var idCol   = headers.indexOf('id');
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
        if (typeof SEASONS_CONFIG !== 'undefined') {
          SEASONS_CONFIG.forEach(function(season) {
            season.cases.forEach(function(c) {
              c.released = releasedIds.indexOf(c.id) !== -1;
            });
          });
        }
        callback();
      });
    })
    .catch(function() { callback(); });
}
