// ============================================
// SMART GRADE v4.0 - UTILS.JS
// VERSION FINALE ULTIME
// ============================================

// ============================================
// 0. DÉSACTIVATION ERROR HANDLER PENDANT CHANGEMENTS DE THÈME
// ============================================

window._changingTheme = false;
window._themeChangeTimer = null;

document.addEventListener('click', function(e) {
  var themeSelectors = ['.theme-rect', '.theme-btn-header', '#darkLightBtn', '.font-selector-item', '.font-sheet', '[data-theme]', '.slider', '.toggle-switch'];
  for (var i = 0; i < themeSelectors.length; i++) {
    if (e.target.closest(themeSelectors[i])) {
      window._changingTheme = true;
      if (window._themeChangeTimer) clearTimeout(window._themeChangeTimer);
      window._themeChangeTimer = setTimeout(function() { window._changingTheme = false; }, 1000);
      break;
    }
  }
}, true);

var IGNORE_PATTERNS = [
  'ResizeObserver', 'requestAnimationFrame', 'IntersectionObserver',
  'theme', 'classList', 'style', 'themes.css', 'night-mode.css',
  'var(--primary)', 'var(--secondary)', 'background', 'gradient',
  'linear-gradient', 'transform', 'transition', 'animation',
  'getComputedStyle', 'matchMedia', 'addEventListener'
];

// ============================================
// 1. FONCTIONS UTILITAIRES DE BASE
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

function getSequencesForTerm(t) {
  var s = (t - 1) * 2 + 1;
  return [s, s + 1];
}

// ============================================
// 2. TOAST NOTIFICATION (EN BAS)
// ============================================

function showToast(message, type) {
  var container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = 'position:fixed;bottom:80px;left:16px;right:16px;z-index:5000;pointer-events:none;';
    document.body.appendChild(container);
  }
  
  var toast = document.createElement('div');
  var bgColor = '#0f3b48';
  if (type === 'success') bgColor = '#2ecc71';
  else if (type === 'error') bgColor = '#e74c3c';
  else if (type === 'warning') bgColor = '#f39c12';
  
  toast.style.cssText = `
    background: ${bgColor};
    color: white;
    padding: 12px 16px;
    border-radius: 30px;
    margin-bottom: 8px;
    font-size: 0.8rem;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    animation: slideUp 0.3s ease;
    pointer-events: auto;
  `;
  
  toast.innerHTML = '<i class="fas fa-info-circle"></i> ' + message;
  container.appendChild(toast);
  
  setTimeout(function() {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(function() { if (toast.parentNode) toast.remove(); }, 300);
  }, 3000);
}

// ============================================
// 3. PARTICULES
// ============================================

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

// ============================================
// 4. NOTIFICATIONS MÉTIER
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

function notifyGradeAdded(subject, grade, seq) { addNotification('grade', 'Grade Added', subject + ': ' + grade + '/20'); }
function notifyGradesSaved(count) { addNotification('grade', 'Grades Saved', count + ' grades saved'); }
function notifyBadgeUnlocked(name, desc) { addNotification('badge', 'Badge: ' + name, desc); }
function notifyBackupCreated(type, size, time) { addNotification('backup', type + ' Backup', 'Saved at ' + time); }
function notifyBackupRestored(date) { addNotification('backup', 'Backup Restored', 'From ' + date); }
function notifyImportExport(type, success) { addNotification(type, type.toUpperCase(), success ? 'Success' : 'Failed'); }
function notifySubjectsUpdated(term, count) { addNotification('subjects', 'Subjects Updated', 'Term ' + term + ': ' + count + ' subjects'); }
function notifyTransferCodeGenerated(code) { addNotification('transfer', 'Transfer Code', code); }
function notifyTransferImported(from) { addNotification('transfer', 'Data Imported', 'From ' + from); }
function notifyPinChanged() { addNotification('account', 'PIN Changed', 'Security PIN updated'); }
function notifyFingerprintEnabled() { addNotification('account', 'Fingerprint Enabled', 'Biometric login active'); }
function notifyAccountCreated(name) { addNotification('account', 'Account Created', 'Welcome ' + name); }
function notifyFlashcardAdded(subject, count) { addNotification('flashcard', 'Flashcard Added', subject); }
function notifyTimetableView(count) {
  if (count === 5) addNotification('timetable', 'Timetable Viewer', 'Viewed 5 times');
  if (count === 10) addNotification('timetable', 'Timetable Expert', 'Viewed 10 times!');
}
function notifyLoginSuccess(name) { addNotification('account', 'Login Successful', 'Welcome back ' + name); }
function notifyProfileUpdate(action) { addNotification('profile', 'Profile Updated', action); }

// ============================================
// 5. REMPLACEMENT DES NOTIFICATIONS SYSTÈME
// ============================================

