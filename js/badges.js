// badges.js — Badge definitions and award logic for Asten Vale

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
    description: 'Visited every section of the Asten Vale Archives.',
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
,
  // ==== SEASONAL ACHIEVEMENT VAULTS (12 seasons x 16 achievements = 192) ====
  // Reuses only signals the rest of the app already tracks in localStorage:
  // s.solved (av_solved), per-case attempt counts (av_attempts_<id>, written by
  // case.html's progressive verification), and completion timestamps
  // (av_completed_dates). No new tracking mechanism introduced.

  // -- Vault 01 — The Stranger --
  {
    id:          's01_ach01',
    name:        'First File — The Stranger',
    symbol:      '📁',
    category:    'Vault 01 — The Stranger',
    description: 'Opened the first case of The Stranger.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's01_ach02',
    name:        'Three Files — The Stranger',
    symbol:      '📂',
    category:    'Vault 01 — The Stranger',
    description: 'Solved 3 cases in The Stranger.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's01_ach03',
    name:        'Six Files — The Stranger',
    symbol:      '📚',
    category:    'Vault 01 — The Stranger',
    description: 'Solved 6 cases in The Stranger.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's01_ach04',
    name:        'Nine Files — The Stranger',
    symbol:      '🗄',
    category:    'Vault 01 — The Stranger',
    description: 'Solved 9 cases in The Stranger.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's01_ach05',
    name:        'Season Closed — The Stranger',
    symbol:      '✅',
    category:    'Vault 01 — The Stranger',
    description: 'Solved every case in The Stranger.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's01_ach06',
    name:        'Evidence 25% — The Stranger',
    symbol:      '🧪',
    category:    'Vault 01 — The Stranger',
    description: 'Recovered a quarter of the evidence in The Stranger.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's01_ach07',
    name:        'Evidence 50% — The Stranger',
    symbol:      '🧪',
    category:    'Vault 01 — The Stranger',
    description: 'Recovered half the evidence in The Stranger.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's01_ach08',
    name:        'Evidence 75% — The Stranger',
    symbol:      '🧪',
    category:    'Vault 01 — The Stranger',
    description: 'Recovered most of the evidence in The Stranger.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's01_ach09',
    name:        'Evidence 100% — The Stranger',
    symbol:      '🧪',
    category:    'Vault 01 — The Stranger',
    description: 'Recovered every piece of evidence in The Stranger.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's01_ach10',
    name:        'First Try — The Stranger',
    symbol:      '🎯',
    category:    'Vault 01 — The Stranger',
    description: 'Solved every case in The Stranger on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's01_ach11',
    name:        'No Hints — The Stranger',
    symbol:      '🧠',
    category:    'Vault 01 — The Stranger',
    description: 'Completed The Stranger without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's01_ach12',
    name:        'Under Time — The Stranger',
    symbol:      '⏱',
    category:    'Vault 01 — The Stranger',
    description: 'Completed The Stranger within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's01_ach13',
    name:        'Case Notes Read — The Stranger',
    symbol:      '📝',
    category:    'Vault 01 — The Stranger',
    description: 'Reviewed every incident report in The Stranger.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's01_ach14',
    name:        'Full Playlist — The Stranger',
    symbol:      '🎵',
    category:    'Vault 01 — The Stranger',
    description: 'Listened to every recovered recording in The Stranger.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's01_ach15',
    name:        'Vault Unsealed — The Stranger',
    symbol:      '🔓',
    category:    'Vault 01 — The Stranger',
    description: 'Unlocked the The Stranger vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's01_ach16',
    name:        'Perfect Record — The Stranger',
    symbol:      '🏆',
    category:    'Vault 01 — The Stranger',
    description: 'Earned every achievement in The Stranger.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['001','002','003','004','005','006','007','008','009','010','011','012'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 02 — The Hollow --
  {
    id:          's02_ach01',
    name:        'First File — The Hollow',
    symbol:      '📁',
    category:    'Vault 02 — The Hollow',
    description: 'Opened the first case of The Hollow.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's02_ach02',
    name:        'Three Files — The Hollow',
    symbol:      '📂',
    category:    'Vault 02 — The Hollow',
    description: 'Solved 3 cases in The Hollow.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's02_ach03',
    name:        'Six Files — The Hollow',
    symbol:      '📚',
    category:    'Vault 02 — The Hollow',
    description: 'Solved 6 cases in The Hollow.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's02_ach04',
    name:        'Nine Files — The Hollow',
    symbol:      '🗄',
    category:    'Vault 02 — The Hollow',
    description: 'Solved 9 cases in The Hollow.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's02_ach05',
    name:        'Season Closed — The Hollow',
    symbol:      '✅',
    category:    'Vault 02 — The Hollow',
    description: 'Solved every case in The Hollow.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's02_ach06',
    name:        'Evidence 25% — The Hollow',
    symbol:      '🧪',
    category:    'Vault 02 — The Hollow',
    description: 'Recovered a quarter of the evidence in The Hollow.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's02_ach07',
    name:        'Evidence 50% — The Hollow',
    symbol:      '🧪',
    category:    'Vault 02 — The Hollow',
    description: 'Recovered half the evidence in The Hollow.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's02_ach08',
    name:        'Evidence 75% — The Hollow',
    symbol:      '🧪',
    category:    'Vault 02 — The Hollow',
    description: 'Recovered most of the evidence in The Hollow.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's02_ach09',
    name:        'Evidence 100% — The Hollow',
    symbol:      '🧪',
    category:    'Vault 02 — The Hollow',
    description: 'Recovered every piece of evidence in The Hollow.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's02_ach10',
    name:        'First Try — The Hollow',
    symbol:      '🎯',
    category:    'Vault 02 — The Hollow',
    description: 'Solved every case in The Hollow on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's02_ach11',
    name:        'No Hints — The Hollow',
    symbol:      '🧠',
    category:    'Vault 02 — The Hollow',
    description: 'Completed The Hollow without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's02_ach12',
    name:        'Under Time — The Hollow',
    symbol:      '⏱',
    category:    'Vault 02 — The Hollow',
    description: 'Completed The Hollow within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's02_ach13',
    name:        'Case Notes Read — The Hollow',
    symbol:      '📝',
    category:    'Vault 02 — The Hollow',
    description: 'Reviewed every incident report in The Hollow.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's02_ach14',
    name:        'Full Playlist — The Hollow',
    symbol:      '🎵',
    category:    'Vault 02 — The Hollow',
    description: 'Listened to every recovered recording in The Hollow.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's02_ach15',
    name:        'Vault Unsealed — The Hollow',
    symbol:      '🔓',
    category:    'Vault 02 — The Hollow',
    description: 'Unlocked the The Hollow vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's02_ach16',
    name:        'Perfect Record — The Hollow',
    symbol:      '🏆',
    category:    'Vault 02 — The Hollow',
    description: 'Earned every achievement in The Hollow.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 03 — The Ledger --
  {
    id:          's03_ach01',
    name:        'First File — The Ledger',
    symbol:      '📁',
    category:    'Vault 03 — The Ledger',
    description: 'Opened the first case of The Ledger.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's03_ach02',
    name:        'Three Files — The Ledger',
    symbol:      '📂',
    category:    'Vault 03 — The Ledger',
    description: 'Solved 3 cases in The Ledger.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's03_ach03',
    name:        'Six Files — The Ledger',
    symbol:      '📚',
    category:    'Vault 03 — The Ledger',
    description: 'Solved 6 cases in The Ledger.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's03_ach04',
    name:        'Nine Files — The Ledger',
    symbol:      '🗄',
    category:    'Vault 03 — The Ledger',
    description: 'Solved 9 cases in The Ledger.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's03_ach05',
    name:        'Season Closed — The Ledger',
    symbol:      '✅',
    category:    'Vault 03 — The Ledger',
    description: 'Solved every case in The Ledger.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's03_ach06',
    name:        'Evidence 25% — The Ledger',
    symbol:      '🧪',
    category:    'Vault 03 — The Ledger',
    description: 'Recovered a quarter of the evidence in The Ledger.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's03_ach07',
    name:        'Evidence 50% — The Ledger',
    symbol:      '🧪',
    category:    'Vault 03 — The Ledger',
    description: 'Recovered half the evidence in The Ledger.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's03_ach08',
    name:        'Evidence 75% — The Ledger',
    symbol:      '🧪',
    category:    'Vault 03 — The Ledger',
    description: 'Recovered most of the evidence in The Ledger.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's03_ach09',
    name:        'Evidence 100% — The Ledger',
    symbol:      '🧪',
    category:    'Vault 03 — The Ledger',
    description: 'Recovered every piece of evidence in The Ledger.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's03_ach10',
    name:        'First Try — The Ledger',
    symbol:      '🎯',
    category:    'Vault 03 — The Ledger',
    description: 'Solved every case in The Ledger on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's03_ach11',
    name:        'No Hints — The Ledger',
    symbol:      '🧠',
    category:    'Vault 03 — The Ledger',
    description: 'Completed The Ledger without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's03_ach12',
    name:        'Under Time — The Ledger',
    symbol:      '⏱',
    category:    'Vault 03 — The Ledger',
    description: 'Completed The Ledger within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's03_ach13',
    name:        'Case Notes Read — The Ledger',
    symbol:      '📝',
    category:    'Vault 03 — The Ledger',
    description: 'Reviewed every incident report in The Ledger.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's03_ach14',
    name:        'Full Playlist — The Ledger',
    symbol:      '🎵',
    category:    'Vault 03 — The Ledger',
    description: 'Listened to every recovered recording in The Ledger.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's03_ach15',
    name:        'Vault Unsealed — The Ledger',
    symbol:      '🔓',
    category:    'Vault 03 — The Ledger',
    description: 'Unlocked the The Ledger vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's03_ach16',
    name:        'Perfect Record — The Ledger',
    symbol:      '🏆',
    category:    'Vault 03 — The Ledger',
    description: 'Earned every achievement in The Ledger.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 04 — The Signal --
  {
    id:          's04_ach01',
    name:        'First File — The Signal',
    symbol:      '📁',
    category:    'Vault 04 — The Signal',
    description: 'Opened the first case of The Signal.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's04_ach02',
    name:        'Three Files — The Signal',
    symbol:      '📂',
    category:    'Vault 04 — The Signal',
    description: 'Solved 3 cases in The Signal.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's04_ach03',
    name:        'Six Files — The Signal',
    symbol:      '📚',
    category:    'Vault 04 — The Signal',
    description: 'Solved 6 cases in The Signal.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's04_ach04',
    name:        'Nine Files — The Signal',
    symbol:      '🗄',
    category:    'Vault 04 — The Signal',
    description: 'Solved 9 cases in The Signal.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's04_ach05',
    name:        'Season Closed — The Signal',
    symbol:      '✅',
    category:    'Vault 04 — The Signal',
    description: 'Solved every case in The Signal.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's04_ach06',
    name:        'Evidence 25% — The Signal',
    symbol:      '🧪',
    category:    'Vault 04 — The Signal',
    description: 'Recovered a quarter of the evidence in The Signal.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's04_ach07',
    name:        'Evidence 50% — The Signal',
    symbol:      '🧪',
    category:    'Vault 04 — The Signal',
    description: 'Recovered half the evidence in The Signal.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's04_ach08',
    name:        'Evidence 75% — The Signal',
    symbol:      '🧪',
    category:    'Vault 04 — The Signal',
    description: 'Recovered most of the evidence in The Signal.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's04_ach09',
    name:        'Evidence 100% — The Signal',
    symbol:      '🧪',
    category:    'Vault 04 — The Signal',
    description: 'Recovered every piece of evidence in The Signal.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's04_ach10',
    name:        'First Try — The Signal',
    symbol:      '🎯',
    category:    'Vault 04 — The Signal',
    description: 'Solved every case in The Signal on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's04_ach11',
    name:        'No Hints — The Signal',
    symbol:      '🧠',
    category:    'Vault 04 — The Signal',
    description: 'Completed The Signal without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's04_ach12',
    name:        'Under Time — The Signal',
    symbol:      '⏱',
    category:    'Vault 04 — The Signal',
    description: 'Completed The Signal within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's04_ach13',
    name:        'Case Notes Read — The Signal',
    symbol:      '📝',
    category:    'Vault 04 — The Signal',
    description: 'Reviewed every incident report in The Signal.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's04_ach14',
    name:        'Full Playlist — The Signal',
    symbol:      '🎵',
    category:    'Vault 04 — The Signal',
    description: 'Listened to every recovered recording in The Signal.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's04_ach15',
    name:        'Vault Unsealed — The Signal',
    symbol:      '🔓',
    category:    'Vault 04 — The Signal',
    description: 'Unlocked the The Signal vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's04_ach16',
    name:        'Perfect Record — The Signal',
    symbol:      '🏆',
    category:    'Vault 04 — The Signal',
    description: 'Earned every achievement in The Signal.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 05 — The Widow --
  {
    id:          's05_ach01',
    name:        'First File — The Widow',
    symbol:      '📁',
    category:    'Vault 05 — The Widow',
    description: 'Opened the first case of The Widow.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's05_ach02',
    name:        'Three Files — The Widow',
    symbol:      '📂',
    category:    'Vault 05 — The Widow',
    description: 'Solved 3 cases in The Widow.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's05_ach03',
    name:        'Six Files — The Widow',
    symbol:      '📚',
    category:    'Vault 05 — The Widow',
    description: 'Solved 6 cases in The Widow.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's05_ach04',
    name:        'Nine Files — The Widow',
    symbol:      '🗄',
    category:    'Vault 05 — The Widow',
    description: 'Solved 9 cases in The Widow.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's05_ach05',
    name:        'Season Closed — The Widow',
    symbol:      '✅',
    category:    'Vault 05 — The Widow',
    description: 'Solved every case in The Widow.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's05_ach06',
    name:        'Evidence 25% — The Widow',
    symbol:      '🧪',
    category:    'Vault 05 — The Widow',
    description: 'Recovered a quarter of the evidence in The Widow.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's05_ach07',
    name:        'Evidence 50% — The Widow',
    symbol:      '🧪',
    category:    'Vault 05 — The Widow',
    description: 'Recovered half the evidence in The Widow.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's05_ach08',
    name:        'Evidence 75% — The Widow',
    symbol:      '🧪',
    category:    'Vault 05 — The Widow',
    description: 'Recovered most of the evidence in The Widow.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's05_ach09',
    name:        'Evidence 100% — The Widow',
    symbol:      '🧪',
    category:    'Vault 05 — The Widow',
    description: 'Recovered every piece of evidence in The Widow.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's05_ach10',
    name:        'First Try — The Widow',
    symbol:      '🎯',
    category:    'Vault 05 — The Widow',
    description: 'Solved every case in The Widow on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's05_ach11',
    name:        'No Hints — The Widow',
    symbol:      '🧠',
    category:    'Vault 05 — The Widow',
    description: 'Completed The Widow without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's05_ach12',
    name:        'Under Time — The Widow',
    symbol:      '⏱',
    category:    'Vault 05 — The Widow',
    description: 'Completed The Widow within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's05_ach13',
    name:        'Case Notes Read — The Widow',
    symbol:      '📝',
    category:    'Vault 05 — The Widow',
    description: 'Reviewed every incident report in The Widow.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's05_ach14',
    name:        'Full Playlist — The Widow',
    symbol:      '🎵',
    category:    'Vault 05 — The Widow',
    description: 'Listened to every recovered recording in The Widow.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's05_ach15',
    name:        'Vault Unsealed — The Widow',
    symbol:      '🔓',
    category:    'Vault 05 — The Widow',
    description: 'Unlocked the The Widow vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's05_ach16',
    name:        'Perfect Record — The Widow',
    symbol:      '🏆',
    category:    'Vault 05 — The Widow',
    description: 'Earned every achievement in The Widow.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 06 — The Orchard --
  {
    id:          's06_ach01',
    name:        'First File — The Orchard',
    symbol:      '📁',
    category:    'Vault 06 — The Orchard',
    description: 'Opened the first case of The Orchard.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's06_ach02',
    name:        'Three Files — The Orchard',
    symbol:      '📂',
    category:    'Vault 06 — The Orchard',
    description: 'Solved 3 cases in The Orchard.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's06_ach03',
    name:        'Six Files — The Orchard',
    symbol:      '📚',
    category:    'Vault 06 — The Orchard',
    description: 'Solved 6 cases in The Orchard.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's06_ach04',
    name:        'Nine Files — The Orchard',
    symbol:      '🗄',
    category:    'Vault 06 — The Orchard',
    description: 'Solved 9 cases in The Orchard.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's06_ach05',
    name:        'Season Closed — The Orchard',
    symbol:      '✅',
    category:    'Vault 06 — The Orchard',
    description: 'Solved every case in The Orchard.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's06_ach06',
    name:        'Evidence 25% — The Orchard',
    symbol:      '🧪',
    category:    'Vault 06 — The Orchard',
    description: 'Recovered a quarter of the evidence in The Orchard.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's06_ach07',
    name:        'Evidence 50% — The Orchard',
    symbol:      '🧪',
    category:    'Vault 06 — The Orchard',
    description: 'Recovered half the evidence in The Orchard.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's06_ach08',
    name:        'Evidence 75% — The Orchard',
    symbol:      '🧪',
    category:    'Vault 06 — The Orchard',
    description: 'Recovered most of the evidence in The Orchard.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's06_ach09',
    name:        'Evidence 100% — The Orchard',
    symbol:      '🧪',
    category:    'Vault 06 — The Orchard',
    description: 'Recovered every piece of evidence in The Orchard.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's06_ach10',
    name:        'First Try — The Orchard',
    symbol:      '🎯',
    category:    'Vault 06 — The Orchard',
    description: 'Solved every case in The Orchard on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's06_ach11',
    name:        'No Hints — The Orchard',
    symbol:      '🧠',
    category:    'Vault 06 — The Orchard',
    description: 'Completed The Orchard without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's06_ach12',
    name:        'Under Time — The Orchard',
    symbol:      '⏱',
    category:    'Vault 06 — The Orchard',
    description: 'Completed The Orchard within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's06_ach13',
    name:        'Case Notes Read — The Orchard',
    symbol:      '📝',
    category:    'Vault 06 — The Orchard',
    description: 'Reviewed every incident report in The Orchard.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's06_ach14',
    name:        'Full Playlist — The Orchard',
    symbol:      '🎵',
    category:    'Vault 06 — The Orchard',
    description: 'Listened to every recovered recording in The Orchard.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's06_ach15',
    name:        'Vault Unsealed — The Orchard',
    symbol:      '🔓',
    category:    'Vault 06 — The Orchard',
    description: 'Unlocked the The Orchard vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's06_ach16',
    name:        'Perfect Record — The Orchard',
    symbol:      '🏆',
    category:    'Vault 06 — The Orchard',
    description: 'Earned every achievement in The Orchard.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 07 — The Bell --
  {
    id:          's07_ach01',
    name:        'First File — The Bell',
    symbol:      '📁',
    category:    'Vault 07 — The Bell',
    description: 'Opened the first case of The Bell.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's07_ach02',
    name:        'Three Files — The Bell',
    symbol:      '📂',
    category:    'Vault 07 — The Bell',
    description: 'Solved 3 cases in The Bell.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's07_ach03',
    name:        'Six Files — The Bell',
    symbol:      '📚',
    category:    'Vault 07 — The Bell',
    description: 'Solved 6 cases in The Bell.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's07_ach04',
    name:        'Nine Files — The Bell',
    symbol:      '🗄',
    category:    'Vault 07 — The Bell',
    description: 'Solved 9 cases in The Bell.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's07_ach05',
    name:        'Season Closed — The Bell',
    symbol:      '✅',
    category:    'Vault 07 — The Bell',
    description: 'Solved every case in The Bell.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's07_ach06',
    name:        'Evidence 25% — The Bell',
    symbol:      '🧪',
    category:    'Vault 07 — The Bell',
    description: 'Recovered a quarter of the evidence in The Bell.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's07_ach07',
    name:        'Evidence 50% — The Bell',
    symbol:      '🧪',
    category:    'Vault 07 — The Bell',
    description: 'Recovered half the evidence in The Bell.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's07_ach08',
    name:        'Evidence 75% — The Bell',
    symbol:      '🧪',
    category:    'Vault 07 — The Bell',
    description: 'Recovered most of the evidence in The Bell.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's07_ach09',
    name:        'Evidence 100% — The Bell',
    symbol:      '🧪',
    category:    'Vault 07 — The Bell',
    description: 'Recovered every piece of evidence in The Bell.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's07_ach10',
    name:        'First Try — The Bell',
    symbol:      '🎯',
    category:    'Vault 07 — The Bell',
    description: 'Solved every case in The Bell on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's07_ach11',
    name:        'No Hints — The Bell',
    symbol:      '🧠',
    category:    'Vault 07 — The Bell',
    description: 'Completed The Bell without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's07_ach12',
    name:        'Under Time — The Bell',
    symbol:      '⏱',
    category:    'Vault 07 — The Bell',
    description: 'Completed The Bell within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's07_ach13',
    name:        'Case Notes Read — The Bell',
    symbol:      '📝',
    category:    'Vault 07 — The Bell',
    description: 'Reviewed every incident report in The Bell.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's07_ach14',
    name:        'Full Playlist — The Bell',
    symbol:      '🎵',
    category:    'Vault 07 — The Bell',
    description: 'Listened to every recovered recording in The Bell.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's07_ach15',
    name:        'Vault Unsealed — The Bell',
    symbol:      '🔓',
    category:    'Vault 07 — The Bell',
    description: 'Unlocked the The Bell vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's07_ach16',
    name:        'Perfect Record — The Bell',
    symbol:      '🏆',
    category:    'Vault 07 — The Bell',
    description: 'Earned every achievement in The Bell.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 08 — The Crossing --
  {
    id:          's08_ach01',
    name:        'First File — The Crossing',
    symbol:      '📁',
    category:    'Vault 08 — The Crossing',
    description: 'Opened the first case of The Crossing.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's08_ach02',
    name:        'Three Files — The Crossing',
    symbol:      '📂',
    category:    'Vault 08 — The Crossing',
    description: 'Solved 3 cases in The Crossing.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's08_ach03',
    name:        'Six Files — The Crossing',
    symbol:      '📚',
    category:    'Vault 08 — The Crossing',
    description: 'Solved 6 cases in The Crossing.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's08_ach04',
    name:        'Nine Files — The Crossing',
    symbol:      '🗄',
    category:    'Vault 08 — The Crossing',
    description: 'Solved 9 cases in The Crossing.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's08_ach05',
    name:        'Season Closed — The Crossing',
    symbol:      '✅',
    category:    'Vault 08 — The Crossing',
    description: 'Solved every case in The Crossing.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's08_ach06',
    name:        'Evidence 25% — The Crossing',
    symbol:      '🧪',
    category:    'Vault 08 — The Crossing',
    description: 'Recovered a quarter of the evidence in The Crossing.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's08_ach07',
    name:        'Evidence 50% — The Crossing',
    symbol:      '🧪',
    category:    'Vault 08 — The Crossing',
    description: 'Recovered half the evidence in The Crossing.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's08_ach08',
    name:        'Evidence 75% — The Crossing',
    symbol:      '🧪',
    category:    'Vault 08 — The Crossing',
    description: 'Recovered most of the evidence in The Crossing.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's08_ach09',
    name:        'Evidence 100% — The Crossing',
    symbol:      '🧪',
    category:    'Vault 08 — The Crossing',
    description: 'Recovered every piece of evidence in The Crossing.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's08_ach10',
    name:        'First Try — The Crossing',
    symbol:      '🎯',
    category:    'Vault 08 — The Crossing',
    description: 'Solved every case in The Crossing on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's08_ach11',
    name:        'No Hints — The Crossing',
    symbol:      '🧠',
    category:    'Vault 08 — The Crossing',
    description: 'Completed The Crossing without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's08_ach12',
    name:        'Under Time — The Crossing',
    symbol:      '⏱',
    category:    'Vault 08 — The Crossing',
    description: 'Completed The Crossing within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's08_ach13',
    name:        'Case Notes Read — The Crossing',
    symbol:      '📝',
    category:    'Vault 08 — The Crossing',
    description: 'Reviewed every incident report in The Crossing.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's08_ach14',
    name:        'Full Playlist — The Crossing',
    symbol:      '🎵',
    category:    'Vault 08 — The Crossing',
    description: 'Listened to every recovered recording in The Crossing.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's08_ach15',
    name:        'Vault Unsealed — The Crossing',
    symbol:      '🔓',
    category:    'Vault 08 — The Crossing',
    description: 'Unlocked the The Crossing vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's08_ach16',
    name:        'Perfect Record — The Crossing',
    symbol:      '🏆',
    category:    'Vault 08 — The Crossing',
    description: 'Earned every achievement in The Crossing.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 09 — The Furnace --
  {
    id:          's09_ach01',
    name:        'First File — The Furnace',
    symbol:      '📁',
    category:    'Vault 09 — The Furnace',
    description: 'Opened the first case of The Furnace.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's09_ach02',
    name:        'Three Files — The Furnace',
    symbol:      '📂',
    category:    'Vault 09 — The Furnace',
    description: 'Solved 3 cases in The Furnace.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's09_ach03',
    name:        'Six Files — The Furnace',
    symbol:      '📚',
    category:    'Vault 09 — The Furnace',
    description: 'Solved 6 cases in The Furnace.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's09_ach04',
    name:        'Nine Files — The Furnace',
    symbol:      '🗄',
    category:    'Vault 09 — The Furnace',
    description: 'Solved 9 cases in The Furnace.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's09_ach05',
    name:        'Season Closed — The Furnace',
    symbol:      '✅',
    category:    'Vault 09 — The Furnace',
    description: 'Solved every case in The Furnace.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's09_ach06',
    name:        'Evidence 25% — The Furnace',
    symbol:      '🧪',
    category:    'Vault 09 — The Furnace',
    description: 'Recovered a quarter of the evidence in The Furnace.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's09_ach07',
    name:        'Evidence 50% — The Furnace',
    symbol:      '🧪',
    category:    'Vault 09 — The Furnace',
    description: 'Recovered half the evidence in The Furnace.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's09_ach08',
    name:        'Evidence 75% — The Furnace',
    symbol:      '🧪',
    category:    'Vault 09 — The Furnace',
    description: 'Recovered most of the evidence in The Furnace.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's09_ach09',
    name:        'Evidence 100% — The Furnace',
    symbol:      '🧪',
    category:    'Vault 09 — The Furnace',
    description: 'Recovered every piece of evidence in The Furnace.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's09_ach10',
    name:        'First Try — The Furnace',
    symbol:      '🎯',
    category:    'Vault 09 — The Furnace',
    description: 'Solved every case in The Furnace on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's09_ach11',
    name:        'No Hints — The Furnace',
    symbol:      '🧠',
    category:    'Vault 09 — The Furnace',
    description: 'Completed The Furnace without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's09_ach12',
    name:        'Under Time — The Furnace',
    symbol:      '⏱',
    category:    'Vault 09 — The Furnace',
    description: 'Completed The Furnace within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's09_ach13',
    name:        'Case Notes Read — The Furnace',
    symbol:      '📝',
    category:    'Vault 09 — The Furnace',
    description: 'Reviewed every incident report in The Furnace.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's09_ach14',
    name:        'Full Playlist — The Furnace',
    symbol:      '🎵',
    category:    'Vault 09 — The Furnace',
    description: 'Listened to every recovered recording in The Furnace.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's09_ach15',
    name:        'Vault Unsealed — The Furnace',
    symbol:      '🔓',
    category:    'Vault 09 — The Furnace',
    description: 'Unlocked the The Furnace vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's09_ach16',
    name:        'Perfect Record — The Furnace',
    symbol:      '🏆',
    category:    'Vault 09 — The Furnace',
    description: 'Earned every achievement in The Furnace.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 10 — The Choir --
  {
    id:          's10_ach01',
    name:        'First File — The Choir',
    symbol:      '📁',
    category:    'Vault 10 — The Choir',
    description: 'Opened the first case of The Choir.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's10_ach02',
    name:        'Three Files — The Choir',
    symbol:      '📂',
    category:    'Vault 10 — The Choir',
    description: 'Solved 3 cases in The Choir.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's10_ach03',
    name:        'Six Files — The Choir',
    symbol:      '📚',
    category:    'Vault 10 — The Choir',
    description: 'Solved 6 cases in The Choir.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's10_ach04',
    name:        'Nine Files — The Choir',
    symbol:      '🗄',
    category:    'Vault 10 — The Choir',
    description: 'Solved 9 cases in The Choir.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's10_ach05',
    name:        'Season Closed — The Choir',
    symbol:      '✅',
    category:    'Vault 10 — The Choir',
    description: 'Solved every case in The Choir.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's10_ach06',
    name:        'Evidence 25% — The Choir',
    symbol:      '🧪',
    category:    'Vault 10 — The Choir',
    description: 'Recovered a quarter of the evidence in The Choir.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's10_ach07',
    name:        'Evidence 50% — The Choir',
    symbol:      '🧪',
    category:    'Vault 10 — The Choir',
    description: 'Recovered half the evidence in The Choir.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's10_ach08',
    name:        'Evidence 75% — The Choir',
    symbol:      '🧪',
    category:    'Vault 10 — The Choir',
    description: 'Recovered most of the evidence in The Choir.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's10_ach09',
    name:        'Evidence 100% — The Choir',
    symbol:      '🧪',
    category:    'Vault 10 — The Choir',
    description: 'Recovered every piece of evidence in The Choir.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's10_ach10',
    name:        'First Try — The Choir',
    symbol:      '🎯',
    category:    'Vault 10 — The Choir',
    description: 'Solved every case in The Choir on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's10_ach11',
    name:        'No Hints — The Choir',
    symbol:      '🧠',
    category:    'Vault 10 — The Choir',
    description: 'Completed The Choir without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's10_ach12',
    name:        'Under Time — The Choir',
    symbol:      '⏱',
    category:    'Vault 10 — The Choir',
    description: 'Completed The Choir within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's10_ach13',
    name:        'Case Notes Read — The Choir',
    symbol:      '📝',
    category:    'Vault 10 — The Choir',
    description: 'Reviewed every incident report in The Choir.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's10_ach14',
    name:        'Full Playlist — The Choir',
    symbol:      '🎵',
    category:    'Vault 10 — The Choir',
    description: 'Listened to every recovered recording in The Choir.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's10_ach15',
    name:        'Vault Unsealed — The Choir',
    symbol:      '🔓',
    category:    'Vault 10 — The Choir',
    description: 'Unlocked the The Choir vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's10_ach16',
    name:        'Perfect Record — The Choir',
    symbol:      '🏆',
    category:    'Vault 10 — The Choir',
    description: 'Earned every achievement in The Choir.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 11 — The Mirror --
  {
    id:          's11_ach01',
    name:        'First File — The Mirror',
    symbol:      '📁',
    category:    'Vault 11 — The Mirror',
    description: 'Opened the first case of The Mirror.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's11_ach02',
    name:        'Three Files — The Mirror',
    symbol:      '📂',
    category:    'Vault 11 — The Mirror',
    description: 'Solved 3 cases in The Mirror.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's11_ach03',
    name:        'Six Files — The Mirror',
    symbol:      '📚',
    category:    'Vault 11 — The Mirror',
    description: 'Solved 6 cases in The Mirror.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's11_ach04',
    name:        'Nine Files — The Mirror',
    symbol:      '🗄',
    category:    'Vault 11 — The Mirror',
    description: 'Solved 9 cases in The Mirror.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's11_ach05',
    name:        'Season Closed — The Mirror',
    symbol:      '✅',
    category:    'Vault 11 — The Mirror',
    description: 'Solved every case in The Mirror.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's11_ach06',
    name:        'Evidence 25% — The Mirror',
    symbol:      '🧪',
    category:    'Vault 11 — The Mirror',
    description: 'Recovered a quarter of the evidence in The Mirror.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's11_ach07',
    name:        'Evidence 50% — The Mirror',
    symbol:      '🧪',
    category:    'Vault 11 — The Mirror',
    description: 'Recovered half the evidence in The Mirror.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's11_ach08',
    name:        'Evidence 75% — The Mirror',
    symbol:      '🧪',
    category:    'Vault 11 — The Mirror',
    description: 'Recovered most of the evidence in The Mirror.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's11_ach09',
    name:        'Evidence 100% — The Mirror',
    symbol:      '🧪',
    category:    'Vault 11 — The Mirror',
    description: 'Recovered every piece of evidence in The Mirror.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's11_ach10',
    name:        'First Try — The Mirror',
    symbol:      '🎯',
    category:    'Vault 11 — The Mirror',
    description: 'Solved every case in The Mirror on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's11_ach11',
    name:        'No Hints — The Mirror',
    symbol:      '🧠',
    category:    'Vault 11 — The Mirror',
    description: 'Completed The Mirror without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's11_ach12',
    name:        'Under Time — The Mirror',
    symbol:      '⏱',
    category:    'Vault 11 — The Mirror',
    description: 'Completed The Mirror within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's11_ach13',
    name:        'Case Notes Read — The Mirror',
    symbol:      '📝',
    category:    'Vault 11 — The Mirror',
    description: 'Reviewed every incident report in The Mirror.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's11_ach14',
    name:        'Full Playlist — The Mirror',
    symbol:      '🎵',
    category:    'Vault 11 — The Mirror',
    description: 'Listened to every recovered recording in The Mirror.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's11_ach15',
    name:        'Vault Unsealed — The Mirror',
    symbol:      '🔓',
    category:    'Vault 11 — The Mirror',
    description: 'Unlocked the The Mirror vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's11_ach16',
    name:        'Perfect Record — The Mirror',
    symbol:      '🏆',
    category:    'Vault 11 — The Mirror',
    description: 'Earned every achievement in The Mirror.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 12 — Ashton Vale --
  {
    id:          's12_ach01',
    name:        'First File — Ashton Vale',
    symbol:      '📁',
    category:    'Vault 12 — Ashton Vale',
    description: 'Opened the first case of Ashton Vale.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's12_ach02',
    name:        'Three Files — Ashton Vale',
    symbol:      '📂',
    category:    'Vault 12 — Ashton Vale',
    description: 'Solved 3 cases in Ashton Vale.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's12_ach03',
    name:        'Six Files — Ashton Vale',
    symbol:      '📚',
    category:    'Vault 12 — Ashton Vale',
    description: 'Solved 6 cases in Ashton Vale.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's12_ach04',
    name:        'Nine Files — Ashton Vale',
    symbol:      '🗄',
    category:    'Vault 12 — Ashton Vale',
    description: 'Solved 9 cases in Ashton Vale.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's12_ach05',
    name:        'Season Closed — Ashton Vale',
    symbol:      '✅',
    category:    'Vault 12 — Ashton Vale',
    description: 'Solved every case in Ashton Vale.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's12_ach06',
    name:        'Evidence 25% — Ashton Vale',
    symbol:      '🧪',
    category:    'Vault 12 — Ashton Vale',
    description: 'Recovered a quarter of the evidence in Ashton Vale.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's12_ach07',
    name:        'Evidence 50% — Ashton Vale',
    symbol:      '🧪',
    category:    'Vault 12 — Ashton Vale',
    description: 'Recovered half the evidence in Ashton Vale.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's12_ach08',
    name:        'Evidence 75% — Ashton Vale',
    symbol:      '🧪',
    category:    'Vault 12 — Ashton Vale',
    description: 'Recovered most of the evidence in Ashton Vale.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's12_ach09',
    name:        'Evidence 100% — Ashton Vale',
    symbol:      '🧪',
    category:    'Vault 12 — Ashton Vale',
    description: 'Recovered every piece of evidence in Ashton Vale.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's12_ach10',
    name:        'First Try — Ashton Vale',
    symbol:      '🎯',
    category:    'Vault 12 — Ashton Vale',
    description: 'Solved every case in Ashton Vale on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's12_ach11',
    name:        'No Hints — Ashton Vale',
    symbol:      '🧠',
    category:    'Vault 12 — Ashton Vale',
    description: 'Completed Ashton Vale without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's12_ach12',
    name:        'Under Time — Ashton Vale',
    symbol:      '⏱',
    category:    'Vault 12 — Ashton Vale',
    description: 'Completed Ashton Vale within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's12_ach13',
    name:        'Case Notes Read — Ashton Vale',
    symbol:      '📝',
    category:    'Vault 12 — Ashton Vale',
    description: 'Reviewed every incident report in Ashton Vale.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's12_ach14',
    name:        'Full Playlist — Ashton Vale',
    symbol:      '🎵',
    category:    'Vault 12 — Ashton Vale',
    description: 'Listened to every recovered recording in Ashton Vale.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's12_ach15',
    name:        'Vault Unsealed — Ashton Vale',
    symbol:      '🔓',
    category:    'Vault 12 — Ashton Vale',
    description: 'Unlocked the Ashton Vale vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's12_ach16',
    name:        'Perfect Record — Ashton Vale',
    symbol:      '🏆',
    category:    'Vault 12 — Ashton Vale',
    description: 'Earned every achievement in Ashton Vale.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },];

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
