// ============================================
// SMART GRADE v4.0 - APP.JS COMPLET
// 23 BADGES | 12 POLICES | MODE NUIT | AVATAR
// SÉLECTEUR DE POLICES INTÉGRÉ DANS LE THEME SHEET
// CORRIGÉ : Pas d'erreur sur les pages publiques
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

function fixMobileHeight() {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}
fixMobileHeight();
window.addEventListener('resize', fixMobileHeight);
window.addEventListener('orientationchange', fixMobileHeight);

// ============================================
// MODE NUIT - AUTO (20h-6h) + MANUEL
// ============================================

var manualThemeFlag = localStorage.getItem('smartgrade_manual_theme');

function checkNightMode() {
  if (manualThemeFlag === 'dark') {
    document.body.classList.add('night-mode');
    return;
  }
  if (manualThemeFlag === 'light') {
    document.body.classList.remove('night-mode');
    return;
  }
  
  var hours = new Date().getHours();
  var isNight = (hours >= 20 || hours < 6);
  
  if (isNight) {
    document.body.classList.add('night-mode');
  } else {
    document.body.classList.remove('night-mode');
  }
}

window.addEventListener('storage', function(e) {
  if (e.key === 'smartgrade_manual_theme') {
    manualThemeFlag = e.newValue;
    checkNightMode();
  }
});

// ============================================
// BOUTON CLAIR/SOMBRE
// ============================================

function toggleDarkLightMode() {
  var btn = document.getElementById('darkLightBtn');
  
  if (manualThemeFlag === 'dark') {
    manualThemeFlag = 'light';
    document.body.classList.remove('night-mode');
    if (btn) btn.innerHTML = '<i class="fas fa-moon"></i> Switch to Dark Mode';
    showToast('Light mode activated');
  } else {
    manualThemeFlag = 'dark';
    document.body.classList.add('night-mode');
    if (btn) btn.innerHTML = '<i class="fas fa-sun"></i> Switch to Light Mode';
    showToast('Dark mode activated');
  }
  
  localStorage.setItem('smartgrade_manual_theme', manualThemeFlag);
}

// ============================================
// INITIALISATION PRINCIPALE
// ============================================
(function initApp() {
  var ss = document.createElement('style');
  ss.textContent = '@keyframes floatParticle{0%{transform:translateY(100vh) rotate(0deg);opacity:0}10%{opacity:0.5}90%{opacity:0.3}100%{transform:translateY(-20vh) rotate(360deg);opacity:0}}';
  document.head.appendChild(ss);
  
  // Appliquer le thème sauvegardé
  var savedTheme = getSavedTheme();
  if (savedTheme) document.body.classList.add('theme-' + savedTheme);
  
  // Appliquer la taille de police sauvegardée
  var savedFontSize = getSavedFontSize();
  if (savedFontSize) document.body.classList.add('font-' + savedFontSize);
  
  initFontFamily();
  checkNightMode();
  initParticles();
  initThemeSelector();
  initMobileMenu();
  initHeaderProfile();
  autoUpdateCurrentUserStreak();
  if (typeof initPWA === 'function') initPWA();
  
  setInterval(function() {
    if (manualThemeFlag !== 'dark' && manualThemeFlag !== 'light') {
      checkNightMode();
    }
  }, 60000);
  
  window.addEventListener('focus', function() {
    checkNightMode();
  });
  
  window.addEventListener('pageshow', function() {
    initHeaderProfile();
    initFontFamily();
    checkNightMode();
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    initHeaderProfile();
    initFontFamily();
    checkNightMode();
  });
})();

// ============================================
// INIT THEME SELECTOR - AVEC SÉLECTEUR DE POLICES
// ============================================

