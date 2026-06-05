// ============================================
// SMART GRADE v4.0 - DATABASE.JS
// VERSION COMPLÈTE AVEC STREAK INFINI
// 22 BADGES ACHIEVEMENT + STREAK INFINI
// ============================================

var SUBJECT_ICONS = {
  1: 'fa-laptop-code',
  2: 'fa-square-root-variable',
  3: 'fa-flask',
  4: 'fa-dna',
  5: 'fa-mountain',
  6: 'fa-atom',
  7: 'fa-calculator',
  8: 'fa-leaf',
  9: 'fa-chart-line',
  10: 'fa-language',
  11: 'fa-earth-africa',
  12: 'fa-landmark',
  13: 'fa-flag',
  14: 'fa-apple-whole'
};

var DEFAULT_SUBJECTS = [
  { id: 1, name: "COMPUTER SCIENCES", code: "CS", coefficient: 5, icon: 'fa-laptop-code' },
  { id: 2, name: "MATHEMATICS", code: "MATH", coefficient: 5, icon: 'fa-square-root-variable' },
  { id: 3, name: "CHEMISTRY", code: "CHM", coefficient: 5, icon: 'fa-flask' },
  { id: 4, name: "HUMAN BIOLOGY", code: "HBIO", coefficient: 5, icon: 'fa-dna' },
  { id: 5, name: "GEOLOGY", code: "GEL", coefficient: 5, icon: 'fa-mountain' },
  { id: 6, name: "PHYSICS", code: "PHY", coefficient: 5, icon: 'fa-atom' },
  { id: 7, name: "ADDITIONAL MATHEMATICS", code: "AMATH", coefficient: 5, icon: 'fa-calculator' },
  { id: 8, name: "BIOLOGY", code: "BIO", coefficient: 5, icon: 'fa-leaf' },
  { id: 9, name: "ECONOMICS", code: "ECO", coefficient: 5, icon: 'fa-chart-line' },
  { id: 10, name: "ENGLISH LANGUAGE", code: "ENG", coefficient: 5, icon: 'fa-language' },
  { id: 11, name: "GEOGRAPHY", code: "GEO", coefficient: 5, icon: 'fa-earth-africa' },
  { id: 12, name: "CITIZENSHIP", code: "CIV", coefficient: 5, icon: 'fa-landmark' },
  { id: 13, name: "FRENCH", code: "FR", coefficient: 5, icon: 'fa-flag' },
  { id: 14, name: "FOOD AND NUTRITION", code: "FDN", coefficient: 5, icon: 'fa-apple-whole' }
];

// ============================================
// 22 BADGES ACHIEVEMENT
// ============================================
var ACHIEVEMENTS = [
  { id: 38, name: "Welcome Aboard", desc: "First login after installation" },
  { id: 36, name: "Photo Uploader", desc: "Add a profile photo" },
  { id: 1, name: "First Grade", desc: "Add your very first grade" },
  { id: 2, name: "Perfect Score", desc: "Get 20/20 in any subject" },
  { id: 3, name: "High Average", desc: "Overall average 12/20 and above" },
  { id: 4, name: "Bookworm", desc: "Record 10+ grades" },
  { id: 5, name: "Dedication", desc: "Record 30+ grades" },
  { id: 6, name: "Scholar", desc: "Unlock 8 achievements" },
  { id: 7, name: "Rising Star", desc: "Improve by 1+ point in a term" },
  { id: 8, name: "Unstoppable", desc: "All 3 terms have grades entered" },
  { id: 9, name: "Subject Completion", desc: "Add grades in all subjects of a term" },
  { id: 10, name: "Active Semester", desc: "Complete a full term (all sequences)" },
  { id: 11, name: "Discipline Mastery", desc: "Average above 15 in one subject" },
  { id: 12, name: "Study Progress", desc: "Record 25+ grades" },
  { id: 13, name: "Full Achievement", desc: "Unlock ALL 22 achievement badges" },
  { id: 14, name: "Excellent Result", desc: "Get 20/20 in a subject" },
  { id: 25, name: "Comeback King", desc: "Improve by 5+ points in any subject" },
  { id: 34, name: "Theme Collector", desc: "Try 10 different themes" },
  { id: 50, name: "Font Collector", desc: "Try 6 different fonts" },
  { id: 57, name: "Timetable Viewer", desc: "View timetable 10 times" },
  { id: 58, name: "Flashcard Beginner", desc: "Create 5 custom flashcards" },
  { id: 59, name: "Flashcard Master", desc: "Create 10 custom flashcards" }
];

// ============================================
// STREAK INFINI - CYCLES DE BADGES
// ============================================