function showSmartConfirm(options) {
  var modal = document.createElement('div');
  modal.className = 'smart-modal-overlay';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(8px);
    z-index: 100000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease;
  `;
  
  var iconHtml = '';
  if (options.icon) {
    iconHtml = `<i class="fas ${options.icon}" style="font-size: 48px; color: ${options.iconColor || '#e74c3c'}; margin-bottom: 16px;"></i>`;
  }
  
  var detailHtml = '';
  if (options.detail) {
    detailHtml = `<p style="font-size: 0.7rem; color: #e74c3c; margin-bottom: 16px;">${options.detail}</p>`;
  }
  
  modal.innerHTML = `
    <div class="smart-modal" style="
      background: var(--card-bg);
      border-radius: 24px;
      padding: 24px;
      max-width: 340px;
      width: 85%;
      text-align: center;
      border: 1px solid var(--border);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      animation: slideUp 0.3s ease;
    ">
      ${iconHtml}
      <h3 style="margin-bottom: 12px; font-size: 1.1rem;">${options.title || 'Confirmation'}</h3>
      <p style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 16px;">${options.message || 'Are you sure?'}</p>
      ${detailHtml}
      <div style="display: flex; gap: 12px;">
        <button class="smart-modal-cancel" style="
          flex: 1;
          padding: 12px;
          border-radius: 40px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text);
          font-weight: 600;
          cursor: pointer;
        ">${options.cancelText || 'Cancel'}</button>
        <button class="smart-modal-confirm" style="
          flex: 1;
          padding: 12px;
          border-radius: 40px;
          border: none;
          background: ${options.confirmColor ? options.confirmColor : 'linear-gradient(135deg, var(--primary), var(--secondary))'};
          color: white;
          font-weight: 600;
          cursor: pointer;
        ">${options.confirmText || 'Confirm'}</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  modal.querySelector('.smart-modal-cancel').onclick = function() {
    modal.remove();
    if (options.onCancel) options.onCancel();
  };
  
  modal.querySelector('.smart-modal-confirm').onclick = function() {
    modal.remove();
    if (options.onConfirm) options.onConfirm();
  };
  
  modal.onclick = function(e) {
    if (e.target === modal) {
      modal.remove();
      if (options.onCancel) options.onCancel();
    }
  };
}

window.confirm = function(message, title, onConfirm, onCancel) {
  showSmartConfirm({
    title: title || 'Confirmation',
    message: message,
    confirmText: 'OK',
    cancelText: 'Cancel',
    onConfirm: onConfirm,
    onCancel: onCancel
  });
  return true;
};

window.alert = function(message, title) {
  showSmartConfirm({
    title: title || 'Information',
    message: message,
    confirmText: 'OK',
    cancelText: null
  });
};

var styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);

// ============================================
// 6. EXPORT COMPLET - TOUTES LES DONNÉES
// ============================================

function exportCompleteUserData(studentId) {
  if (!studentId) {
    var current = getCurrentStudent();
    if (!current) return null;
    studentId = current.id;
  }
  
  try {
    var students = getAllStudents();
    var student = students.find(function(s) { return s.id === studentId; });
    
    var completeData = {
      version: '4.0',
      exportDate: new Date().toISOString(),
      exportType: 'complete',
      
      student: student,
      grades: JSON.parse(localStorage.getItem('smartgrade_grades_' + studentId) || '[]'),
      subjects: {
        term1: JSON.parse(localStorage.getItem('smartgrade_selected_' + studentId + '_term1') || '[]'),
        term2: JSON.parse(localStorage.getItem('smartgrade_selected_' + studentId + '_term2') || '[]'),
        term3: JSON.parse(localStorage.getItem('smartgrade_selected_' + studentId + '_term3') || '[]')
      },
      coeffs: JSON.parse(localStorage.getItem('smartgrade_coeffs_' + studentId) || '{}'),
      achievements: JSON.parse(localStorage.getItem('smartgrade_achievements_' + studentId) || '[]'),
      goal: parseFloat(localStorage.getItem('smartgrade_goal_' + studentId) || 12),
      streak: JSON.parse(localStorage.getItem('smartgrade_streak_' + studentId) || '{"days":0,"lastLogin":null}'),
      profile: JSON.parse(localStorage.getItem('smartgrade_profile_' + studentId) || '{}'),
      flashcards: JSON.parse(localStorage.getItem('smartgrade_flashcards_' + studentId) || '[]'),
      history: JSON.parse(localStorage.getItem('smartgrade_history_' + studentId) || '[]'),
      notifications: JSON.parse(localStorage.getItem('smartgrade_notifications_' + studentId) || '[]'),
      backups: JSON.parse(localStorage.getItem('smartgrade_backup_list_' + studentId) || '[]'),
      compensations: JSON.parse(localStorage.getItem('smartgrade_compensations_' + studentId) || '{}'),
      goalsDetail: JSON.parse(localStorage.getItem('smartgrade_goals_detail_' + studentId) || '{}'),
      lastLogin: localStorage.getItem('smartgrade_login_time') || null
    };
    
    console.log('[Export] Complete data exported for', student ? student.name : studentId);
    return JSON.stringify(completeData, null, 2);
    
  } catch(e) {
    console.error('[Export] Error:', e);
    return null;
  }
}