function initThemeSelector() {
  var c = document.getElementById('themeGrid');
  if (!c) return;
  
  var bottomSheetContent = document.querySelector('.bottom-sheet-content');
  
  // AJOUTER LE BOUTON CLAIR/SOMBRE
  if (bottomSheetContent && !document.getElementById('darkLightBtn')) {
    var modeBtn = document.createElement('div');
    modeBtn.style.cssText = 'margin-bottom: 16px; padding: 0 4px;';
    
    var isDarkMode = document.body.classList.contains('night-mode');
    var btnIcon = isDarkMode ? 'fa-sun' : 'fa-moon';
    var btnText = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    
    modeBtn.innerHTML = `
      <button id="darkLightBtn" style="width:100%; padding:12px; border-radius:30px; background:linear-gradient(135deg, var(--primary), var(--secondary)); color:white; border:none; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
        <i class="fas ${btnIcon}"></i>
        <span>${btnText}</span>
      </button>
    `;
    bottomSheetContent.insertBefore(modeBtn, bottomSheetContent.firstChild);
    
    var btn = document.getElementById('darkLightBtn');
    if (btn) {
      btn.onclick = function(e) {
        e.stopPropagation();
        toggleDarkLightMode();
        var icon = btn.querySelector('i');
        var span = btn.querySelector('span');
        if (manualThemeFlag === 'dark') {
          icon.className = 'fas fa-sun';
          span.textContent = 'Switch to Light Mode';
        } else if (manualThemeFlag === 'light') {
          icon.className = 'fas fa-moon';
          span.textContent = 'Switch to Dark Mode';
        } else {
          var hours = new Date().getHours();
          var isNight = (hours >= 20 || hours < 6);
          icon.className = isNight ? 'fas fa-sun' : 'fas fa-moon';
          span.textContent = isNight ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        }
        setTimeout(function() { closeBottomSheet(); }, 300);
      };
    }
  }
  
  // SÉLECTEUR DE POLICES
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
    if (fontRowSheet) {
      bottomSheetContent.insertBefore(fontSection, fontRowSheet);
    } else {
      bottomSheetContent.appendChild(fontSection);
    }
  }
  
  // CHARGER LES 12 POLICES
  var fontGrid = document.getElementById('fontSelectorGrid');
  if (fontGrid) {
    var currentFont = localStorage.getItem('smartgrade_font_family') || 'inter';
    
    var fonts = [
      { id: 'inter', name: 'Inter', style: 'Inter' },
      { id: 'roboto', name: 'Roboto', style: 'Roboto' },
      { id: 'cinzel', name: 'Cinzel', style: 'Cinzel' },
      { id: 'quicksand', name: 'Quicksand', style: 'Quicksand' },
      { id: 'courier-prime', name: 'Courier Prime', style: 'Courier Prime' },
      { id: 'fredoka', name: 'Fredoka', style: 'Fredoka' },
      { id: 'pacifico', name: 'Pacifico', style: 'Pacifico' },
      { id: 'bangers', name: 'Bangers', style: 'Bangers' },
      { id: 'lobster', name: 'Lobster', style: 'Lobster' },
      { id: 'permanent-marker', name: 'Permanent Marker', style: 'Permanent Marker' },
      { id: 'comfortaa', name: 'Comfortaa', style: 'Comfortaa' },
      { id: 'righteous', name: 'Righteous', style: 'Righteous' }
    ];
    
    fontGrid.innerHTML = fonts.map(function(f) {
      var isActive = (currentFont === f.id);
      return '<div class="font-selector-item ' + (isActive ? 'active' : '') + '" data-font="' + f.id + '" style="padding: 8px 4px; border-radius: 12px; text-align: center; cursor: pointer; transition: all 0.2s; font-family: \'' + f.style + '\', sans-serif; background: ' + (isActive ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'rgba(0,0,0,0.03)') + '; color: ' + (isActive ? 'white' : 'var(--text)') + '; border: 1px solid var(--border); font-size: 0.65rem; font-weight: 500;">' + f.name + '</div>';
    }).join('');
    
    document.querySelectorAll('.font-selector-item').forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.stopPropagation();
        var fontId = this.dataset.font;
        selectFontFamilyFromSheet(fontId);
        
        document.querySelectorAll('.font-selector-item').forEach(function(el) {
          el.classList.remove('active');
          el.style.background = 'rgba(0,0,0,0.03)';
          el.style.color = 'var(--text)';
        });
        this.classList.add('active');
        this.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
        this.style.color = 'white';
        
        showToast('Font: ' + this.textContent);
        setTimeout(function() { closeBottomSheet(); }, 500);
      });
    });
  }
  
  // AFFICHER LES 20 THÈMES
  var st = getSavedTheme();
  c.innerHTML = THEMES.map(function(t) {
    return '<div class="theme-rect ' + (st === t.name ? 'active' : '') + '" data-theme="' + t.name + '" style="background:' + t.color + ';" title="' + t.label + '">' + t.label + '</div>';
  }).join('');
  
  document.querySelectorAll('.theme-rect').forEach(function(r) {
    r.addEventListener('click', function(e) {
      e.stopPropagation();
      var t = this.dataset.theme;
      document.body.className = document.body.className.replace(/theme-\w+/g, '').trim();
      document.body.classList.add('theme-' + t);
      saveTheme(t);
      
      // ⚠️ BADGE 34: Theme Collector - Ne pas appeler sur pages publiques
      // La vérification se fait via try/catch pour éviter les erreurs
      try {
        var student = getCurrentStudent();
        if (student && student.id && typeof trackThemeUsage === 'function') {
          trackThemeUsage(student.id, t);
        }
      } catch(err) {
        // Ignorer l'erreur sur les pages publiques
        console.log('Theme changed on public page');
      }
      
      document.querySelectorAll('.theme-rect').forEach(function(x) { x.classList.remove('active'); });
      this.classList.add('active');
      checkNightMode();
      showToast('Theme: ' + t);
      closeBottomSheet();
    });
  });
  
  // TAILLES DE POLICE
  var sf = getSavedFontSize();
  document.querySelectorAll('.font-sheet').forEach(function(o) {
    if (o.dataset.font === sf) o.classList.add('active');
    o.addEventListener('click', function(e) {
      e.stopPropagation();
      var f = this.dataset.font;
      saveFontSize(f);
      document.body.classList.remove('font-small', 'font-medium', 'font-large');
      document.body.classList.add('font-' + f);
      document.querySelectorAll('.font-sheet').forEach(function(x) { x.classList.remove('active'); });
      this.classList.add('active');
      showToast('Font size: ' + f);
    });
  });
  
  // GESTION DU BOTTOM SHEET
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
    
    bs.addEventListener('click', function(e) {
      if (e.target === bs) {
        closeFn();
      }
    });
    
    window.closeBottomSheet = closeFn;
  }
}

