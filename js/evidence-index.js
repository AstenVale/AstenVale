// Builds window.EVIDENCE_INDEX = { "<slug>": { title, category, description, archiveNotes,
// image, appearsIn: ["001","013",...], firstAppearance, status, verification, relatedEvidence: [...] } }
// entirely by scanning all 600 data/songs/songNNN.js files client-side and grouping
// collectibles by slugified name. No spreadsheet, no manual entry -- always in sync with
// whatever case files currently exist.
// Usage: buildEvidenceIndex(callback) -- callback runs after window.EVIDENCE_INDEX is set.
function buildEvidenceIndex(callback) {
  var CACHE_KEY = 'av_evidence_index_v1';
  var TOTAL_CASES = 600;

  function slugify(text) {
    if (window.AssetUrlBuilder) return window.AssetUrlBuilder.slugify(text);
    return String(text || '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
  }

  function apply(index) {
    window.EVIDENCE_INDEX = index;
    callback();
  }

  function useCacheOrEmpty() {
    try {
      var cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
      if (cached && typeof cached === 'object') { apply(cached); return; }
    } catch (e) {}
    apply({});
  }

  function fetchCase(num) {
    var padded = String(num).padStart(3, '0');
    return fetch('data/songs/song' + padded + '.js')
      .then(function(r) { return r.ok ? r.text() : null; })
      .then(function(text) {
        if (!text) return null;
        try {
          var sandbox = { window: {} };
          var fn = new Function('window', text + '\nreturn window.SONG_DATA;');
          var data = fn(sandbox.window);
          return { id: padded, collectibles: (data && data.collectibles) || [] };
        } catch (e) {
          return null;
        }
      })
      .catch(function() { return null; });
  }

  function buildIndex(caseResults) {
    var groups = {}; // slug -> { entries: [{ caseId, collectible }] }

    caseResults.forEach(function(result) {
      if (!result) return;
      result.collectibles.forEach(function(c) {
        if (!c || !c.name) return;
        var slug = slugify(c.name);
        if (!slug) return;
        if (!groups[slug]) groups[slug] = [];
        groups[slug].push({ caseId: result.id, collectible: c });
      });
    });

    var index = {};
    Object.keys(groups).forEach(function(slug) {
      var entries = groups[slug];
      entries.sort(function(a, b) { return a.caseId.localeCompare(b.caseId); });

      var first = entries[0].collectible;
      var description = '';
      var archiveNotes = '';
      var image = '';
      entries.forEach(function(e) {
        var c = e.collectible;
        if (!description && c.description) description = c.description;
        if (!archiveNotes && c.unknownInfo && c.unknownInfo.indexOf('//') === -1) archiveNotes = c.unknownInfo;
        if (!image && c.image) image = c.image;
      });

      var appearsIn = entries.map(function(e) { return e.caseId; });
      var uniqueAppearsIn = appearsIn.filter(function(id, i) { return appearsIn.indexOf(id) === i; });

      index[slug] = {
        title: first.name,
        category: first.type || 'Evidence',
        description: description,
        archiveNotes: archiveNotes,
        image: image,
        symbol: first.symbol || '',
        appearsIn: uniqueAppearsIn,
        firstAppearance: uniqueAppearsIn[0] || '',
        status: uniqueAppearsIn.length > 1 ? 'Recurring Evidence' : 'Recovered',
        verification: uniqueAppearsIn.length > 1 ? 'Verified' : 'Unverified'
      };
    });

    // Related evidence: other slugs that co-occur in at least one shared case, ranked by
    // shared-case count, top 4.
    Object.keys(index).forEach(function(slug) {
      var myCases = index[slug].appearsIn;
      var scores = {};
      myCases.forEach(function(caseId) {
        Object.keys(index).forEach(function(otherSlug) {
          if (otherSlug === slug) return;
          if (index[otherSlug].appearsIn.indexOf(caseId) !== -1) {
            scores[otherSlug] = (scores[otherSlug] || 0) + 1;
          }
        });
      });
      var related = Object.keys(scores).sort(function(a, b) { return scores[b] - scores[a]; }).slice(0, 4);
      index[slug].relatedEvidence = related;
    });

    return index;
  }

  var nums = [];
  for (var i = 1; i <= TOTAL_CASES; i++) nums.push(i);

  Promise.all(nums.map(fetchCase))
    .then(function(results) {
      var index = buildIndex(results);
      try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(index)); } catch (e) {}
      apply(index);
    })
    .catch(function() { useCacheOrEmpty(); });
}