var STREAK_CYCLES = [
  { prefix: "Beginner", colors: ["#2ecc71", "#f39c12", "#e74c3c", "#3498db"] },
  { prefix: "Elite", colors: ["#cd7f32", "#c0c0c0", "#ffd700", "#e5e4e2"] },
  { prefix: "Royal", colors: ["#50c878", "#e0115f", "#0f52ba", "#b9f2ff"] },
  { prefix: "Legendary", colors: ["#000000", "#ffffff", "#9966cc", "#f8f9fa"] },
  { prefix: "Mythic", colors: ["#ff4500", "#8b00ff", "#00ced1", "#ffd700"] },
  { prefix: "Elemental", colors: ["#ff6600", "#a0522d", "#191970", "#ff69b4"] },
  { prefix: "Dark", colors: ["#2c3e50", "#34495e", "#1a252f", "#0d141e"] },
  { prefix: "Fire", colors: ["#ff4d4d", "#ff6b6b", "#ff8c8c", "#ffaaaa"] },
  { prefix: "Frozen", colors: ["#4d79ff", "#6b8cff", "#8ca6ff", "#aabfff"] },
  { prefix: "Serpent", colors: ["#00b894", "#55efc4", "#00cec9", "#81ecec"] },
  { prefix: "Sky", colors: ["#0984e3", "#74b9ff", "#a29bfe", "#dfe6e9"] },
  { prefix: "Beast", colors: ["#d63031", "#e17055", "#fdcb6e", "#ffeaa7"] },
  { prefix: "Magic", colors: ["#6c5ce7", "#a29bfe", "#fd79a8", "#e84393"] },
  { prefix: "Metal", colors: ["#7f8c8d", "#95a5a6", "#bdc3c7", "#ecf0f1"] },
  { prefix: "Space", colors: ["#2d3436", "#636e72", "#b2bec3", "#dfe6e9"] }
];

var STREAK_MILESTONES = [3, 7, 15, 30];

function getStreakBadgeName(days) {
  var cycleNumber = Math.floor((days - 1) / 30);
  var cycleIndex = cycleNumber % STREAK_CYCLES.length;
  var milestoneIndex = -1;
  
  for (var i = 0; i < STREAK_MILESTONES.length; i++) {
    var target = (cycleNumber * 30) + STREAK_MILESTONES[i];
    if (days === target) {
      milestoneIndex = i;
      break;
    }
  }
  
  var prefix = STREAK_CYCLES[cycleIndex].prefix;
  var milestoneNames = ["Starter", "Rising", "Advanced", "Master"];
  var name = prefix + " " + (milestoneIndex >= 0 ? milestoneNames[milestoneIndex] : "Streak");
  var color = STREAK_CYCLES[cycleIndex].colors[milestoneIndex >= 0 ? milestoneIndex : 0];
  
  return { name: name, color: color };
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function addNotification(type, title, body) {
  try {
    var stored = localStorage.getItem('smartgrade_current');
    var user = stored ? JSON.parse(stored) : null;
    if (!user || !user.id) return;
    
    var notifs = JSON.parse(localStorage.getItem('smartgrade_notifications_' + user.id) || '[]');
    notifs.unshift({
      id: Date.now(),
      type: type,
      title: title,
      body: body,
      date: new Date().toISOString(),
      read: false
    });
    if (notifs.length > 200) notifs = notifs.slice(0, 200);
    localStorage.setItem('smartgrade_notifications_' + user.id, JSON.stringify(notifs));
  } catch(e) {}
  
  showToast(title + ': ' + body);
}

function showToast(message) {
  var container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = '<i class="fas fa-info-circle"></i> ' + message;
  container.appendChild(toast);
  setTimeout(function() {
    toast.style.opacity = '0';
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 300);
  }, 3000);
}

function sendLocalNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, { body: body, icon: 'icon.svg', vibrate: [200, 100, 200] });
    } catch (e) {}
  }
  addNotification('badge', title, body);
}

// ============================================
// STUDENTS
// ============================================

function getAllStudents() {
  var d = localStorage.getItem('smartgrade_students');
  if (!d) return [];
  try { return JSON.parse(d); } catch(e) { return []; }
}

function saveAllStudents(s) {
  localStorage.setItem('smartgrade_students', JSON.stringify(s));
}

function getStudentById(id) {
  var students = getAllStudents();
  for (var i = 0; i < students.length; i++) {
    if (students[i].id === id) return students[i];
  }
  return null;
}

function createStudentAccount(name, number, className, pin) {
  var s = getAllStudents();
  for (var i = 0; i < s.length; i++) {
    if (s[i].class === className && s[i].number === number) {
      return { success: false, message: 'Number ' + number + ' already taken in ' + className };
    }
  }
  var nid = s.length > 0 ? Math.max.apply(null, s.map(function(x) { return x.id; })) + 1 : 1;
  var st = {
    id: nid,
    name: name,
    number: number,
    class: className,
    pin: pin,
    createdAt: new Date().toISOString(),
    hasFingerprint: false,
    fingerprintHash: null
  };
  s.push(st);
  saveAllStudents(s);
  saveStudentGrades(nid, []);
  saveStudentAchievements(nid, []);
  for (var t = 1; t <= 3; t++) {
    saveStudentSelectedSubjects(nid, t, DEFAULT_SUBJECTS.map(function(x) { return x.id; }));
  }
  var c = {};
  DEFAULT_SUBJECTS.forEach(function(x) { c[x.id] = 5; });
  saveSubjectCoefficients(nid, c);
  saveStudentGoal(nid, 12);
  saveStudentStreak(nid, { days: 0, lastLogin: null });
  saveProfile(nid, { avatarBase64: '', bio: '', favorites: [] });
  
  addNotification('account', 'Account Created', 'Welcome ' + name + '! Your account has been created');
  
  return { success: true, student: st };
}