function selectFontFamilyFromSheet(fontId) {
  localStorage.setItem('smartgrade_font_family', fontId);
  
  // ⚠️ BADGE 50: Font Collector - Ne pas appeler sur pages publiques
  try {
    var student = getCurrentStudent();
    if (student && student.id && typeof trackFontUsage === 'function') {
      trackFontUsage(student.id, fontId);
    }
  } catch(err) {
    console.log('Font changed on public page');
  }
  
  if (typeof initFontFamily === 'function') {
    initFontFamily();
  }
  playActionFeedback();
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

// ============================================
// INIT HEADER PROFILE
// ============================================
function initHeaderProfile() {
  var ha = document.getElementById('headerAvatar');
  if (!ha) return;
  
  var currentPath = window.location.pathname;
  var publicPages = ['index.html', 'login.html', 'register.html', 'about.html', 'guide.html', '404.html', '400.html', '401.html', '403.html', '500.html', '502.html', '503.html'];
  
  var isPublic = false;
  for (var i = 0; i < publicPages.length; i++) {
    if (currentPath.indexOf(publicPages[i]) !== -1) {
      isPublic = true;
      break;
    }
  }
  
  if (isPublic) {
    ha.innerHTML = '<i class="fas fa-info-circle"></i>';
    return;
  }
  
  try {
    var cu = getCurrentStudent();
    if (!cu) {
      ha.innerHTML = '<i class="fas fa-user-graduate"></i>';
      return;
    }
    
    var profile = getProfile(cu.id);
    
    if (profile.avatarBase64 && profile.avatarBase64 !== '') {
      ha.innerHTML = '<img src="' + profile.avatarBase64 + '" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">';
    } else {
      ha.innerHTML = '<i class="fas fa-user-graduate"></i>';
    }
  } catch(err) {
    ha.innerHTML = '<i class="fas fa-user-graduate"></i>';
  }
}

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
  }
  catch (e) { 
    return { avatarBase64: '', bio: '', favorites: [] };
  }
}

function saveProfile(studentId, profile) {
  localStorage.setItem('smartgrade_profile_' + studentId, JSON.stringify(profile));
}

// ============================================
// GESTION DES 12 POLICES
// ============================================

