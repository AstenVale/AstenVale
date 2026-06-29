// badges.js — Badge definitions and award logic for Ashton Vale

var BADGES_CONFIG = [

  // ── MILESTONE ─────────────────────────────────────────────────────────────
  {
    id:          'first_case',
    name:        'The File Opens',
    symbol:      '📁',
    category:    'Milestone',
    description: 'Solved your first case. The archive remembers.',
    hint:        'Solve any case to unlock.',
    check: function(s) { return s.solved.length >= 1; }
  },
  {
    id:          'five_cases',
    name:        'Deep in the Archive',
    symbol:      '🗄',
    category:    'Milestone',
    description: 'Five cases closed. You are no longer a visitor.',
    hint:        'Solve 5 cases.',
    check: function(s) { return s.solved.length >= 5; }
  },
  {
    id:          'ten_cases',
    name:        'The Long Trail',
    symbol:      '🔦',
    category:    'Milestone',
    description: 'Ten cases behind you. The trail does not end here.',
    hint:        'Solve 10 cases.',
    check: function(s) { return s.solved.length >= 10; }
  },
  {
    id:          'season_one_complete',
    name:        'Vault Cracked',
    symbol:      '🔓',
    category:    'Milestone',
    description: 'Completed every case in Season One. The vault stands open.',
    hint:        'Solve all 12 cases in Season One.',
    check: function(s) {
      var s1ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return s1ids.every(function(id) { return s.solved.indexOf(id) !== -1; });
    }
  },

  // ── DISCOVERY ─────────────────────────────────────────────────────────────
  {
    id:          'cabinet_visitor',
    name:        'Evidence Recovered',
    symbol:      '🔍',
    category:    'Discovery',
    description: 'Opened the Evidence Cabinet for the first time.',
    hint:        'Visit the Evidence Cabinet page.',
    check: function(s) { return !!s.visitedCabinet; }
  },
  {
    id:          'archive_explorer',
    name:        'Every Corner',
    symbol:      '🗺',
    category:    'Discovery',
    description: 'Visited every section of the Ashton Vale Archives.',
    hint:        'Visit the Archive, Cabinet, Progress, About, and Join pages.',
    check: function(s) {
      return s.visitedCabinet && s.visitedAbout && s.visitedJoin && s.visitedCompleted;
    }
  },
  {
    id:          'night_investigator',
    name:        'After Hours',
    symbol:      '🌑',
    category:    'Discovery',
    description: 'Solved a case between midnight and 5am. The archive never closes.',
    hint:        'Solve a case late at night.',
    check: function(s) { return !!s.solvedLateNight; }
  },

  // ── NARRATIVE ─────────────────────────────────────────────────────────────
  {
    id:          'widow_tracker',
    name:        'She Was There Too',
    symbol:      '👤',
    category:    'Narrative',
    description: 'Solved both cases where The Widow appears. Her pattern is becoming clear.',
    hint:        'Solve Cases 002 and 004.',
    check: function(s) {
      return s.solved.indexOf('002') !== -1 && s.solved.indexOf('004') !== -1;
    }
  },
  {
    id:          'crow_follower',
    name:        'Crow Call',
    symbol:      '🪶',
    category:    'Narrative',
    description: 'Solved both cases marked by the crow call. The same sound. Two different places.',
    hint:        'Solve Cases 001 and 003.',
    check: function(s) {
      return s.solved.indexOf('001') !== -1 && s.solved.indexOf('003') !== -1;
    }
  },
  {
    id:          'west_pattern',
    name:        'Go West',
    symbol:      '🧭',
    category:    'Narrative',
    description: 'Noticed the pattern. Three markers pointing the same direction. This is not coincidence.',
    hint:        'Solve Cases 001, 002, and 003.',
    check: function(s) {
      return s.solved.indexOf('001') !== -1 &&
             s.solved.indexOf('002') !== -1 &&
             s.solved.indexOf('003') !== -1;
    }
  },
  {
    id:          'east_turn',
    name:        'The Direction Changed',
    symbol:      '↩',
    category:    'Narrative',
    description: 'Solved Case 004. For the first time, the marker pointed East. Something at the Church broke the pattern.',
    hint:        'Solve Case 004.',
    check: function(s) { return s.solved.indexOf('004') !== -1; }
  },
  {
    id:          'stranger_found',
    name:        'Who Was That',
    symbol:      '❓',
    category:    'Narrative',
    description: 'Solved Case 001. The Stranger left no name. Only a lantern and a direction.',
    hint:        'Solve Case 001.',
    check: function(s) { return s.solved.indexOf('001') !== -1; }
  },

  // ── EVIDENCE ──────────────────────────────────────────────────────────────
  {
    id:          'evidence_hunter',
    name:        'Scene Processed',
    symbol:      '🏷',
    category:    'Evidence',
    description: 'Recovered evidence from 3 or more cases. The cabinet is filling up.',
    hint:        'Solve 3 cases.',
    check: function(s) { return s.solved.length >= 3; }
  },
  {
    id:          'full_cabinet_s1',
    name:        'Season One: Complete Record',
    symbol:      '📂',
    category:    'Evidence',
    description: 'Recovered all evidence from Season One. Every object, every witness, every sound.',
    hint:        'Solve all 12 cases in Season One.',
    check: function(s) {
      var s1ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return s1ids.every(function(id) { return s.solved.indexOf(id) !== -1; });
    }
  }
];

// ── Read current state ────────────────────────────────────────────────────
function getBadgeState() {
  var solved = [];
  try { solved = JSON.parse(localStorage.getItem('av_solved') || '[]'); } catch(e) {}

  var hour = new Date().getHours();

  return {
    solved:           solved,
    visitedCabinet:   !!localStorage.getItem('av_visited_cabinet'),
    visitedAbout:     !!localStorage.getItem('av_visited_about'),
    visitedJoin:      !!localStorage.getItem('av_visited_join'),
    visitedCompleted: !!localStorage.getItem('av_visited_completed'),
    solvedLateNight:  !!localStorage.getItem('av_solved_late_night')
  };
}

// ── Check and award badges ────────────────────────────────────────────────
function checkAndAwardBadges() {
  var state   = getBadgeState();
  var current = [];
  try { current = JSON.parse(localStorage.getItem('av_badges') || '[]'); } catch(e) {}

  var newBadges = [];
  BADGES_CONFIG.forEach(function(badge) {
    if (current.indexOf(badge.id) === -1 && badge.check(state)) {
      current.push(badge.id);
      newBadges.push(badge);
    }
  });

  if (newBadges.length > 0) {
    localStorage.setItem('av_badges', JSON.stringify(current));
  }

  return newBadges;
}

// ── Check if solving at night ─────────────────────────────────────────────
function markLateNightIfNeeded() {
  var h = new Date().getHours();
  if (h >= 0 && h < 5) {
    localStorage.setItem('av_solved_late_night', '1');
  }
}
