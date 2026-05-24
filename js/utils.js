// ============================================
// UTILS.JS - VERSION CORRIGÉE
// ============================================

// Supprimer tous les toasts existants
function removeAllToasts() {
  var container = document.getElementById('toastContainer');
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}

// Nouvelle fonction showToast
function showToast(message) {
  console.log('Toast:', message);
  
  // Supprimer tous les toasts anciens
  removeAllToasts();
  
  var container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    container.style.cssText = 'position:fixed;bottom:80px;left:16px;right:16px;z-index:500;pointer-events:none;';
    document.body.appendChild(container);
  }
  
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = '<i class="fas fa-info-circle"></i> ' + message;
  toast.style.cssText = 'background:linear-gradient(135deg, var(--primary), var(--secondary));color:white;padding:12px 20px;border-radius:30px;text-align:center;font-size:0.8rem;box-shadow:0 4px 12px rgba(0,0,0,0.2);margin-bottom:8px;';
  
  container.appendChild(toast);
  
  // Disparaît après 2 secondes
  setTimeout(function() {
    if (toast && toast.parentNode) {
      toast.remove();
    }
  }, 2000);
}

// S'assurer que la fonction est globale
window.showToast = showToast;
window.toast = showToast;

// Nettoyer au chargement
removeAllToasts();

// Nettoyer périodiquement (toutes les 10 secondes)
setInterval(removeAllToasts, 10000);

// ============================================
// TES AUTRES FONCTIONS UTILS ICI
// ============================================

function roundToTwo(num) {
  if (isNaN(num) || !isFinite(num)) return 0;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

function roundTo(num, d) {
  if (isNaN(num) || !isFinite(num)) return 0;
  var f = Math.pow(10, d);
  return Math.round((num + Number.EPSILON) * f) / f;
}

function calculateAverage(v) {
  if (!v || v.length === 0) return 0;
  var vv = v.filter(function(x) { return !isNaN(x) && isFinite(x); });
  if (vv.length === 0) return 0;
  return roundToTwo(vv.reduce(function(a, b) { return a + b; }, 0) / vv.length);
}

function getGradeLetter(a) {
  if (a >= 18) return 'A+';
  if (a >= 16) return 'A';
  if (a >= 14) return 'B+';
  if (a >= 12) return 'B';
  if (a >= 10) return 'C';
  if (a >= 8) return 'D';
  return 'F';
}

function getGradeClass(a) {
  if (a >= 14) return 'grade-A';
  if (a >= 12) return 'grade-B';
  if (a >= 10) return 'grade-C';
  if (a >= 8) return 'grade-D';
  return 'grade-F';
}

function getCurrentTerm() {
  var m = new Date().getMonth() + 1;
  if (m >= 9 && m <= 12) return 1;
  if (m >= 1 && m <= 3) return 2;
  return 3;
}

function isValidGrade(v) {
  return !isNaN(v) && isFinite(v) && v >= 0 && v <= 20;
}

function formatNumber(num, d) {
  if (typeof d === 'undefined') d = 2;
  if (isNaN(num) || !isFinite(num)) return '--';
  return num.toFixed(d);
}

function getGreeting() {
  var h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 18) return 'Good Afternoon';
  return 'Good Evening';
}

function formatDate(d) {
  if (!d) return '--';
  var dt = new Date(d);
  var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return dt.getDate() + ' ' + m[dt.getMonth()] + ' ' + dt.getFullYear();
}

function getStatusText(a) {
  if (a >= 16) return 'Excellent';
  if (a >= 14) return 'Very Good';
  if (a >= 12) return 'Good';
  if (a >= 10) return 'Average';
  if (a >= 8) return 'Below Average';
  return 'Needs Work';
}

function getStatusColor(a) {
  if (a >= 14) return '#2ecc71';
  if (a >= 12) return '#3498db';
  if (a >= 10) return '#f39c12';
  if (a >= 8) return '#e67e22';
  return '#e74c3c';
}

function initParticles() {
  var c = document.getElementById('particles');
  if (!c) return;
  c.innerHTML = '';
  for (var i = 0; i < 40; i++) {
    var p = document.createElement('div');
    var s = Math.random() * 3 + 2;
    p.style.cssText = 'position:absolute;width:' + s + 'px;height:' + s + 'px;background:var(--primary);border-radius:50%;left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;opacity:' + (Math.random() * 0.3) + ';animation:floatParticle ' + (Math.random() * 15 + 10) + 's linear infinite;';
    c.appendChild(p);
  }
}

function getSequencesForTerm(t) {
  var s = (t - 1) * 2 + 1;
  return [s, s + 1];
}

