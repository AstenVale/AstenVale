(function() {

  // Expose globally so case.html and other pages can use it
  window.setAudioSrc = function(audio, src) {
    if (!src) return;
    var base = src.replace(/\.(mp3|wav|ogg|m4a|aac|flac)$/i, '');
    var types = [
      { ext: 'mp3', mime: 'audio/mpeg' },
      { ext: 'wav', mime: 'audio/wav' },
      { ext: 'ogg', mime: 'audio/ogg' },
      { ext: 'm4a', mime: 'audio/mp4' },
      { ext: 'aac', mime: 'audio/aac' }
    ];
    // Remove any existing sources
    audio.removeAttribute('src');
    audio.querySelectorAll('source').forEach(function(s) { s.remove(); });
    // Put the original format first so it's preferred
    var origExt = (src.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/i) || ['','mp3'])[1].toLowerCase();
    var sorted = types.slice().sort(function(a, b) {
      return a.ext === origExt ? -1 : b.ext === origExt ? 1 : 0;
    });
    sorted.forEach(function(t) {
      var s = document.createElement('source');
      s.src = base + '.' + t.ext;
      s.type = t.mime;
      audio.appendChild(s);
    });
    audio.load();
  };

  var loadingCopy = {
    cabinetBody: 'Restoring evidence...',
    soundBody: 'Recovering file...',
    completedList: 'Opening archive...',
    archiveGrid: 'Loading investigation...',
    progressBody: 'Restoring evidence...'
  };


  var cp1252 = {
    '\u20ac': 0x80, '\u201a': 0x82, '\u0192': 0x83, '\u201e': 0x84, '\u2026': 0x85,
    '\u2020': 0x86, '\u2021': 0x87, '\u02c6': 0x88, '\u2030': 0x89, '\u0160': 0x8A,
    '\u2039': 0x8B, '\u0152': 0x8C, '\u017d': 0x8E, '\u2018': 0x91, '\u2019': 0x92,
    '\u201c': 0x93, '\u201d': 0x94, '\u2022': 0x95, '\u2013': 0x96, '\u2014': 0x97,
    '\u02dc': 0x98, '\u2122': 0x99, '\u0161': 0x9A, '\u203a': 0x9B, '\u0153': 0x9C,
    '\u017e': 0x9E, '\u0178': 0x9F
  };

  function cp1252Bytes(text) {
    var bytes = [];
    for (var i = 0; i < text.length; i++) {
      var ch = text.charAt(i);
      var code = text.charCodeAt(i);
      if (cp1252[ch] !== undefined) bytes.push(cp1252[ch]);
      else if (code <= 255) bytes.push(code);
      else return null;
    }
    return new Uint8Array(bytes);
  }

  function repairMojibake(text) {
    if (!text || !/[\u00c2-\u00c3\u00e2\u00f0]/.test(text)) return text;
    if (!window.TextDecoder) return text;
    var out = text;
    for (var i = 0; i < 4; i++) {
      var bytes = cp1252Bytes(out);
      if (!bytes) break;
      var next = new TextDecoder('utf-8').decode(bytes);
      if (next === out || next.indexOf('\uFFFD') !== -1) break;
      out = next;
    }
    return out;
  }

  function repairVisibleText(root) {
    root = root || document;
    if (root === document && document.title) document.title = repairMojibake(document.title);
    if (root.nodeType === 3) {
      root.nodeValue = repairMojibake(root.nodeValue);
      return;
    }
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node) {
        var parent = node.parentElement;
        if (!parent || /^(SCRIPT|STYLE|TEXTAREA)$/i.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var node;
    while ((node = walker.nextNode())) node.nodeValue = repairMojibake(node.nodeValue);
    (root.querySelectorAll ? root : document).querySelectorAll('[data-icon], [aria-label], [title], [alt], [placeholder]').forEach(function(el) {
      ['data-icon', 'aria-label', 'title', 'alt', 'placeholder'].forEach(function(attr) {
        if (el.hasAttribute(attr)) el.setAttribute(attr, repairMojibake(el.getAttribute(attr)));
      });
    });
  }

  function fmt(seconds) {
    if (!isFinite(seconds) || seconds < 0) seconds = 0;
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ':' + String(s).padStart(2, '0');
  }

  function wave(seedText) {
    var seed = String(seedText || 'archive').split('').reduce(function(n, c) { return n + c.charCodeAt(0); }, 0);
    var html = '';
    for (var i = 0; i < 28; i++) {
      var h = 18 + ((seed * (i + 5) + i * 11) % 70);
      html += '<span style="height:' + h + '%"></span>';
    }
    return html;
  }

  function enhanceAudio(audio) {
    if (!audio || audio.dataset.avEnhanced === '1' || audio.classList.contains('native-audio')) return;
    audio.dataset.avEnhanced = '1';
    audio.preload = 'none';
    audio.classList.add('av-enhanced-audio');
    audio.removeAttribute('controls');

    var label = audio.getAttribute('aria-label') || 'Archive audio recording';
    var player = document.createElement('div');
    player.className = 'av-audio-player';
    player.setAttribute('role', 'group');
    player.setAttribute('aria-label', label);
    player.innerHTML =
      '<div class="av-audio-wave" aria-hidden="true">' + wave(label) + '</div>' +
      '<div class="av-audio-row">' +
        '<button class="av-audio-play" type="button" aria-label="Play recording">Play</button>' +
        '<div class="av-audio-progress" role="slider" tabindex="0" aria-label="Recording progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="av-audio-fill"></span></div>' +
        '<span class="av-audio-time">0:00 / --:--</span>' +
        '<div class="av-audio-volume" role="slider" tabindex="0" aria-label="Recording volume" aria-valuemin="0" aria-valuemax="100" aria-valuenow="80"><span class="av-audio-volume-fill" style="width:80%"></span></div>' +
      '</div>';
    audio.insertAdjacentElement('afterend', player);

    var play = player.querySelector('.av-audio-play');
    var progress = player.querySelector('.av-audio-progress');
    var fill = player.querySelector('.av-audio-fill');
    var time = player.querySelector('.av-audio-time');
    var volume = player.querySelector('.av-audio-volume');
    var volumeFill = player.querySelector('.av-audio-volume-fill');
    audio.volume = 0.8;

    audio.addEventListener('loadedmetadata', function() { time.textContent = '0:00 / ' + fmt(audio.duration); });
    audio.addEventListener('timeupdate', function() {
      var pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      fill.style.width = pct + '%';
      progress.setAttribute('aria-valuenow', Math.round(pct));
      time.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
    });
    audio.addEventListener('ended', function() { play.textContent = 'Play'; play.setAttribute('aria-label', 'Play recording'); });
    play.addEventListener('click', function() {
      document.querySelectorAll('audio').forEach(function(other) {
        if (other !== audio) {
          other.pause();
          var next = other.nextElementSibling;
          if (next && next.classList.contains('av-audio-player')) {
            var btn = next.querySelector('.av-audio-play');
            if (btn) btn.textContent = 'Play';
          }
        }
      });
      if (audio.paused) { audio.play(); play.textContent = 'Pause'; play.setAttribute('aria-label', 'Pause recording'); }
      else { audio.pause(); play.textContent = 'Play'; play.setAttribute('aria-label', 'Play recording'); }
    });
    progress.addEventListener('click', function(e) {
      if (!audio.duration) return;
      var rect = progress.getBoundingClientRect();
      audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
    });
    volume.addEventListener('click', function(e) {
      var rect = volume.getBoundingClientRect();
      var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      audio.volume = pct;
      volumeFill.style.width = (pct * 100) + '%';
      volume.setAttribute('aria-valuenow', Math.round(pct * 100));
    });
  }

  function polish(root) {
    root = root || document;
    repairVisibleText(root);
    root.querySelectorAll('img').forEach(function(img) {
      if (!img.hasAttribute('loading')) img.loading = 'lazy';
      if (!img.hasAttribute('decoding')) img.decoding = 'async';
      if (!img.hasAttribute('alt')) img.alt = 'Archive evidence image';
    });
    root.querySelectorAll('audio').forEach(enhanceAudio);
    root.querySelectorAll('[role="button"], .case-group-toggle, .category-toggle').forEach(function(el) {
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    });
    root.querySelectorAll('button:not([aria-label])').forEach(function(btn) {
      var text = (btn.textContent || '').trim();
      if (text) btn.setAttribute('aria-label', text);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    Object.keys(loadingCopy).forEach(function(id) {
      var el = document.getElementById(id);
      if (el && !el.children.length && !el.textContent.trim()) {
        el.innerHTML = '<div class="av-loading" aria-live="polite">' + loadingCopy[id] + '</div>';
      }
    });
    polish(document);
    var mo = new MutationObserver(function(records) {
      records.forEach(function(record) {
        record.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) {
            if (node.tagName === 'AUDIO') enhanceAudio(node);
            else polish(node);
          }
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  });
})();