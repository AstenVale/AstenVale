// build-collectibles.js
// Reads songs 001-600, generates collectibles[] array from existing answers + collectible data
// Skips files that already have collectibles[] (001-004 already done manually)
// Run with: node scripts/build-collectibles.js

const fs   = require('fs');
const path = require('path');

const SONGS_DIR = path.join(__dirname, '../data/songs');

const SYMBOLS = {
  object:    '🔍',
  location:  '📍',
  witness:   '👤',
  time:      '⌚',
  marker:    '◆',
  direction: '🧭',
  sound:     '🔊'
};

function titleCase(str) {
  return str.replace(/\b\w/g, function(c) { return c.toUpperCase(); });
}

function firstAnswer(arr) {
  if (!arr || arr.length === 0) return '';
  // Return the shortest, cleanest answer (no spaces preferred)
  var clean = arr.filter(function(a) { return a && a.indexOf('//') === -1; });
  if (clean.length === 0) return '';
  // Prefer versions without extra words (e.g. "depot" over "the old depot")
  clean.sort(function(a,b) { return a.length - b.length; });
  return titleCase(clean[0]);
}

function buildCollectibles(data, caseNum) {
  var ans   = data.answers || {};
  var col   = data.collectible || {};
  var title = data.title || ('Case ' + caseNum);

  var location  = firstAnswer(ans.location)  || col.discovered || '';
  var object    = firstAnswer(ans.object)    || col.name || '';
  var witness   = firstAnswer(ans.witness)   || '';
  var time      = firstAnswer(ans.time)      || '';
  var marker    = firstAnswer(ans.marker)    || '';
  var direction = firstAnswer(ans.direction) || '';
  var sound     = firstAnswer(ans.sound)     || '';

  var id = String(parseInt(caseNum, 10)).padStart(3, '0');

  // Use existing image if set
  var objImage = col.image ? '    "image": ' + JSON.stringify(col.image) + ',\n' : '';

  var items = [
    {
      id:          id + '_' + object.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,''),
      type:        'Object',
      name:        object || 'Unknown Object',
      symbol:      col.symbol && col.symbol !== '*' ? col.symbol : SYMBOLS.object,
      image:       col.image || '',
      description: col.description && col.description.indexOf('//') === -1
                     ? col.description
                     : (object + ' was recovered from ' + (location || 'the scene') + ' in Case File ' + id + '.'),
      unknownInfo: col.unknownInfo && col.unknownInfo.indexOf('//') === -1
                     ? col.unknownInfo
                     : 'The full significance of this object has not yet been determined.'
    },
    {
      id:          id + '_location',
      type:        'Location',
      name:        location || 'Unknown Location',
      symbol:      SYMBOLS.location,
      description: 'The active scene for Case File ' + id + '. Recovered field notes place the primary event at ' + (location || 'this location') + '.',
      unknownInfo: 'Whether the scene matches the original report.'
    },
    {
      id:          id + '_witness',
      type:        'Witness',
      name:        witness || 'Unknown Witness',
      symbol:      SYMBOLS.witness,
      description: (witness || 'An individual') + ', identified in the case notes for Case File ' + id + '. Has not given a formal statement.',
      unknownInfo: 'Their connection to the recovered object and whether they returned.'
    },
    {
      id:          id + '_time',
      type:        'Time',
      name:        time || 'Unknown',
      symbol:      SYMBOLS.time,
      description: 'The time recorded in the case audio for Case File ' + id + '. Cross-referenced with field notes.',
      unknownInfo: 'Whether this timestamp marks when the event occurred — or when it was discovered.'
    },
    {
      id:          id + '_marker',
      type:        'Marker',
      name:        marker ? ('Marker ' + marker.replace(/[^0-9]/g,'')) : 'Unknown Marker',
      symbol:      SYMBOLS.marker,
      description: 'A field marker left at the scene. Indexed to the Ashton Vale Public Archive under Case File ' + id + '.',
      unknownInfo: 'Whether this marker connects to others in the sequence — and what the sequence is counting toward.'
    },
    {
      id:          id + '_direction',
      type:        'Direction',
      name:        direction || 'Unknown',
      symbol:      SYMBOLS.direction,
      description: 'The direction indicated by the field marker in Case File ' + id + '.',
      unknownInfo: 'What — or who — lies at the end of this bearing.'
    },
    {
      id:          id + '_sound',
      type:        'Sound',
      name:        sound || 'Unknown Sound',
      symbol:      SYMBOLS.sound,
      description: 'An audio event captured in the case recording for Case File ' + id + '. Identified and logged by the archive.',
      unknownInfo: 'Whether this sound was natural — or a signal.'
    }
  ];

  return items;
}

function processFile(num) {
  var padded = String(parseInt(num, 10)).padStart(3, '0');
  var file   = path.join(SONGS_DIR, 'song' + padded + '.js');

  if (!fs.existsSync(file)) return;

  var src = fs.readFileSync(file, 'utf8');

  // Skip if already has collectibles array
  if (src.indexOf('"collectibles"') !== -1) {
    console.log('SKIP ' + padded + ' (already has collectibles[])');
    return;
  }

  // Extract JSON body from window.SONG_DATA = { ... };
  var match = src.match(/window\.SONG_DATA\s*=\s*(\{[\s\S]*\})\s*;?\s*$/);
  if (!match) {
    console.log('SKIP ' + padded + ' (could not parse)');
    return;
  }

  var data;
  try {
    // Use Function constructor to safely evaluate
    data = (new Function('return ' + match[1]))();
  } catch(e) {
    console.log('SKIP ' + padded + ' (parse error: ' + e.message + ')');
    return;
  }

  var items = buildCollectibles(data, padded);

  // Build JSON string for collectibles array
  var collectiblesJson = '  "collectibles": [\n';
  items.forEach(function(item, i) {
    collectiblesJson += '    {\n';
    collectiblesJson += '      "id": ' + JSON.stringify(item.id) + ',\n';
    collectiblesJson += '      "type": ' + JSON.stringify(item.type) + ',\n';
    collectiblesJson += '      "name": ' + JSON.stringify(item.name) + ',\n';
    if (item.image) {
      collectiblesJson += '      "image": ' + JSON.stringify(item.image) + ',\n';
    }
    collectiblesJson += '      "symbol": ' + JSON.stringify(item.symbol) + ',\n';
    collectiblesJson += '      "description": ' + JSON.stringify(item.description) + ',\n';
    collectiblesJson += '      "unknownInfo": ' + JSON.stringify(item.unknownInfo) + '\n';
    collectiblesJson += '    }' + (i < items.length - 1 ? ',' : '') + '\n';
  });
  collectiblesJson += '  ],';

  // Replace "collectible": { ... }, with the new collectibles array
  var updated = src.replace(/"collectible"\s*:\s*\{[^}]*(?:\{[^}]*\}[^}]*)?\}\s*,/s, collectiblesJson);

  if (updated === src) {
    console.log('WARN ' + padded + ' (collectible block not replaced — check manually)');
    return;
  }

  fs.writeFileSync(file, updated, 'utf8');
  console.log('DONE ' + padded);
}

// Process 001-600 (skip 001-004 already done)
for (var i = 5; i <= 600; i++) {
  processFile(i);
}

console.log('\nAll done.');