function exportAllData(id) {
  var d = {
    version: '4.0',
    exportDate: new Date().toISOString(),
    student: getStudentById(id),
    grades: getStudentGrades(id),
    subjects: {
      term1: getStudentSelectedSubjects(id, 1),
      term2: getStudentSelectedSubjects(id, 2),
      term3: getStudentSelectedSubjects(id, 3)
    },
    coeffs: getSubjectCoefficients(id),
    achievements: JSON.parse(localStorage.getItem('smartgrade_achievements_' + id) || '[]'),
    goal: getStudentGoal(id),
    streak: getStudentStreak(id),
    compensations: typeof getAllComps === 'function' ? getAllComps(id) : {},
    history: JSON.parse(localStorage.getItem('smartgrade_history_' + id) || '[]'),
    profile: JSON.parse(localStorage.getItem('smartgrade_profile_' + id) || '{}'),
    flashcards: JSON.parse(localStorage.getItem('smartgrade_flashcards_' + id) || '[]'),
    goals: JSON.parse(localStorage.getItem('smartgrade_goals_detail_' + id) || '{}')
  };
  return JSON.stringify(d, null, 2);
}

function importAllData(id, json) {
  try {
    var d = JSON.parse(json);
    if (!d.version) throw new Error('Invalid backup');
    saveStudentGrades(id, d.grades || []);
    if (d.subjects) {
      saveStudentSelectedSubjects(id, 1, d.subjects.term1 || []);
      saveStudentSelectedSubjects(id, 2, d.subjects.term2 || []);
      saveStudentSelectedSubjects(id, 3, d.subjects.term3 || []);
    }
    if (d.coeffs) saveSubjectCoefficients(id, d.coeffs);
    if (d.achievements) localStorage.setItem('smartgrade_achievements_' + id, JSON.stringify(d.achievements));
    if (d.goal) saveStudentGoal(id, d.goal);
    if (d.streak) saveStudentStreak(id, d.streak);
    if (d.profile) localStorage.setItem('smartgrade_profile_' + id, JSON.stringify(d.profile));
    if (d.flashcards) localStorage.setItem('smartgrade_flashcards_' + id, JSON.stringify(d.flashcards));
    if (d.goals) localStorage.setItem('smartgrade_goals_detail_' + id, JSON.stringify(d.goals));
    addHistory(id, 'Data imported');
    return { success: true, message: 'Data restored' };
  } catch (e) {
    return { success: false, message: 'Invalid file: ' + e.message };
  }
}

function downloadJSON(data, fn) {
  var b = new Blob([data], { type: 'application/json' });
  var u = URL.createObjectURL(b);
  var a = document.createElement('a');
  a.href = u;
  a.download = fn;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(u);
}

function addHistory(id, action) {
  var h = JSON.parse(localStorage.getItem('smartgrade_history_' + id) || '[]');
  h.unshift({ action: action, date: new Date().toISOString(), timestamp: Date.now() });
  if (h.length > 50) h = h.slice(0, 50);
  localStorage.setItem('smartgrade_history_' + id, JSON.stringify(h));
}

function getHistory(id, limit) {
  var h = JSON.parse(localStorage.getItem('smartgrade_history_' + id) || '[]');
  return limit ? h.slice(0, limit) : h;
}

function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(function(p) {
      if (p === 'granted') console.log('Notifications enabled');
    });
  }
}

function sendLocalNotification(title, body, icon) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body: body, icon: icon || 'icon.svg', vibrate: [200, 100, 200] });
  } else {
    showInAppNotification(title, body);
  }
}

function showInAppNotification(title, body) {
  var e = document.querySelector('.notification-toast');
  if (e) e.remove();
  var t = document.createElement('div');
  t.className = 'notification-toast';
  t.innerHTML = '<i class="fas fa-bell"></i><div><div class="notif-title">' + title + '</div><div class="notif-body">' + body + '</div></div><span class="notif-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></span>';
  document.body.appendChild(t);
  setTimeout(function() { if (t.parentElement) t.remove(); }, 5000);
}

function checkAndNotifyAchievements(id) {
  var a = JSON.parse(localStorage.getItem('smartgrade_achievements_' + id) || '[]');
  var n = a.filter(function(x) { return x.unlocked && !x.notified; });
  n.forEach(function(x) {
    sendLocalNotification('Badge Unlocked!', x.name);
    x.notified = true;
  });
  localStorage.setItem('smartgrade_achievements_' + id, JSON.stringify(a));
}

function checkStreakMilestone(id) {
  var s = getStudentStreak(id);
  var m = [3, 7, 15, 30];
  if (m.indexOf(s.days) !== -1) {
    sendLocalNotification('Streak!', s.days + ' day streak!');
  }
}