function importCompleteUserData(studentId, jsonData) {
  if (!studentId) {
    var current = getCurrentStudent();
    if (!current) return { success: false, message: 'No user logged in' };
    studentId = current.id;
  }
  
  try {
    var data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    
    if (!data.version) {
      return { success: false, message: 'Invalid backup file format' };
    }
    
    // Restaurer TOUTES les données
    if (data.grades) localStorage.setItem('smartgrade_grades_' + studentId, JSON.stringify(data.grades));
    if (data.subjects) {
      if (data.subjects.term1) localStorage.setItem('smartgrade_selected_' + studentId + '_term1', JSON.stringify(data.subjects.term1));
      if (data.subjects.term2) localStorage.setItem('smartgrade_selected_' + studentId + '_term2', JSON.stringify(data.subjects.term2));
      if (data.subjects.term3) localStorage.setItem('smartgrade_selected_' + studentId + '_term3', JSON.stringify(data.subjects.term3));
    }
    if (data.coeffs) localStorage.setItem('smartgrade_coeffs_' + studentId, JSON.stringify(data.coeffs));
    if (data.achievements) localStorage.setItem('smartgrade_achievements_' + studentId, JSON.stringify(data.achievements));
    if (data.goal !== undefined) localStorage.setItem('smartgrade_goal_' + studentId, data.goal);
    if (data.streak) localStorage.setItem('smartgrade_streak_' + studentId, JSON.stringify(data.streak));
    if (data.profile) localStorage.setItem('smartgrade_profile_' + studentId, JSON.stringify(data.profile));
    if (data.flashcards) localStorage.setItem('smartgrade_flashcards_' + studentId, JSON.stringify(data.flashcards));
    if (data.history) localStorage.setItem('smartgrade_history_' + studentId, JSON.stringify(data.history));
    if (data.notifications) localStorage.setItem('smartgrade_notifications_' + studentId, JSON.stringify(data.notifications));
    if (data.backups) localStorage.setItem('smartgrade_backup_list_' + studentId, JSON.stringify(data.backups));
    if (data.compensations) localStorage.setItem('smartgrade_compensations_' + studentId, JSON.stringify(data.compensations));
    if (data.goalsDetail) localStorage.setItem('smartgrade_goals_detail_' + studentId, JSON.stringify(data.goalsDetail));
    
    // Ajouter un log d'import
    var history = JSON.parse(localStorage.getItem('smartgrade_history_' + studentId) || '[]');
    history.unshift({ action: 'Complete data imported', date: new Date().toISOString() });
    if (history.length > 50) history = history.slice(0, 50);
    localStorage.setItem('smartgrade_history_' + studentId, JSON.stringify(history));
    
    console.log('[Import] Complete import for user ID:', studentId);
    return { success: true, message: 'Data imported successfully' };
    
  } catch(e) {
    console.error('[Import] Error:', e);
    return { success: false, message: 'Invalid data: ' + e.message };
  }
}

// Exporter les fonctions globalement
window.exportCompleteUserData = exportCompleteUserData;
window.importCompleteUserData = importCompleteUserData;

// ============================================
// 7. GESTION DES ERREURS (401, 403, 404, 503 UNIQUEMENT)
// ============================================

window.redirectToError = function(code, customMessage) {
  var errorPage = '';
  if (code === 401) errorPage = '401.html';
  else if (code === 403) errorPage = '403.html';
  else if (code === 404) errorPage = '404.html';
  else if (code === 503) errorPage = '503.html';
  else errorPage = '404.html';
  
  try {
    localStorage.setItem('smartgrade_last_error', JSON.stringify({
      code: code, message: customMessage || '', url: window.location.href, timestamp: new Date().toISOString()
    }));
  } catch(e) {}
  
  window.location.href = errorPage;
};