function initFontFamily() {
  var savedFont = localStorage.getItem('smartgrade_font_family') || 'inter';
  var validFonts = ['inter', 'roboto', 'cinzel', 'quicksand', 'courier-prime', 'fredoka', 'pacifico', 'bangers', 'lobster', 'permanent-marker', 'comfortaa', 'righteous'];
  
  if (validFonts.indexOf(savedFont) === -1) {
    savedFont = 'inter';
  }
  
  var oldFonts = ['font-inter', 'font-roboto', 'font-cinzel', 'font-quicksand', 'font-courier-prime', 'font-fredoka', 'font-pacifico', 'font-bangers', 'font-lobster', 'font-permanent-marker', 'font-comfortaa', 'font-righteous'];
  
  for (var i = 0; i < oldFonts.length; i++) {
    document.body.classList.remove(oldFonts[i]);
  }
  
  document.body.classList.add('font-' + savedFont);
}

function playClickSound() {
  try { var a = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='); a.volume = 0.3; a.play().catch(function() {}); } catch (e) {}
}

function playActionFeedback() { playClickSound(); if (typeof navigator.vibrate === 'function') navigator.vibrate(30); }

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.btn, .term-card, .subject-card, .theme-rect, .font-sheet, .nav-item, .term-tab').forEach(function(el) {
    el.addEventListener('click', function() { playClickSound(); });
  });
});

var deferredPrompt;
window.addEventListener('beforeinstallprompt', function(e) { e.preventDefault(); deferredPrompt = e; var p = document.getElementById('installPrompt'); if (p) p.classList.add('show'); });

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(r) { if (r.outcome === 'accepted') showToast('App installed!'); deferredPrompt = null; });
    var p = document.getElementById('installPrompt'); if (p) p.classList.remove('show');
  } else { alert('Menu > Add to Home Screen'); }
}

function autoUpdateCurrentUserStreak() { var u = getCurrentStudent(); if (u) updateStreakOnVisit(u.id); }

function getSavedTheme() { return localStorage.getItem('smartgrade_theme') || 'default'; }
function saveTheme(t) { localStorage.setItem('smartgrade_theme', t); }
function getSavedFontSize() { return localStorage.getItem('smartgrade_font') || 'medium'; }
function saveFontSize(f) { localStorage.setItem('smartgrade_font', f); }

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

function getSequencesForTerm(t) { var s = (t - 1) * 2 + 1; return [s, s + 1]; }

function roundToTwo(num) { if (isNaN(num) || !isFinite(num)) return 0; return Math.round((num + Number.EPSILON) * 100) / 100; }

function showToast(m) {
  var c = document.getElementById('toastContainer');
  if (!c) { c = document.createElement('div'); c.id = 'toastContainer'; c.className = 'toast-container'; document.body.appendChild(c); }
  var t = document.createElement('div'); t.className = 'toast'; t.innerHTML = '<i class="fas fa-info-circle"></i> ' + m; c.appendChild(t);
  setTimeout(function() { t.style.opacity = '0'; t.style.transition = 'opacity 0.3s'; setTimeout(function() { t.remove(); }, 300); }, 3000);
}

function formatDate(d) { if (!d) return '--'; var dt = new Date(d); var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; return dt.getDate() + ' ' + m[dt.getMonth()] + ' ' + dt.getFullYear(); }

function getGreeting() { var h = new Date().getHours(); if (h < 12) return 'Good Morning'; if (h < 18) return 'Good Afternoon'; return 'Good Evening'; }

// ============================================
// NOTIFICATIONS
// ============================================

function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function sendLocalNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, { body: body, icon: 'icon.svg', vibrate: [200, 100, 200] });
    } catch (e) {
      console.log('Notification error:', e);
    }
  }
  showInAppNotification(title, body);
}

function showInAppNotification(title, body) {
  var existing = document.querySelector('.notification-toast');
  if (existing) existing.remove();
  
  var t = document.createElement('div');
  t.style.cssText = 'position:fixed;top:20px;left:16px;right:16px;background:var(--card-bg);border-radius:16px;padding:16px;z-index:600;border:1px solid var(--primary);box-shadow:0 8px 32px rgba(0,0,0,0.2);animation:slideDown 0.4s ease;display:flex;align-items:center;gap:12px;';
  t.innerHTML = '<div style="width:40px;height:40px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;color:white;flex-shrink:0;"><i class="fas fa-bell"></i></div><div style="flex:1;"><div style="font-weight:700;font-size:0.8rem;">' + title + '</div><div style="font-size:0.65rem;color:var(--text-light);">' + body + '</div></div><span onclick="this.parentElement.remove()" style="cursor:pointer;color:var(--text-light);">✕</span>';
  document.body.appendChild(t);
  
  setTimeout(function() { if (t.parentNode) t.remove(); }, 5000);
}