function deleteStudent(id) {
  var s = getAllStudents().filter(function(x) { return x.id !== id; });
  saveAllStudents(s);
  var keys = [
    'smartgrade_grades_', 'smartgrade_achievements_', 'smartgrade_coeffs_',
    'smartgrade_goal_', 'smartgrade_streak_', 'smartgrade_compensations_',
    'smartgrade_history_', 'smartgrade_sync_', 'smartgrade_profile_',
    'smartgrade_flashcards_', 'smartgrade_goals_detail_', 'smartgrade_used_themes_',
    'smartgrade_used_fonts_', 'smartgrade_welcome_badge_', 'smartgrade_timetable_views_'
  ];
  for (var i = 0; i < keys.length; i++) {
    localStorage.removeItem(keys[i] + id);
  }
  for (var t = 1; t <= 3; t++) {
    localStorage.removeItem('smartgrade_selected_' + id + '_term' + t);
  }
}

function getUsedNumbersInClass(c) {
  var students = getAllStudents();
  var numbers = [];
  for (var i = 0; i < students.length; i++) {
    if (students[i].class === c) numbers.push(students[i].number);
  }
  return numbers;
}

function getCurrentStudent() {
  var d = localStorage.getItem('smartgrade_current');
  if (!d) return null;
  try {
    var p = JSON.parse(d);
    return getStudentById(p.id);
  } catch(e) { return null; }
}

function setCurrentStudent(s) {
  localStorage.setItem('smartgrade_current', JSON.stringify({
    id: s.id,
    name: s.name,
    number: s.number,
    class: s.class
  }));
}

function clearCurrentStudent() {
  localStorage.removeItem('smartgrade_current');
}

// ============================================
// GRADES
// ============================================

function getStudentGrades(id) {
  var d = localStorage.getItem('smartgrade_grades_' + id);
  if (!d) return [];
  try { return JSON.parse(d); } catch(e) { return []; }
}

function saveStudentGrades(id, g) {
  localStorage.setItem('smartgrade_grades_' + id, JSON.stringify(g));
  addHistory(id, 'Grades updated (' + g.length + ' total)');
}

// ============================================
// SUBJECTS
// ============================================

function getStudentSelectedSubjects(id, term) {
  var d = localStorage.getItem('smartgrade_selected_' + id + '_term' + term);
  if (!d) return DEFAULT_SUBJECTS.map(function(s) { return s.id; });
  try { return JSON.parse(d); } catch(e) { return DEFAULT_SUBJECTS.map(function(s) { return s.id; }); }
}

function saveStudentSelectedSubjects(id, term, subjs) {
  localStorage.setItem('smartgrade_selected_' + id + '_term' + term, JSON.stringify(subjs));
  addHistory(id, 'Term ' + term + ' subjects updated');
}

function getActiveSubjectsWithCoefficients(id, term) {
  var sel = getStudentSelectedSubjects(id, term);
  return DEFAULT_SUBJECTS.filter(function(s) { return sel.indexOf(s.id) !== -1; }).map(function(s) {
    s.coefficient = getSubjectCoefficient(id, s.id);
    return s;
  });
}

function getSubjectCoefficients(id) {
  var d = localStorage.getItem('smartgrade_coeffs_' + id);
  if (!d) {
    var c = {};
    DEFAULT_SUBJECTS.forEach(function(s) { c[s.id] = 5; });
    return c;
  }
  try { return JSON.parse(d); } catch(e) {
    var c = {};
    DEFAULT_SUBJECTS.forEach(function(s) { c[s.id] = 5; });
    return c;
  }
}

function getSubjectCoefficient(id, sid) {
  var c = getSubjectCoefficients(id);
  return c[sid] || 5;
}

function saveSubjectCoefficients(id, c) {
  localStorage.setItem('smartgrade_coeffs_' + id, JSON.stringify(c));
  addHistory(id, 'Coefficients updated');
}

// ============================================
// CALCULATIONS
// ============================================

function getSubjectSequenceAverage(sid, seq, grades) {
  var sg = grades.filter(function(g) { return g.subjectId === sid && g.sequenceId === seq; });
  if (sg.length === 0) return 0;
  var sum = 0;
  for (var i = 0; i < sg.length; i++) sum += sg[i].value;
  return Math.round((sum / sg.length) * 100) / 100;
}

function calculateSubjectTermAverage(sid, term, grades) {
  var seq = getSequencesForTerm(term);
  var tg = grades.filter(function(g) { return g.subjectId === sid && (g.sequenceId === seq[0] || g.sequenceId === seq[1]); });
  if (tg.length === 0) return 0;
  var sum = 0;
  for (var i = 0; i < tg.length; i++) sum += tg[i].value;
  return Math.round((sum / tg.length) * 100) / 100;
}

function calculateStudentTermAverage(id, term) {
  var subs = getActiveSubjectsWithCoefficients(id, term);
  var grades = getStudentGrades(id);
  var totalWeighted = 0;
  var totalCoeff = 0;
  for (var i = 0; i < subs.length; i++) {
    var avg = calculateSubjectTermAverage(subs[i].id, term, grades);
    totalWeighted += avg * subs[i].coefficient;
    totalCoeff += subs[i].coefficient;
  }
  return totalCoeff > 0 ? Math.round((totalWeighted / totalCoeff) * 100) / 100 : 0;
}