(function() {
  
  var currentPage = window.location.pathname.split('/').pop();
  var ERROR_PAGES = ['401.html', '403.html', '404.html', '503.html'];
  
  if (ERROR_PAGES.indexOf(currentPage) !== -1) {
    console.log('[Error] Already on error page:', currentPage);
    return;
  }
  
  if (currentPage === 'splash.html') {
    console.log('[Error] Splash page - skipping error handler');
    return;
  }
  
  // ============================================
  // 403 - PAGE DÉVELOPPEUR (accès interdit si pas HANS KEPPER, B2, #9)
  // ============================================
  var DEV_PAGES = [
    'dev-calculator.html', 'dev-database.html', 'dev-stats.html', 'dev-logs.html', 'dev-backup.html'
  ];
  
  if (DEV_PAGES.indexOf(currentPage) !== -1) {
    try {
      var stored = localStorage.getItem('smartgrade_current');
      var user = stored ? JSON.parse(stored) : null;
      if (!user || !(user.name === 'HANS KEPPER' && user.class === 'B2' && user.number === 9)) {
        console.log('[Error] 403 - Developer access denied to', currentPage);
        window.location.href = '403.html';
        return;
      }
    } catch(e) {
      window.location.href = '403.html';
      return;
    }
  }
  
  // ============================================
  // 401 - PAGE PRIVÉE SANS LOGIN
  // ============================================
  var PRIVATE_PAGES = [
    'dashboard.html', 'add-grade.html', 'subjects.html', 'subject-detail.html',
    'settings.html', 'profile.html', 'statistics.html', 'achievements.html',
    'history.html', 'transfer.html', 'export.html', 'flashcards.html',
    'goals.html', 'timetable.html', 'term1.html', 'term2.html', 'term3.html',
    'yearly.html', 'notifications.html', 'shortcuts.html', 'welcome.html', 
    'backup.html', 'backup-manager.html', 'guide-user.html', 'about-user.html',
    'support.html', 'terms.html', 'license.html'
  ];
  
  if (PRIVATE_PAGES.indexOf(currentPage) !== -1) {
    try {
      var stored = localStorage.getItem('smartgrade_current');
      var user = stored ? JSON.parse(stored) : null;
      if (!user || !user.id) {
        console.log('[Error] 401 - Unauthorized access to', currentPage);
        window.location.href = '401.html';
        return;
      }
    } catch(e) {
      window.location.href = '401.html';
      return;
    }
  }
  
  // ============================================
  // 404 - PAGE INEXISTANTE
  // ============================================
  var VALID_PAGES = [
    'index.html', 'splash.html', 'dashboard.html', 'login.html', 'register.html',
    'add-grade.html', 'subjects.html', 'subject-detail.html', 'settings.html',
    'profile.html', 'statistics.html', 'achievements.html', 'history.html',
    'transfer.html', 'export.html', 'flashcards.html', 'goals.html', 'timetable.html',
    'term1.html', 'term2.html', 'term3.html', 'yearly.html', 'guide.html',
    'guide-user.html', 'about.html', 'about-user.html', 'notifications.html',
    'shortcuts.html', 'welcome.html', 'backup.html', 'backup-manager.html',
    'support.html', 'test.html', '401.html', '403.html', '404.html', '503.html',
    'terms.html', 'license.html',
    'dev-calculator.html', 'dev-database.html', 'dev-stats.html', 'dev-logs.html', 'dev-backup.html'
  ];
  
  if (currentPage && currentPage.includes('.') && !currentPage.includes('.css') && 
      !currentPage.includes('.js') && !currentPage.includes('.svg') && 
      !currentPage.includes('.json') && !currentPage.includes('.png') && 
      !currentPage.includes('.jpg') && !currentPage.includes('.ico')) {
    if (VALID_PAGES.indexOf(currentPage) === -1 && !currentPage.includes('?') && !currentPage.includes('#')) {
      console.log('[Error] 404 - Page not found:', currentPage);
      window.location.href = '404.html';
      return;
    }
  }
  
  // ============================================
  // 503 - HORS LIGNE
  // ============================================
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    if (currentPage !== 'login.html' && currentPage !== 'register.html' && 
        currentPage !== 'index.html' && currentPage !== 'splash.html') {
      console.log('[Error] 503 - Offline');
      window.location.href = '503.html';
    }
  }
  
  window.addEventListener('offline', function() {
    var page = window.location.pathname.split('/').pop();
    if (page !== 'login.html' && page !== 'register.html' && 
        page !== 'index.html' && page !== 'splash.html' && 
        ERROR_PAGES.indexOf(page) === -1) {
      window.location.href = '503.html';
    }
  });
  
  // 400 - Paramètres URL invalides (seulement pour pages spécifiques)
  function checkUrlParams() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    if (id !== null && isNaN(parseInt(id))) {
      window.location.href = '404.html';
      return;
    }
    var term = urlParams.get('term');
    if (term !== null && (term < 1 || term > 3)) {
      window.location.href = '404.html';
      return;
    }
  }
  checkUrlParams();
  
  // 500 - Erreurs JavaScript (ignore thèmes)
  window.addEventListener('error', function(event) {
    if (window._changingTheme) return false;
    var message = event.message || '';
    var filename = event.filename || '';
    for (var i = 0; i < IGNORE_PATTERNS.length; i++) {
      if (message.indexOf(IGNORE_PATTERNS[i]) !== -1 || filename.indexOf(IGNORE_PATTERNS[i]) !== -1) {
        console.log('[Error] Ignored theme/style error');
        return false;
      }
    }
    console.error('[Error] JavaScript error:', message);
    return false;
  });
  
  console.log('[Utils] Error handling: 401, 403, 404, 503 only');
  
})();