var notifStyle = document.createElement('style');
notifStyle.textContent = '@keyframes slideDown{from{transform:translateY(-100px);opacity:0}to{transform:translateY(0);opacity:1}}';
document.head.appendChild(notifStyle);

function checkStreakMilestone(id) {
  var s = getStudentStreak(id);
  var milestones = [3, 7, 15, 30];
  var notifiedStreaks = JSON.parse(localStorage.getItem('smartgrade_streak_notified_' + id) || '[]');
  
  milestones.forEach(function(m) {
    if (s.days >= m && notifiedStreaks.indexOf(m) === -1) {
      sendLocalNotification('Streak Achieved! ' + s.days + ' Days', 'You have used SMART GRADE for ' + s.days + ' days in a row!');
      
      var notifs = JSON.parse(localStorage.getItem('smartgrade_notifs_' + id) || '[]');
      notifs.unshift({
        type: 'streak',
        title: 'Streak: ' + s.days + ' Days!',
        body: 'You have used SMART GRADE for ' + s.days + ' days in a row!',
        date: new Date().toISOString(),
        read: false,
        icon: 'fa-fire'
      });
      localStorage.setItem('smartgrade_notifs_' + id, JSON.stringify(notifs));
      
      notifiedStreaks.push(m);
      localStorage.setItem('smartgrade_streak_notified_' + id, JSON.stringify(notifiedStreaks));
    }
  });
}

function checkAndNotifyAchievements(id) {
  var a = JSON.parse(localStorage.getItem('smartgrade_achievements_' + id) || '[]');
  var newBadges = a.filter(function(x) { return x.unlocked && !x.notified; });
  
  if (newBadges.length > 0) {
    newBadges.forEach(function(badge) {
      sendLocalNotification('Badge Unlocked!', badge.name);
      
      var notifs = JSON.parse(localStorage.getItem('smartgrade_notifs_' + id) || '[]');
      var exists = notifs.some(function(n) { return n.type === 'badge' && n.title.indexOf(badge.name) !== -1; });
      if (!exists) {
        notifs.unshift({
          type: 'badge',
          title: 'Badge: ' + badge.name,
          body: badge.desc,
          date: new Date().toISOString(),
          read: false,
          icon: 'fa-medal'
        });
        localStorage.setItem('smartgrade_notifs_' + id, JSON.stringify(notifs));
      }
      
      badge.notified = true;
    });
    localStorage.setItem('smartgrade_achievements_' + id, JSON.stringify(a));
  }
}

// ============================================
// NOUVEAUX BADGES - FONCTIONS DE DÉBLOCAGE
// ============================================

// Badge 34: Theme Collector (10 thèmes différents)
function trackThemeUsage(studentId, themeName) {
  var usedThemes = JSON.parse(localStorage.getItem('smartgrade_used_themes_' + studentId) || '[]');
  if (usedThemes.indexOf(themeName) === -1) {
    usedThemes.push(themeName);
    localStorage.setItem('smartgrade_used_themes_' + studentId, JSON.stringify(usedThemes));
    
    if (usedThemes.length >= 10) {
      unlockBadgeById(studentId, 34);
    }
  }
}

// Badge 50: Font Collector (6 polices différentes)
function trackFontUsage(studentId, fontId) {
  var usedFonts = JSON.parse(localStorage.getItem('smartgrade_used_fonts_' + studentId) || '[]');
  if (usedFonts.indexOf(fontId) === -1) {
    usedFonts.push(fontId);
    localStorage.setItem('smartgrade_used_fonts_' + studentId, JSON.stringify(usedFonts));
    
    if (usedFonts.length >= 6) {
      unlockBadgeById(studentId, 50);
    }
  }
}

