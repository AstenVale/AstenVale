// Shared CSV helpers used by sheet-released.js and sheet-case-data.js.
window.CSVUtils = (function() {
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

  // Returns { headers: [lowercased header names], rows: [ [cell,...], ... ] } (rows excludes header row)
  function parseCSV(csv) {
    var lines = csv.trim().split(/\r?\n/).filter(function(line) { return line.trim(); });
    if (!lines.length) return { headers: [], rows: [] };
    var allRows = lines.map(parseCSVLine);
    var headers = allRows[0].map(function(h) { return cleanCell(h).toLowerCase(); });
    return { headers: headers, rows: allRows.slice(1) };
  }

  function isYes(v) {
    return ['yes', 'y', 'true', '1'].indexOf(cleanCell(v).toLowerCase()) !== -1;
  }

  return { parseCSVLine: parseCSVLine, cleanCell: cleanCell, parseCSV: parseCSV, isYes: isYes };
})();