// ============================================
// 8. GESTION DES POLICES
// ============================================

function initFontFamily() {
  var savedFont = localStorage.getItem('smartgrade_font_family') || 'inter';
  var validFonts = ['inter', 'roboto', 'cinzel', 'quicksand', 'courier-prime', 'fredoka', 'pacifico', 'bangers', 'lobster', 'permanent-marker', 'comfortaa', 'righteous'];
  
  if (validFonts.indexOf(savedFont) === -1) savedFont = 'inter';
  
  var oldFonts = ['font-inter', 'font-roboto', 'font-cinzel', 'font-quicksand', 'font-courier-prime', 'font-fredoka', 'font-pacifico', 'font-bangers', 'font-lobster', 'font-permanent-marker', 'font-comfortaa', 'font-righteous'];
  for (var i = 0; i < oldFonts.length; i++) document.body.classList.remove(oldFonts[i]);
  
  document.body.classList.add('font-' + savedFont);
  applyGlobalFont();
}

function applyGlobalFont() {
  var savedFont = localStorage.getItem('smartgrade_font_family') || 'inter';
  var fontMap = {
    'inter': 'Inter, sans-serif', 'roboto': 'Roboto, sans-serif', 'cinzel': 'Cinzel, serif',
    'quicksand': 'Quicksand, sans-serif', 'courier-prime': '"Courier Prime", monospace',
    'fredoka': 'Fredoka, sans-serif', 'pacifico': 'Pacifico, cursive', 'bangers': 'Bangers, cursive',
    'lobster': 'Lobster, cursive', 'permanent-marker': '"Permanent Marker", cursive',
    'comfortaa': 'Comfortaa, sans-serif', 'righteous': 'Righteous, sans-serif'
  };
  document.body.style.fontFamily = fontMap[savedFont] || 'Inter, sans-serif';
}

var fontObserver = new MutationObserver(function() { applyGlobalFont(); });
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    fontObserver.observe(document.body, { childList: true, subtree: true });
    initFontFamily();
  });
} else {
  fontObserver.observe(document.body, { childList: true, subtree: true });
  initFontFamily();
}

window.initFontFamily = initFontFamily;
window.applyGlobalFont = applyGlobalFont;

// ============================================
// 9. INITIALISATION DU THÈME
// ============================================

var THEMES = [
  { name: 'default', color: '#0f3b48', label: 'Deep Teal' },
  { name: 'crimson', color: '#c0392b', label: 'Crimson' },
  { name: 'forest', color: '#1e8449', label: 'Forest' },
  { name: 'ocean', color: '#006994', label: 'Ocean' },
  { name: 'royal', color: '#6c3483', label: 'Royal' },
  { name: 'sunset', color: '#d35400', label: 'Sunset' },
  { name: 'rose', color: '#c44569', label: 'Rose' },
  { name: 'turquoise', color: '#00897b', label: 'Turquoise' },
  { name: 'amber', color: '#b7950b', label: 'Amber' },
  { name: 'graphite', color: '#455a64', label: 'Graphite' },
  { name: 'lavender', color: '#7b1fa2', label: 'Lavender' },
  { name: 'cherry', color: '#b71c1c', label: 'Cherry' },
  { name: 'midnight', color: '#1a237e', label: 'Midnight' },
  { name: 'mint', color: '#00b894', label: 'Mint' },
  { name: 'coral', color: '#e74c3c', label: 'Coral' },
  { name: 'indigo', color: '#283593', label: 'Indigo' },
  { name: 'chocolate', color: '#5d4037', label: 'Chocolate' },
  { name: 'electric', color: '#6a1b9a', label: 'Electric' },
  { name: 'steel', color: '#37474f', label: 'Steel' },
  { name: 'lime', color: '#558b2f', label: 'Lime' }
];