// Badge 38: Welcome Aboard (première connexion)
function checkWelcomeBadge(studentId) {
  var welcomed = localStorage.getItem('smartgrade_welcome_badge_' + studentId);
  if (!welcomed) {
    unlockBadgeById(studentId, 38);
    localStorage.setItem('smartgrade_welcome_badge_' + studentId, 'true');
  }
}

// Badge 36: Photo Uploader
function checkPhotoBadge(studentId) {
  var profile = getProfile(studentId);
  if (profile.avatarBase64 && profile.avatarBase64 !== '') {
    unlockBadgeById(studentId, 36);
  }
}

// Badge 57: Timetable Viewer (10 vues)
function incrementTimetableView(studentId) {
  var count = parseInt(localStorage.getItem('smartgrade_timetable_views_' + studentId) || '0');
  count++;
  localStorage.setItem('smartgrade_timetable_views_' + studentId, count);
  if (count >= 10) {
    unlockBadgeById(studentId, 57);
  }
  return count;
}

// Badges 58/59: Flashcards
function checkFlashcardBadges(studentId) {
  var cards = getFlashcards(studentId);
  var customCount = cards.filter(function(c) { return !c.isOriginal; }).length;
  
  if (customCount >= 5) unlockBadgeById(studentId, 58);
  if (customCount >= 10) unlockBadgeById(studentId, 59);
}

// Badge 25: Comeback King (progression <10 → >14)
function checkComebackBadge(studentId) {
  var grades = getStudentGrades(studentId);
  var subjects = {};
  
  for (var i = 0; i < grades.length; i++) {
    var g = grades[i];
    if (!subjects[g.subjectId]) subjects[g.subjectId] = [];
    subjects[g.subjectId].push({ seq: g.sequenceId, value: g.value });
  }
  
  for (var subjId in subjects) {
    var values = subjects[subjId].map(function(v) { return v.value; });
    var firstAvg = 0;
    for (var j = 0; j < Math.min(values.length, 2); j++) firstAvg += values[j];
    firstAvg = firstAvg / Math.min(values.length, 2);
    
    var lastAvg = 0;
    var lastStart = Math.max(0, values.length - 2);
    for (var k = lastStart; k < values.length; k++) lastAvg += values[k];
    lastAvg = lastAvg / Math.min(values.length, 2);
    
    if (firstAvg < 10 && lastAvg > 14) {
      unlockBadgeById(studentId, 25);
      break;
    }
  }
}

// Fonction générique pour débloquer un badge
function unlockBadgeById(studentId, badgeId) {
  var achievements = getStudentAchievements(studentId);
  var existing = achievements.find(function(a) { return a.id === badgeId; });
  if (existing && existing.unlocked) return false;
  
  var badge = ACHIEVEMENTS ? ACHIEVEMENTS.find(function(b) { return b.id === badgeId; }) : null;
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
  
  // PAS DE NOTIFICATION POUR LES BADGES 34 ET 50
  if (badgeId !== 34 && badgeId !== 50) {
    checkAndNotifyAchievements(studentId);
  }
  
  return true;
}

// Fonction pour vérifier TOUS les badges
function checkAndUnlockAllNewBadges(studentId) {
  if (!studentId) return;
  
  checkWelcomeBadge(studentId);
  checkPhotoBadge(studentId);
  checkFlashcardBadges(studentId);
  checkComebackBadge(studentId);
}

console.log('SMART GRADE v4.0 - App initialized with 23 badges');

// ============================================
// VERSION DE L'APPLICATION
// ============================================

var APP_VERSION = '4.0.3';

if (!localStorage.getItem('smartgrade_version')) {
  localStorage.setItem('smartgrade_version', APP_VERSION);
}

var isTyping = false;

document.addEventListener('focusin', function(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    isTyping = true;
  }
});

document.addEventListener('focusout', function(e) {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    setTimeout(function() { isTyping = false; }, 1000);
  }
});

window.getAppVersion = function() {
  return APP_VERSION;
};

// ============================================
// AUTO UPDATE SYSTEM
// ============================================

var AutoUpdate = {
  currentVersion: '4.0.3',
  updateUrl: 'https://smart-grade-v4.github.io/version.json',
  apkUrl: 'https://smart-grade-v4.github.io/smart-grade-latest.apk',
  checking: false,
  downloading: false,
  updateAvailable: false,
  newVersion: null,
  releaseNotes: null
};