function calculateYearlyAverage(id) {
  var t1 = calculateStudentTermAverage(id, 1);
  var t2 = calculateStudentTermAverage(id, 2);
  var t3 = calculateStudentTermAverage(id, 3);
  return Math.round(((t1 + t2 + t3) / 3) * 100) / 100;
}

// ============================================
// ACHIEVEMENTS
// ============================================

function getStudentAchievements(id) {
  var d = localStorage.getItem('smartgrade_achievements_' + id);
  if (!d) return [];
  try { return JSON.parse(d); } catch(e) { return []; }
}

function saveStudentAchievements(id, a) {
  localStorage.setItem('smartgrade_achievements_' + id, JSON.stringify(a));
}

// ============================================
// GOAL
// ============================================

function getStudentGoal(id) {
  var d = localStorage.getItem('smartgrade_goal_' + id);
  if (!d) return 12;
  try { return parseFloat(d); } catch(e) { return 12; }
}

function saveStudentGoal(id, g) {
  localStorage.setItem('smartgrade_goal_' + id, g);
}

// ============================================
// STREAK INFINI - FONCTIONS PRINCIPALES
// ============================================

function getStudentStreak(id) {
  var d = localStorage.getItem('smartgrade_streak_' + id);
  if (!d) return { days: 0, lastLogin: null };
  try { return JSON.parse(d); } catch(e) { return { days: 0, lastLogin: null }; }
}

function saveStudentStreak(id, s) {
  localStorage.setItem('smartgrade_streak_' + id, JSON.stringify(s));
}

function checkAndUnlockStreakBadge(studentId, days) {
  if (!studentId || days < 3) return false;
  
  var milestones = [3, 7, 15, 30];
  var cycleNumber = Math.floor((days - 1) / 30);
  var cycleStart = cycleNumber * 30;
  
  for (var i = 0; i < milestones.length; i++) {
    var target = cycleStart + milestones[i];
    if (days === target) {
      var badgeKey = 'streak_' + cycleNumber + '_' + milestones[i];
      var unlockedBadges = JSON.parse(localStorage.getItem('smartgrade_streak_unlocked_' + studentId) || '[]');
      
      var alreadyUnlocked = false;
      for (var j = 0; j < unlockedBadges.length; j++) {
        if (unlockedBadges[j] === badgeKey) {
          alreadyUnlocked = true;
          break;
        }
      }
      
      if (!alreadyUnlocked) {
        unlockedBadges.push(badgeKey);
        localStorage.setItem('smartgrade_streak_unlocked_' + studentId, JSON.stringify(unlockedBadges));
        
        var badgeInfo = getStreakBadgeName(days);
        
        var achievements = getStudentAchievements(studentId);
        achievements.push({
          id: badgeKey,
          name: badgeInfo.name,
          desc: "Reach " + days + " days streak",
          unlocked: true,
          unlockDate: new Date().toLocaleDateString(),
          notified: false,
          streakDays: days
        });
        saveStudentAchievements(studentId, achievements);
        
        var msg = 'Streak Badge Unlocked: ' + badgeInfo.name + ' (' + days + ' days)!';
        console.log(msg);
        showToast(msg);
        addNotification('streak', msg, 'You reached a ' + days + ' day streak!');
        
        return true;
      }
    }
  }
  return false;
}

function updateStreakOnVisit(id) {
  if (!id) return;
  var s = getStudentStreak(id);
  var today = new Date().toISOString().split('T')[0];
  
  if (!s.lastLogin) {
    s = { days: 1, lastLogin: today };
    saveStudentStreak(id, s);
    checkAndUnlockStreakBadge(id, s.days);
    addNotification('streak', 'Streak Started!', 'Day 1 - Keep logging in daily!');
    return s;
  }
  
  var ld = new Date(s.lastLogin);
  var cd = new Date(today);
  var diff = Math.floor((cd - ld) / (1000 * 60 * 60 * 24));
  
  if (diff === 0) return s;
  
  if (diff === 1) {
    s.days += 1;
    s.lastLogin = today;
    saveStudentStreak(id, s);
    checkAndUnlockStreakBadge(id, s.days);
    
    var nextMilestone = getNextStreakMilestone(s.days);
    if (nextMilestone) {
      addNotification('streak', 'Streak: ' + s.days + ' Days!', 'Next badge at ' + nextMilestone + ' days');
    }
    return s;
  }
  
  if (s.days > 0) {
    addNotification('streak', 'Streak Broken', 'Your ' + s.days + ' day streak has ended. Start a new one!');
  }
  s = { days: 1, lastLogin: today };
  saveStudentStreak(id, s);
  checkAndUnlockStreakBadge(id, s.days);
  return s;
}

function getNextStreakMilestone(currentDays) {
  var milestones = [3, 7, 15, 30];
  var cycleNumber = Math.floor(currentDays / 30);
  var cycleStart = cycleNumber * 30;
  
  for (var i = 0; i < milestones.length; i++) {
    var target = cycleStart + milestones[i];
    if (target > currentDays) {
      return target;
    }
  }
  return (cycleNumber + 1) * 30 + 3;
}

function getUnlockedStreakBadgesList(studentId) {
  return JSON.parse(localStorage.getItem('smartgrade_streak_unlocked_' + studentId) || '[]');
}

