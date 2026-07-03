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
  // ==== SEASONAL ACHIEVEMENT VAULTS (50 seasons x 16 achievements = 800) ====
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
  },

  // -- Vault 13 — The Twin Hollows --
  {
    id:          's13_ach01',
    name:        'First File — The Twin Hollows',
    symbol:      '📁',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Opened the first case of The Twin Hollows.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's13_ach02',
    name:        'Three Files — The Twin Hollows',
    symbol:      '📂',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Solved 3 cases in The Twin Hollows.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's13_ach03',
    name:        'Six Files — The Twin Hollows',
    symbol:      '📚',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Solved 6 cases in The Twin Hollows.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's13_ach04',
    name:        'Nine Files — The Twin Hollows',
    symbol:      '🗄',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Solved 9 cases in The Twin Hollows.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's13_ach05',
    name:        'Season Closed — The Twin Hollows',
    symbol:      '✅',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Solved every case in The Twin Hollows.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's13_ach06',
    name:        'Evidence 25% — The Twin Hollows',
    symbol:      '🧪',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Recovered a quarter of the evidence in The Twin Hollows.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's13_ach07',
    name:        'Evidence 50% — The Twin Hollows',
    symbol:      '🧪',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Recovered half the evidence in The Twin Hollows.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's13_ach08',
    name:        'Evidence 75% — The Twin Hollows',
    symbol:      '🧪',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Recovered most of the evidence in The Twin Hollows.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's13_ach09',
    name:        'Evidence 100% — The Twin Hollows',
    symbol:      '🧪',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Recovered every piece of evidence in The Twin Hollows.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's13_ach10',
    name:        'First Try — The Twin Hollows',
    symbol:      '🎯',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Solved every case in The Twin Hollows on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's13_ach11',
    name:        'No Hints — The Twin Hollows',
    symbol:      '🧠',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Completed The Twin Hollows without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's13_ach12',
    name:        'Under Time — The Twin Hollows',
    symbol:      '⏱',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Completed The Twin Hollows within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's13_ach13',
    name:        'Case Notes Read — The Twin Hollows',
    symbol:      '📝',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Reviewed every incident report in The Twin Hollows.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's13_ach14',
    name:        'Full Playlist — The Twin Hollows',
    symbol:      '🎵',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Listened to every recovered recording in The Twin Hollows.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's13_ach15',
    name:        'Vault Unsealed — The Twin Hollows',
    symbol:      '🔓',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Unlocked the The Twin Hollows vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's13_ach16',
    name:        'Perfect Record — The Twin Hollows',
    symbol:      '🏆',
    category:    'Vault 13 — The Twin Hollows',
    description: 'Earned every achievement in The Twin Hollows.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['145','146','147','148','149','150','151','152','153','154','155','156'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 14 — The Flood Year --
  {
    id:          's14_ach01',
    name:        'First File — The Flood Year',
    symbol:      '📁',
    category:    'Vault 14 — The Flood Year',
    description: 'Opened the first case of The Flood Year.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's14_ach02',
    name:        'Three Files — The Flood Year',
    symbol:      '📂',
    category:    'Vault 14 — The Flood Year',
    description: 'Solved 3 cases in The Flood Year.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's14_ach03',
    name:        'Six Files — The Flood Year',
    symbol:      '📚',
    category:    'Vault 14 — The Flood Year',
    description: 'Solved 6 cases in The Flood Year.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's14_ach04',
    name:        'Nine Files — The Flood Year',
    symbol:      '🗄',
    category:    'Vault 14 — The Flood Year',
    description: 'Solved 9 cases in The Flood Year.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's14_ach05',
    name:        'Season Closed — The Flood Year',
    symbol:      '✅',
    category:    'Vault 14 — The Flood Year',
    description: 'Solved every case in The Flood Year.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's14_ach06',
    name:        'Evidence 25% — The Flood Year',
    symbol:      '🧪',
    category:    'Vault 14 — The Flood Year',
    description: 'Recovered a quarter of the evidence in The Flood Year.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's14_ach07',
    name:        'Evidence 50% — The Flood Year',
    symbol:      '🧪',
    category:    'Vault 14 — The Flood Year',
    description: 'Recovered half the evidence in The Flood Year.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's14_ach08',
    name:        'Evidence 75% — The Flood Year',
    symbol:      '🧪',
    category:    'Vault 14 — The Flood Year',
    description: 'Recovered most of the evidence in The Flood Year.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's14_ach09',
    name:        'Evidence 100% — The Flood Year',
    symbol:      '🧪',
    category:    'Vault 14 — The Flood Year',
    description: 'Recovered every piece of evidence in The Flood Year.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's14_ach10',
    name:        'First Try — The Flood Year',
    symbol:      '🎯',
    category:    'Vault 14 — The Flood Year',
    description: 'Solved every case in The Flood Year on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's14_ach11',
    name:        'No Hints — The Flood Year',
    symbol:      '🧠',
    category:    'Vault 14 — The Flood Year',
    description: 'Completed The Flood Year without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's14_ach12',
    name:        'Under Time — The Flood Year',
    symbol:      '⏱',
    category:    'Vault 14 — The Flood Year',
    description: 'Completed The Flood Year within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's14_ach13',
    name:        'Case Notes Read — The Flood Year',
    symbol:      '📝',
    category:    'Vault 14 — The Flood Year',
    description: 'Reviewed every incident report in The Flood Year.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's14_ach14',
    name:        'Full Playlist — The Flood Year',
    symbol:      '🎵',
    category:    'Vault 14 — The Flood Year',
    description: 'Listened to every recovered recording in The Flood Year.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's14_ach15',
    name:        'Vault Unsealed — The Flood Year',
    symbol:      '🔓',
    category:    'Vault 14 — The Flood Year',
    description: 'Unlocked the The Flood Year vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's14_ach16',
    name:        'Perfect Record — The Flood Year',
    symbol:      '🏆',
    category:    'Vault 14 — The Flood Year',
    description: 'Earned every achievement in The Flood Year.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['157','158','159','160','161','162','163','164','165','166','167','168'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 15 — The Lantern Keeper --
  {
    id:          's15_ach01',
    name:        'First File — The Lantern Keeper',
    symbol:      '📁',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Opened the first case of The Lantern Keeper.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's15_ach02',
    name:        'Three Files — The Lantern Keeper',
    symbol:      '📂',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Solved 3 cases in The Lantern Keeper.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's15_ach03',
    name:        'Six Files — The Lantern Keeper',
    symbol:      '📚',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Solved 6 cases in The Lantern Keeper.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's15_ach04',
    name:        'Nine Files — The Lantern Keeper',
    symbol:      '🗄',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Solved 9 cases in The Lantern Keeper.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's15_ach05',
    name:        'Season Closed — The Lantern Keeper',
    symbol:      '✅',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Solved every case in The Lantern Keeper.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's15_ach06',
    name:        'Evidence 25% — The Lantern Keeper',
    symbol:      '🧪',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Recovered a quarter of the evidence in The Lantern Keeper.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's15_ach07',
    name:        'Evidence 50% — The Lantern Keeper',
    symbol:      '🧪',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Recovered half the evidence in The Lantern Keeper.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's15_ach08',
    name:        'Evidence 75% — The Lantern Keeper',
    symbol:      '🧪',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Recovered most of the evidence in The Lantern Keeper.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's15_ach09',
    name:        'Evidence 100% — The Lantern Keeper',
    symbol:      '🧪',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Recovered every piece of evidence in The Lantern Keeper.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's15_ach10',
    name:        'First Try — The Lantern Keeper',
    symbol:      '🎯',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Solved every case in The Lantern Keeper on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's15_ach11',
    name:        'No Hints — The Lantern Keeper',
    symbol:      '🧠',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Completed The Lantern Keeper without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's15_ach12',
    name:        'Under Time — The Lantern Keeper',
    symbol:      '⏱',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Completed The Lantern Keeper within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's15_ach13',
    name:        'Case Notes Read — The Lantern Keeper',
    symbol:      '📝',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Reviewed every incident report in The Lantern Keeper.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's15_ach14',
    name:        'Full Playlist — The Lantern Keeper',
    symbol:      '🎵',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Listened to every recovered recording in The Lantern Keeper.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's15_ach15',
    name:        'Vault Unsealed — The Lantern Keeper',
    symbol:      '🔓',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Unlocked the The Lantern Keeper vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's15_ach16',
    name:        'Perfect Record — The Lantern Keeper',
    symbol:      '🏆',
    category:    'Vault 15 — The Lantern Keeper',
    description: 'Earned every achievement in The Lantern Keeper.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['169','170','171','172','173','174','175','176','177','178','179','180'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 16 — The Glass House --
  {
    id:          's16_ach01',
    name:        'First File — The Glass House',
    symbol:      '📁',
    category:    'Vault 16 — The Glass House',
    description: 'Opened the first case of The Glass House.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's16_ach02',
    name:        'Three Files — The Glass House',
    symbol:      '📂',
    category:    'Vault 16 — The Glass House',
    description: 'Solved 3 cases in The Glass House.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's16_ach03',
    name:        'Six Files — The Glass House',
    symbol:      '📚',
    category:    'Vault 16 — The Glass House',
    description: 'Solved 6 cases in The Glass House.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's16_ach04',
    name:        'Nine Files — The Glass House',
    symbol:      '🗄',
    category:    'Vault 16 — The Glass House',
    description: 'Solved 9 cases in The Glass House.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's16_ach05',
    name:        'Season Closed — The Glass House',
    symbol:      '✅',
    category:    'Vault 16 — The Glass House',
    description: 'Solved every case in The Glass House.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's16_ach06',
    name:        'Evidence 25% — The Glass House',
    symbol:      '🧪',
    category:    'Vault 16 — The Glass House',
    description: 'Recovered a quarter of the evidence in The Glass House.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's16_ach07',
    name:        'Evidence 50% — The Glass House',
    symbol:      '🧪',
    category:    'Vault 16 — The Glass House',
    description: 'Recovered half the evidence in The Glass House.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's16_ach08',
    name:        'Evidence 75% — The Glass House',
    symbol:      '🧪',
    category:    'Vault 16 — The Glass House',
    description: 'Recovered most of the evidence in The Glass House.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's16_ach09',
    name:        'Evidence 100% — The Glass House',
    symbol:      '🧪',
    category:    'Vault 16 — The Glass House',
    description: 'Recovered every piece of evidence in The Glass House.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's16_ach10',
    name:        'First Try — The Glass House',
    symbol:      '🎯',
    category:    'Vault 16 — The Glass House',
    description: 'Solved every case in The Glass House on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's16_ach11',
    name:        'No Hints — The Glass House',
    symbol:      '🧠',
    category:    'Vault 16 — The Glass House',
    description: 'Completed The Glass House without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's16_ach12',
    name:        'Under Time — The Glass House',
    symbol:      '⏱',
    category:    'Vault 16 — The Glass House',
    description: 'Completed The Glass House within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's16_ach13',
    name:        'Case Notes Read — The Glass House',
    symbol:      '📝',
    category:    'Vault 16 — The Glass House',
    description: 'Reviewed every incident report in The Glass House.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's16_ach14',
    name:        'Full Playlist — The Glass House',
    symbol:      '🎵',
    category:    'Vault 16 — The Glass House',
    description: 'Listened to every recovered recording in The Glass House.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's16_ach15',
    name:        'Vault Unsealed — The Glass House',
    symbol:      '🔓',
    category:    'Vault 16 — The Glass House',
    description: 'Unlocked the The Glass House vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's16_ach16',
    name:        'Perfect Record — The Glass House',
    symbol:      '🏆',
    category:    'Vault 16 — The Glass House',
    description: 'Earned every achievement in The Glass House.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['181','182','183','184','185','186','187','188','189','190','191','192'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 17 — The Cold Season --
  {
    id:          's17_ach01',
    name:        'First File — The Cold Season',
    symbol:      '📁',
    category:    'Vault 17 — The Cold Season',
    description: 'Opened the first case of The Cold Season.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's17_ach02',
    name:        'Three Files — The Cold Season',
    symbol:      '📂',
    category:    'Vault 17 — The Cold Season',
    description: 'Solved 3 cases in The Cold Season.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's17_ach03',
    name:        'Six Files — The Cold Season',
    symbol:      '📚',
    category:    'Vault 17 — The Cold Season',
    description: 'Solved 6 cases in The Cold Season.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's17_ach04',
    name:        'Nine Files — The Cold Season',
    symbol:      '🗄',
    category:    'Vault 17 — The Cold Season',
    description: 'Solved 9 cases in The Cold Season.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's17_ach05',
    name:        'Season Closed — The Cold Season',
    symbol:      '✅',
    category:    'Vault 17 — The Cold Season',
    description: 'Solved every case in The Cold Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's17_ach06',
    name:        'Evidence 25% — The Cold Season',
    symbol:      '🧪',
    category:    'Vault 17 — The Cold Season',
    description: 'Recovered a quarter of the evidence in The Cold Season.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's17_ach07',
    name:        'Evidence 50% — The Cold Season',
    symbol:      '🧪',
    category:    'Vault 17 — The Cold Season',
    description: 'Recovered half the evidence in The Cold Season.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's17_ach08',
    name:        'Evidence 75% — The Cold Season',
    symbol:      '🧪',
    category:    'Vault 17 — The Cold Season',
    description: 'Recovered most of the evidence in The Cold Season.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's17_ach09',
    name:        'Evidence 100% — The Cold Season',
    symbol:      '🧪',
    category:    'Vault 17 — The Cold Season',
    description: 'Recovered every piece of evidence in The Cold Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's17_ach10',
    name:        'First Try — The Cold Season',
    symbol:      '🎯',
    category:    'Vault 17 — The Cold Season',
    description: 'Solved every case in The Cold Season on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's17_ach11',
    name:        'No Hints — The Cold Season',
    symbol:      '🧠',
    category:    'Vault 17 — The Cold Season',
    description: 'Completed The Cold Season without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's17_ach12',
    name:        'Under Time — The Cold Season',
    symbol:      '⏱',
    category:    'Vault 17 — The Cold Season',
    description: 'Completed The Cold Season within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's17_ach13',
    name:        'Case Notes Read — The Cold Season',
    symbol:      '📝',
    category:    'Vault 17 — The Cold Season',
    description: 'Reviewed every incident report in The Cold Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's17_ach14',
    name:        'Full Playlist — The Cold Season',
    symbol:      '🎵',
    category:    'Vault 17 — The Cold Season',
    description: 'Listened to every recovered recording in The Cold Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's17_ach15',
    name:        'Vault Unsealed — The Cold Season',
    symbol:      '🔓',
    category:    'Vault 17 — The Cold Season',
    description: 'Unlocked the The Cold Season vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's17_ach16',
    name:        'Perfect Record — The Cold Season',
    symbol:      '🏆',
    category:    'Vault 17 — The Cold Season',
    description: 'Earned every achievement in The Cold Season.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['193','194','195','196','197','198','199','200','201','202','203','204'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 18 — The Hollow Names --
  {
    id:          's18_ach01',
    name:        'First File — The Hollow Names',
    symbol:      '📁',
    category:    'Vault 18 — The Hollow Names',
    description: 'Opened the first case of The Hollow Names.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's18_ach02',
    name:        'Three Files — The Hollow Names',
    symbol:      '📂',
    category:    'Vault 18 — The Hollow Names',
    description: 'Solved 3 cases in The Hollow Names.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's18_ach03',
    name:        'Six Files — The Hollow Names',
    symbol:      '📚',
    category:    'Vault 18 — The Hollow Names',
    description: 'Solved 6 cases in The Hollow Names.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's18_ach04',
    name:        'Nine Files — The Hollow Names',
    symbol:      '🗄',
    category:    'Vault 18 — The Hollow Names',
    description: 'Solved 9 cases in The Hollow Names.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's18_ach05',
    name:        'Season Closed — The Hollow Names',
    symbol:      '✅',
    category:    'Vault 18 — The Hollow Names',
    description: 'Solved every case in The Hollow Names.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's18_ach06',
    name:        'Evidence 25% — The Hollow Names',
    symbol:      '🧪',
    category:    'Vault 18 — The Hollow Names',
    description: 'Recovered a quarter of the evidence in The Hollow Names.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's18_ach07',
    name:        'Evidence 50% — The Hollow Names',
    symbol:      '🧪',
    category:    'Vault 18 — The Hollow Names',
    description: 'Recovered half the evidence in The Hollow Names.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's18_ach08',
    name:        'Evidence 75% — The Hollow Names',
    symbol:      '🧪',
    category:    'Vault 18 — The Hollow Names',
    description: 'Recovered most of the evidence in The Hollow Names.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's18_ach09',
    name:        'Evidence 100% — The Hollow Names',
    symbol:      '🧪',
    category:    'Vault 18 — The Hollow Names',
    description: 'Recovered every piece of evidence in The Hollow Names.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's18_ach10',
    name:        'First Try — The Hollow Names',
    symbol:      '🎯',
    category:    'Vault 18 — The Hollow Names',
    description: 'Solved every case in The Hollow Names on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's18_ach11',
    name:        'No Hints — The Hollow Names',
    symbol:      '🧠',
    category:    'Vault 18 — The Hollow Names',
    description: 'Completed The Hollow Names without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's18_ach12',
    name:        'Under Time — The Hollow Names',
    symbol:      '⏱',
    category:    'Vault 18 — The Hollow Names',
    description: 'Completed The Hollow Names within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's18_ach13',
    name:        'Case Notes Read — The Hollow Names',
    symbol:      '📝',
    category:    'Vault 18 — The Hollow Names',
    description: 'Reviewed every incident report in The Hollow Names.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's18_ach14',
    name:        'Full Playlist — The Hollow Names',
    symbol:      '🎵',
    category:    'Vault 18 — The Hollow Names',
    description: 'Listened to every recovered recording in The Hollow Names.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's18_ach15',
    name:        'Vault Unsealed — The Hollow Names',
    symbol:      '🔓',
    category:    'Vault 18 — The Hollow Names',
    description: 'Unlocked the The Hollow Names vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's18_ach16',
    name:        'Perfect Record — The Hollow Names',
    symbol:      '🏆',
    category:    'Vault 18 — The Hollow Names',
    description: 'Earned every achievement in The Hollow Names.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['205','206','207','208','209','210','211','212','213','214','215','216'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 19 — The Bridge Burner --
  {
    id:          's19_ach01',
    name:        'First File — The Bridge Burner',
    symbol:      '📁',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Opened the first case of The Bridge Burner.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's19_ach02',
    name:        'Three Files — The Bridge Burner',
    symbol:      '📂',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Solved 3 cases in The Bridge Burner.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's19_ach03',
    name:        'Six Files — The Bridge Burner',
    symbol:      '📚',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Solved 6 cases in The Bridge Burner.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's19_ach04',
    name:        'Nine Files — The Bridge Burner',
    symbol:      '🗄',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Solved 9 cases in The Bridge Burner.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's19_ach05',
    name:        'Season Closed — The Bridge Burner',
    symbol:      '✅',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Solved every case in The Bridge Burner.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's19_ach06',
    name:        'Evidence 25% — The Bridge Burner',
    symbol:      '🧪',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Recovered a quarter of the evidence in The Bridge Burner.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's19_ach07',
    name:        'Evidence 50% — The Bridge Burner',
    symbol:      '🧪',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Recovered half the evidence in The Bridge Burner.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's19_ach08',
    name:        'Evidence 75% — The Bridge Burner',
    symbol:      '🧪',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Recovered most of the evidence in The Bridge Burner.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's19_ach09',
    name:        'Evidence 100% — The Bridge Burner',
    symbol:      '🧪',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Recovered every piece of evidence in The Bridge Burner.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's19_ach10',
    name:        'First Try — The Bridge Burner',
    symbol:      '🎯',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Solved every case in The Bridge Burner on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's19_ach11',
    name:        'No Hints — The Bridge Burner',
    symbol:      '🧠',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Completed The Bridge Burner without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's19_ach12',
    name:        'Under Time — The Bridge Burner',
    symbol:      '⏱',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Completed The Bridge Burner within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's19_ach13',
    name:        'Case Notes Read — The Bridge Burner',
    symbol:      '📝',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Reviewed every incident report in The Bridge Burner.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's19_ach14',
    name:        'Full Playlist — The Bridge Burner',
    symbol:      '🎵',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Listened to every recovered recording in The Bridge Burner.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's19_ach15',
    name:        'Vault Unsealed — The Bridge Burner',
    symbol:      '🔓',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Unlocked the The Bridge Burner vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's19_ach16',
    name:        'Perfect Record — The Bridge Burner',
    symbol:      '🏆',
    category:    'Vault 19 — The Bridge Burner',
    description: 'Earned every achievement in The Bridge Burner.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['217','218','219','220','221','222','223','224','225','226','227','228'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 20 — The Midnight Circuit --
  {
    id:          's20_ach01',
    name:        'First File — The Midnight Circuit',
    symbol:      '📁',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Opened the first case of The Midnight Circuit.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's20_ach02',
    name:        'Three Files — The Midnight Circuit',
    symbol:      '📂',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Solved 3 cases in The Midnight Circuit.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's20_ach03',
    name:        'Six Files — The Midnight Circuit',
    symbol:      '📚',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Solved 6 cases in The Midnight Circuit.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's20_ach04',
    name:        'Nine Files — The Midnight Circuit',
    symbol:      '🗄',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Solved 9 cases in The Midnight Circuit.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's20_ach05',
    name:        'Season Closed — The Midnight Circuit',
    symbol:      '✅',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Solved every case in The Midnight Circuit.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's20_ach06',
    name:        'Evidence 25% — The Midnight Circuit',
    symbol:      '🧪',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Recovered a quarter of the evidence in The Midnight Circuit.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's20_ach07',
    name:        'Evidence 50% — The Midnight Circuit',
    symbol:      '🧪',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Recovered half the evidence in The Midnight Circuit.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's20_ach08',
    name:        'Evidence 75% — The Midnight Circuit',
    symbol:      '🧪',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Recovered most of the evidence in The Midnight Circuit.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's20_ach09',
    name:        'Evidence 100% — The Midnight Circuit',
    symbol:      '🧪',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Recovered every piece of evidence in The Midnight Circuit.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's20_ach10',
    name:        'First Try — The Midnight Circuit',
    symbol:      '🎯',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Solved every case in The Midnight Circuit on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's20_ach11',
    name:        'No Hints — The Midnight Circuit',
    symbol:      '🧠',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Completed The Midnight Circuit without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's20_ach12',
    name:        'Under Time — The Midnight Circuit',
    symbol:      '⏱',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Completed The Midnight Circuit within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's20_ach13',
    name:        'Case Notes Read — The Midnight Circuit',
    symbol:      '📝',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Reviewed every incident report in The Midnight Circuit.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's20_ach14',
    name:        'Full Playlist — The Midnight Circuit',
    symbol:      '🎵',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Listened to every recovered recording in The Midnight Circuit.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's20_ach15',
    name:        'Vault Unsealed — The Midnight Circuit',
    symbol:      '🔓',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Unlocked the The Midnight Circuit vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's20_ach16',
    name:        'Perfect Record — The Midnight Circuit',
    symbol:      '🏆',
    category:    'Vault 20 — The Midnight Circuit',
    description: 'Earned every achievement in The Midnight Circuit.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['229','230','231','232','233','234','235','236','237','238','239','240'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 21 — The Witness Tree --
  {
    id:          's21_ach01',
    name:        'First File — The Witness Tree',
    symbol:      '📁',
    category:    'Vault 21 — The Witness Tree',
    description: 'Opened the first case of The Witness Tree.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's21_ach02',
    name:        'Three Files — The Witness Tree',
    symbol:      '📂',
    category:    'Vault 21 — The Witness Tree',
    description: 'Solved 3 cases in The Witness Tree.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's21_ach03',
    name:        'Six Files — The Witness Tree',
    symbol:      '📚',
    category:    'Vault 21 — The Witness Tree',
    description: 'Solved 6 cases in The Witness Tree.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's21_ach04',
    name:        'Nine Files — The Witness Tree',
    symbol:      '🗄',
    category:    'Vault 21 — The Witness Tree',
    description: 'Solved 9 cases in The Witness Tree.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's21_ach05',
    name:        'Season Closed — The Witness Tree',
    symbol:      '✅',
    category:    'Vault 21 — The Witness Tree',
    description: 'Solved every case in The Witness Tree.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's21_ach06',
    name:        'Evidence 25% — The Witness Tree',
    symbol:      '🧪',
    category:    'Vault 21 — The Witness Tree',
    description: 'Recovered a quarter of the evidence in The Witness Tree.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's21_ach07',
    name:        'Evidence 50% — The Witness Tree',
    symbol:      '🧪',
    category:    'Vault 21 — The Witness Tree',
    description: 'Recovered half the evidence in The Witness Tree.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's21_ach08',
    name:        'Evidence 75% — The Witness Tree',
    symbol:      '🧪',
    category:    'Vault 21 — The Witness Tree',
    description: 'Recovered most of the evidence in The Witness Tree.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's21_ach09',
    name:        'Evidence 100% — The Witness Tree',
    symbol:      '🧪',
    category:    'Vault 21 — The Witness Tree',
    description: 'Recovered every piece of evidence in The Witness Tree.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's21_ach10',
    name:        'First Try — The Witness Tree',
    symbol:      '🎯',
    category:    'Vault 21 — The Witness Tree',
    description: 'Solved every case in The Witness Tree on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's21_ach11',
    name:        'No Hints — The Witness Tree',
    symbol:      '🧠',
    category:    'Vault 21 — The Witness Tree',
    description: 'Completed The Witness Tree without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's21_ach12',
    name:        'Under Time — The Witness Tree',
    symbol:      '⏱',
    category:    'Vault 21 — The Witness Tree',
    description: 'Completed The Witness Tree within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's21_ach13',
    name:        'Case Notes Read — The Witness Tree',
    symbol:      '📝',
    category:    'Vault 21 — The Witness Tree',
    description: 'Reviewed every incident report in The Witness Tree.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's21_ach14',
    name:        'Full Playlist — The Witness Tree',
    symbol:      '🎵',
    category:    'Vault 21 — The Witness Tree',
    description: 'Listened to every recovered recording in The Witness Tree.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's21_ach15',
    name:        'Vault Unsealed — The Witness Tree',
    symbol:      '🔓',
    category:    'Vault 21 — The Witness Tree',
    description: 'Unlocked the The Witness Tree vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's21_ach16',
    name:        'Perfect Record — The Witness Tree',
    symbol:      '🏆',
    category:    'Vault 21 — The Witness Tree',
    description: 'Earned every achievement in The Witness Tree.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['241','242','243','244','245','246','247','248','249','250','251','252'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 22 — The Bone Road --
  {
    id:          's22_ach01',
    name:        'First File — The Bone Road',
    symbol:      '📁',
    category:    'Vault 22 — The Bone Road',
    description: 'Opened the first case of The Bone Road.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's22_ach02',
    name:        'Three Files — The Bone Road',
    symbol:      '📂',
    category:    'Vault 22 — The Bone Road',
    description: 'Solved 3 cases in The Bone Road.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's22_ach03',
    name:        'Six Files — The Bone Road',
    symbol:      '📚',
    category:    'Vault 22 — The Bone Road',
    description: 'Solved 6 cases in The Bone Road.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's22_ach04',
    name:        'Nine Files — The Bone Road',
    symbol:      '🗄',
    category:    'Vault 22 — The Bone Road',
    description: 'Solved 9 cases in The Bone Road.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's22_ach05',
    name:        'Season Closed — The Bone Road',
    symbol:      '✅',
    category:    'Vault 22 — The Bone Road',
    description: 'Solved every case in The Bone Road.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's22_ach06',
    name:        'Evidence 25% — The Bone Road',
    symbol:      '🧪',
    category:    'Vault 22 — The Bone Road',
    description: 'Recovered a quarter of the evidence in The Bone Road.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's22_ach07',
    name:        'Evidence 50% — The Bone Road',
    symbol:      '🧪',
    category:    'Vault 22 — The Bone Road',
    description: 'Recovered half the evidence in The Bone Road.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's22_ach08',
    name:        'Evidence 75% — The Bone Road',
    symbol:      '🧪',
    category:    'Vault 22 — The Bone Road',
    description: 'Recovered most of the evidence in The Bone Road.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's22_ach09',
    name:        'Evidence 100% — The Bone Road',
    symbol:      '🧪',
    category:    'Vault 22 — The Bone Road',
    description: 'Recovered every piece of evidence in The Bone Road.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's22_ach10',
    name:        'First Try — The Bone Road',
    symbol:      '🎯',
    category:    'Vault 22 — The Bone Road',
    description: 'Solved every case in The Bone Road on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's22_ach11',
    name:        'No Hints — The Bone Road',
    symbol:      '🧠',
    category:    'Vault 22 — The Bone Road',
    description: 'Completed The Bone Road without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's22_ach12',
    name:        'Under Time — The Bone Road',
    symbol:      '⏱',
    category:    'Vault 22 — The Bone Road',
    description: 'Completed The Bone Road within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's22_ach13',
    name:        'Case Notes Read — The Bone Road',
    symbol:      '📝',
    category:    'Vault 22 — The Bone Road',
    description: 'Reviewed every incident report in The Bone Road.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's22_ach14',
    name:        'Full Playlist — The Bone Road',
    symbol:      '🎵',
    category:    'Vault 22 — The Bone Road',
    description: 'Listened to every recovered recording in The Bone Road.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's22_ach15',
    name:        'Vault Unsealed — The Bone Road',
    symbol:      '🔓',
    category:    'Vault 22 — The Bone Road',
    description: 'Unlocked the The Bone Road vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's22_ach16',
    name:        'Perfect Record — The Bone Road',
    symbol:      '🏆',
    category:    'Vault 22 — The Bone Road',
    description: 'Earned every achievement in The Bone Road.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['253','254','255','256','257','258','259','260','261','262','263','264'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 23 — The Paper Trail --
  {
    id:          's23_ach01',
    name:        'First File — The Paper Trail',
    symbol:      '📁',
    category:    'Vault 23 — The Paper Trail',
    description: 'Opened the first case of The Paper Trail.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's23_ach02',
    name:        'Three Files — The Paper Trail',
    symbol:      '📂',
    category:    'Vault 23 — The Paper Trail',
    description: 'Solved 3 cases in The Paper Trail.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's23_ach03',
    name:        'Six Files — The Paper Trail',
    symbol:      '📚',
    category:    'Vault 23 — The Paper Trail',
    description: 'Solved 6 cases in The Paper Trail.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's23_ach04',
    name:        'Nine Files — The Paper Trail',
    symbol:      '🗄',
    category:    'Vault 23 — The Paper Trail',
    description: 'Solved 9 cases in The Paper Trail.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's23_ach05',
    name:        'Season Closed — The Paper Trail',
    symbol:      '✅',
    category:    'Vault 23 — The Paper Trail',
    description: 'Solved every case in The Paper Trail.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's23_ach06',
    name:        'Evidence 25% — The Paper Trail',
    symbol:      '🧪',
    category:    'Vault 23 — The Paper Trail',
    description: 'Recovered a quarter of the evidence in The Paper Trail.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's23_ach07',
    name:        'Evidence 50% — The Paper Trail',
    symbol:      '🧪',
    category:    'Vault 23 — The Paper Trail',
    description: 'Recovered half the evidence in The Paper Trail.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's23_ach08',
    name:        'Evidence 75% — The Paper Trail',
    symbol:      '🧪',
    category:    'Vault 23 — The Paper Trail',
    description: 'Recovered most of the evidence in The Paper Trail.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's23_ach09',
    name:        'Evidence 100% — The Paper Trail',
    symbol:      '🧪',
    category:    'Vault 23 — The Paper Trail',
    description: 'Recovered every piece of evidence in The Paper Trail.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's23_ach10',
    name:        'First Try — The Paper Trail',
    symbol:      '🎯',
    category:    'Vault 23 — The Paper Trail',
    description: 'Solved every case in The Paper Trail on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's23_ach11',
    name:        'No Hints — The Paper Trail',
    symbol:      '🧠',
    category:    'Vault 23 — The Paper Trail',
    description: 'Completed The Paper Trail without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's23_ach12',
    name:        'Under Time — The Paper Trail',
    symbol:      '⏱',
    category:    'Vault 23 — The Paper Trail',
    description: 'Completed The Paper Trail within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's23_ach13',
    name:        'Case Notes Read — The Paper Trail',
    symbol:      '📝',
    category:    'Vault 23 — The Paper Trail',
    description: 'Reviewed every incident report in The Paper Trail.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's23_ach14',
    name:        'Full Playlist — The Paper Trail',
    symbol:      '🎵',
    category:    'Vault 23 — The Paper Trail',
    description: 'Listened to every recovered recording in The Paper Trail.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's23_ach15',
    name:        'Vault Unsealed — The Paper Trail',
    symbol:      '🔓',
    category:    'Vault 23 — The Paper Trail',
    description: 'Unlocked the The Paper Trail vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's23_ach16',
    name:        'Perfect Record — The Paper Trail',
    symbol:      '🏆',
    category:    'Vault 23 — The Paper Trail',
    description: 'Earned every achievement in The Paper Trail.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['265','266','267','268','269','270','271','272','273','274','275','276'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 24 — The Missing Hours --
  {
    id:          's24_ach01',
    name:        'First File — The Missing Hours',
    symbol:      '📁',
    category:    'Vault 24 — The Missing Hours',
    description: 'Opened the first case of The Missing Hours.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's24_ach02',
    name:        'Three Files — The Missing Hours',
    symbol:      '📂',
    category:    'Vault 24 — The Missing Hours',
    description: 'Solved 3 cases in The Missing Hours.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's24_ach03',
    name:        'Six Files — The Missing Hours',
    symbol:      '📚',
    category:    'Vault 24 — The Missing Hours',
    description: 'Solved 6 cases in The Missing Hours.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's24_ach04',
    name:        'Nine Files — The Missing Hours',
    symbol:      '🗄',
    category:    'Vault 24 — The Missing Hours',
    description: 'Solved 9 cases in The Missing Hours.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's24_ach05',
    name:        'Season Closed — The Missing Hours',
    symbol:      '✅',
    category:    'Vault 24 — The Missing Hours',
    description: 'Solved every case in The Missing Hours.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's24_ach06',
    name:        'Evidence 25% — The Missing Hours',
    symbol:      '🧪',
    category:    'Vault 24 — The Missing Hours',
    description: 'Recovered a quarter of the evidence in The Missing Hours.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's24_ach07',
    name:        'Evidence 50% — The Missing Hours',
    symbol:      '🧪',
    category:    'Vault 24 — The Missing Hours',
    description: 'Recovered half the evidence in The Missing Hours.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's24_ach08',
    name:        'Evidence 75% — The Missing Hours',
    symbol:      '🧪',
    category:    'Vault 24 — The Missing Hours',
    description: 'Recovered most of the evidence in The Missing Hours.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's24_ach09',
    name:        'Evidence 100% — The Missing Hours',
    symbol:      '🧪',
    category:    'Vault 24 — The Missing Hours',
    description: 'Recovered every piece of evidence in The Missing Hours.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's24_ach10',
    name:        'First Try — The Missing Hours',
    symbol:      '🎯',
    category:    'Vault 24 — The Missing Hours',
    description: 'Solved every case in The Missing Hours on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's24_ach11',
    name:        'No Hints — The Missing Hours',
    symbol:      '🧠',
    category:    'Vault 24 — The Missing Hours',
    description: 'Completed The Missing Hours without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's24_ach12',
    name:        'Under Time — The Missing Hours',
    symbol:      '⏱',
    category:    'Vault 24 — The Missing Hours',
    description: 'Completed The Missing Hours within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's24_ach13',
    name:        'Case Notes Read — The Missing Hours',
    symbol:      '📝',
    category:    'Vault 24 — The Missing Hours',
    description: 'Reviewed every incident report in The Missing Hours.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's24_ach14',
    name:        'Full Playlist — The Missing Hours',
    symbol:      '🎵',
    category:    'Vault 24 — The Missing Hours',
    description: 'Listened to every recovered recording in The Missing Hours.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's24_ach15',
    name:        'Vault Unsealed — The Missing Hours',
    symbol:      '🔓',
    category:    'Vault 24 — The Missing Hours',
    description: 'Unlocked the The Missing Hours vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's24_ach16',
    name:        'Perfect Record — The Missing Hours',
    symbol:      '🏆',
    category:    'Vault 24 — The Missing Hours',
    description: 'Earned every achievement in The Missing Hours.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['277','278','279','280','281','282','283','284','285','286','287','288'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 25 — The Echo Chamber --
  {
    id:          's25_ach01',
    name:        'First File — The Echo Chamber',
    symbol:      '📁',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Opened the first case of The Echo Chamber.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's25_ach02',
    name:        'Three Files — The Echo Chamber',
    symbol:      '📂',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Solved 3 cases in The Echo Chamber.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's25_ach03',
    name:        'Six Files — The Echo Chamber',
    symbol:      '📚',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Solved 6 cases in The Echo Chamber.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's25_ach04',
    name:        'Nine Files — The Echo Chamber',
    symbol:      '🗄',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Solved 9 cases in The Echo Chamber.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's25_ach05',
    name:        'Season Closed — The Echo Chamber',
    symbol:      '✅',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Solved every case in The Echo Chamber.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's25_ach06',
    name:        'Evidence 25% — The Echo Chamber',
    symbol:      '🧪',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Recovered a quarter of the evidence in The Echo Chamber.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's25_ach07',
    name:        'Evidence 50% — The Echo Chamber',
    symbol:      '🧪',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Recovered half the evidence in The Echo Chamber.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's25_ach08',
    name:        'Evidence 75% — The Echo Chamber',
    symbol:      '🧪',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Recovered most of the evidence in The Echo Chamber.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's25_ach09',
    name:        'Evidence 100% — The Echo Chamber',
    symbol:      '🧪',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Recovered every piece of evidence in The Echo Chamber.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's25_ach10',
    name:        'First Try — The Echo Chamber',
    symbol:      '🎯',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Solved every case in The Echo Chamber on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's25_ach11',
    name:        'No Hints — The Echo Chamber',
    symbol:      '🧠',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Completed The Echo Chamber without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's25_ach12',
    name:        'Under Time — The Echo Chamber',
    symbol:      '⏱',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Completed The Echo Chamber within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's25_ach13',
    name:        'Case Notes Read — The Echo Chamber',
    symbol:      '📝',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Reviewed every incident report in The Echo Chamber.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's25_ach14',
    name:        'Full Playlist — The Echo Chamber',
    symbol:      '🎵',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Listened to every recovered recording in The Echo Chamber.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's25_ach15',
    name:        'Vault Unsealed — The Echo Chamber',
    symbol:      '🔓',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Unlocked the The Echo Chamber vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's25_ach16',
    name:        'Perfect Record — The Echo Chamber',
    symbol:      '🏆',
    category:    'Vault 25 — The Echo Chamber',
    description: 'Earned every achievement in The Echo Chamber.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['289','290','291','292','293','294','295','296','297','298','299','300'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 26 — The Red Door --
  {
    id:          's26_ach01',
    name:        'First File — The Red Door',
    symbol:      '📁',
    category:    'Vault 26 — The Red Door',
    description: 'Opened the first case of The Red Door.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's26_ach02',
    name:        'Three Files — The Red Door',
    symbol:      '📂',
    category:    'Vault 26 — The Red Door',
    description: 'Solved 3 cases in The Red Door.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's26_ach03',
    name:        'Six Files — The Red Door',
    symbol:      '📚',
    category:    'Vault 26 — The Red Door',
    description: 'Solved 6 cases in The Red Door.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's26_ach04',
    name:        'Nine Files — The Red Door',
    symbol:      '🗄',
    category:    'Vault 26 — The Red Door',
    description: 'Solved 9 cases in The Red Door.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's26_ach05',
    name:        'Season Closed — The Red Door',
    symbol:      '✅',
    category:    'Vault 26 — The Red Door',
    description: 'Solved every case in The Red Door.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's26_ach06',
    name:        'Evidence 25% — The Red Door',
    symbol:      '🧪',
    category:    'Vault 26 — The Red Door',
    description: 'Recovered a quarter of the evidence in The Red Door.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's26_ach07',
    name:        'Evidence 50% — The Red Door',
    symbol:      '🧪',
    category:    'Vault 26 — The Red Door',
    description: 'Recovered half the evidence in The Red Door.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's26_ach08',
    name:        'Evidence 75% — The Red Door',
    symbol:      '🧪',
    category:    'Vault 26 — The Red Door',
    description: 'Recovered most of the evidence in The Red Door.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's26_ach09',
    name:        'Evidence 100% — The Red Door',
    symbol:      '🧪',
    category:    'Vault 26 — The Red Door',
    description: 'Recovered every piece of evidence in The Red Door.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's26_ach10',
    name:        'First Try — The Red Door',
    symbol:      '🎯',
    category:    'Vault 26 — The Red Door',
    description: 'Solved every case in The Red Door on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's26_ach11',
    name:        'No Hints — The Red Door',
    symbol:      '🧠',
    category:    'Vault 26 — The Red Door',
    description: 'Completed The Red Door without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's26_ach12',
    name:        'Under Time — The Red Door',
    symbol:      '⏱',
    category:    'Vault 26 — The Red Door',
    description: 'Completed The Red Door within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's26_ach13',
    name:        'Case Notes Read — The Red Door',
    symbol:      '📝',
    category:    'Vault 26 — The Red Door',
    description: 'Reviewed every incident report in The Red Door.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's26_ach14',
    name:        'Full Playlist — The Red Door',
    symbol:      '🎵',
    category:    'Vault 26 — The Red Door',
    description: 'Listened to every recovered recording in The Red Door.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's26_ach15',
    name:        'Vault Unsealed — The Red Door',
    symbol:      '🔓',
    category:    'Vault 26 — The Red Door',
    description: 'Unlocked the The Red Door vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's26_ach16',
    name:        'Perfect Record — The Red Door',
    symbol:      '🏆',
    category:    'Vault 26 — The Red Door',
    description: 'Earned every achievement in The Red Door.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['301','302','303','304','305','306','307','308','309','310','311','312'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 27 — The Salt Flats --
  {
    id:          's27_ach01',
    name:        'First File — The Salt Flats',
    symbol:      '📁',
    category:    'Vault 27 — The Salt Flats',
    description: 'Opened the first case of The Salt Flats.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's27_ach02',
    name:        'Three Files — The Salt Flats',
    symbol:      '📂',
    category:    'Vault 27 — The Salt Flats',
    description: 'Solved 3 cases in The Salt Flats.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's27_ach03',
    name:        'Six Files — The Salt Flats',
    symbol:      '📚',
    category:    'Vault 27 — The Salt Flats',
    description: 'Solved 6 cases in The Salt Flats.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's27_ach04',
    name:        'Nine Files — The Salt Flats',
    symbol:      '🗄',
    category:    'Vault 27 — The Salt Flats',
    description: 'Solved 9 cases in The Salt Flats.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's27_ach05',
    name:        'Season Closed — The Salt Flats',
    symbol:      '✅',
    category:    'Vault 27 — The Salt Flats',
    description: 'Solved every case in The Salt Flats.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's27_ach06',
    name:        'Evidence 25% — The Salt Flats',
    symbol:      '🧪',
    category:    'Vault 27 — The Salt Flats',
    description: 'Recovered a quarter of the evidence in The Salt Flats.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's27_ach07',
    name:        'Evidence 50% — The Salt Flats',
    symbol:      '🧪',
    category:    'Vault 27 — The Salt Flats',
    description: 'Recovered half the evidence in The Salt Flats.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's27_ach08',
    name:        'Evidence 75% — The Salt Flats',
    symbol:      '🧪',
    category:    'Vault 27 — The Salt Flats',
    description: 'Recovered most of the evidence in The Salt Flats.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's27_ach09',
    name:        'Evidence 100% — The Salt Flats',
    symbol:      '🧪',
    category:    'Vault 27 — The Salt Flats',
    description: 'Recovered every piece of evidence in The Salt Flats.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's27_ach10',
    name:        'First Try — The Salt Flats',
    symbol:      '🎯',
    category:    'Vault 27 — The Salt Flats',
    description: 'Solved every case in The Salt Flats on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's27_ach11',
    name:        'No Hints — The Salt Flats',
    symbol:      '🧠',
    category:    'Vault 27 — The Salt Flats',
    description: 'Completed The Salt Flats without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's27_ach12',
    name:        'Under Time — The Salt Flats',
    symbol:      '⏱',
    category:    'Vault 27 — The Salt Flats',
    description: 'Completed The Salt Flats within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's27_ach13',
    name:        'Case Notes Read — The Salt Flats',
    symbol:      '📝',
    category:    'Vault 27 — The Salt Flats',
    description: 'Reviewed every incident report in The Salt Flats.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's27_ach14',
    name:        'Full Playlist — The Salt Flats',
    symbol:      '🎵',
    category:    'Vault 27 — The Salt Flats',
    description: 'Listened to every recovered recording in The Salt Flats.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's27_ach15',
    name:        'Vault Unsealed — The Salt Flats',
    symbol:      '🔓',
    category:    'Vault 27 — The Salt Flats',
    description: 'Unlocked the The Salt Flats vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's27_ach16',
    name:        'Perfect Record — The Salt Flats',
    symbol:      '🏆',
    category:    'Vault 27 — The Salt Flats',
    description: 'Earned every achievement in The Salt Flats.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['313','314','315','316','317','318','319','320','321','322','323','324'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 28 — The Buried Signal --
  {
    id:          's28_ach01',
    name:        'First File — The Buried Signal',
    symbol:      '📁',
    category:    'Vault 28 — The Buried Signal',
    description: 'Opened the first case of The Buried Signal.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's28_ach02',
    name:        'Three Files — The Buried Signal',
    symbol:      '📂',
    category:    'Vault 28 — The Buried Signal',
    description: 'Solved 3 cases in The Buried Signal.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's28_ach03',
    name:        'Six Files — The Buried Signal',
    symbol:      '📚',
    category:    'Vault 28 — The Buried Signal',
    description: 'Solved 6 cases in The Buried Signal.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's28_ach04',
    name:        'Nine Files — The Buried Signal',
    symbol:      '🗄',
    category:    'Vault 28 — The Buried Signal',
    description: 'Solved 9 cases in The Buried Signal.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's28_ach05',
    name:        'Season Closed — The Buried Signal',
    symbol:      '✅',
    category:    'Vault 28 — The Buried Signal',
    description: 'Solved every case in The Buried Signal.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's28_ach06',
    name:        'Evidence 25% — The Buried Signal',
    symbol:      '🧪',
    category:    'Vault 28 — The Buried Signal',
    description: 'Recovered a quarter of the evidence in The Buried Signal.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's28_ach07',
    name:        'Evidence 50% — The Buried Signal',
    symbol:      '🧪',
    category:    'Vault 28 — The Buried Signal',
    description: 'Recovered half the evidence in The Buried Signal.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's28_ach08',
    name:        'Evidence 75% — The Buried Signal',
    symbol:      '🧪',
    category:    'Vault 28 — The Buried Signal',
    description: 'Recovered most of the evidence in The Buried Signal.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's28_ach09',
    name:        'Evidence 100% — The Buried Signal',
    symbol:      '🧪',
    category:    'Vault 28 — The Buried Signal',
    description: 'Recovered every piece of evidence in The Buried Signal.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's28_ach10',
    name:        'First Try — The Buried Signal',
    symbol:      '🎯',
    category:    'Vault 28 — The Buried Signal',
    description: 'Solved every case in The Buried Signal on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's28_ach11',
    name:        'No Hints — The Buried Signal',
    symbol:      '🧠',
    category:    'Vault 28 — The Buried Signal',
    description: 'Completed The Buried Signal without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's28_ach12',
    name:        'Under Time — The Buried Signal',
    symbol:      '⏱',
    category:    'Vault 28 — The Buried Signal',
    description: 'Completed The Buried Signal within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's28_ach13',
    name:        'Case Notes Read — The Buried Signal',
    symbol:      '📝',
    category:    'Vault 28 — The Buried Signal',
    description: 'Reviewed every incident report in The Buried Signal.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's28_ach14',
    name:        'Full Playlist — The Buried Signal',
    symbol:      '🎵',
    category:    'Vault 28 — The Buried Signal',
    description: 'Listened to every recovered recording in The Buried Signal.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's28_ach15',
    name:        'Vault Unsealed — The Buried Signal',
    symbol:      '🔓',
    category:    'Vault 28 — The Buried Signal',
    description: 'Unlocked the The Buried Signal vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's28_ach16',
    name:        'Perfect Record — The Buried Signal',
    symbol:      '🏆',
    category:    'Vault 28 — The Buried Signal',
    description: 'Earned every achievement in The Buried Signal.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['325','326','327','328','329','330','331','332','333','334','335','336'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 29 — The Unmarked Grave --
  {
    id:          's29_ach01',
    name:        'First File — The Unmarked Grave',
    symbol:      '📁',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Opened the first case of The Unmarked Grave.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's29_ach02',
    name:        'Three Files — The Unmarked Grave',
    symbol:      '📂',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Solved 3 cases in The Unmarked Grave.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's29_ach03',
    name:        'Six Files — The Unmarked Grave',
    symbol:      '📚',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Solved 6 cases in The Unmarked Grave.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's29_ach04',
    name:        'Nine Files — The Unmarked Grave',
    symbol:      '🗄',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Solved 9 cases in The Unmarked Grave.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's29_ach05',
    name:        'Season Closed — The Unmarked Grave',
    symbol:      '✅',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Solved every case in The Unmarked Grave.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's29_ach06',
    name:        'Evidence 25% — The Unmarked Grave',
    symbol:      '🧪',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Recovered a quarter of the evidence in The Unmarked Grave.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's29_ach07',
    name:        'Evidence 50% — The Unmarked Grave',
    symbol:      '🧪',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Recovered half the evidence in The Unmarked Grave.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's29_ach08',
    name:        'Evidence 75% — The Unmarked Grave',
    symbol:      '🧪',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Recovered most of the evidence in The Unmarked Grave.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's29_ach09',
    name:        'Evidence 100% — The Unmarked Grave',
    symbol:      '🧪',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Recovered every piece of evidence in The Unmarked Grave.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's29_ach10',
    name:        'First Try — The Unmarked Grave',
    symbol:      '🎯',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Solved every case in The Unmarked Grave on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's29_ach11',
    name:        'No Hints — The Unmarked Grave',
    symbol:      '🧠',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Completed The Unmarked Grave without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's29_ach12',
    name:        'Under Time — The Unmarked Grave',
    symbol:      '⏱',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Completed The Unmarked Grave within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's29_ach13',
    name:        'Case Notes Read — The Unmarked Grave',
    symbol:      '📝',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Reviewed every incident report in The Unmarked Grave.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's29_ach14',
    name:        'Full Playlist — The Unmarked Grave',
    symbol:      '🎵',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Listened to every recovered recording in The Unmarked Grave.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's29_ach15',
    name:        'Vault Unsealed — The Unmarked Grave',
    symbol:      '🔓',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Unlocked the The Unmarked Grave vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's29_ach16',
    name:        'Perfect Record — The Unmarked Grave',
    symbol:      '🏆',
    category:    'Vault 29 — The Unmarked Grave',
    description: 'Earned every achievement in The Unmarked Grave.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['337','338','339','340','341','342','343','344','345','346','347','348'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 30 — The Last Train --
  {
    id:          's30_ach01',
    name:        'First File — The Last Train',
    symbol:      '📁',
    category:    'Vault 30 — The Last Train',
    description: 'Opened the first case of The Last Train.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's30_ach02',
    name:        'Three Files — The Last Train',
    symbol:      '📂',
    category:    'Vault 30 — The Last Train',
    description: 'Solved 3 cases in The Last Train.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's30_ach03',
    name:        'Six Files — The Last Train',
    symbol:      '📚',
    category:    'Vault 30 — The Last Train',
    description: 'Solved 6 cases in The Last Train.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's30_ach04',
    name:        'Nine Files — The Last Train',
    symbol:      '🗄',
    category:    'Vault 30 — The Last Train',
    description: 'Solved 9 cases in The Last Train.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's30_ach05',
    name:        'Season Closed — The Last Train',
    symbol:      '✅',
    category:    'Vault 30 — The Last Train',
    description: 'Solved every case in The Last Train.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's30_ach06',
    name:        'Evidence 25% — The Last Train',
    symbol:      '🧪',
    category:    'Vault 30 — The Last Train',
    description: 'Recovered a quarter of the evidence in The Last Train.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's30_ach07',
    name:        'Evidence 50% — The Last Train',
    symbol:      '🧪',
    category:    'Vault 30 — The Last Train',
    description: 'Recovered half the evidence in The Last Train.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's30_ach08',
    name:        'Evidence 75% — The Last Train',
    symbol:      '🧪',
    category:    'Vault 30 — The Last Train',
    description: 'Recovered most of the evidence in The Last Train.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's30_ach09',
    name:        'Evidence 100% — The Last Train',
    symbol:      '🧪',
    category:    'Vault 30 — The Last Train',
    description: 'Recovered every piece of evidence in The Last Train.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's30_ach10',
    name:        'First Try — The Last Train',
    symbol:      '🎯',
    category:    'Vault 30 — The Last Train',
    description: 'Solved every case in The Last Train on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's30_ach11',
    name:        'No Hints — The Last Train',
    symbol:      '🧠',
    category:    'Vault 30 — The Last Train',
    description: 'Completed The Last Train without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's30_ach12',
    name:        'Under Time — The Last Train',
    symbol:      '⏱',
    category:    'Vault 30 — The Last Train',
    description: 'Completed The Last Train within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's30_ach13',
    name:        'Case Notes Read — The Last Train',
    symbol:      '📝',
    category:    'Vault 30 — The Last Train',
    description: 'Reviewed every incident report in The Last Train.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's30_ach14',
    name:        'Full Playlist — The Last Train',
    symbol:      '🎵',
    category:    'Vault 30 — The Last Train',
    description: 'Listened to every recovered recording in The Last Train.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's30_ach15',
    name:        'Vault Unsealed — The Last Train',
    symbol:      '🔓',
    category:    'Vault 30 — The Last Train',
    description: 'Unlocked the The Last Train vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's30_ach16',
    name:        'Perfect Record — The Last Train',
    symbol:      '🏆',
    category:    'Vault 30 — The Last Train',
    description: 'Earned every achievement in The Last Train.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['349','350','351','352','353','354','355','356','357','358','359','360'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 31 — The Cipher Garden --
  {
    id:          's31_ach01',
    name:        'First File — The Cipher Garden',
    symbol:      '📁',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Opened the first case of The Cipher Garden.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's31_ach02',
    name:        'Three Files — The Cipher Garden',
    symbol:      '📂',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Solved 3 cases in The Cipher Garden.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's31_ach03',
    name:        'Six Files — The Cipher Garden',
    symbol:      '📚',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Solved 6 cases in The Cipher Garden.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's31_ach04',
    name:        'Nine Files — The Cipher Garden',
    symbol:      '🗄',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Solved 9 cases in The Cipher Garden.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's31_ach05',
    name:        'Season Closed — The Cipher Garden',
    symbol:      '✅',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Solved every case in The Cipher Garden.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's31_ach06',
    name:        'Evidence 25% — The Cipher Garden',
    symbol:      '🧪',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Recovered a quarter of the evidence in The Cipher Garden.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's31_ach07',
    name:        'Evidence 50% — The Cipher Garden',
    symbol:      '🧪',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Recovered half the evidence in The Cipher Garden.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's31_ach08',
    name:        'Evidence 75% — The Cipher Garden',
    symbol:      '🧪',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Recovered most of the evidence in The Cipher Garden.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's31_ach09',
    name:        'Evidence 100% — The Cipher Garden',
    symbol:      '🧪',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Recovered every piece of evidence in The Cipher Garden.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's31_ach10',
    name:        'First Try — The Cipher Garden',
    symbol:      '🎯',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Solved every case in The Cipher Garden on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's31_ach11',
    name:        'No Hints — The Cipher Garden',
    symbol:      '🧠',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Completed The Cipher Garden without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's31_ach12',
    name:        'Under Time — The Cipher Garden',
    symbol:      '⏱',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Completed The Cipher Garden within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's31_ach13',
    name:        'Case Notes Read — The Cipher Garden',
    symbol:      '📝',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Reviewed every incident report in The Cipher Garden.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's31_ach14',
    name:        'Full Playlist — The Cipher Garden',
    symbol:      '🎵',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Listened to every recovered recording in The Cipher Garden.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's31_ach15',
    name:        'Vault Unsealed — The Cipher Garden',
    symbol:      '🔓',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Unlocked the The Cipher Garden vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's31_ach16',
    name:        'Perfect Record — The Cipher Garden',
    symbol:      '🏆',
    category:    'Vault 31 — The Cipher Garden',
    description: 'Earned every achievement in The Cipher Garden.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['361','362','363','364','365','366','367','368','369','370','371','372'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 32 — The Deep Current --
  {
    id:          's32_ach01',
    name:        'First File — The Deep Current',
    symbol:      '📁',
    category:    'Vault 32 — The Deep Current',
    description: 'Opened the first case of The Deep Current.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's32_ach02',
    name:        'Three Files — The Deep Current',
    symbol:      '📂',
    category:    'Vault 32 — The Deep Current',
    description: 'Solved 3 cases in The Deep Current.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's32_ach03',
    name:        'Six Files — The Deep Current',
    symbol:      '📚',
    category:    'Vault 32 — The Deep Current',
    description: 'Solved 6 cases in The Deep Current.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's32_ach04',
    name:        'Nine Files — The Deep Current',
    symbol:      '🗄',
    category:    'Vault 32 — The Deep Current',
    description: 'Solved 9 cases in The Deep Current.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's32_ach05',
    name:        'Season Closed — The Deep Current',
    symbol:      '✅',
    category:    'Vault 32 — The Deep Current',
    description: 'Solved every case in The Deep Current.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's32_ach06',
    name:        'Evidence 25% — The Deep Current',
    symbol:      '🧪',
    category:    'Vault 32 — The Deep Current',
    description: 'Recovered a quarter of the evidence in The Deep Current.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's32_ach07',
    name:        'Evidence 50% — The Deep Current',
    symbol:      '🧪',
    category:    'Vault 32 — The Deep Current',
    description: 'Recovered half the evidence in The Deep Current.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's32_ach08',
    name:        'Evidence 75% — The Deep Current',
    symbol:      '🧪',
    category:    'Vault 32 — The Deep Current',
    description: 'Recovered most of the evidence in The Deep Current.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's32_ach09',
    name:        'Evidence 100% — The Deep Current',
    symbol:      '🧪',
    category:    'Vault 32 — The Deep Current',
    description: 'Recovered every piece of evidence in The Deep Current.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's32_ach10',
    name:        'First Try — The Deep Current',
    symbol:      '🎯',
    category:    'Vault 32 — The Deep Current',
    description: 'Solved every case in The Deep Current on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's32_ach11',
    name:        'No Hints — The Deep Current',
    symbol:      '🧠',
    category:    'Vault 32 — The Deep Current',
    description: 'Completed The Deep Current without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's32_ach12',
    name:        'Under Time — The Deep Current',
    symbol:      '⏱',
    category:    'Vault 32 — The Deep Current',
    description: 'Completed The Deep Current within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's32_ach13',
    name:        'Case Notes Read — The Deep Current',
    symbol:      '📝',
    category:    'Vault 32 — The Deep Current',
    description: 'Reviewed every incident report in The Deep Current.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's32_ach14',
    name:        'Full Playlist — The Deep Current',
    symbol:      '🎵',
    category:    'Vault 32 — The Deep Current',
    description: 'Listened to every recovered recording in The Deep Current.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's32_ach15',
    name:        'Vault Unsealed — The Deep Current',
    symbol:      '🔓',
    category:    'Vault 32 — The Deep Current',
    description: 'Unlocked the The Deep Current vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's32_ach16',
    name:        'Perfect Record — The Deep Current',
    symbol:      '🏆',
    category:    'Vault 32 — The Deep Current',
    description: 'Earned every achievement in The Deep Current.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['373','374','375','376','377','378','379','380','381','382','383','384'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 33 — The Pale Season --
  {
    id:          's33_ach01',
    name:        'First File — The Pale Season',
    symbol:      '📁',
    category:    'Vault 33 — The Pale Season',
    description: 'Opened the first case of The Pale Season.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's33_ach02',
    name:        'Three Files — The Pale Season',
    symbol:      '📂',
    category:    'Vault 33 — The Pale Season',
    description: 'Solved 3 cases in The Pale Season.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's33_ach03',
    name:        'Six Files — The Pale Season',
    symbol:      '📚',
    category:    'Vault 33 — The Pale Season',
    description: 'Solved 6 cases in The Pale Season.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's33_ach04',
    name:        'Nine Files — The Pale Season',
    symbol:      '🗄',
    category:    'Vault 33 — The Pale Season',
    description: 'Solved 9 cases in The Pale Season.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's33_ach05',
    name:        'Season Closed — The Pale Season',
    symbol:      '✅',
    category:    'Vault 33 — The Pale Season',
    description: 'Solved every case in The Pale Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's33_ach06',
    name:        'Evidence 25% — The Pale Season',
    symbol:      '🧪',
    category:    'Vault 33 — The Pale Season',
    description: 'Recovered a quarter of the evidence in The Pale Season.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's33_ach07',
    name:        'Evidence 50% — The Pale Season',
    symbol:      '🧪',
    category:    'Vault 33 — The Pale Season',
    description: 'Recovered half the evidence in The Pale Season.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's33_ach08',
    name:        'Evidence 75% — The Pale Season',
    symbol:      '🧪',
    category:    'Vault 33 — The Pale Season',
    description: 'Recovered most of the evidence in The Pale Season.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's33_ach09',
    name:        'Evidence 100% — The Pale Season',
    symbol:      '🧪',
    category:    'Vault 33 — The Pale Season',
    description: 'Recovered every piece of evidence in The Pale Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's33_ach10',
    name:        'First Try — The Pale Season',
    symbol:      '🎯',
    category:    'Vault 33 — The Pale Season',
    description: 'Solved every case in The Pale Season on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's33_ach11',
    name:        'No Hints — The Pale Season',
    symbol:      '🧠',
    category:    'Vault 33 — The Pale Season',
    description: 'Completed The Pale Season without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's33_ach12',
    name:        'Under Time — The Pale Season',
    symbol:      '⏱',
    category:    'Vault 33 — The Pale Season',
    description: 'Completed The Pale Season within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's33_ach13',
    name:        'Case Notes Read — The Pale Season',
    symbol:      '📝',
    category:    'Vault 33 — The Pale Season',
    description: 'Reviewed every incident report in The Pale Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's33_ach14',
    name:        'Full Playlist — The Pale Season',
    symbol:      '🎵',
    category:    'Vault 33 — The Pale Season',
    description: 'Listened to every recovered recording in The Pale Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's33_ach15',
    name:        'Vault Unsealed — The Pale Season',
    symbol:      '🔓',
    category:    'Vault 33 — The Pale Season',
    description: 'Unlocked the The Pale Season vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's33_ach16',
    name:        'Perfect Record — The Pale Season',
    symbol:      '🏆',
    category:    'Vault 33 — The Pale Season',
    description: 'Earned every achievement in The Pale Season.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['385','386','387','388','389','390','391','392','393','394','395','396'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 34 — The Locked Ward --
  {
    id:          's34_ach01',
    name:        'First File — The Locked Ward',
    symbol:      '📁',
    category:    'Vault 34 — The Locked Ward',
    description: 'Opened the first case of The Locked Ward.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's34_ach02',
    name:        'Three Files — The Locked Ward',
    symbol:      '📂',
    category:    'Vault 34 — The Locked Ward',
    description: 'Solved 3 cases in The Locked Ward.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's34_ach03',
    name:        'Six Files — The Locked Ward',
    symbol:      '📚',
    category:    'Vault 34 — The Locked Ward',
    description: 'Solved 6 cases in The Locked Ward.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's34_ach04',
    name:        'Nine Files — The Locked Ward',
    symbol:      '🗄',
    category:    'Vault 34 — The Locked Ward',
    description: 'Solved 9 cases in The Locked Ward.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's34_ach05',
    name:        'Season Closed — The Locked Ward',
    symbol:      '✅',
    category:    'Vault 34 — The Locked Ward',
    description: 'Solved every case in The Locked Ward.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's34_ach06',
    name:        'Evidence 25% — The Locked Ward',
    symbol:      '🧪',
    category:    'Vault 34 — The Locked Ward',
    description: 'Recovered a quarter of the evidence in The Locked Ward.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's34_ach07',
    name:        'Evidence 50% — The Locked Ward',
    symbol:      '🧪',
    category:    'Vault 34 — The Locked Ward',
    description: 'Recovered half the evidence in The Locked Ward.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's34_ach08',
    name:        'Evidence 75% — The Locked Ward',
    symbol:      '🧪',
    category:    'Vault 34 — The Locked Ward',
    description: 'Recovered most of the evidence in The Locked Ward.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's34_ach09',
    name:        'Evidence 100% — The Locked Ward',
    symbol:      '🧪',
    category:    'Vault 34 — The Locked Ward',
    description: 'Recovered every piece of evidence in The Locked Ward.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's34_ach10',
    name:        'First Try — The Locked Ward',
    symbol:      '🎯',
    category:    'Vault 34 — The Locked Ward',
    description: 'Solved every case in The Locked Ward on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's34_ach11',
    name:        'No Hints — The Locked Ward',
    symbol:      '🧠',
    category:    'Vault 34 — The Locked Ward',
    description: 'Completed The Locked Ward without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's34_ach12',
    name:        'Under Time — The Locked Ward',
    symbol:      '⏱',
    category:    'Vault 34 — The Locked Ward',
    description: 'Completed The Locked Ward within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's34_ach13',
    name:        'Case Notes Read — The Locked Ward',
    symbol:      '📝',
    category:    'Vault 34 — The Locked Ward',
    description: 'Reviewed every incident report in The Locked Ward.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's34_ach14',
    name:        'Full Playlist — The Locked Ward',
    symbol:      '🎵',
    category:    'Vault 34 — The Locked Ward',
    description: 'Listened to every recovered recording in The Locked Ward.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's34_ach15',
    name:        'Vault Unsealed — The Locked Ward',
    symbol:      '🔓',
    category:    'Vault 34 — The Locked Ward',
    description: 'Unlocked the The Locked Ward vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's34_ach16',
    name:        'Perfect Record — The Locked Ward',
    symbol:      '🏆',
    category:    'Vault 34 — The Locked Ward',
    description: 'Earned every achievement in The Locked Ward.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['397','398','399','400','401','402','403','404','405','406','407','408'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 35 — The Archive Keeper --
  {
    id:          's35_ach01',
    name:        'First File — The Archive Keeper',
    symbol:      '📁',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Opened the first case of The Archive Keeper.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's35_ach02',
    name:        'Three Files — The Archive Keeper',
    symbol:      '📂',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Solved 3 cases in The Archive Keeper.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's35_ach03',
    name:        'Six Files — The Archive Keeper',
    symbol:      '📚',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Solved 6 cases in The Archive Keeper.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's35_ach04',
    name:        'Nine Files — The Archive Keeper',
    symbol:      '🗄',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Solved 9 cases in The Archive Keeper.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's35_ach05',
    name:        'Season Closed — The Archive Keeper',
    symbol:      '✅',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Solved every case in The Archive Keeper.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's35_ach06',
    name:        'Evidence 25% — The Archive Keeper',
    symbol:      '🧪',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Recovered a quarter of the evidence in The Archive Keeper.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's35_ach07',
    name:        'Evidence 50% — The Archive Keeper',
    symbol:      '🧪',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Recovered half the evidence in The Archive Keeper.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's35_ach08',
    name:        'Evidence 75% — The Archive Keeper',
    symbol:      '🧪',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Recovered most of the evidence in The Archive Keeper.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's35_ach09',
    name:        'Evidence 100% — The Archive Keeper',
    symbol:      '🧪',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Recovered every piece of evidence in The Archive Keeper.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's35_ach10',
    name:        'First Try — The Archive Keeper',
    symbol:      '🎯',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Solved every case in The Archive Keeper on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's35_ach11',
    name:        'No Hints — The Archive Keeper',
    symbol:      '🧠',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Completed The Archive Keeper without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's35_ach12',
    name:        'Under Time — The Archive Keeper',
    symbol:      '⏱',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Completed The Archive Keeper within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's35_ach13',
    name:        'Case Notes Read — The Archive Keeper',
    symbol:      '📝',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Reviewed every incident report in The Archive Keeper.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's35_ach14',
    name:        'Full Playlist — The Archive Keeper',
    symbol:      '🎵',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Listened to every recovered recording in The Archive Keeper.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's35_ach15',
    name:        'Vault Unsealed — The Archive Keeper',
    symbol:      '🔓',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Unlocked the The Archive Keeper vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's35_ach16',
    name:        'Perfect Record — The Archive Keeper',
    symbol:      '🏆',
    category:    'Vault 35 — The Archive Keeper',
    description: 'Earned every achievement in The Archive Keeper.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['409','410','411','412','413','414','415','416','417','418','419','420'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 36 — The Night Caller --
  {
    id:          's36_ach01',
    name:        'First File — The Night Caller',
    symbol:      '📁',
    category:    'Vault 36 — The Night Caller',
    description: 'Opened the first case of The Night Caller.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's36_ach02',
    name:        'Three Files — The Night Caller',
    symbol:      '📂',
    category:    'Vault 36 — The Night Caller',
    description: 'Solved 3 cases in The Night Caller.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's36_ach03',
    name:        'Six Files — The Night Caller',
    symbol:      '📚',
    category:    'Vault 36 — The Night Caller',
    description: 'Solved 6 cases in The Night Caller.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's36_ach04',
    name:        'Nine Files — The Night Caller',
    symbol:      '🗄',
    category:    'Vault 36 — The Night Caller',
    description: 'Solved 9 cases in The Night Caller.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's36_ach05',
    name:        'Season Closed — The Night Caller',
    symbol:      '✅',
    category:    'Vault 36 — The Night Caller',
    description: 'Solved every case in The Night Caller.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's36_ach06',
    name:        'Evidence 25% — The Night Caller',
    symbol:      '🧪',
    category:    'Vault 36 — The Night Caller',
    description: 'Recovered a quarter of the evidence in The Night Caller.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's36_ach07',
    name:        'Evidence 50% — The Night Caller',
    symbol:      '🧪',
    category:    'Vault 36 — The Night Caller',
    description: 'Recovered half the evidence in The Night Caller.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's36_ach08',
    name:        'Evidence 75% — The Night Caller',
    symbol:      '🧪',
    category:    'Vault 36 — The Night Caller',
    description: 'Recovered most of the evidence in The Night Caller.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's36_ach09',
    name:        'Evidence 100% — The Night Caller',
    symbol:      '🧪',
    category:    'Vault 36 — The Night Caller',
    description: 'Recovered every piece of evidence in The Night Caller.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's36_ach10',
    name:        'First Try — The Night Caller',
    symbol:      '🎯',
    category:    'Vault 36 — The Night Caller',
    description: 'Solved every case in The Night Caller on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's36_ach11',
    name:        'No Hints — The Night Caller',
    symbol:      '🧠',
    category:    'Vault 36 — The Night Caller',
    description: 'Completed The Night Caller without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's36_ach12',
    name:        'Under Time — The Night Caller',
    symbol:      '⏱',
    category:    'Vault 36 — The Night Caller',
    description: 'Completed The Night Caller within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's36_ach13',
    name:        'Case Notes Read — The Night Caller',
    symbol:      '📝',
    category:    'Vault 36 — The Night Caller',
    description: 'Reviewed every incident report in The Night Caller.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's36_ach14',
    name:        'Full Playlist — The Night Caller',
    symbol:      '🎵',
    category:    'Vault 36 — The Night Caller',
    description: 'Listened to every recovered recording in The Night Caller.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's36_ach15',
    name:        'Vault Unsealed — The Night Caller',
    symbol:      '🔓',
    category:    'Vault 36 — The Night Caller',
    description: 'Unlocked the The Night Caller vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's36_ach16',
    name:        'Perfect Record — The Night Caller',
    symbol:      '🏆',
    category:    'Vault 36 — The Night Caller',
    description: 'Earned every achievement in The Night Caller.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['421','422','423','424','425','426','427','428','429','430','431','432'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 37 — The Abandoned Post --
  {
    id:          's37_ach01',
    name:        'First File — The Abandoned Post',
    symbol:      '📁',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Opened the first case of The Abandoned Post.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's37_ach02',
    name:        'Three Files — The Abandoned Post',
    symbol:      '📂',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Solved 3 cases in The Abandoned Post.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's37_ach03',
    name:        'Six Files — The Abandoned Post',
    symbol:      '📚',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Solved 6 cases in The Abandoned Post.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's37_ach04',
    name:        'Nine Files — The Abandoned Post',
    symbol:      '🗄',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Solved 9 cases in The Abandoned Post.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's37_ach05',
    name:        'Season Closed — The Abandoned Post',
    symbol:      '✅',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Solved every case in The Abandoned Post.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's37_ach06',
    name:        'Evidence 25% — The Abandoned Post',
    symbol:      '🧪',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Recovered a quarter of the evidence in The Abandoned Post.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's37_ach07',
    name:        'Evidence 50% — The Abandoned Post',
    symbol:      '🧪',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Recovered half the evidence in The Abandoned Post.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's37_ach08',
    name:        'Evidence 75% — The Abandoned Post',
    symbol:      '🧪',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Recovered most of the evidence in The Abandoned Post.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's37_ach09',
    name:        'Evidence 100% — The Abandoned Post',
    symbol:      '🧪',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Recovered every piece of evidence in The Abandoned Post.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's37_ach10',
    name:        'First Try — The Abandoned Post',
    symbol:      '🎯',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Solved every case in The Abandoned Post on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's37_ach11',
    name:        'No Hints — The Abandoned Post',
    symbol:      '🧠',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Completed The Abandoned Post without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's37_ach12',
    name:        'Under Time — The Abandoned Post',
    symbol:      '⏱',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Completed The Abandoned Post within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's37_ach13',
    name:        'Case Notes Read — The Abandoned Post',
    symbol:      '📝',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Reviewed every incident report in The Abandoned Post.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's37_ach14',
    name:        'Full Playlist — The Abandoned Post',
    symbol:      '🎵',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Listened to every recovered recording in The Abandoned Post.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's37_ach15',
    name:        'Vault Unsealed — The Abandoned Post',
    symbol:      '🔓',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Unlocked the The Abandoned Post vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's37_ach16',
    name:        'Perfect Record — The Abandoned Post',
    symbol:      '🏆',
    category:    'Vault 37 — The Abandoned Post',
    description: 'Earned every achievement in The Abandoned Post.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['433','434','435','436','437','438','439','440','441','442','443','444'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 38 — The Signal Fire --
  {
    id:          's38_ach01',
    name:        'First File — The Signal Fire',
    symbol:      '📁',
    category:    'Vault 38 — The Signal Fire',
    description: 'Opened the first case of The Signal Fire.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's38_ach02',
    name:        'Three Files — The Signal Fire',
    symbol:      '📂',
    category:    'Vault 38 — The Signal Fire',
    description: 'Solved 3 cases in The Signal Fire.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's38_ach03',
    name:        'Six Files — The Signal Fire',
    symbol:      '📚',
    category:    'Vault 38 — The Signal Fire',
    description: 'Solved 6 cases in The Signal Fire.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's38_ach04',
    name:        'Nine Files — The Signal Fire',
    symbol:      '🗄',
    category:    'Vault 38 — The Signal Fire',
    description: 'Solved 9 cases in The Signal Fire.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's38_ach05',
    name:        'Season Closed — The Signal Fire',
    symbol:      '✅',
    category:    'Vault 38 — The Signal Fire',
    description: 'Solved every case in The Signal Fire.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's38_ach06',
    name:        'Evidence 25% — The Signal Fire',
    symbol:      '🧪',
    category:    'Vault 38 — The Signal Fire',
    description: 'Recovered a quarter of the evidence in The Signal Fire.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's38_ach07',
    name:        'Evidence 50% — The Signal Fire',
    symbol:      '🧪',
    category:    'Vault 38 — The Signal Fire',
    description: 'Recovered half the evidence in The Signal Fire.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's38_ach08',
    name:        'Evidence 75% — The Signal Fire',
    symbol:      '🧪',
    category:    'Vault 38 — The Signal Fire',
    description: 'Recovered most of the evidence in The Signal Fire.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's38_ach09',
    name:        'Evidence 100% — The Signal Fire',
    symbol:      '🧪',
    category:    'Vault 38 — The Signal Fire',
    description: 'Recovered every piece of evidence in The Signal Fire.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's38_ach10',
    name:        'First Try — The Signal Fire',
    symbol:      '🎯',
    category:    'Vault 38 — The Signal Fire',
    description: 'Solved every case in The Signal Fire on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's38_ach11',
    name:        'No Hints — The Signal Fire',
    symbol:      '🧠',
    category:    'Vault 38 — The Signal Fire',
    description: 'Completed The Signal Fire without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's38_ach12',
    name:        'Under Time — The Signal Fire',
    symbol:      '⏱',
    category:    'Vault 38 — The Signal Fire',
    description: 'Completed The Signal Fire within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's38_ach13',
    name:        'Case Notes Read — The Signal Fire',
    symbol:      '📝',
    category:    'Vault 38 — The Signal Fire',
    description: 'Reviewed every incident report in The Signal Fire.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's38_ach14',
    name:        'Full Playlist — The Signal Fire',
    symbol:      '🎵',
    category:    'Vault 38 — The Signal Fire',
    description: 'Listened to every recovered recording in The Signal Fire.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's38_ach15',
    name:        'Vault Unsealed — The Signal Fire',
    symbol:      '🔓',
    category:    'Vault 38 — The Signal Fire',
    description: 'Unlocked the The Signal Fire vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's38_ach16',
    name:        'Perfect Record — The Signal Fire',
    symbol:      '🏆',
    category:    'Vault 38 — The Signal Fire',
    description: 'Earned every achievement in The Signal Fire.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['445','446','447','448','449','450','451','452','453','454','455','456'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 39 — The Pale Horse --
  {
    id:          's39_ach01',
    name:        'First File — The Pale Horse',
    symbol:      '📁',
    category:    'Vault 39 — The Pale Horse',
    description: 'Opened the first case of The Pale Horse.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's39_ach02',
    name:        'Three Files — The Pale Horse',
    symbol:      '📂',
    category:    'Vault 39 — The Pale Horse',
    description: 'Solved 3 cases in The Pale Horse.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's39_ach03',
    name:        'Six Files — The Pale Horse',
    symbol:      '📚',
    category:    'Vault 39 — The Pale Horse',
    description: 'Solved 6 cases in The Pale Horse.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's39_ach04',
    name:        'Nine Files — The Pale Horse',
    symbol:      '🗄',
    category:    'Vault 39 — The Pale Horse',
    description: 'Solved 9 cases in The Pale Horse.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's39_ach05',
    name:        'Season Closed — The Pale Horse',
    symbol:      '✅',
    category:    'Vault 39 — The Pale Horse',
    description: 'Solved every case in The Pale Horse.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's39_ach06',
    name:        'Evidence 25% — The Pale Horse',
    symbol:      '🧪',
    category:    'Vault 39 — The Pale Horse',
    description: 'Recovered a quarter of the evidence in The Pale Horse.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's39_ach07',
    name:        'Evidence 50% — The Pale Horse',
    symbol:      '🧪',
    category:    'Vault 39 — The Pale Horse',
    description: 'Recovered half the evidence in The Pale Horse.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's39_ach08',
    name:        'Evidence 75% — The Pale Horse',
    symbol:      '🧪',
    category:    'Vault 39 — The Pale Horse',
    description: 'Recovered most of the evidence in The Pale Horse.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's39_ach09',
    name:        'Evidence 100% — The Pale Horse',
    symbol:      '🧪',
    category:    'Vault 39 — The Pale Horse',
    description: 'Recovered every piece of evidence in The Pale Horse.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's39_ach10',
    name:        'First Try — The Pale Horse',
    symbol:      '🎯',
    category:    'Vault 39 — The Pale Horse',
    description: 'Solved every case in The Pale Horse on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's39_ach11',
    name:        'No Hints — The Pale Horse',
    symbol:      '🧠',
    category:    'Vault 39 — The Pale Horse',
    description: 'Completed The Pale Horse without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's39_ach12',
    name:        'Under Time — The Pale Horse',
    symbol:      '⏱',
    category:    'Vault 39 — The Pale Horse',
    description: 'Completed The Pale Horse within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's39_ach13',
    name:        'Case Notes Read — The Pale Horse',
    symbol:      '📝',
    category:    'Vault 39 — The Pale Horse',
    description: 'Reviewed every incident report in The Pale Horse.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's39_ach14',
    name:        'Full Playlist — The Pale Horse',
    symbol:      '🎵',
    category:    'Vault 39 — The Pale Horse',
    description: 'Listened to every recovered recording in The Pale Horse.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's39_ach15',
    name:        'Vault Unsealed — The Pale Horse',
    symbol:      '🔓',
    category:    'Vault 39 — The Pale Horse',
    description: 'Unlocked the The Pale Horse vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's39_ach16',
    name:        'Perfect Record — The Pale Horse',
    symbol:      '🏆',
    category:    'Vault 39 — The Pale Horse',
    description: 'Earned every achievement in The Pale Horse.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['457','458','459','460','461','462','463','464','465','466','467','468'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 40 — The Coded Letter --
  {
    id:          's40_ach01',
    name:        'First File — The Coded Letter',
    symbol:      '📁',
    category:    'Vault 40 — The Coded Letter',
    description: 'Opened the first case of The Coded Letter.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's40_ach02',
    name:        'Three Files — The Coded Letter',
    symbol:      '📂',
    category:    'Vault 40 — The Coded Letter',
    description: 'Solved 3 cases in The Coded Letter.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's40_ach03',
    name:        'Six Files — The Coded Letter',
    symbol:      '📚',
    category:    'Vault 40 — The Coded Letter',
    description: 'Solved 6 cases in The Coded Letter.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's40_ach04',
    name:        'Nine Files — The Coded Letter',
    symbol:      '🗄',
    category:    'Vault 40 — The Coded Letter',
    description: 'Solved 9 cases in The Coded Letter.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's40_ach05',
    name:        'Season Closed — The Coded Letter',
    symbol:      '✅',
    category:    'Vault 40 — The Coded Letter',
    description: 'Solved every case in The Coded Letter.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's40_ach06',
    name:        'Evidence 25% — The Coded Letter',
    symbol:      '🧪',
    category:    'Vault 40 — The Coded Letter',
    description: 'Recovered a quarter of the evidence in The Coded Letter.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's40_ach07',
    name:        'Evidence 50% — The Coded Letter',
    symbol:      '🧪',
    category:    'Vault 40 — The Coded Letter',
    description: 'Recovered half the evidence in The Coded Letter.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's40_ach08',
    name:        'Evidence 75% — The Coded Letter',
    symbol:      '🧪',
    category:    'Vault 40 — The Coded Letter',
    description: 'Recovered most of the evidence in The Coded Letter.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's40_ach09',
    name:        'Evidence 100% — The Coded Letter',
    symbol:      '🧪',
    category:    'Vault 40 — The Coded Letter',
    description: 'Recovered every piece of evidence in The Coded Letter.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's40_ach10',
    name:        'First Try — The Coded Letter',
    symbol:      '🎯',
    category:    'Vault 40 — The Coded Letter',
    description: 'Solved every case in The Coded Letter on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's40_ach11',
    name:        'No Hints — The Coded Letter',
    symbol:      '🧠',
    category:    'Vault 40 — The Coded Letter',
    description: 'Completed The Coded Letter without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's40_ach12',
    name:        'Under Time — The Coded Letter',
    symbol:      '⏱',
    category:    'Vault 40 — The Coded Letter',
    description: 'Completed The Coded Letter within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's40_ach13',
    name:        'Case Notes Read — The Coded Letter',
    symbol:      '📝',
    category:    'Vault 40 — The Coded Letter',
    description: 'Reviewed every incident report in The Coded Letter.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's40_ach14',
    name:        'Full Playlist — The Coded Letter',
    symbol:      '🎵',
    category:    'Vault 40 — The Coded Letter',
    description: 'Listened to every recovered recording in The Coded Letter.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's40_ach15',
    name:        'Vault Unsealed — The Coded Letter',
    symbol:      '🔓',
    category:    'Vault 40 — The Coded Letter',
    description: 'Unlocked the The Coded Letter vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's40_ach16',
    name:        'Perfect Record — The Coded Letter',
    symbol:      '🏆',
    category:    'Vault 40 — The Coded Letter',
    description: 'Earned every achievement in The Coded Letter.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['469','470','471','472','473','474','475','476','477','478','479','480'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 41 — The Ghost Road --
  {
    id:          's41_ach01',
    name:        'First File — The Ghost Road',
    symbol:      '📁',
    category:    'Vault 41 — The Ghost Road',
    description: 'Opened the first case of The Ghost Road.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's41_ach02',
    name:        'Three Files — The Ghost Road',
    symbol:      '📂',
    category:    'Vault 41 — The Ghost Road',
    description: 'Solved 3 cases in The Ghost Road.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's41_ach03',
    name:        'Six Files — The Ghost Road',
    symbol:      '📚',
    category:    'Vault 41 — The Ghost Road',
    description: 'Solved 6 cases in The Ghost Road.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's41_ach04',
    name:        'Nine Files — The Ghost Road',
    symbol:      '🗄',
    category:    'Vault 41 — The Ghost Road',
    description: 'Solved 9 cases in The Ghost Road.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's41_ach05',
    name:        'Season Closed — The Ghost Road',
    symbol:      '✅',
    category:    'Vault 41 — The Ghost Road',
    description: 'Solved every case in The Ghost Road.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's41_ach06',
    name:        'Evidence 25% — The Ghost Road',
    symbol:      '🧪',
    category:    'Vault 41 — The Ghost Road',
    description: 'Recovered a quarter of the evidence in The Ghost Road.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's41_ach07',
    name:        'Evidence 50% — The Ghost Road',
    symbol:      '🧪',
    category:    'Vault 41 — The Ghost Road',
    description: 'Recovered half the evidence in The Ghost Road.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's41_ach08',
    name:        'Evidence 75% — The Ghost Road',
    symbol:      '🧪',
    category:    'Vault 41 — The Ghost Road',
    description: 'Recovered most of the evidence in The Ghost Road.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's41_ach09',
    name:        'Evidence 100% — The Ghost Road',
    symbol:      '🧪',
    category:    'Vault 41 — The Ghost Road',
    description: 'Recovered every piece of evidence in The Ghost Road.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's41_ach10',
    name:        'First Try — The Ghost Road',
    symbol:      '🎯',
    category:    'Vault 41 — The Ghost Road',
    description: 'Solved every case in The Ghost Road on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's41_ach11',
    name:        'No Hints — The Ghost Road',
    symbol:      '🧠',
    category:    'Vault 41 — The Ghost Road',
    description: 'Completed The Ghost Road without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's41_ach12',
    name:        'Under Time — The Ghost Road',
    symbol:      '⏱',
    category:    'Vault 41 — The Ghost Road',
    description: 'Completed The Ghost Road within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's41_ach13',
    name:        'Case Notes Read — The Ghost Road',
    symbol:      '📝',
    category:    'Vault 41 — The Ghost Road',
    description: 'Reviewed every incident report in The Ghost Road.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's41_ach14',
    name:        'Full Playlist — The Ghost Road',
    symbol:      '🎵',
    category:    'Vault 41 — The Ghost Road',
    description: 'Listened to every recovered recording in The Ghost Road.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's41_ach15',
    name:        'Vault Unsealed — The Ghost Road',
    symbol:      '🔓',
    category:    'Vault 41 — The Ghost Road',
    description: 'Unlocked the The Ghost Road vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's41_ach16',
    name:        'Perfect Record — The Ghost Road',
    symbol:      '🏆',
    category:    'Vault 41 — The Ghost Road',
    description: 'Earned every achievement in The Ghost Road.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['481','482','483','484','485','486','487','488','489','490','491','492'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 42 — The Dry Season --
  {
    id:          's42_ach01',
    name:        'First File — The Dry Season',
    symbol:      '📁',
    category:    'Vault 42 — The Dry Season',
    description: 'Opened the first case of The Dry Season.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's42_ach02',
    name:        'Three Files — The Dry Season',
    symbol:      '📂',
    category:    'Vault 42 — The Dry Season',
    description: 'Solved 3 cases in The Dry Season.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's42_ach03',
    name:        'Six Files — The Dry Season',
    symbol:      '📚',
    category:    'Vault 42 — The Dry Season',
    description: 'Solved 6 cases in The Dry Season.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's42_ach04',
    name:        'Nine Files — The Dry Season',
    symbol:      '🗄',
    category:    'Vault 42 — The Dry Season',
    description: 'Solved 9 cases in The Dry Season.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's42_ach05',
    name:        'Season Closed — The Dry Season',
    symbol:      '✅',
    category:    'Vault 42 — The Dry Season',
    description: 'Solved every case in The Dry Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's42_ach06',
    name:        'Evidence 25% — The Dry Season',
    symbol:      '🧪',
    category:    'Vault 42 — The Dry Season',
    description: 'Recovered a quarter of the evidence in The Dry Season.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's42_ach07',
    name:        'Evidence 50% — The Dry Season',
    symbol:      '🧪',
    category:    'Vault 42 — The Dry Season',
    description: 'Recovered half the evidence in The Dry Season.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's42_ach08',
    name:        'Evidence 75% — The Dry Season',
    symbol:      '🧪',
    category:    'Vault 42 — The Dry Season',
    description: 'Recovered most of the evidence in The Dry Season.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's42_ach09',
    name:        'Evidence 100% — The Dry Season',
    symbol:      '🧪',
    category:    'Vault 42 — The Dry Season',
    description: 'Recovered every piece of evidence in The Dry Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's42_ach10',
    name:        'First Try — The Dry Season',
    symbol:      '🎯',
    category:    'Vault 42 — The Dry Season',
    description: 'Solved every case in The Dry Season on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's42_ach11',
    name:        'No Hints — The Dry Season',
    symbol:      '🧠',
    category:    'Vault 42 — The Dry Season',
    description: 'Completed The Dry Season without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's42_ach12',
    name:        'Under Time — The Dry Season',
    symbol:      '⏱',
    category:    'Vault 42 — The Dry Season',
    description: 'Completed The Dry Season within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's42_ach13',
    name:        'Case Notes Read — The Dry Season',
    symbol:      '📝',
    category:    'Vault 42 — The Dry Season',
    description: 'Reviewed every incident report in The Dry Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's42_ach14',
    name:        'Full Playlist — The Dry Season',
    symbol:      '🎵',
    category:    'Vault 42 — The Dry Season',
    description: 'Listened to every recovered recording in The Dry Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's42_ach15',
    name:        'Vault Unsealed — The Dry Season',
    symbol:      '🔓',
    category:    'Vault 42 — The Dry Season',
    description: 'Unlocked the The Dry Season vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's42_ach16',
    name:        'Perfect Record — The Dry Season',
    symbol:      '🏆',
    category:    'Vault 42 — The Dry Season',
    description: 'Earned every achievement in The Dry Season.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['493','494','495','496','497','498','499','500','501','502','503','504'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 43 — The False Name --
  {
    id:          's43_ach01',
    name:        'First File — The False Name',
    symbol:      '📁',
    category:    'Vault 43 — The False Name',
    description: 'Opened the first case of The False Name.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's43_ach02',
    name:        'Three Files — The False Name',
    symbol:      '📂',
    category:    'Vault 43 — The False Name',
    description: 'Solved 3 cases in The False Name.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's43_ach03',
    name:        'Six Files — The False Name',
    symbol:      '📚',
    category:    'Vault 43 — The False Name',
    description: 'Solved 6 cases in The False Name.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's43_ach04',
    name:        'Nine Files — The False Name',
    symbol:      '🗄',
    category:    'Vault 43 — The False Name',
    description: 'Solved 9 cases in The False Name.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's43_ach05',
    name:        'Season Closed — The False Name',
    symbol:      '✅',
    category:    'Vault 43 — The False Name',
    description: 'Solved every case in The False Name.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's43_ach06',
    name:        'Evidence 25% — The False Name',
    symbol:      '🧪',
    category:    'Vault 43 — The False Name',
    description: 'Recovered a quarter of the evidence in The False Name.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's43_ach07',
    name:        'Evidence 50% — The False Name',
    symbol:      '🧪',
    category:    'Vault 43 — The False Name',
    description: 'Recovered half the evidence in The False Name.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's43_ach08',
    name:        'Evidence 75% — The False Name',
    symbol:      '🧪',
    category:    'Vault 43 — The False Name',
    description: 'Recovered most of the evidence in The False Name.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's43_ach09',
    name:        'Evidence 100% — The False Name',
    symbol:      '🧪',
    category:    'Vault 43 — The False Name',
    description: 'Recovered every piece of evidence in The False Name.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's43_ach10',
    name:        'First Try — The False Name',
    symbol:      '🎯',
    category:    'Vault 43 — The False Name',
    description: 'Solved every case in The False Name on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's43_ach11',
    name:        'No Hints — The False Name',
    symbol:      '🧠',
    category:    'Vault 43 — The False Name',
    description: 'Completed The False Name without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's43_ach12',
    name:        'Under Time — The False Name',
    symbol:      '⏱',
    category:    'Vault 43 — The False Name',
    description: 'Completed The False Name within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's43_ach13',
    name:        'Case Notes Read — The False Name',
    symbol:      '📝',
    category:    'Vault 43 — The False Name',
    description: 'Reviewed every incident report in The False Name.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's43_ach14',
    name:        'Full Playlist — The False Name',
    symbol:      '🎵',
    category:    'Vault 43 — The False Name',
    description: 'Listened to every recovered recording in The False Name.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's43_ach15',
    name:        'Vault Unsealed — The False Name',
    symbol:      '🔓',
    category:    'Vault 43 — The False Name',
    description: 'Unlocked the The False Name vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's43_ach16',
    name:        'Perfect Record — The False Name',
    symbol:      '🏆',
    category:    'Vault 43 — The False Name',
    description: 'Earned every achievement in The False Name.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['505','506','507','508','509','510','511','512','513','514','515','516'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 44 — The Mirror Case --
  {
    id:          's44_ach01',
    name:        'First File — The Mirror Case',
    symbol:      '📁',
    category:    'Vault 44 — The Mirror Case',
    description: 'Opened the first case of The Mirror Case.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's44_ach02',
    name:        'Three Files — The Mirror Case',
    symbol:      '📂',
    category:    'Vault 44 — The Mirror Case',
    description: 'Solved 3 cases in The Mirror Case.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's44_ach03',
    name:        'Six Files — The Mirror Case',
    symbol:      '📚',
    category:    'Vault 44 — The Mirror Case',
    description: 'Solved 6 cases in The Mirror Case.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's44_ach04',
    name:        'Nine Files — The Mirror Case',
    symbol:      '🗄',
    category:    'Vault 44 — The Mirror Case',
    description: 'Solved 9 cases in The Mirror Case.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's44_ach05',
    name:        'Season Closed — The Mirror Case',
    symbol:      '✅',
    category:    'Vault 44 — The Mirror Case',
    description: 'Solved every case in The Mirror Case.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's44_ach06',
    name:        'Evidence 25% — The Mirror Case',
    symbol:      '🧪',
    category:    'Vault 44 — The Mirror Case',
    description: 'Recovered a quarter of the evidence in The Mirror Case.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's44_ach07',
    name:        'Evidence 50% — The Mirror Case',
    symbol:      '🧪',
    category:    'Vault 44 — The Mirror Case',
    description: 'Recovered half the evidence in The Mirror Case.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's44_ach08',
    name:        'Evidence 75% — The Mirror Case',
    symbol:      '🧪',
    category:    'Vault 44 — The Mirror Case',
    description: 'Recovered most of the evidence in The Mirror Case.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's44_ach09',
    name:        'Evidence 100% — The Mirror Case',
    symbol:      '🧪',
    category:    'Vault 44 — The Mirror Case',
    description: 'Recovered every piece of evidence in The Mirror Case.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's44_ach10',
    name:        'First Try — The Mirror Case',
    symbol:      '🎯',
    category:    'Vault 44 — The Mirror Case',
    description: 'Solved every case in The Mirror Case on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's44_ach11',
    name:        'No Hints — The Mirror Case',
    symbol:      '🧠',
    category:    'Vault 44 — The Mirror Case',
    description: 'Completed The Mirror Case without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's44_ach12',
    name:        'Under Time — The Mirror Case',
    symbol:      '⏱',
    category:    'Vault 44 — The Mirror Case',
    description: 'Completed The Mirror Case within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's44_ach13',
    name:        'Case Notes Read — The Mirror Case',
    symbol:      '📝',
    category:    'Vault 44 — The Mirror Case',
    description: 'Reviewed every incident report in The Mirror Case.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's44_ach14',
    name:        'Full Playlist — The Mirror Case',
    symbol:      '🎵',
    category:    'Vault 44 — The Mirror Case',
    description: 'Listened to every recovered recording in The Mirror Case.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's44_ach15',
    name:        'Vault Unsealed — The Mirror Case',
    symbol:      '🔓',
    category:    'Vault 44 — The Mirror Case',
    description: 'Unlocked the The Mirror Case vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's44_ach16',
    name:        'Perfect Record — The Mirror Case',
    symbol:      '🏆',
    category:    'Vault 44 — The Mirror Case',
    description: 'Earned every achievement in The Mirror Case.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['517','518','519','520','521','522','523','524','525','526','527','528'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 45 — The Hollow Crown --
  {
    id:          's45_ach01',
    name:        'First File — The Hollow Crown',
    symbol:      '📁',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Opened the first case of The Hollow Crown.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's45_ach02',
    name:        'Three Files — The Hollow Crown',
    symbol:      '📂',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Solved 3 cases in The Hollow Crown.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's45_ach03',
    name:        'Six Files — The Hollow Crown',
    symbol:      '📚',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Solved 6 cases in The Hollow Crown.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's45_ach04',
    name:        'Nine Files — The Hollow Crown',
    symbol:      '🗄',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Solved 9 cases in The Hollow Crown.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's45_ach05',
    name:        'Season Closed — The Hollow Crown',
    symbol:      '✅',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Solved every case in The Hollow Crown.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's45_ach06',
    name:        'Evidence 25% — The Hollow Crown',
    symbol:      '🧪',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Recovered a quarter of the evidence in The Hollow Crown.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's45_ach07',
    name:        'Evidence 50% — The Hollow Crown',
    symbol:      '🧪',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Recovered half the evidence in The Hollow Crown.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's45_ach08',
    name:        'Evidence 75% — The Hollow Crown',
    symbol:      '🧪',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Recovered most of the evidence in The Hollow Crown.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's45_ach09',
    name:        'Evidence 100% — The Hollow Crown',
    symbol:      '🧪',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Recovered every piece of evidence in The Hollow Crown.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's45_ach10',
    name:        'First Try — The Hollow Crown',
    symbol:      '🎯',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Solved every case in The Hollow Crown on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's45_ach11',
    name:        'No Hints — The Hollow Crown',
    symbol:      '🧠',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Completed The Hollow Crown without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's45_ach12',
    name:        'Under Time — The Hollow Crown',
    symbol:      '⏱',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Completed The Hollow Crown within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's45_ach13',
    name:        'Case Notes Read — The Hollow Crown',
    symbol:      '📝',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Reviewed every incident report in The Hollow Crown.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's45_ach14',
    name:        'Full Playlist — The Hollow Crown',
    symbol:      '🎵',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Listened to every recovered recording in The Hollow Crown.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's45_ach15',
    name:        'Vault Unsealed — The Hollow Crown',
    symbol:      '🔓',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Unlocked the The Hollow Crown vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's45_ach16',
    name:        'Perfect Record — The Hollow Crown',
    symbol:      '🏆',
    category:    'Vault 45 — The Hollow Crown',
    description: 'Earned every achievement in The Hollow Crown.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['529','530','531','532','533','534','535','536','537','538','539','540'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 46 — The Storm Season --
  {
    id:          's46_ach01',
    name:        'First File — The Storm Season',
    symbol:      '📁',
    category:    'Vault 46 — The Storm Season',
    description: 'Opened the first case of The Storm Season.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's46_ach02',
    name:        'Three Files — The Storm Season',
    symbol:      '📂',
    category:    'Vault 46 — The Storm Season',
    description: 'Solved 3 cases in The Storm Season.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's46_ach03',
    name:        'Six Files — The Storm Season',
    symbol:      '📚',
    category:    'Vault 46 — The Storm Season',
    description: 'Solved 6 cases in The Storm Season.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's46_ach04',
    name:        'Nine Files — The Storm Season',
    symbol:      '🗄',
    category:    'Vault 46 — The Storm Season',
    description: 'Solved 9 cases in The Storm Season.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's46_ach05',
    name:        'Season Closed — The Storm Season',
    symbol:      '✅',
    category:    'Vault 46 — The Storm Season',
    description: 'Solved every case in The Storm Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's46_ach06',
    name:        'Evidence 25% — The Storm Season',
    symbol:      '🧪',
    category:    'Vault 46 — The Storm Season',
    description: 'Recovered a quarter of the evidence in The Storm Season.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's46_ach07',
    name:        'Evidence 50% — The Storm Season',
    symbol:      '🧪',
    category:    'Vault 46 — The Storm Season',
    description: 'Recovered half the evidence in The Storm Season.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's46_ach08',
    name:        'Evidence 75% — The Storm Season',
    symbol:      '🧪',
    category:    'Vault 46 — The Storm Season',
    description: 'Recovered most of the evidence in The Storm Season.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's46_ach09',
    name:        'Evidence 100% — The Storm Season',
    symbol:      '🧪',
    category:    'Vault 46 — The Storm Season',
    description: 'Recovered every piece of evidence in The Storm Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's46_ach10',
    name:        'First Try — The Storm Season',
    symbol:      '🎯',
    category:    'Vault 46 — The Storm Season',
    description: 'Solved every case in The Storm Season on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's46_ach11',
    name:        'No Hints — The Storm Season',
    symbol:      '🧠',
    category:    'Vault 46 — The Storm Season',
    description: 'Completed The Storm Season without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's46_ach12',
    name:        'Under Time — The Storm Season',
    symbol:      '⏱',
    category:    'Vault 46 — The Storm Season',
    description: 'Completed The Storm Season within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's46_ach13',
    name:        'Case Notes Read — The Storm Season',
    symbol:      '📝',
    category:    'Vault 46 — The Storm Season',
    description: 'Reviewed every incident report in The Storm Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's46_ach14',
    name:        'Full Playlist — The Storm Season',
    symbol:      '🎵',
    category:    'Vault 46 — The Storm Season',
    description: 'Listened to every recovered recording in The Storm Season.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's46_ach15',
    name:        'Vault Unsealed — The Storm Season',
    symbol:      '🔓',
    category:    'Vault 46 — The Storm Season',
    description: 'Unlocked the The Storm Season vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's46_ach16',
    name:        'Perfect Record — The Storm Season',
    symbol:      '🏆',
    category:    'Vault 46 — The Storm Season',
    description: 'Earned every achievement in The Storm Season.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['541','542','543','544','545','546','547','548','549','550','551','552'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 47 — The Long Way Round --
  {
    id:          's47_ach01',
    name:        'First File — The Long Way Round',
    symbol:      '📁',
    category:    'Vault 47 — The Long Way Round',
    description: 'Opened the first case of The Long Way Round.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's47_ach02',
    name:        'Three Files — The Long Way Round',
    symbol:      '📂',
    category:    'Vault 47 — The Long Way Round',
    description: 'Solved 3 cases in The Long Way Round.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's47_ach03',
    name:        'Six Files — The Long Way Round',
    symbol:      '📚',
    category:    'Vault 47 — The Long Way Round',
    description: 'Solved 6 cases in The Long Way Round.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's47_ach04',
    name:        'Nine Files — The Long Way Round',
    symbol:      '🗄',
    category:    'Vault 47 — The Long Way Round',
    description: 'Solved 9 cases in The Long Way Round.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's47_ach05',
    name:        'Season Closed — The Long Way Round',
    symbol:      '✅',
    category:    'Vault 47 — The Long Way Round',
    description: 'Solved every case in The Long Way Round.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's47_ach06',
    name:        'Evidence 25% — The Long Way Round',
    symbol:      '🧪',
    category:    'Vault 47 — The Long Way Round',
    description: 'Recovered a quarter of the evidence in The Long Way Round.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's47_ach07',
    name:        'Evidence 50% — The Long Way Round',
    symbol:      '🧪',
    category:    'Vault 47 — The Long Way Round',
    description: 'Recovered half the evidence in The Long Way Round.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's47_ach08',
    name:        'Evidence 75% — The Long Way Round',
    symbol:      '🧪',
    category:    'Vault 47 — The Long Way Round',
    description: 'Recovered most of the evidence in The Long Way Round.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's47_ach09',
    name:        'Evidence 100% — The Long Way Round',
    symbol:      '🧪',
    category:    'Vault 47 — The Long Way Round',
    description: 'Recovered every piece of evidence in The Long Way Round.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's47_ach10',
    name:        'First Try — The Long Way Round',
    symbol:      '🎯',
    category:    'Vault 47 — The Long Way Round',
    description: 'Solved every case in The Long Way Round on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's47_ach11',
    name:        'No Hints — The Long Way Round',
    symbol:      '🧠',
    category:    'Vault 47 — The Long Way Round',
    description: 'Completed The Long Way Round without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's47_ach12',
    name:        'Under Time — The Long Way Round',
    symbol:      '⏱',
    category:    'Vault 47 — The Long Way Round',
    description: 'Completed The Long Way Round within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's47_ach13',
    name:        'Case Notes Read — The Long Way Round',
    symbol:      '📝',
    category:    'Vault 47 — The Long Way Round',
    description: 'Reviewed every incident report in The Long Way Round.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's47_ach14',
    name:        'Full Playlist — The Long Way Round',
    symbol:      '🎵',
    category:    'Vault 47 — The Long Way Round',
    description: 'Listened to every recovered recording in The Long Way Round.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's47_ach15',
    name:        'Vault Unsealed — The Long Way Round',
    symbol:      '🔓',
    category:    'Vault 47 — The Long Way Round',
    description: 'Unlocked the The Long Way Round vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's47_ach16',
    name:        'Perfect Record — The Long Way Round',
    symbol:      '🏆',
    category:    'Vault 47 — The Long Way Round',
    description: 'Earned every achievement in The Long Way Round.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['553','554','555','556','557','558','559','560','561','562','563','564'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 48 — The Broken Signal --
  {
    id:          's48_ach01',
    name:        'First File — The Broken Signal',
    symbol:      '📁',
    category:    'Vault 48 — The Broken Signal',
    description: 'Opened the first case of The Broken Signal.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's48_ach02',
    name:        'Three Files — The Broken Signal',
    symbol:      '📂',
    category:    'Vault 48 — The Broken Signal',
    description: 'Solved 3 cases in The Broken Signal.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's48_ach03',
    name:        'Six Files — The Broken Signal',
    symbol:      '📚',
    category:    'Vault 48 — The Broken Signal',
    description: 'Solved 6 cases in The Broken Signal.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's48_ach04',
    name:        'Nine Files — The Broken Signal',
    symbol:      '🗄',
    category:    'Vault 48 — The Broken Signal',
    description: 'Solved 9 cases in The Broken Signal.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's48_ach05',
    name:        'Season Closed — The Broken Signal',
    symbol:      '✅',
    category:    'Vault 48 — The Broken Signal',
    description: 'Solved every case in The Broken Signal.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's48_ach06',
    name:        'Evidence 25% — The Broken Signal',
    symbol:      '🧪',
    category:    'Vault 48 — The Broken Signal',
    description: 'Recovered a quarter of the evidence in The Broken Signal.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's48_ach07',
    name:        'Evidence 50% — The Broken Signal',
    symbol:      '🧪',
    category:    'Vault 48 — The Broken Signal',
    description: 'Recovered half the evidence in The Broken Signal.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's48_ach08',
    name:        'Evidence 75% — The Broken Signal',
    symbol:      '🧪',
    category:    'Vault 48 — The Broken Signal',
    description: 'Recovered most of the evidence in The Broken Signal.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's48_ach09',
    name:        'Evidence 100% — The Broken Signal',
    symbol:      '🧪',
    category:    'Vault 48 — The Broken Signal',
    description: 'Recovered every piece of evidence in The Broken Signal.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's48_ach10',
    name:        'First Try — The Broken Signal',
    symbol:      '🎯',
    category:    'Vault 48 — The Broken Signal',
    description: 'Solved every case in The Broken Signal on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's48_ach11',
    name:        'No Hints — The Broken Signal',
    symbol:      '🧠',
    category:    'Vault 48 — The Broken Signal',
    description: 'Completed The Broken Signal without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's48_ach12',
    name:        'Under Time — The Broken Signal',
    symbol:      '⏱',
    category:    'Vault 48 — The Broken Signal',
    description: 'Completed The Broken Signal within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's48_ach13',
    name:        'Case Notes Read — The Broken Signal',
    symbol:      '📝',
    category:    'Vault 48 — The Broken Signal',
    description: 'Reviewed every incident report in The Broken Signal.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's48_ach14',
    name:        'Full Playlist — The Broken Signal',
    symbol:      '🎵',
    category:    'Vault 48 — The Broken Signal',
    description: 'Listened to every recovered recording in The Broken Signal.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's48_ach15',
    name:        'Vault Unsealed — The Broken Signal',
    symbol:      '🔓',
    category:    'Vault 48 — The Broken Signal',
    description: 'Unlocked the The Broken Signal vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's48_ach16',
    name:        'Perfect Record — The Broken Signal',
    symbol:      '🏆',
    category:    'Vault 48 — The Broken Signal',
    description: 'Earned every achievement in The Broken Signal.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['565','566','567','568','569','570','571','572','573','574','575','576'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 49 — The Final Witness --
  {
    id:          's49_ach01',
    name:        'First File — The Final Witness',
    symbol:      '📁',
    category:    'Vault 49 — The Final Witness',
    description: 'Opened the first case of The Final Witness.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's49_ach02',
    name:        'Three Files — The Final Witness',
    symbol:      '📂',
    category:    'Vault 49 — The Final Witness',
    description: 'Solved 3 cases in The Final Witness.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's49_ach03',
    name:        'Six Files — The Final Witness',
    symbol:      '📚',
    category:    'Vault 49 — The Final Witness',
    description: 'Solved 6 cases in The Final Witness.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's49_ach04',
    name:        'Nine Files — The Final Witness',
    symbol:      '🗄',
    category:    'Vault 49 — The Final Witness',
    description: 'Solved 9 cases in The Final Witness.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's49_ach05',
    name:        'Season Closed — The Final Witness',
    symbol:      '✅',
    category:    'Vault 49 — The Final Witness',
    description: 'Solved every case in The Final Witness.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's49_ach06',
    name:        'Evidence 25% — The Final Witness',
    symbol:      '🧪',
    category:    'Vault 49 — The Final Witness',
    description: 'Recovered a quarter of the evidence in The Final Witness.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's49_ach07',
    name:        'Evidence 50% — The Final Witness',
    symbol:      '🧪',
    category:    'Vault 49 — The Final Witness',
    description: 'Recovered half the evidence in The Final Witness.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's49_ach08',
    name:        'Evidence 75% — The Final Witness',
    symbol:      '🧪',
    category:    'Vault 49 — The Final Witness',
    description: 'Recovered most of the evidence in The Final Witness.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's49_ach09',
    name:        'Evidence 100% — The Final Witness',
    symbol:      '🧪',
    category:    'Vault 49 — The Final Witness',
    description: 'Recovered every piece of evidence in The Final Witness.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's49_ach10',
    name:        'First Try — The Final Witness',
    symbol:      '🎯',
    category:    'Vault 49 — The Final Witness',
    description: 'Solved every case in The Final Witness on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's49_ach11',
    name:        'No Hints — The Final Witness',
    symbol:      '🧠',
    category:    'Vault 49 — The Final Witness',
    description: 'Completed The Final Witness without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's49_ach12',
    name:        'Under Time — The Final Witness',
    symbol:      '⏱',
    category:    'Vault 49 — The Final Witness',
    description: 'Completed The Final Witness within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's49_ach13',
    name:        'Case Notes Read — The Final Witness',
    symbol:      '📝',
    category:    'Vault 49 — The Final Witness',
    description: 'Reviewed every incident report in The Final Witness.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's49_ach14',
    name:        'Full Playlist — The Final Witness',
    symbol:      '🎵',
    category:    'Vault 49 — The Final Witness',
    description: 'Listened to every recovered recording in The Final Witness.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's49_ach15',
    name:        'Vault Unsealed — The Final Witness',
    symbol:      '🔓',
    category:    'Vault 49 — The Final Witness',
    description: 'Unlocked the The Final Witness vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's49_ach16',
    name:        'Perfect Record — The Final Witness',
    symbol:      '🏆',
    category:    'Vault 49 — The Final Witness',
    description: 'Earned every achievement in The Final Witness.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['577','578','579','580','581','582','583','584','585','586','587','588'];
      var allSolved = ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
      if (!allSolved) return false;
      var firstTry = ids.every(function(id) { var a=0; try { a=parseInt(localStorage.getItem('av_attempts_'+id)||'0',10)||0; } catch(e){} return a <= 1; });
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      var underTime = times.length === ids.length && (Math.max.apply(null, times) - Math.min.apply(null, times)) <= 7*24*60*60*1000;
      return firstTry && underTime;
    }
  },

  // -- Vault 50 — The Resolution --
  {
    id:          's50_ach01',
    name:        'First File — The Resolution',
    symbol:      '📁',
    category:    'Vault 50 — The Resolution',
    description: 'Opened the first case of The Resolution.',
    hint:        'Solve the first case of this season.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return s.solved.indexOf(ids[0]) !== -1;
    }
  },
  {
    id:          's50_ach02',
    name:        'Three Files — The Resolution',
    symbol:      '📂',
    category:    'Vault 50 — The Resolution',
    description: 'Solved 3 cases in The Resolution.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's50_ach03',
    name:        'Six Files — The Resolution',
    symbol:      '📚',
    category:    'Vault 50 — The Resolution',
    description: 'Solved 6 cases in The Resolution.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's50_ach04',
    name:        'Nine Files — The Resolution',
    symbol:      '🗄',
    category:    'Vault 50 — The Resolution',
    description: 'Solved 9 cases in The Resolution.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's50_ach05',
    name:        'Season Closed — The Resolution',
    symbol:      '✅',
    category:    'Vault 50 — The Resolution',
    description: 'Solved every case in The Resolution.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's50_ach06',
    name:        'Evidence 25% — The Resolution',
    symbol:      '🧪',
    category:    'Vault 50 — The Resolution',
    description: 'Recovered a quarter of the evidence in The Resolution.',
    hint:        'Solve 3 cases in this season.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 3;
    }
  },
  {
    id:          's50_ach07',
    name:        'Evidence 50% — The Resolution',
    symbol:      '🧪',
    category:    'Vault 50 — The Resolution',
    description: 'Recovered half the evidence in The Resolution.',
    hint:        'Solve 6 cases in this season.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 6;
    }
  },
  {
    id:          's50_ach08',
    name:        'Evidence 75% — The Resolution',
    symbol:      '🧪',
    category:    'Vault 50 — The Resolution',
    description: 'Recovered most of the evidence in The Resolution.',
    hint:        'Solve 9 cases in this season.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return ids.filter(function(id){ return s.solved.indexOf(id) !== -1; }).length >= 9;
    }
  },
  {
    id:          's50_ach09',
    name:        'Evidence 100% — The Resolution',
    symbol:      '🧪',
    category:    'Vault 50 — The Resolution',
    description: 'Recovered every piece of evidence in The Resolution.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's50_ach10',
    name:        'First Try — The Resolution',
    symbol:      '🎯',
    category:    'Vault 50 — The Resolution',
    description: 'Solved every case in The Resolution on the first attempt.',
    hint:        'Solve all cases in this season without a wrong guess.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 1;
      });
    }
  },
  {
    id:          's50_ach11',
    name:        'No Hints — The Resolution',
    symbol:      '🧠',
    category:    'Vault 50 — The Resolution',
    description: 'Completed The Resolution without ever revealing a hint.',
    hint:        'Solve all cases in this season before hints appear (3+ attempts).',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return ids.every(function(id) {
        if (s.solved.indexOf(id) === -1) return false;
        var a = 0; try { a = parseInt(localStorage.getItem('av_attempts_' + id) || '0', 10) || 0; } catch(e) {}
        return a <= 2;
      });
    }
  },
  {
    id:          's50_ach12',
    name:        'Under Time — The Resolution',
    symbol:      '⏱',
    category:    'Vault 50 — The Resolution',
    description: 'Completed The Resolution within a week of the first solve.',
    hint:        'Solve all cases in this season within 7 days of the first.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      if (!ids.every(function(id){ return s.solved.indexOf(id) !== -1; })) return false;
      var dates = {}; try { dates = JSON.parse(localStorage.getItem('av_completed_dates') || '{}'); } catch(e) {}
      var times = ids.map(function(id){ return dates[id] ? new Date(dates[id]).getTime() : null; }).filter(function(t){ return t; });
      if (times.length < ids.length) return false;
      var span = Math.max.apply(null, times) - Math.min.apply(null, times);
      return span <= 7 * 24 * 60 * 60 * 1000;
    }
  },
  {
    id:          's50_ach13',
    name:        'Case Notes Read — The Resolution',
    symbol:      '📝',
    category:    'Vault 50 — The Resolution',
    description: 'Reviewed every incident report in The Resolution.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's50_ach14',
    name:        'Full Playlist — The Resolution',
    symbol:      '🎵',
    category:    'Vault 50 — The Resolution',
    description: 'Listened to every recovered recording in The Resolution.',
    hint:        'Solve all 12 cases in this season.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's50_ach15',
    name:        'Vault Unsealed — The Resolution',
    symbol:      '🔓',
    category:    'Vault 50 — The Resolution',
    description: 'Unlocked the The Resolution vault.',
    hint:        'Solve all 12 cases in this season to unlock its vault.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
      return ids.every(function(id){ return s.solved.indexOf(id) !== -1; });
    }
  },
  {
    id:          's50_ach16',
    name:        'Perfect Record — The Resolution',
    symbol:      '🏆',
    category:    'Vault 50 — The Resolution',
    description: 'Earned every achievement in The Resolution.',
    hint:        'Solve every case in this season on the first try, hint-free, within a week.',
    check: function(s) {
      var ids = ['589','590','591','592','593','594','595','596','597','598','599','600'];
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