function checkForUpdates() {
  if (AutoUpdate.checking) return;
  if (AutoUpdate.downloading) return;
  
  AutoUpdate.checking = true;
  
  fetch(AutoUpdate.updateUrl + '?t=' + Date.now())
    .then(function(response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.json();
    })
    .then(function(data) {
      AutoUpdate.checking = false;
      
      if (data.version && data.version !== AutoUpdate.currentVersion) {
        AutoUpdate.updateAvailable = true;
        AutoUpdate.newVersion = data.version;
        AutoUpdate.releaseNotes = data.releaseNotes || '';
        
        localStorage.setItem('smartgrade_update_available', 'true');
        localStorage.setItem('smartgrade_new_version', AutoUpdate.newVersion);
        localStorage.setItem('smartgrade_release_notes', AutoUpdate.releaseNotes);
        
        console.log('[AutoUpdate] Nouvelle version disponible:', AutoUpdate.newVersion);
        
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('SMART GRADE', {
            body: 'Version ' + AutoUpdate.newVersion + ' disponible. Allez dans Paramètres pour télécharger.',
            icon: 'icon.svg',
            silent: true
          });
        }
      } else {
        localStorage.setItem('smartgrade_update_available', 'false');
      }
    })
    .catch(function(err) {
      AutoUpdate.checking = false;
      console.log('[AutoUpdate] Erreur:', err.message);
    });
}

function downloadUpdate() {
  if (AutoUpdate.downloading) {
    showToast('Téléchargement déjà en cours...');
    return;
  }
  
  if (!AutoUpdate.updateAvailable) {
    showToast('Aucune mise à jour disponible');
    return;
  }
  
  AutoUpdate.downloading = true;
  
  showToast('Téléchargement de la mise à jour...');
  
  var link = document.createElement('a');
  link.href = AutoUpdate.apkUrl;
  link.download = 'smart-grade-update.apk';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  
  setTimeout(function() {
    document.body.removeChild(link);
    AutoUpdate.downloading = false;
    showToast('Téléchargement terminé! Ouvrez le fichier pour installer.');
  }, 3000);
}

setTimeout(checkForUpdates, 5000);
setInterval(checkForUpdates, 10 * 60 * 1000);

// ============================================
// GESTION DES LIENS - EMPÊCHE L'OUVERTURE DE LIENS EXTERNES
// ============================================

(function() {
  var APP_DOMAIN = 'hanskepper.github.io';
  var APP_PATH = '/SMART-GRAD/';
  
  var allowedPages = [
    'index.html', 'dashboard.html', 'login.html', 'register.html',
    'add-grade.html', 'subjects.html', 'subject-detail.html',
    'settings.html', 'profile.html', 'statistics.html',
    'achievements.html', 'history.html', 'transfer.html',
    'export.html', 'flashcards.html', 'goals.html', 'timetable.html',
    'term1.html', 'term2.html', 'term3.html', 'yearly.html',
    'guide.html', 'guide-user.html', 'about.html', 'about-user.html',
    'notifications.html', 'shortcuts.html', 'welcome.html', '404.html',
    '400.html', '401.html', '403.html', '500.html', '502.html', '503.html'
  ];
  
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;
    
    var href = link.getAttribute('href');
    if (!href) return;
    
    if (href === '#' || href === '') return;
    
    if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
    
    var isExternal = false;
    
    if (href.indexOf('http') === 0) {
      if (!href.includes(APP_DOMAIN)) {
        isExternal = true;
      } else if (APP_PATH && !href.includes(APP_PATH)) {
        isExternal = true;
      }
    }
    
    if (!isExternal && href.indexOf('http') !== 0 && href.indexOf('/') !== 0) {
      var isAllowed = false;
      for (var i = 0; i < allowedPages.length; i++) {
        if (href === allowedPages[i] || href.indexOf(allowedPages[i]) !== -1) {
          isAllowed = true;
          break;
        }
      }
      
      if (!isAllowed && href.indexOf('.html') !== -1) {
        isExternal = true;
      }
    }
    
    if (isExternal) {
      e.preventDefault();
      window.open(href, '_blank');
      console.log('[LinkHandler] Lien externe ouvert:', href);
    }
  });
  
  console.log('[LinkHandler] Activé - ' + allowedPages.length + ' pages autorisées');
})();