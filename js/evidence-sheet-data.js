// Builds window.EVIDENCE_SHEET_DATA = { "<slug>": { title, category, ... }, ... }
// from the "Evidence" tab of the Google Sheet (js/site-settings.json -> evidenceSheetUrl).
// Additive-only, mirrors js/sheet-case-data.js. Reuses window.CSVUtils.
// Usage: applyEvidenceSheetData(callback) -- callback runs after window.EVIDENCE_SHEET_DATA is set.
function applyEvidenceSheetData(callback) {
  var CACHE_KEY = 'av_evidence_sheet_data';

  var COLUMNS = [
    ['evidence_id', 'evidenceId'],
    ['title', 'title'],
    ['category', 'category'],
    ['description', 'description'],
    ['archive_notes', 'archiveNotes'],
    ['image', 'image'],
    ['audio', 'audio'],
    ['spotify_track_id', 'spotifyTrackId'],
    ['first_appearance', 'firstAppearance'],
    ['appears_in', 'appearsIn'],
    ['status', 'status'],
    ['verification', 'verification'],
    ['related_evidence', 'relatedEvidence']
  ];

  function apply(data) {
    window.EVIDENCE_SHEET_DATA = data || {};
    callback();
  }

  function parseCSV(csv) {
    var parsed = window.CSVUtils.parseCSV(csv);
    var headers = parsed.headers;
    var idCol = headers.indexOf('evidence_id');
    if (idCol < 0) return {};

    var cleanCell = window.CSVUtils.cleanCell;
    var colIndex = {};
    COLUMNS.forEach(function(pair) {
      colIndex[pair[1]] = headers.indexOf(pair[0]);
    });

    var data = {};
    parsed.rows.forEach(function(row) {
      var id = cleanCell(row[idCol]);
      if (!id) return;

      var record = {};
      COLUMNS.forEach(function(pair) {
        var key = pair[1];
        var col = colIndex[key];
        var val = col >= 0 ? cleanCell(row[col]) : '';
        if (val) record[key] = val;
      });
      data[id] = record;
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
      var sheetUrl = s.evidenceSheetUrl;
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