function getActiveStreakMilestones(currentDays) {
  var milestones = [3, 7, 15, 30];
  var cycleNumber = Math.floor(currentDays / 30);
  var cycleStart = cycleNumber * 30;
  var active = [];
  
  for (var i = 0; i < milestones.length; i++) {
    var target = cycleStart + milestones[i];
    if (target > currentDays) {
      var badgeInfo = getStreakBadgeName(target);
      active.push({
        daysRequired: target,
        name: badgeInfo.name,
        color: badgeInfo.color,
        currentDays: currentDays,
        progress: Math.min(100, Math.round((currentDays / target) * 100))
      });
    }
  }
  
  if (active.length === 0) {
    cycleNumber++;
    cycleStart = cycleNumber * 30;
    for (var i = 0; i < milestones.length; i++) {
      var target = cycleStart + milestones[i];
      var badgeInfo = getStreakBadgeName(target);
      active.push({
        daysRequired: target,
        name: badgeInfo.name,
        color: badgeInfo.color,
        currentDays: currentDays,
        progress: Math.min(100, Math.round((currentDays / target) * 100))
      });
    }
  }
  
  return active;
}

// ============================================
// THEME & FONT
// ============================================

function getSavedTheme() {
  return localStorage.getItem('smartgrade_theme') || 'default';
}

function saveTheme(t) {
  localStorage.setItem('smartgrade_theme', t);
}

function getSavedFontSize() {
  return localStorage.getItem('smartgrade_font') || 'medium';
}

function saveFontSize(f) {
  localStorage.setItem('smartgrade_font', f);
}

// ============================================
// COMPENSATION
// ============================================

function applyCompensation(studentId, termNum, removedSubjectId) {
  var grades = getStudentGrades(studentId);
  var subs = getActiveSubjectsWithCoefficients(studentId, termNum);
  var termAvg = calculateStudentTermAverage(studentId, termNum);
  var subjAvg = calculateSubjectTermAverage(removedSubjectId, termNum, grades);
  var remaining = subs.filter(function(s) { return s.id !== removedSubjectId; });
  if (remaining.length === 0) return { success: false, message: 'Need at least 1 remaining subject' };
  var gap = Math.round((subjAvg - termAvg) * 100) / 100;
  var adj = Math.round((gap / remaining.length) * 100) / 100;
  var seq1 = (termNum - 1) * 2 + 1;
  var seq2 = seq1 + 1;
  for (var i = 0; i < remaining.length; i++) {
    var s = remaining[i];
    var g1 = null;
    var g2 = null;
    for (var k = 0; k < grades.length; k++) {
      if (grades[k].subjectId === s.id && grades[k].sequenceId === seq1) g1 = grades[k];
      if (grades[k].subjectId === s.id && grades[k].sequenceId === seq2) g2 = grades[k];
    }
    if (g1 && g1.value > 0) {
      g1.value = Math.round((g1.value + adj) * 100) / 100;
    }
    if (g2 && g2.value > 0) {
      g2.value = Math.round((g2.value + adj) * 100) / 100;
    }
  }
  saveStudentGrades(studentId, grades);
  var newSel = getStudentSelectedSubjects(studentId, termNum).filter(function(id) { return id !== removedSubjectId; });
  saveStudentSelectedSubjects(studentId, termNum, newSel);
  var compData = {
    termNum: termNum,
    removedSubjectId: removedSubjectId,
    removedAvg: subjAvg,
    termAvgBefore: termAvg,
    termAvgAfter: calculateStudentTermAverage(studentId, termNum),
    adjustment: adj,
    date: new Date().toISOString()
  };
  var comps = getAllComps(studentId);
  comps[termNum] = compData;
  saveAllComps(studentId, comps);
  
  addNotification('academic', 'Compensation Applied', 'Term ' + termNum + ' average preserved after removing subject');
  
  return { success: true, data: compData };
}

function getAllComps(studentId) {
  var d = localStorage.getItem('smartgrade_compensations_' + studentId);
  return d ? JSON.parse(d) : {};
}

function saveAllComps(studentId, comps) {
  localStorage.setItem('smartgrade_compensations_' + studentId, JSON.stringify(comps));
}

// ============================================
// PROFILE
// ============================================

function getProfile(studentId) {
  var d = localStorage.getItem('smartgrade_profile_' + studentId);
  if (!d) return { avatarBase64: '', bio: '', favorites: [] };
  try {
    var p = JSON.parse(d);
    return {
      avatarBase64: p.avatarBase64 || '',
      bio: p.bio || '',
      favorites: p.favorites || []
    };
  } catch(e) {
    return { avatarBase64: '', bio: '', favorites: [] };
  }
}

function saveProfile(studentId, profile) {
  localStorage.setItem('smartgrade_profile_' + studentId, JSON.stringify(profile));
}

// ============================================
// FLASHCARDS
// ============================================

function getFlashcards(studentId) {
  var d = localStorage.getItem('smartgrade_flashcards_' + studentId);
  if (!d) return [];
  try { return JSON.parse(d); } catch(e) { return []; }
}

function saveFlashcards(studentId, cards) {
  localStorage.setItem('smartgrade_flashcards_' + studentId, JSON.stringify(cards));
}

