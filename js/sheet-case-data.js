// Builds window.SHEET_CASE_DATA = { "001": { spotifyTrackId }, ... } from the same
// Google Sheet used by sheet-released.js. Additive-only: reads the optional
// spotify_track_id column and leaves it undefined when the column/cell is empty,
// so callers fall back to existing per-case behavior untouched.
// Usage: applySheetCaseData(callback) — callback runs after window.SHEET_CASE_DATA is set.
function applySheetCaseData(callback) {
  var CACHE_KEY = 'av_sheet_case_data';

  function apply(data) {
    window.SHEET_CASE_DATA = data || {};
    callback();
  }

  function parseCSV(csv) {
    var parsed = window.CSVUtils.parseCSV(csv);
    var headers = parsed.headers;
    var idCol = headers.indexOf('id');
    var trackIdCol = headers.indexOf('spotify_track_id');
    if (idCol < 0) return {};

    var cleanCell = window.CSVUtils.cleanCell;
    var data = {};
    parsed.rows.forEach(function(row) {
      var rawId = cleanCell(row[idCol]);
      var id = rawId ? rawId.padStart(3, '0') : null;
      if (!id) return;

      var trackId = trackIdCol >= 0 ? cleanCell(row[trackIdCol]) : '';
      if (trackId) data[id] = { spotifyTrackId: trackId };
    });
    return data;
  }

  function useCacheOrEmpty() {
    try {
      var cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (cached && typeof cached === 'object') { apply(cached); return; }
    } catch (e) {}
    apply({});
  }

  fetch('js/site-settings.json')
    .then(function(r) { return r.json(); })
    .then(function(s) {
      var sheetUrl = s.streamingSheetUrl;
      if (!sheetUrl) { useCacheOrEmpty(); return; }
      return fetch(sheetUrl)
        .then(function(r) { return r.text(); })
        .then(function(csv) {
          var data = parseCSV(csv);
          try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch (e) {}
          apply(data);
        });
    })
    .catch(function() { useCacheOrEmpty(); });
}