function initThemeSelector() {
  var c = document.getElementById('themeGrid');
  if (!c) return;
  
  var bottomSheetContent = document.querySelector('.bottom-sheet-content');
  
  if (bottomSheetContent && !document.getElementById('fontSelectorSection')) {
    var fontSection = document.createElement('div');
    fontSection.id = 'fontSelectorSection';
    fontSection.style.cssText = 'margin: 16px 0 8px; padding-top: 8px; border-top: 1px solid var(--border);';
    
    var fontTitle = document.createElement('div');
    fontTitle.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 12px;';
    fontTitle.innerHTML = '<i class="fas fa-font" style="color: var(--primary);"></i><span style="font-weight: 600; font-size: 0.75rem;">Font Family</span>';
    fontSection.appendChild(fontTitle);
    
    var fontGrid = document.createElement('div');
    fontGrid.id = 'fontSelectorGrid';
    fontGrid.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 8px;';
    fontSection.appendChild(fontGrid);
    
    var fontRowSheet = document.querySelector('.font-row-sheet');
    if (fontRowSheet) bottomSheetContent.insertBefore(fontSection, fontRowSheet);
    else bottomSheetContent.appendChild(fontSection);
  }
  
  var fontGrid = document.getElementById('fontSelectorGrid');
  if (fontGrid) {
    var currentFont = localStorage.getItem('smartgrade_font_family') || 'inter';
    
    var fonts = [
      { id: 'inter', name: 'Inter', style: 'Inter' }, { id: 'roboto', name: 'Roboto', style: 'Roboto' },
      { id: 'cinzel', name: 'Cinzel', style: 'Cinzel' }, { id: 'quicksand', name: 'Quicksand', style: 'Quicksand' },
      { id: 'courier-prime', name: 'Courier Prime', style: 'Courier Prime' }, { id: 'fredoka', name: 'Fredoka', style: 'Fredoka' },
      { id: 'pacifico', name: 'Pacifico', style: 'Pacifico' }, { id: 'bangers', name: 'Bangers', style: 'Bangers' },
      { id: 'lobster', name: 'Lobster', style: 'Lobster' }, { id: 'permanent-marker', name: 'Permanent Marker', style: 'Permanent Marker' },
      { id: 'comfortaa', name: 'Comfortaa', style: 'Comfortaa' }, { id: 'righteous', name: 'Righteous', style: 'Righteous' }
    ];
    
    fontGrid.innerHTML = fonts.map(function(f) {
      var isActive = (currentFont === f.id);
      return '<div class="font-selector-item ' + (isActive ? 'active' : '') + '" data-font="' + f.id + '" style="padding: 10px 6px; border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.2s; font-family: \'' + f.style + '\', sans-serif; background: ' + (isActive ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'rgba(0,0,0,0.03)') + '; color: ' + (isActive ? 'white' : 'var(--text)') + '; border: 1px solid var(--border); font-size: 0.7rem; font-weight: 500;">' + f.name + '</div>';
    }).join('');
    
    document.querySelectorAll('.font-selector-item').forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.stopPropagation();
        var fontId = this.dataset.font;
        localStorage.setItem('smartgrade_font_family', fontId);
        initFontFamily();
        
        document.querySelectorAll('.font-selector-item').forEach(function(el) {
          el.classList.remove('active');
          el.style.background = 'rgba(0,0,0,0.03)';
          el.style.color = 'var(--text)';
        });
        this.classList.add('active');
        this.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
        this.style.color = 'white';
        
        showToast('Font: ' + this.textContent);
        closeBottomSheet();
      });
    });
  }
  
  var st = localStorage.getItem('smartgrade_theme') || 'default';
  c.innerHTML = THEMES.map(function(t) {
    return '<div class="theme-rect ' + (st === t.name ? 'active' : '') + '" data-theme="' + t.name + '" style="background:' + t.color + ';" title="' + t.label + '">' + t.label + '</div>';
  }).join('');
  
  document.querySelectorAll('.theme-rect').forEach(function(r) {
    r.addEventListener('click', function(e) {
      e.stopPropagation();
      var t = this.dataset.theme;
      document.body.className = document.body.className.replace(/theme-\w+/g, '').trim();
      document.body.classList.add('theme-' + t);
      localStorage.setItem('smartgrade_theme', t);
      document.querySelectorAll('.theme-rect').forEach(function(x) { x.classList.remove('active'); });
      this.classList.add('active');
      showToast('Theme: ' + t);
      closeBottomSheet();
    });
  });
  
  var sf = localStorage.getItem('smartgrade_font') || 'medium';
  document.querySelectorAll('.font-sheet').forEach(function(o) {
    if (o.dataset.font === sf) o.classList.add('active');
    o.addEventListener('click', function(e) {
      e.stopPropagation();
      var f = this.dataset.font;
      localStorage.setItem('smartgrade_font', f);
      document.body.classList.remove('font-small', 'font-medium', 'font-large');
      document.body.classList.add('font-' + f);
      document.querySelectorAll('.font-sheet').forEach(function(x) { x.classList.remove('active'); });
      this.classList.add('active');
      showToast('Font size: ' + f);
    });
  });
  
  var tb = document.getElementById('themeBtn');
  var bs = document.getElementById('bottomSheet');
  var so = document.getElementById('sheetOverlay');
  var cs = document.getElementById('closeSheet');
  
  if (tb && bs && so) {
    tb.onclick = function(e) {
      e.stopPropagation();
      bs.classList.add('open');
      so.classList.add('active');
    };
    
    var closeFn = function() {
      bs.classList.remove('open');
      so.classList.remove('active');
    };
    
    if (cs) cs.onclick = closeFn;
    so.onclick = closeFn;
    
    bs.addEventListener('click', function(e) { if (e.target === bs) closeFn(); });
    window.closeBottomSheet = closeFn;
  }
}

