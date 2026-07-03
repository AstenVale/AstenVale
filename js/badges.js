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

  // -- Vault 02 — The Before --
  {
    id:          's02_ach01',
    name:        'First File — The Before',
    symbol:      '📁',
    category:    'Vault 02 — The Before',
    description: 'Opened the first case of The Before.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's02_ach02',
    name:        'Three Files — The Before',
    symbol:      '📂',
    category:    'Vault 02 — The Before',
    description: 'Solved 3 cases in The Before.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's02_ach03',
    name:        'Six Files — The Before',
    symbol:      '📚',
    category:    'Vault 02 — The Before',
    description: 'Solved 6 cases in The Before.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's02_ach04',
    name:        'Nine Files — The Before',
    symbol:      '🗄',
    category:    'Vault 02 — The Before',
    description: 'Solved 9 cases in The Before.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's02_ach05',
    name:        'Season Closed — The Before',
    symbol:      '✅',
    category:    'Vault 02 — The Before',
    description: 'Solved every case in The Before.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's02_ach06',
    name:        'Evidence 25% — The Before',
    symbol:      '🧪',
    category:    'Vault 02 — The Before',
    description: 'Recovered a quarter of the evidence in The Before.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's02_ach07',
    name:        'Evidence 50% — The Before',
    symbol:      '🧪',
    category:    'Vault 02 — The Before',
    description: 'Recovered half the evidence in The Before.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's02_ach08',
    name:        'Evidence 75% — The Before',
    symbol:      '🧪',
    category:    'Vault 02 — The Before',
    description: 'Recovered most of the evidence in The Before.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's02_ach09',
    name:        'Evidence 100% — The Before',
    symbol:      '🧪',
    category:    'Vault 02 — The Before',
    description: 'Recovered every piece of evidence in The Before.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's02_ach10',
    name:        'First Try — The Before',
    symbol:      '🎯',
    category:    'Vault 02 — The Before',
    description: 'Solved every case in The Before on the first attempt.',
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
    name:        'No Hints — The Before',
    symbol:      '🧠',
    category:    'Vault 02 — The Before',
    description: 'Completed The Before without ever revealing a hint.',
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
    name:        'Under Time — The Before',
    symbol:      '⏱',
    category:    'Vault 02 — The Before',
    description: 'Completed The Before within a week of the first solve.',
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
    name:        'Case Notes Read — The Before',
    symbol:      '📝',
    category:    'Vault 02 — The Before',
    description: 'Reviewed every incident report in The Before.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's02_ach14',
    name:        'Full Playlist — The Before',
    symbol:      '🎵',
    category:    'Vault 02 — The Before',
    description: 'Listened to every recovered recording in The Before.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's02_ach15',
    name:        'Vault Unsealed — The Before',
    symbol:      '🔓',
    category:    'Vault 02 — The Before',
    description: 'Unlocked the The Before vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['013','014','015','016','017','018','019','020','021','022','023','024'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's02_ach16',
    name:        'Perfect Record — The Before',
    symbol:      '🏆',
    category:    'Vault 02 — The Before',
    description: 'Earned every achievement in The Before.',
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

  // -- Vault 03 — The Disappearance --
  {
    id:          's03_ach01',
    name:        'First File — The Disappearance',
    symbol:      '📁',
    category:    'Vault 03 — The Disappearance',
    description: 'Opened the first case of The Disappearance.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's03_ach02',
    name:        'Three Files — The Disappearance',
    symbol:      '📂',
    category:    'Vault 03 — The Disappearance',
    description: 'Solved 3 cases in The Disappearance.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's03_ach03',
    name:        'Six Files — The Disappearance',
    symbol:      '📚',
    category:    'Vault 03 — The Disappearance',
    description: 'Solved 6 cases in The Disappearance.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's03_ach04',
    name:        'Nine Files — The Disappearance',
    symbol:      '🗄',
    category:    'Vault 03 — The Disappearance',
    description: 'Solved 9 cases in The Disappearance.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's03_ach05',
    name:        'Season Closed — The Disappearance',
    symbol:      '✅',
    category:    'Vault 03 — The Disappearance',
    description: 'Solved every case in The Disappearance.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's03_ach06',
    name:        'Evidence 25% — The Disappearance',
    symbol:      '🧪',
    category:    'Vault 03 — The Disappearance',
    description: 'Recovered a quarter of the evidence in The Disappearance.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's03_ach07',
    name:        'Evidence 50% — The Disappearance',
    symbol:      '🧪',
    category:    'Vault 03 — The Disappearance',
    description: 'Recovered half the evidence in The Disappearance.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's03_ach08',
    name:        'Evidence 75% — The Disappearance',
    symbol:      '🧪',
    category:    'Vault 03 — The Disappearance',
    description: 'Recovered most of the evidence in The Disappearance.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's03_ach09',
    name:        'Evidence 100% — The Disappearance',
    symbol:      '🧪',
    category:    'Vault 03 — The Disappearance',
    description: 'Recovered every piece of evidence in The Disappearance.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's03_ach10',
    name:        'First Try — The Disappearance',
    symbol:      '🎯',
    category:    'Vault 03 — The Disappearance',
    description: 'Solved every case in The Disappearance on the first attempt.',
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
    name:        'No Hints — The Disappearance',
    symbol:      '🧠',
    category:    'Vault 03 — The Disappearance',
    description: 'Completed The Disappearance without ever revealing a hint.',
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
    name:        'Under Time — The Disappearance',
    symbol:      '⏱',
    category:    'Vault 03 — The Disappearance',
    description: 'Completed The Disappearance within a week of the first solve.',
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
    name:        'Case Notes Read — The Disappearance',
    symbol:      '📝',
    category:    'Vault 03 — The Disappearance',
    description: 'Reviewed every incident report in The Disappearance.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's03_ach14',
    name:        'Full Playlist — The Disappearance',
    symbol:      '🎵',
    category:    'Vault 03 — The Disappearance',
    description: 'Listened to every recovered recording in The Disappearance.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's03_ach15',
    name:        'Vault Unsealed — The Disappearance',
    symbol:      '🔓',
    category:    'Vault 03 — The Disappearance',
    description: 'Unlocked the The Disappearance vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['025','026','027','028','029','030','031','032','033','034','035','036'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's03_ach16',
    name:        'Perfect Record — The Disappearance',
    symbol:      '🏆',
    category:    'Vault 03 — The Disappearance',
    description: 'Earned every achievement in The Disappearance.',
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

  // -- Vault 04 — The River Speaks --
  {
    id:          's04_ach01',
    name:        'First File — The River Speaks',
    symbol:      '📁',
    category:    'Vault 04 — The River Speaks',
    description: 'Opened the first case of The River Speaks.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's04_ach02',
    name:        'Three Files — The River Speaks',
    symbol:      '📂',
    category:    'Vault 04 — The River Speaks',
    description: 'Solved 3 cases in The River Speaks.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's04_ach03',
    name:        'Six Files — The River Speaks',
    symbol:      '📚',
    category:    'Vault 04 — The River Speaks',
    description: 'Solved 6 cases in The River Speaks.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's04_ach04',
    name:        'Nine Files — The River Speaks',
    symbol:      '🗄',
    category:    'Vault 04 — The River Speaks',
    description: 'Solved 9 cases in The River Speaks.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's04_ach05',
    name:        'Season Closed — The River Speaks',
    symbol:      '✅',
    category:    'Vault 04 — The River Speaks',
    description: 'Solved every case in The River Speaks.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's04_ach06',
    name:        'Evidence 25% — The River Speaks',
    symbol:      '🧪',
    category:    'Vault 04 — The River Speaks',
    description: 'Recovered a quarter of the evidence in The River Speaks.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's04_ach07',
    name:        'Evidence 50% — The River Speaks',
    symbol:      '🧪',
    category:    'Vault 04 — The River Speaks',
    description: 'Recovered half the evidence in The River Speaks.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's04_ach08',
    name:        'Evidence 75% — The River Speaks',
    symbol:      '🧪',
    category:    'Vault 04 — The River Speaks',
    description: 'Recovered most of the evidence in The River Speaks.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's04_ach09',
    name:        'Evidence 100% — The River Speaks',
    symbol:      '🧪',
    category:    'Vault 04 — The River Speaks',
    description: 'Recovered every piece of evidence in The River Speaks.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's04_ach10',
    name:        'First Try — The River Speaks',
    symbol:      '🎯',
    category:    'Vault 04 — The River Speaks',
    description: 'Solved every case in The River Speaks on the first attempt.',
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
    name:        'No Hints — The River Speaks',
    symbol:      '🧠',
    category:    'Vault 04 — The River Speaks',
    description: 'Completed The River Speaks without ever revealing a hint.',
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
    name:        'Under Time — The River Speaks',
    symbol:      '⏱',
    category:    'Vault 04 — The River Speaks',
    description: 'Completed The River Speaks within a week of the first solve.',
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
    name:        'Case Notes Read — The River Speaks',
    symbol:      '📝',
    category:    'Vault 04 — The River Speaks',
    description: 'Reviewed every incident report in The River Speaks.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's04_ach14',
    name:        'Full Playlist — The River Speaks',
    symbol:      '🎵',
    category:    'Vault 04 — The River Speaks',
    description: 'Listened to every recovered recording in The River Speaks.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's04_ach15',
    name:        'Vault Unsealed — The River Speaks',
    symbol:      '🔓',
    category:    'Vault 04 — The River Speaks',
    description: 'Unlocked the The River Speaks vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['037','038','039','040','041','042','043','044','045','046','047','048'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's04_ach16',
    name:        'Perfect Record — The River Speaks',
    symbol:      '🏆',
    category:    'Vault 04 — The River Speaks',
    description: 'Earned every achievement in The River Speaks.',
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

  // -- Vault 05 — The Last Winter --
  {
    id:          's05_ach01',
    name:        'First File — The Last Winter',
    symbol:      '📁',
    category:    'Vault 05 — The Last Winter',
    description: 'Opened the first case of The Last Winter.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's05_ach02',
    name:        'Three Files — The Last Winter',
    symbol:      '📂',
    category:    'Vault 05 — The Last Winter',
    description: 'Solved 3 cases in The Last Winter.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's05_ach03',
    name:        'Six Files — The Last Winter',
    symbol:      '📚',
    category:    'Vault 05 — The Last Winter',
    description: 'Solved 6 cases in The Last Winter.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's05_ach04',
    name:        'Nine Files — The Last Winter',
    symbol:      '🗄',
    category:    'Vault 05 — The Last Winter',
    description: 'Solved 9 cases in The Last Winter.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's05_ach05',
    name:        'Season Closed — The Last Winter',
    symbol:      '✅',
    category:    'Vault 05 — The Last Winter',
    description: 'Solved every case in The Last Winter.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's05_ach06',
    name:        'Evidence 25% — The Last Winter',
    symbol:      '🧪',
    category:    'Vault 05 — The Last Winter',
    description: 'Recovered a quarter of the evidence in The Last Winter.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's05_ach07',
    name:        'Evidence 50% — The Last Winter',
    symbol:      '🧪',
    category:    'Vault 05 — The Last Winter',
    description: 'Recovered half the evidence in The Last Winter.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's05_ach08',
    name:        'Evidence 75% — The Last Winter',
    symbol:      '🧪',
    category:    'Vault 05 — The Last Winter',
    description: 'Recovered most of the evidence in The Last Winter.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's05_ach09',
    name:        'Evidence 100% — The Last Winter',
    symbol:      '🧪',
    category:    'Vault 05 — The Last Winter',
    description: 'Recovered every piece of evidence in The Last Winter.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's05_ach10',
    name:        'First Try — The Last Winter',
    symbol:      '🎯',
    category:    'Vault 05 — The Last Winter',
    description: 'Solved every case in The Last Winter on the first attempt.',
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
    name:        'No Hints — The Last Winter',
    symbol:      '🧠',
    category:    'Vault 05 — The Last Winter',
    description: 'Completed The Last Winter without ever revealing a hint.',
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
    name:        'Under Time — The Last Winter',
    symbol:      '⏱',
    category:    'Vault 05 — The Last Winter',
    description: 'Completed The Last Winter within a week of the first solve.',
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
    name:        'Case Notes Read — The Last Winter',
    symbol:      '📝',
    category:    'Vault 05 — The Last Winter',
    description: 'Reviewed every incident report in The Last Winter.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's05_ach14',
    name:        'Full Playlist — The Last Winter',
    symbol:      '🎵',
    category:    'Vault 05 — The Last Winter',
    description: 'Listened to every recovered recording in The Last Winter.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's05_ach15',
    name:        'Vault Unsealed — The Last Winter',
    symbol:      '🔓',
    category:    'Vault 05 — The Last Winter',
    description: 'Unlocked the The Last Winter vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['049','050','051','052','053','054','055','056','057','058','059','060'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's05_ach16',
    name:        'Perfect Record — The Last Winter',
    symbol:      '🏆',
    category:    'Vault 05 — The Last Winter',
    description: 'Earned every achievement in The Last Winter.',
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

  // -- Vault 06 — The Underground --
  {
    id:          's06_ach01',
    name:        'First File — The Underground',
    symbol:      '📁',
    category:    'Vault 06 — The Underground',
    description: 'Opened the first case of The Underground.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's06_ach02',
    name:        'Three Files — The Underground',
    symbol:      '📂',
    category:    'Vault 06 — The Underground',
    description: 'Solved 3 cases in The Underground.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's06_ach03',
    name:        'Six Files — The Underground',
    symbol:      '📚',
    category:    'Vault 06 — The Underground',
    description: 'Solved 6 cases in The Underground.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's06_ach04',
    name:        'Nine Files — The Underground',
    symbol:      '🗄',
    category:    'Vault 06 — The Underground',
    description: 'Solved 9 cases in The Underground.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's06_ach05',
    name:        'Season Closed — The Underground',
    symbol:      '✅',
    category:    'Vault 06 — The Underground',
    description: 'Solved every case in The Underground.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's06_ach06',
    name:        'Evidence 25% — The Underground',
    symbol:      '🧪',
    category:    'Vault 06 — The Underground',
    description: 'Recovered a quarter of the evidence in The Underground.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's06_ach07',
    name:        'Evidence 50% — The Underground',
    symbol:      '🧪',
    category:    'Vault 06 — The Underground',
    description: 'Recovered half the evidence in The Underground.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's06_ach08',
    name:        'Evidence 75% — The Underground',
    symbol:      '🧪',
    category:    'Vault 06 — The Underground',
    description: 'Recovered most of the evidence in The Underground.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's06_ach09',
    name:        'Evidence 100% — The Underground',
    symbol:      '🧪',
    category:    'Vault 06 — The Underground',
    description: 'Recovered every piece of evidence in The Underground.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's06_ach10',
    name:        'First Try — The Underground',
    symbol:      '🎯',
    category:    'Vault 06 — The Underground',
    description: 'Solved every case in The Underground on the first attempt.',
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
    name:        'No Hints — The Underground',
    symbol:      '🧠',
    category:    'Vault 06 — The Underground',
    description: 'Completed The Underground without ever revealing a hint.',
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
    name:        'Under Time — The Underground',
    symbol:      '⏱',
    category:    'Vault 06 — The Underground',
    description: 'Completed The Underground within a week of the first solve.',
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
    name:        'Case Notes Read — The Underground',
    symbol:      '📝',
    category:    'Vault 06 — The Underground',
    description: 'Reviewed every incident report in The Underground.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's06_ach14',
    name:        'Full Playlist — The Underground',
    symbol:      '🎵',
    category:    'Vault 06 — The Underground',
    description: 'Listened to every recovered recording in The Underground.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's06_ach15',
    name:        'Vault Unsealed — The Underground',
    symbol:      '🔓',
    category:    'Vault 06 — The Underground',
    description: 'Unlocked the The Underground vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['061','062','063','064','065','066','067','068','069','070','071','072'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's06_ach16',
    name:        'Perfect Record — The Underground',
    symbol:      '🏆',
    category:    'Vault 06 — The Underground',
    description: 'Earned every achievement in The Underground.',
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

  // -- Vault 07 — The Second Family --
  {
    id:          's07_ach01',
    name:        'First File — The Second Family',
    symbol:      '📁',
    category:    'Vault 07 — The Second Family',
    description: 'Opened the first case of The Second Family.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's07_ach02',
    name:        'Three Files — The Second Family',
    symbol:      '📂',
    category:    'Vault 07 — The Second Family',
    description: 'Solved 3 cases in The Second Family.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's07_ach03',
    name:        'Six Files — The Second Family',
    symbol:      '📚',
    category:    'Vault 07 — The Second Family',
    description: 'Solved 6 cases in The Second Family.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's07_ach04',
    name:        'Nine Files — The Second Family',
    symbol:      '🗄',
    category:    'Vault 07 — The Second Family',
    description: 'Solved 9 cases in The Second Family.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's07_ach05',
    name:        'Season Closed — The Second Family',
    symbol:      '✅',
    category:    'Vault 07 — The Second Family',
    description: 'Solved every case in The Second Family.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's07_ach06',
    name:        'Evidence 25% — The Second Family',
    symbol:      '🧪',
    category:    'Vault 07 — The Second Family',
    description: 'Recovered a quarter of the evidence in The Second Family.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's07_ach07',
    name:        'Evidence 50% — The Second Family',
    symbol:      '🧪',
    category:    'Vault 07 — The Second Family',
    description: 'Recovered half the evidence in The Second Family.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's07_ach08',
    name:        'Evidence 75% — The Second Family',
    symbol:      '🧪',
    category:    'Vault 07 — The Second Family',
    description: 'Recovered most of the evidence in The Second Family.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's07_ach09',
    name:        'Evidence 100% — The Second Family',
    symbol:      '🧪',
    category:    'Vault 07 — The Second Family',
    description: 'Recovered every piece of evidence in The Second Family.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's07_ach10',
    name:        'First Try — The Second Family',
    symbol:      '🎯',
    category:    'Vault 07 — The Second Family',
    description: 'Solved every case in The Second Family on the first attempt.',
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
    name:        'No Hints — The Second Family',
    symbol:      '🧠',
    category:    'Vault 07 — The Second Family',
    description: 'Completed The Second Family without ever revealing a hint.',
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
    name:        'Under Time — The Second Family',
    symbol:      '⏱',
    category:    'Vault 07 — The Second Family',
    description: 'Completed The Second Family within a week of the first solve.',
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
    name:        'Case Notes Read — The Second Family',
    symbol:      '📝',
    category:    'Vault 07 — The Second Family',
    description: 'Reviewed every incident report in The Second Family.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's07_ach14',
    name:        'Full Playlist — The Second Family',
    symbol:      '🎵',
    category:    'Vault 07 — The Second Family',
    description: 'Listened to every recovered recording in The Second Family.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's07_ach15',
    name:        'Vault Unsealed — The Second Family',
    symbol:      '🔓',
    category:    'Vault 07 — The Second Family',
    description: 'Unlocked the The Second Family vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['073','074','075','076','077','078','079','080','081','082','083','084'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's07_ach16',
    name:        'Perfect Record — The Second Family',
    symbol:      '🏆',
    category:    'Vault 07 — The Second Family',
    description: 'Earned every achievement in The Second Family.',
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

  // -- Vault 08 — The Fire Year --
  {
    id:          's08_ach01',
    name:        'First File — The Fire Year',
    symbol:      '📁',
    category:    'Vault 08 — The Fire Year',
    description: 'Opened the first case of The Fire Year.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's08_ach02',
    name:        'Three Files — The Fire Year',
    symbol:      '📂',
    category:    'Vault 08 — The Fire Year',
    description: 'Solved 3 cases in The Fire Year.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's08_ach03',
    name:        'Six Files — The Fire Year',
    symbol:      '📚',
    category:    'Vault 08 — The Fire Year',
    description: 'Solved 6 cases in The Fire Year.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's08_ach04',
    name:        'Nine Files — The Fire Year',
    symbol:      '🗄',
    category:    'Vault 08 — The Fire Year',
    description: 'Solved 9 cases in The Fire Year.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's08_ach05',
    name:        'Season Closed — The Fire Year',
    symbol:      '✅',
    category:    'Vault 08 — The Fire Year',
    description: 'Solved every case in The Fire Year.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's08_ach06',
    name:        'Evidence 25% — The Fire Year',
    symbol:      '🧪',
    category:    'Vault 08 — The Fire Year',
    description: 'Recovered a quarter of the evidence in The Fire Year.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's08_ach07',
    name:        'Evidence 50% — The Fire Year',
    symbol:      '🧪',
    category:    'Vault 08 — The Fire Year',
    description: 'Recovered half the evidence in The Fire Year.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's08_ach08',
    name:        'Evidence 75% — The Fire Year',
    symbol:      '🧪',
    category:    'Vault 08 — The Fire Year',
    description: 'Recovered most of the evidence in The Fire Year.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's08_ach09',
    name:        'Evidence 100% — The Fire Year',
    symbol:      '🧪',
    category:    'Vault 08 — The Fire Year',
    description: 'Recovered every piece of evidence in The Fire Year.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's08_ach10',
    name:        'First Try — The Fire Year',
    symbol:      '🎯',
    category:    'Vault 08 — The Fire Year',
    description: 'Solved every case in The Fire Year on the first attempt.',
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
    name:        'No Hints — The Fire Year',
    symbol:      '🧠',
    category:    'Vault 08 — The Fire Year',
    description: 'Completed The Fire Year without ever revealing a hint.',
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
    name:        'Under Time — The Fire Year',
    symbol:      '⏱',
    category:    'Vault 08 — The Fire Year',
    description: 'Completed The Fire Year within a week of the first solve.',
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
    name:        'Case Notes Read — The Fire Year',
    symbol:      '📝',
    category:    'Vault 08 — The Fire Year',
    description: 'Reviewed every incident report in The Fire Year.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's08_ach14',
    name:        'Full Playlist — The Fire Year',
    symbol:      '🎵',
    category:    'Vault 08 — The Fire Year',
    description: 'Listened to every recovered recording in The Fire Year.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's08_ach15',
    name:        'Vault Unsealed — The Fire Year',
    symbol:      '🔓',
    category:    'Vault 08 — The Fire Year',
    description: 'Unlocked the The Fire Year vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['085','086','087','088','089','090','091','092','093','094','095','096'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's08_ach16',
    name:        'Perfect Record — The Fire Year',
    symbol:      '🏆',
    category:    'Vault 08 — The Fire Year',
    description: 'Earned every achievement in The Fire Year.',
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

  // -- Vault 09 — The Keeper --
  {
    id:          's09_ach01',
    name:        'First File — The Keeper',
    symbol:      '📁',
    category:    'Vault 09 — The Keeper',
    description: 'Opened the first case of The Keeper.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's09_ach02',
    name:        'Three Files — The Keeper',
    symbol:      '📂',
    category:    'Vault 09 — The Keeper',
    description: 'Solved 3 cases in The Keeper.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's09_ach03',
    name:        'Six Files — The Keeper',
    symbol:      '📚',
    category:    'Vault 09 — The Keeper',
    description: 'Solved 6 cases in The Keeper.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's09_ach04',
    name:        'Nine Files — The Keeper',
    symbol:      '🗄',
    category:    'Vault 09 — The Keeper',
    description: 'Solved 9 cases in The Keeper.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's09_ach05',
    name:        'Season Closed — The Keeper',
    symbol:      '✅',
    category:    'Vault 09 — The Keeper',
    description: 'Solved every case in The Keeper.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's09_ach06',
    name:        'Evidence 25% — The Keeper',
    symbol:      '🧪',
    category:    'Vault 09 — The Keeper',
    description: 'Recovered a quarter of the evidence in The Keeper.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's09_ach07',
    name:        'Evidence 50% — The Keeper',
    symbol:      '🧪',
    category:    'Vault 09 — The Keeper',
    description: 'Recovered half the evidence in The Keeper.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's09_ach08',
    name:        'Evidence 75% — The Keeper',
    symbol:      '🧪',
    category:    'Vault 09 — The Keeper',
    description: 'Recovered most of the evidence in The Keeper.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's09_ach09',
    name:        'Evidence 100% — The Keeper',
    symbol:      '🧪',
    category:    'Vault 09 — The Keeper',
    description: 'Recovered every piece of evidence in The Keeper.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's09_ach10',
    name:        'First Try — The Keeper',
    symbol:      '🎯',
    category:    'Vault 09 — The Keeper',
    description: 'Solved every case in The Keeper on the first attempt.',
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
    name:        'No Hints — The Keeper',
    symbol:      '🧠',
    category:    'Vault 09 — The Keeper',
    description: 'Completed The Keeper without ever revealing a hint.',
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
    name:        'Under Time — The Keeper',
    symbol:      '⏱',
    category:    'Vault 09 — The Keeper',
    description: 'Completed The Keeper within a week of the first solve.',
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
    name:        'Case Notes Read — The Keeper',
    symbol:      '📝',
    category:    'Vault 09 — The Keeper',
    description: 'Reviewed every incident report in The Keeper.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's09_ach14',
    name:        'Full Playlist — The Keeper',
    symbol:      '🎵',
    category:    'Vault 09 — The Keeper',
    description: 'Listened to every recovered recording in The Keeper.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's09_ach15',
    name:        'Vault Unsealed — The Keeper',
    symbol:      '🔓',
    category:    'Vault 09 — The Keeper',
    description: 'Unlocked the The Keeper vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['097','098','099','100','101','102','103','104','105','106','107','108'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's09_ach16',
    name:        'Perfect Record — The Keeper',
    symbol:      '🏆',
    category:    'Vault 09 — The Keeper',
    description: 'Earned every achievement in The Keeper.',
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

  // -- Vault 10 — The Forgotten Road --
  {
    id:          's10_ach01',
    name:        'First File — The Forgotten Road',
    symbol:      '📁',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Opened the first case of The Forgotten Road.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's10_ach02',
    name:        'Three Files — The Forgotten Road',
    symbol:      '📂',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Solved 3 cases in The Forgotten Road.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's10_ach03',
    name:        'Six Files — The Forgotten Road',
    symbol:      '📚',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Solved 6 cases in The Forgotten Road.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's10_ach04',
    name:        'Nine Files — The Forgotten Road',
    symbol:      '🗄',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Solved 9 cases in The Forgotten Road.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's10_ach05',
    name:        'Season Closed — The Forgotten Road',
    symbol:      '✅',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Solved every case in The Forgotten Road.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's10_ach06',
    name:        'Evidence 25% — The Forgotten Road',
    symbol:      '🧪',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Recovered a quarter of the evidence in The Forgotten Road.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's10_ach07',
    name:        'Evidence 50% — The Forgotten Road',
    symbol:      '🧪',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Recovered half the evidence in The Forgotten Road.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's10_ach08',
    name:        'Evidence 75% — The Forgotten Road',
    symbol:      '🧪',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Recovered most of the evidence in The Forgotten Road.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's10_ach09',
    name:        'Evidence 100% — The Forgotten Road',
    symbol:      '🧪',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Recovered every piece of evidence in The Forgotten Road.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's10_ach10',
    name:        'First Try — The Forgotten Road',
    symbol:      '🎯',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Solved every case in The Forgotten Road on the first attempt.',
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
    name:        'No Hints — The Forgotten Road',
    symbol:      '🧠',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Completed The Forgotten Road without ever revealing a hint.',
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
    name:        'Under Time — The Forgotten Road',
    symbol:      '⏱',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Completed The Forgotten Road within a week of the first solve.',
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
    name:        'Case Notes Read — The Forgotten Road',
    symbol:      '📝',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Reviewed every incident report in The Forgotten Road.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's10_ach14',
    name:        'Full Playlist — The Forgotten Road',
    symbol:      '🎵',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Listened to every recovered recording in The Forgotten Road.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's10_ach15',
    name:        'Vault Unsealed — The Forgotten Road',
    symbol:      '🔓',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Unlocked the The Forgotten Road vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['109','110','111','112','113','114','115','116','117','118','119','120'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's10_ach16',
    name:        'Perfect Record — The Forgotten Road',
    symbol:      '🏆',
    category:    'Vault 10 — The Forgotten Road',
    description: 'Earned every achievement in The Forgotten Road.',
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

  // -- Vault 11 — The Map Maker --
  {
    id:          's11_ach01',
    name:        'First File — The Map Maker',
    symbol:      '📁',
    category:    'Vault 11 — The Map Maker',
    description: 'Opened the first case of The Map Maker.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's11_ach02',
    name:        'Three Files — The Map Maker',
    symbol:      '📂',
    category:    'Vault 11 — The Map Maker',
    description: 'Solved 3 cases in The Map Maker.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's11_ach03',
    name:        'Six Files — The Map Maker',
    symbol:      '📚',
    category:    'Vault 11 — The Map Maker',
    description: 'Solved 6 cases in The Map Maker.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's11_ach04',
    name:        'Nine Files — The Map Maker',
    symbol:      '🗄',
    category:    'Vault 11 — The Map Maker',
    description: 'Solved 9 cases in The Map Maker.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's11_ach05',
    name:        'Season Closed — The Map Maker',
    symbol:      '✅',
    category:    'Vault 11 — The Map Maker',
    description: 'Solved every case in The Map Maker.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's11_ach06',
    name:        'Evidence 25% — The Map Maker',
    symbol:      '🧪',
    category:    'Vault 11 — The Map Maker',
    description: 'Recovered a quarter of the evidence in The Map Maker.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's11_ach07',
    name:        'Evidence 50% — The Map Maker',
    symbol:      '🧪',
    category:    'Vault 11 — The Map Maker',
    description: 'Recovered half the evidence in The Map Maker.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's11_ach08',
    name:        'Evidence 75% — The Map Maker',
    symbol:      '🧪',
    category:    'Vault 11 — The Map Maker',
    description: 'Recovered most of the evidence in The Map Maker.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's11_ach09',
    name:        'Evidence 100% — The Map Maker',
    symbol:      '🧪',
    category:    'Vault 11 — The Map Maker',
    description: 'Recovered every piece of evidence in The Map Maker.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's11_ach10',
    name:        'First Try — The Map Maker',
    symbol:      '🎯',
    category:    'Vault 11 — The Map Maker',
    description: 'Solved every case in The Map Maker on the first attempt.',
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
    name:        'No Hints — The Map Maker',
    symbol:      '🧠',
    category:    'Vault 11 — The Map Maker',
    description: 'Completed The Map Maker without ever revealing a hint.',
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
    name:        'Under Time — The Map Maker',
    symbol:      '⏱',
    category:    'Vault 11 — The Map Maker',
    description: 'Completed The Map Maker within a week of the first solve.',
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
    name:        'Case Notes Read — The Map Maker',
    symbol:      '📝',
    category:    'Vault 11 — The Map Maker',
    description: 'Reviewed every incident report in The Map Maker.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's11_ach14',
    name:        'Full Playlist — The Map Maker',
    symbol:      '🎵',
    category:    'Vault 11 — The Map Maker',
    description: 'Listened to every recovered recording in The Map Maker.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's11_ach15',
    name:        'Vault Unsealed — The Map Maker',
    symbol:      '🔓',
    category:    'Vault 11 — The Map Maker',
    description: 'Unlocked the The Map Maker vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['121','122','123','124','125','126','127','128','129','130','131','132'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's11_ach16',
    name:        'Perfect Record — The Map Maker',
    symbol:      '🏆',
    category:    'Vault 11 — The Map Maker',
    description: 'Earned every achievement in The Map Maker.',
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

  // -- Vault 12 — The Inheritance --
  {
    id:          's12_ach01',
    name:        'First File — The Inheritance',
    symbol:      '📁',
    category:    'Vault 12 — The Inheritance',
    description: 'Opened the first case of The Inheritance.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's12_ach02',
    name:        'Three Files — The Inheritance',
    symbol:      '📂',
    category:    'Vault 12 — The Inheritance',
    description: 'Solved 3 cases in The Inheritance.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's12_ach03',
    name:        'Six Files — The Inheritance',
    symbol:      '📚',
    category:    'Vault 12 — The Inheritance',
    description: 'Solved 6 cases in The Inheritance.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's12_ach04',
    name:        'Nine Files — The Inheritance',
    symbol:      '🗄',
    category:    'Vault 12 — The Inheritance',
    description: 'Solved 9 cases in The Inheritance.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's12_ach05',
    name:        'Season Closed — The Inheritance',
    symbol:      '✅',
    category:    'Vault 12 — The Inheritance',
    description: 'Solved every case in The Inheritance.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's12_ach06',
    name:        'Evidence 25% — The Inheritance',
    symbol:      '🧪',
    category:    'Vault 12 — The Inheritance',
    description: 'Recovered a quarter of the evidence in The Inheritance.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's12_ach07',
    name:        'Evidence 50% — The Inheritance',
    symbol:      '🧪',
    category:    'Vault 12 — The Inheritance',
    description: 'Recovered half the evidence in The Inheritance.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's12_ach08',
    name:        'Evidence 75% — The Inheritance',
    symbol:      '🧪',
    category:    'Vault 12 — The Inheritance',
    description: 'Recovered most of the evidence in The Inheritance.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's12_ach09',
    name:        'Evidence 100% — The Inheritance',
    symbol:      '🧪',
    category:    'Vault 12 — The Inheritance',
    description: 'Recovered every piece of evidence in The Inheritance.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's12_ach10',
    name:        'First Try — The Inheritance',
    symbol:      '🎯',
    category:    'Vault 12 — The Inheritance',
    description: 'Solved every case in The Inheritance on the first attempt.',
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
    name:        'No Hints — The Inheritance',
    symbol:      '🧠',
    category:    'Vault 12 — The Inheritance',
    description: 'Completed The Inheritance without ever revealing a hint.',
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
    name:        'Under Time — The Inheritance',
    symbol:      '⏱',
    category:    'Vault 12 — The Inheritance',
    description: 'Completed The Inheritance within a week of the first solve.',
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
    name:        'Case Notes Read — The Inheritance',
    symbol:      '📝',
    category:    'Vault 12 — The Inheritance',
    description: 'Reviewed every incident report in The Inheritance.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's12_ach14',
    name:        'Full Playlist — The Inheritance',
    symbol:      '🎵',
    category:    'Vault 12 — The Inheritance',
    description: 'Listened to every recovered recording in The Inheritance.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's12_ach15',
    name:        'Vault Unsealed — The Inheritance',
    symbol:      '🔓',
    category:    'Vault 12 — The Inheritance',
    description: 'Unlocked the The Inheritance vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['133','134','135','136','137','138','139','140','141','142','143','144'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's12_ach16',
    name:        'Perfect Record — The Inheritance',
    symbol:      '🏆',
    category:    'Vault 12 — The Inheritance',
    description: 'Earned every achievement in The Inheritance.',
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