function simulateSync(id) {
  var k = 'smartgrade_sync_' + id;
  var ls = JSON.parse(localStorage.getItem(k) || 'null');
  var cd = { studentId: id, timestamp: Date.now(), data: exportAllData(id) };
  if (!ls) {
    localStorage.setItem(k, JSON.stringify(cd));
    addHistory(id, 'First sync');
    return { synced: true, message: 'First sync completed' };
  }
  if (ls.timestamp >= cd.timestamp) return { synced: false, message: 'Already up to date' };
  localStorage.setItem(k, JSON.stringify(cd));
  addHistory(id, 'Sync completed');
  return { synced: true, message: 'Sync completed' };
}

function showSyncStatus() {
  var s = getCurrentStudent();
  if (!s) return;
  var k = 'smartgrade_sync_' + s.id;
  var ls = JSON.parse(localStorage.getItem(k) || 'null');
  var el = document.getElementById('syncStatus');
  if (el) {
    el.innerHTML = ls ? '<i class="fas fa-cloud"></i> Last sync: ' + formatDate(new Date(ls.timestamp).toISOString()) : '<i class="fas fa-cloud-upload-alt"></i> Not synced';
  }
}

function getProfile(studentId) {
  var d = localStorage.getItem('smartgrade_profile_' + studentId);
  if (!d) return { avatar: 'fa-user-graduate', bio: '', favorites: [] };
  try { return JSON.parse(d); } catch(e) { return { avatar: 'fa-user-graduate', bio: '', favorites: [] }; }
}

function saveProfile(studentId, profile) {
  localStorage.setItem('smartgrade_profile_' + studentId, JSON.stringify(profile));
}

function getFlashcards(studentId) {
  var d = localStorage.getItem('smartgrade_flashcards_' + studentId);
  if (!d) return [];
  try { return JSON.parse(d); } catch(e) { return []; }
}

function saveFlashcards(studentId, cards) {
  localStorage.setItem('smartgrade_flashcards_' + studentId, JSON.stringify(cards));
}

function getGoalsDetail(studentId) {
  var d = localStorage.getItem('smartgrade_goals_detail_' + studentId);
  if (!d) return {};
  try { return JSON.parse(d); } catch(e) { return {}; }
}

function saveGoalsDetail(studentId, goals) {
  localStorage.setItem('smartgrade_goals_detail_' + studentId, JSON.stringify(goals));
}

var AVATARS_LIST = [
  'fa-user-graduate', 'fa-user', 'fa-user-tie', 'fa-user-secret', 'fa-user-ninja',
  'fa-user-astronaut', 'fa-user-md', 'fa-user-cog', 'fa-user-pen', 'fa-user-clock',
  'fa-user-doctor', 'fa-user-nurse', 'fa-stethoscope', 'fa-hospital', 'fa-heart-pulse',
  'fa-syringe', 'fa-prescription', 'fa-bone', 'fa-tooth', 'fa-eye',
  'fa-user-hacker', 'fa-laptop-code', 'fa-shield-halved', 'fa-key', 'fa-fingerprint',
  'fa-terminal', 'fa-code', 'fa-bug', 'fa-server', 'fa-database',
  'fa-flask', 'fa-atom', 'fa-microscope', 'fa-dna', 'fa-magnet', 'fa-rocket',
  'fa-satellite', 'fa-temperature-high',
  'fa-chalkboard-user', 'fa-person-chalkboard', 'fa-school', 'fa-book-open',
  'fa-pencil', 'fa-globe', 'fa-graduation-cap', 'fa-book-bookmark',
  'fa-briefcase', 'fa-scale-balanced', 'fa-gavel', 'fa-building-columns',
  'fa-landmark', 'fa-chart-line', 'fa-file-contract', 'fa-handcuffs',
  'fa-palette', 'fa-music', 'fa-guitar', 'fa-camera', 'fa-film', 'fa-paintbrush',
  'fa-microphone', 'fa-masks-theater',
  'fa-person-running', 'fa-person-swimming', 'fa-person-biking', 'fa-futbol',
  'fa-basketball', 'fa-dumbbell', 'fa-medal', 'fa-trophy',
  'fa-cat', 'fa-dog', 'fa-dragon', 'fa-otter', 'fa-kiwi-bird'
];

function lazyLoad() {
  var imgs = document.querySelectorAll('img[data-src]');
  imgs.forEach(function(img) {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });
}

function debounce(fn, delay) {
  var t;
  return function() {
    var ctx = this, args = arguments;
    clearTimeout(t);
    t = setTimeout(function() { fn.apply(ctx, args); }, delay);
  };
}

function showSkeleton(id, count) {
  var c = document.getElementById(id);
  if (!c) return;
  var h = '';
  for (var i = 0; i < count; i++) h += '<div class="skeleton" style="height:40px;margin-bottom:8px;"></div>';
  c.innerHTML = h;
}

console.log('[Utils] Chargé - showToast avec auto-nettoyage');