function closeBottomSheet() {
  var bs = document.getElementById('bottomSheet');
  var so = document.getElementById('sheetOverlay');
  if (bs) bs.classList.remove('open');
  if (so) so.classList.remove('active');
}

function initMobileMenu() {
  var mb = document.getElementById('menuBtn'), cb = document.getElementById('closeSidebar'), sb = document.getElementById('sidebarMenu'), ov = document.getElementById('overlay');
  if (mb && sb && ov) {
    mb.onclick = function() { sb.classList.add('open'); ov.classList.add('active'); };
    var cf = function() { sb.classList.remove('open'); ov.classList.remove('active'); };
    if (cb) cb.onclick = cf;
    ov.onclick = cf;
  }
}

function initHeaderProfile() {
  var ha = document.getElementById('headerAvatar');
  if (!ha) return;
  try {
    var cu = getCurrentStudent();
    if (!cu) { ha.innerHTML = '<i class="fas fa-user-graduate"></i>'; return; }
    var profile = JSON.parse(localStorage.getItem('smartgrade_profile_' + cu.id) || '{}');
    if (profile.avatarBase64 && profile.avatarBase64.length > 100) {
      ha.innerHTML = '<img src="' + profile.avatarBase64 + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">';
    } else {
      ha.innerHTML = '<i class="fas fa-user-graduate"></i>';
    }
  } catch(e) { ha.innerHTML = '<i class="fas fa-user-graduate"></i>'; }
}

// ============================================
// 10. FONCTIONS DE SÉCURITÉ ET BASE DE DONNÉES
// ============================================

function getCurrentStudent() {
  try {
    var stored = localStorage.getItem('smartgrade_current');
    return stored ? JSON.parse(stored) : null;
  } catch(e) { return null; }
}

function getAllStudents() {
  try {
    var d = localStorage.getItem('smartgrade_students');
    return d ? JSON.parse(d) : [];
  } catch(e) { return []; }
}

function getStudentById(id) {
  var students = getAllStudents();
  for (var i = 0; i < students.length; i++) {
    if (students[i].id === id) return students[i];
  }
  return null;
}

function getStudentGrades(id) {
  try {
    var d = localStorage.getItem('smartgrade_grades_' + id);
    return d ? JSON.parse(d) : [];
  } catch(e) { return []; }
}

function getStudentAchievements(id) {
  try {
    var d = localStorage.getItem('smartgrade_achievements_' + id);
    return d ? JSON.parse(d) : [];
  } catch(e) { return []; }
}

function getStudentStreak(id) {
  try {
    var d = localStorage.getItem('smartgrade_streak_' + id);
    if (!d) return { days: 0, lastLogin: null };
    return JSON.parse(d);
  } catch(e) { return { days: 0, lastLogin: null }; }
}