// ============================================
// GOALS DETAIL
// ============================================

function getGoalsDetail(studentId) {
  var d = localStorage.getItem('smartgrade_goals_detail_' + studentId);
  if (!d) return {};
  try { return JSON.parse(d); } catch(e) { return {}; }
}

function saveGoalsDetail(studentId, goals) {
  localStorage.setItem('smartgrade_goals_detail_' + studentId, JSON.stringify(goals));
}

// ============================================
// HISTORY
// ============================================

function addHistory(id, action) {
  var h = JSON.parse(localStorage.getItem('smartgrade_history_' + id) || '[]');
  h.unshift({ action: action, date: new Date().toISOString(), timestamp: Date.now() });
  if (h.length > 50) h = h.slice(0, 50);
  localStorage.setItem('smartgrade_history_' + id, JSON.stringify(h));
}

// ============================================
// BADGE FUNCTIONS
// ============================================

function unlockWelcomeBadge(studentId) {
  if (!studentId) return false;
  
  var achievements = getStudentAchievements(studentId);
  for (var i = 0; i < achievements.length; i++) {
    if (achievements[i].id === 38 && achievements[i].unlocked) return true;
  }
  
  achievements.push({
    id: 38,
    name: "Welcome Aboard",
    desc: "First login after installation",
    unlocked: true,
    unlockDate: new Date().toLocaleDateString(),
    notified: false
  });
  saveStudentAchievements(studentId, achievements);
  showToast('Badge unlocked: Welcome Aboard!');
  return true;
}

function checkFirstGradeBadge(studentId) {
  var grades = getStudentGrades(studentId);
  if (grades.length >= 1) {
    unlockBadgeById(studentId, 1);
  }
}

function checkPerfectScoreBadge(studentId) {
  var grades = getStudentGrades(studentId);
  for (var i = 0; i < grades.length; i++) {
    if (grades[i].value >= 19.95) {
      unlockBadgeById(studentId, 2);
      break;
    }
  }
}

function checkHighAverageBadge(studentId) {
  var yearly = calculateYearlyAverage(studentId);
  if (yearly >= 12) {
    unlockBadgeById(studentId, 3);
  }
}

function checkBookwormBadge(studentId) {
  var grades = getStudentGrades(studentId);
  if (grades.length >= 10) {
    unlockBadgeById(studentId, 4);
  }
}

function checkDedicationBadge(studentId) {
  var grades = getStudentGrades(studentId);
  if (grades.length >= 30) {
    unlockBadgeById(studentId, 5);
  }
}

function checkScholarBadge(studentId) {
  var achievements = getStudentAchievements(studentId);
  var unlocked = 0;
  for (var i = 0; i < achievements.length; i++) {
    if (achievements[i].unlocked && achievements[i].id !== 13) unlocked++;
  }
  if (unlocked >= 8) {
    unlockBadgeById(studentId, 6);
  }
}

function checkRisingStarBadge(studentId) {
  var t1 = calculateStudentTermAverage(studentId, 1);
  var t2 = calculateStudentTermAverage(studentId, 2);
  var t3 = calculateStudentTermAverage(studentId, 3);
  if ((t2 - t1 >= 1) || (t3 - t2 >= 1)) {
    unlockBadgeById(studentId, 7);
  }
}

function checkUnstoppableBadge(studentId) {
  var t1 = calculateStudentTermAverage(studentId, 1);
  var t2 = calculateStudentTermAverage(studentId, 2);
  var t3 = calculateStudentTermAverage(studentId, 3);
  if (t1 > 0 && t2 > 0 && t3 > 0) {
    unlockBadgeById(studentId, 8);
  }
}

function checkSubjectCompletionBadge(studentId) {
  for (var term = 1; term <= 3; term++) {
    var selected = getStudentSelectedSubjects(studentId, term);
    var grades = getStudentGrades(studentId);
    var allHaveGrades = true;
    for (var i = 0; i < selected.length; i++) {
      var hasGrade = false;
      for (var k = 0; k < grades.length; k++) {
        if (grades[k].subjectId === selected[i]) {
          hasGrade = true;
          break;
        }
      }
      if (!hasGrade) {
        allHaveGrades = false;
        break;
      }
    }
    if (allHaveGrades && selected.length > 0) {
      unlockBadgeById(studentId, 9);
      break;
    }
  }
}

function checkActiveSemesterBadge(studentId) {
  for (var term = 1; term <= 3; term++) {
    var selected = getStudentSelectedSubjects(studentId, term);
    var grades = getStudentGrades(studentId);
    var allComplete = true;
    var seq1 = (term - 1) * 2 + 1;
    var seq2 = seq1 + 1;
    for (var i = 0; i < selected.length; i++) {
      var hasSeq1 = false;
      var hasSeq2 = false;
      for (var k = 0; k < grades.length; k++) {
        if (grades[k].subjectId === selected[i] && grades[k].sequenceId === seq1) hasSeq1 = true;
        if (grades[k].subjectId === selected[i] && grades[k].sequenceId === seq2) hasSeq2 = true;
      }
      if (!hasSeq1 || !hasSeq2) {
        allComplete = false;
        break;
      }
    }
    if (allComplete && selected.length > 0) {
      unlockBadgeById(studentId, 10);
      break;
    }
  }
}