function getStudentSelectedSubjects(id, term) {
  try {
    var d = localStorage.getItem('smartgrade_selected_' + id + '_term' + term);
    return d ? JSON.parse(d) : [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  } catch(e) { return [1,2,3,4,5,6,7,8,9,10,11,12,13,14]; }
}

function getSubjectCoefficients(id) {
  try {
    var d = localStorage.getItem('smartgrade_coeffs_' + id);
    if (!d) {
      var c = {};
      for (var i = 1; i <= 14; i++) c[i] = 5;
      return c;
    }
    return JSON.parse(d);
  } catch(e) { 
    var c = {};
    for (var i = 1; i <= 14; i++) c[i] = 5;
    return c;
  }
}

function getSubjectCoefficient(studentId, subjectId) {
  var coeffs = getSubjectCoefficients(studentId);
  return coeffs[subjectId] || 5;
}

function getProfile(studentId) {
  try {
    var d = localStorage.getItem('smartgrade_profile_' + studentId);
    if (!d) return { avatarBase64: '', bio: '', favorites: [] };
    return JSON.parse(d);
  } catch(e) { return { avatarBase64: '', bio: '', favorites: [] }; }
}

function getFlashcards(studentId) {
  try {
    var d = localStorage.getItem('smartgrade_flashcards_' + studentId);
    return d ? JSON.parse(d) : [];
  } catch(e) { return []; }
}

// ============================================
// 11. CALCULS DE MOYENNES
// ============================================

function calculateStudentTermAverage(studentId, term) {
  var grades = getStudentGrades(studentId);
  var coeffs = getSubjectCoefficients(studentId);
  var selected = getStudentSelectedSubjects(studentId, term);
  
  var allSubjects = [
    {id:1,name:"COMPUTER SCIENCES"},{id:2,name:"MATHEMATICS"},{id:3,name:"CHEMISTRY"},
    {id:4,name:"HUMAN BIOLOGY"},{id:5,name:"GEOLOGY"},{id:6,name:"PHYSICS"},
    {id:7,name:"ADDITIONAL MATHEMATICS"},{id:8,name:"BIOLOGY"},{id:9,name:"ECONOMICS"},
    {id:10,name:"ENGLISH LANGUAGE"},{id:11,name:"GEOGRAPHY"},{id:12,name:"CITIZENSHIP"},
    {id:13,name:"FRENCH"},{id:14,name:"FOOD AND NUTRITION"}
  ];
  
  var subs = allSubjects.filter(function(s) { return selected.indexOf(s.id) !== -1; });
  var totalWeighted = 0, totalCoeff = 0;
  var seq1 = (term - 1) * 2 + 1, seq2 = seq1 + 1;
  
  for (var i = 0; i < subs.length; i++) {
    var s = subs[i];
    var coeff = coeffs[s.id] || 5;
    var seq1Grades = grades.filter(function(g) { return g.subjectId === s.id && g.sequenceId === seq1; });
    var seq2Grades = grades.filter(function(g) { return g.subjectId === s.id && g.sequenceId === seq2; });
    var avg1 = seq1Grades.length ? seq1Grades.reduce(function(a,b) { return a + b.value; }, 0) / seq1Grades.length : 0;
    var avg2 = seq2Grades.length ? seq2Grades.reduce(function(a,b) { return a + b.value; }, 0) / seq2Grades.length : 0;
    var subjAvg = (avg1 + avg2) / 2;
    if (subjAvg > 0) {
      totalWeighted += subjAvg * coeff;
      totalCoeff += coeff;
    }
  }
  return totalCoeff > 0 ? roundToTwo(totalWeighted / totalCoeff) : 0;
}

function calculateSubjectTermAverage(subjectId, term, grades) {
  var seq1 = (term - 1) * 2 + 1, seq2 = seq1 + 1;
  var seq1Grades = grades.filter(function(g) { return g.subjectId === subjectId && g.sequenceId === seq1; });
  var seq2Grades = grades.filter(function(g) { return g.subjectId === subjectId && g.sequenceId === seq2; });
  var avg1 = seq1Grades.length ? seq1Grades.reduce(function(a,b) { return a + b.value; }, 0) / seq1Grades.length : 0;
  var avg2 = seq2Grades.length ? seq2Grades.reduce(function(a,b) { return a + b.value; }, 0) / seq2Grades.length : 0;
  return roundToTwo((avg1 + avg2) / 2);
}

function calculateYearlyAverage(id) {
  var t1 = calculateStudentTermAverage(id, 1);
  var t2 = calculateStudentTermAverage(id, 2);
  var t3 = calculateStudentTermAverage(id, 3);
  return roundToTwo((t1 + t2 + t3) / 3);
}

// ============================================
// 12. EXPORT DES FONCTIONS GLOBALES
// ============================================

window.getCurrentStudent = getCurrentStudent;
window.getAllStudents = getAllStudents;
window.getStudentById = getStudentById;
window.getStudentGrades = getStudentGrades;
window.getStudentAchievements = getStudentAchievements;
window.getStudentStreak = getStudentStreak;
window.getStudentSelectedSubjects = getStudentSelectedSubjects;
window.getSubjectCoefficients = getSubjectCoefficients;
window.getSubjectCoefficient = getSubjectCoefficient;
window.getProfile = getProfile;
window.getFlashcards = getFlashcards;
window.calculateStudentTermAverage = calculateStudentTermAverage;
window.calculateSubjectTermAverage = calculateSubjectTermAverage;
window.calculateYearlyAverage = calculateYearlyAverage;
window.roundToTwo = roundToTwo;
window.getGradeLetter = getGradeLetter;
window.formatDate = formatDate;
window.showToast = showToast;
window.initParticles = initParticles;
window.initThemeSelector = initThemeSelector;
window.initMobileMenu = initMobileMenu;
window.initHeaderProfile = initHeaderProfile;
window.closeBottomSheet = closeBottomSheet;

// ============================================
// 13. DEMANDER PERMISSION NOTIFICATIONS
// ============================================

setTimeout(function() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}, 5000);

console.log('[Utils.js] Version finale - Prêt');