function checkDisciplineMasteryBadge(studentId) {
  var grades = getStudentGrades(studentId);
  var subjects = {};
  for (var i = 0; i < grades.length; i++) {
    if (!subjects[grades[i].subjectId]) subjects[grades[i].subjectId] = [];
    subjects[grades[i].subjectId].push(grades[i].value);
  }
  for (var subj in subjects) {
    var sum = 0;
    for (var j = 0; j < subjects[subj].length; j++) sum += subjects[subj][j];
    var avg = sum / subjects[subj].length;
    if (avg >= 15) {
      unlockBadgeById(studentId, 11);
      break;
    }
  }
}

function checkStudyProgressBadge(studentId) {
  var grades = getStudentGrades(studentId);
  if (grades.length >= 25) {
    unlockBadgeById(studentId, 12);
  }
}

function checkFullAchievementBadge(studentId) {
  var achievements = getStudentAchievements(studentId);
  var requiredBadges = [1,2,3,4,5,6,7,8,9,10,11,12,14,25,34,36,38,50,57,58,59];
  var unlockedCount = 0;
  
  for (var i = 0; i < achievements.length; i++) {
    if (achievements[i].unlocked && requiredBadges.indexOf(achievements[i].id) !== -1) {
      unlockedCount++;
    }
  }
  
  if (unlockedCount >= requiredBadges.length) {
    unlockBadgeById(studentId, 13);
  }
}

function checkExcellentResultBadge(studentId) {
  var grades = getStudentGrades(studentId);
  for (var i = 0; i < grades.length; i++) {
    if (grades[i].value >= 19.95) {
      unlockBadgeById(studentId, 14);
      break;
    }
  }
}

function checkComebackBadge(studentId) {
  var grades = getStudentGrades(studentId);
  var subjects = {};
  
  for (var i = 0; i < grades.length; i++) {
    var g = grades[i];
    if (!subjects[g.subjectId]) subjects[g.subjectId] = [];
    subjects[g.subjectId].push(g.value);
  }
  
  for (var subjId in subjects) {
    var values = subjects[subjId];
    if (values.length < 2) continue;
    
    var firstAvg = 0;
    for (var j = 0; j < Math.min(values.length, 2); j++) firstAvg += values[j];
    firstAvg = firstAvg / Math.min(values.length, 2);
    
    var lastAvg = 0;
    var lastStart = Math.max(0, values.length - 2);
    for (var k = lastStart; k < values.length; k++) lastAvg += values[k];
    lastAvg = lastAvg / Math.min(values.length, 2);
    
    if (lastAvg - firstAvg >= 5) {
      unlockBadgeById(studentId, 25);
      break;
    }
  }
}

function trackThemeUsage(studentId, themeName) {
  var usedThemes = JSON.parse(localStorage.getItem('smartgrade_used_themes_' + studentId) || '[]');
  var alreadyUsed = false;
  for (var i = 0; i < usedThemes.length; i++) {
    if (usedThemes[i] === themeName) {
      alreadyUsed = true;
      break;
    }
  }
  if (!alreadyUsed) {
    usedThemes.push(themeName);
    localStorage.setItem('smartgrade_used_themes_' + studentId, JSON.stringify(usedThemes));
    if (usedThemes.length >= 10) {
      unlockBadgeById(studentId, 34);
    }
  }
}

function checkPhotoBadge(studentId) {
  var profile = getProfile(studentId);
  if (profile.avatarBase64 && profile.avatarBase64 !== '' && profile.avatarBase64.length > 100) {
    unlockBadgeById(studentId, 36);
  }
}

function trackFontUsage(studentId, fontId) {
  var usedFonts = JSON.parse(localStorage.getItem('smartgrade_used_fonts_' + studentId) || '[]');
  var alreadyUsed = false;
  for (var i = 0; i < usedFonts.length; i++) {
    if (usedFonts[i] === fontId) {
      alreadyUsed = true;
      break;
    }
  }
  if (!alreadyUsed) {
    usedFonts.push(fontId);
    localStorage.setItem('smartgrade_used_fonts_' + studentId, JSON.stringify(usedFonts));
    if (usedFonts.length >= 6) {
      unlockBadgeById(studentId, 50);
    }
  }
}

function incrementTimetableView(studentId) {
  var count = parseInt(localStorage.getItem('smartgrade_timetable_views_' + studentId) || '0');
  count++;
  localStorage.setItem('smartgrade_timetable_views_' + studentId, count);
  if (count >= 10) {
    unlockBadgeById(studentId, 57);
  }
  return count;
}

function checkFlashcardBadges(studentId) {
  var cards = getFlashcards(studentId);
  var customCount = 0;
  for (var i = 0; i < cards.length; i++) {
    if (!cards[i].isOriginal) customCount++;
  }
  if (customCount >= 5) unlockBadgeById(studentId, 58);
  if (customCount >= 10) unlockBadgeById(studentId, 59);
}

// ============================================
// UNLOCK BADGE (fonction principale)
// ============================================

function unlockBadgeById(studentId, badgeId) {
  if (!studentId) return false;
  
  var achievements = getStudentAchievements(studentId);
  var existing = null;
  for (var i = 0; i < achievements.length; i++) {
    if (achievements[i].id === badgeId) {
      existing = achievements[i];
      break;
    }
  }
  
  if (existing && existing.unlocked) return true;
  
  var badge = null;
  for (var i = 0; i < ACHIEVEMENTS.length; i++) {
    if (ACHIEVEMENTS[i].id === badgeId) {
      badge = ACHIEVEMENTS[i];
      break;
    }
  }
  if (!badge) return false;
  
  if (existing) {
    existing.unlocked = true;
    existing.unlockDate = new Date().toLocaleDateString();
    existing.notified = false;
  } else {
    achievements.push({
      id: badge.id,
      name: badge.name,
      desc: badge.desc,
      unlocked: true,
      unlockDate: new Date().toLocaleDateString(),
      notified: false
    });
  }
  
  saveStudentAchievements(studentId, achievements);
  
  var msg = 'Badge unlocked: ' + badge.name;
  console.log(msg);
  showToast(msg);
  addNotification('badge', msg, badge.desc);
  
  if (badgeId !== 13) {
    checkFullAchievementBadge(studentId);
  }
  
  return true;
}

// ============================================
// CHECK ALL BADGES
// ============================================

function checkAndUnlockAllNewBadges(studentId) {
  if (!studentId) return;
  
  console.log('[Badges] Checking all badges for student:', studentId);
  
  unlockWelcomeBadge(studentId);
  checkFirstGradeBadge(studentId);
  checkPerfectScoreBadge(studentId);
  checkHighAverageBadge(studentId);
  checkBookwormBadge(studentId);
  checkDedicationBadge(studentId);
  checkScholarBadge(studentId);
  checkRisingStarBadge(studentId);
  checkUnstoppableBadge(studentId);
  checkSubjectCompletionBadge(studentId);
  checkActiveSemesterBadge(studentId);
  checkDisciplineMasteryBadge(studentId);
  checkStudyProgressBadge(studentId);
  checkExcellentResultBadge(studentId);
  checkComebackBadge(studentId);
  checkPhotoBadge(studentId);
  checkFlashcardBadges(studentId);
  
  checkFullAchievementBadge(studentId);
  
  console.log('[Badges] Check complete');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getSequencesForTerm(term) {
  var s = (term - 1) * 2 + 1;
  return [s, s + 1];
}

function roundToTwo(num) {
  if (isNaN(num) || !isFinite(num)) return 0;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

// ============================================
// EXPORT GLOBAL FUNCTIONS
// ============================================

window.getCurrentStudent = getCurrentStudent;
window.getStudentById = getStudentById;
window.getAllStudents = getAllStudents;
window.getStudentGrades = getStudentGrades;
window.saveStudentGrades = saveStudentGrades;
window.getStudentAchievements = getStudentAchievements;
window.saveStudentAchievements = saveStudentAchievements;
window.getStudentStreak = getStudentStreak;
window.saveStudentStreak = saveStudentStreak;
window.updateStreakOnVisit = updateStreakOnVisit;
window.getStudentSelectedSubjects = getStudentSelectedSubjects;
window.saveStudentSelectedSubjects = saveStudentSelectedSubjects;
window.getSubjectCoefficients = getSubjectCoefficients;
window.getSubjectCoefficient = getSubjectCoefficient;
window.saveSubjectCoefficients = saveSubjectCoefficients;
window.getActiveSubjectsWithCoefficients = getActiveSubjectsWithCoefficients;
window.calculateStudentTermAverage = calculateStudentTermAverage;
window.calculateSubjectTermAverage = calculateSubjectTermAverage;
window.calculateYearlyAverage = calculateYearlyAverage;
window.getProfile = getProfile;
window.saveProfile = saveProfile;
window.getFlashcards = getFlashcards;
window.saveFlashcards = saveFlashcards;
window.getGoalsDetail = getGoalsDetail;
window.saveGoalsDetail = saveGoalsDetail;
window.addHistory = addHistory;
window.addNotification = addNotification;
window.applyCompensation = applyCompensation;
window.getAllComps = getAllComps;
window.saveAllComps = saveAllComps;
window.checkAndUnlockAllNewBadges = checkAndUnlockAllNewBadges;
window.unlockBadgeById = unlockBadgeById;
window.trackThemeUsage = trackThemeUsage;
window.trackFontUsage = trackFontUsage;
window.incrementTimetableView = incrementTimetableView;
window.checkFlashcardBadges = checkFlashcardBadges;
window.checkPhotoBadge = checkPhotoBadge;
window.unlockWelcomeBadge = unlockWelcomeBadge;
window.getSavedTheme = getSavedTheme;
window.saveTheme = saveTheme;
window.getSavedFontSize = getSavedFontSize;
window.saveFontSize = saveFontSize;
window.getSequencesForTerm = getSequencesForTerm;
window.roundToTwo = roundToTwo;
window.showToast = showToast;

// Streak infini exports
window.getActiveStreakMilestones = getActiveStreakMilestones;
window.getUnlockedStreakBadgesList = getUnlockedStreakBadgesList;
window.getNextStreakMilestone = getNextStreakMilestone;
window.getStreakBadgeName = getStreakBadgeName;
window.checkAndUnlockStreakBadge = checkAndUnlockStreakBadge;

console.log('Database.js chargé - Version avec streak infini');