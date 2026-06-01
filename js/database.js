// ============================================
// DATABASE.JS - VERSION AVEC 23 BADGES
// Badges 1-14 (originaux) + 25,34,36,38,50,57,58,59
// ============================================

var SUBJECT_ICONS={1:'fa-laptop-code',2:'fa-square-root-variable',3:'fa-flask',4:'fa-dna',5:'fa-mountain',6:'fa-atom',7:'fa-calculator',8:'fa-leaf',9:'fa-chart-line',10:'fa-language',11:'fa-earth-africa',12:'fa-landmark',13:'fa-flag',14:'fa-apple-whole'};
var DEFAULT_SUBJECTS=[{id:1,name:"COMPUTER SCIENCES",code:"CS",coefficient:5,icon:'fa-laptop-code'},{id:2,name:"MATHEMATICS",code:"MATH",coefficient:5,icon:'fa-square-root-variable'},{id:3,name:"CHEMISTRY",code:"CHM",coefficient:5,icon:'fa-flask'},{id:4,name:"HUMAN BIOLOGY",code:"HBIO",coefficient:5,icon:'fa-dna'},{id:5,name:"GEOLOGY",code:"GEL",coefficient:5,icon:'fa-mountain'},{id:6,name:"PHYSICS",code:"PHY",coefficient:5,icon:'fa-atom'},{id:7,name:"ADDITIONAL MATHEMATICS",code:"AMATH",coefficient:5,icon:'fa-calculator'},{id:8,name:"BIOLOGY",code:"BIO",coefficient:5,icon:'fa-leaf'},{id:9,name:"ECONOMICS",code:"ECO",coefficient:5,icon:'fa-chart-line'},{id:10,name:"ENGLISH LANGUAGE",code:"ENG",coefficient:5,icon:'fa-language'},{id:11,name:"GEOGRAPHY",code:"GEO",coefficient:5,icon:'fa-earth-africa'},{id:12,name:"CITIZENSHIP",code:"CIV",coefficient:5,icon:'fa-landmark'},{id:13,name:"FRENCH",code:"FR",coefficient:5,icon:'fa-flag'},{id:14,name:"FOOD AND NUTRITION",code:"FDN",coefficient:5,icon:'fa-apple-whole'}];

// ============================================
// 23 BADGES (14 originaux + 9 nouveaux)
// ============================================
var ACHIEVEMENTS = [
  // Badges 1-14 (originaux)
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
  { id: 13, name: "Full Achievement", desc: "Unlock ALL 13 badges" },
  { id: 14, name: "Excellent Result", desc: "Get 20/20 in a subject (rounded up)" },
  
  // NOUVEAUX BADGES 25, 34, 36, 38, 50, 57, 58, 59
  { id: 25, name: "Comeback King", desc: "Go from <10/20 to >14/20 in any subject" },
  { id: 34, name: "Theme Collector", desc: "Try 10 different themes" },
  { id: 36, name: "Photo Uploader", desc: "Add a profile photo" },
  { id: 38, name: "Welcome Aboard", desc: "First login after installation" },
  { id: 50, name: "Font Collector", desc: "Try 6 different fonts" },
  { id: 57, name: "Timetable Viewer", desc: "View timetable 10 times" },
  { id: 58, name: "Flashcard Beginner", desc: "Create 5 custom flashcards" },
  { id: 59, name: "Flashcard Master", desc: "Create 10 custom flashcards" }
];

var STREAK_BADGES=[{id:'S1',name:"Beginner Streak",desc:"Use the app for 3 days",days:3},{id:'S2',name:"Regular Streak",desc:"Use the app for 7 days",days:7},{id:'S3',name:"Dedicated Streak",desc:"Use the app for 15 days",days:15},{id:'S4',name:"Legendary Streak",desc:"Use the app for 30 days",days:30}];

// Students
function getAllStudents(){var d=localStorage.getItem('smartgrade_students');if(!d)return[];try{return JSON.parse(d);}catch(e){return[];}}
function saveAllStudents(s){localStorage.setItem('smartgrade_students',JSON.stringify(s));}
function getStudentById(id){return getAllStudents().find(function(s){return s.id===id;});}
function createStudentAccount(name,number,className,pin){var s=getAllStudents();if(s.some(function(x){return x.class===className&&x.number===number;})){return{success:false,message:'Number '+number+' already taken in '+className};}var nid=s.length>0?Math.max.apply(null,s.map(function(x){return x.id;}))+1:1;var st={id:nid,name:name,number:number,class:className,pin:pin,createdAt:new Date().toISOString(),hasFingerprint:false,fingerprintHash:null};s.push(st);saveAllStudents(s);saveStudentGrades(nid,[]);saveStudentAchievements(nid,[]);for(var t=1;t<=3;t++)saveStudentSelectedSubjects(nid,t,DEFAULT_SUBJECTS.map(function(x){return x.id;}));var c={};DEFAULT_SUBJECTS.forEach(function(x){c[x.id]=5;});saveSubjectCoefficients(nid,c);saveStudentGoal(nid,12);saveStudentStreak(nid,{days:0,lastLogin:null});saveProfile(nid,{avatarBase64:'',bio:'',favorites:[]});return{success:true,student:st};}
function deleteStudent(id){var s=getAllStudents().filter(function(x){return x.id!==id;});saveAllStudents(s);['smartgrade_grades_','smartgrade_achievements_','smartgrade_coeffs_','smartgrade_goal_','smartgrade_streak_','smartgrade_compensations_','smartgrade_history_','smartgrade_sync_','smartgrade_profile_','smartgrade_flashcards_','smartgrade_goals_detail_','smartgrade_used_themes_','smartgrade_used_fonts_','smartgrade_welcome_badge_','smartgrade_timetable_views_'].forEach(function(k){localStorage.removeItem(k+id);});for(var t=1;t<=3;t++)localStorage.removeItem('smartgrade_selected_'+id+'_term'+t);}
function getUsedNumbersInClass(c){return getAllStudents().filter(function(s){return s.class===c;}).map(function(s){return s.number;});}
function getCurrentStudent(){var d=localStorage.getItem('smartgrade_current');if(!d)return null;try{var p=JSON.parse(d);return getStudentById(p.id);}catch(e){return null;}}
function setCurrentStudent(s){localStorage.setItem('smartgrade_current',JSON.stringify({id:s.id,name:s.name,number:s.number,class:s.class}));}
function clearCurrentStudent(){localStorage.removeItem('smartgrade_current');}

// Grades
function getStudentGrades(id){var d=localStorage.getItem('smartgrade_grades_'+id);if(!d)return[];try{return JSON.parse(d);}catch(e){return[];}}
function saveStudentGrades(id,g){localStorage.setItem('smartgrade_grades_'+id,JSON.stringify(g));addHistory(id,'Grades updated ('+g.length+' total)');}

// Subjects
function getStudentSelectedSubjects(id,term){var d=localStorage.getItem('smartgrade_selected_'+id+'_term'+term);if(!d)return DEFAULT_SUBJECTS.map(function(s){return s.id;});try{return JSON.parse(d);}catch(e){return DEFAULT_SUBJECTS.map(function(s){return s.id;});}}
function saveStudentSelectedSubjects(id,term,subjs){localStorage.setItem('smartgrade_selected_'+id+'_term'+term,JSON.stringify(subjs));addHistory(id,'Term '+term+' subjects updated');}
function getActiveSubjectsWithCoefficients(id,term){var sel=getStudentSelectedSubjects(id,term);return DEFAULT_SUBJECTS.filter(function(s){return sel.indexOf(s.id)!==-1;}).map(function(s){s.coefficient=getSubjectCoefficient(id,s.id);return s;});}
function getSubjectCoefficients(id){var d=localStorage.getItem('smartgrade_coeffs_'+id);if(!d){var c={};DEFAULT_SUBJECTS.forEach(function(s){c[s.id]=5;});return c;}try{return JSON.parse(d);}catch(e){var c={};DEFAULT_SUBJECTS.forEach(function(s){c[s.id]=5;});return c;}}
function getSubjectCoefficient(id,sid){var c=getSubjectCoefficients(id);return c[sid]||5;}
function saveSubjectCoefficients(id,c){localStorage.setItem('smartgrade_coeffs_'+id,JSON.stringify(c));addHistory(id,'Coefficients updated');}

// ============================================
// CALCULS
// ============================================
function getSubjectSequenceAverage(sid,seq,grades){var sg=grades.filter(function(g){return g.subjectId===sid&&g.sequenceId===seq;});return sg.length?roundToTwo(sg.reduce(function(a,b){return a+b.value;},0)/sg.length):0;}
function calculateSubjectTermAverage(sid,term,grades){var seq=getSequencesForTerm(term);var tg=grades.filter(function(g){return g.subjectId===sid&&(g.sequenceId===seq[0]||g.sequenceId===seq[1]);});return tg.length?roundToTwo(tg.reduce(function(a,b){return a+b.value;},0)/tg.length):0;}
function calculateStudentTermAverage(id,term){var subs=getActiveSubjectsWithCoefficients(id,term);var grades=getStudentGrades(id);var t=0,tc=0;for(var i=0;i<subs.length;i++){var a=calculateSubjectTermAverage(subs[i].id,term,grades);t+=a*subs[i].coefficient;tc+=subs[i].coefficient;}return tc>0?roundToTwo(t/tc):0;}
function calculateYearlyAverage(id){var t1=calculateStudentTermAverage(id,1),t2=calculateStudentTermAverage(id,2),t3=calculateStudentTermAverage(id,3);return roundToTwo((t1+t2+t3)/3);}

// Achievements
function getStudentAchievements(id){var d=localStorage.getItem('smartgrade_achievements_'+id);if(!d)return[];try{return JSON.parse(d);}catch(e){return[];}}
function saveStudentAchievements(id,a){localStorage.setItem('smartgrade_achievements_'+id,JSON.stringify(a));}

// Goal
function getStudentGoal(id){var d=localStorage.getItem('smartgrade_goal_'+id);if(!d)return 12;try{return parseFloat(d);}catch(e){return 12;}}
function saveStudentGoal(id,g){localStorage.setItem('smartgrade_goal_'+id,g);}

// Streak
function getStudentStreak(id){var d=localStorage.getItem('smartgrade_streak_'+id);if(!d)return{days:0,lastLogin:null};try{return JSON.parse(d);}catch(e){return{days:0,lastLogin:null};}}
function saveStudentStreak(id,s){localStorage.setItem('smartgrade_streak_'+id,JSON.stringify(s));}
function updateStreakOnVisit(id){if(!id)return;var s=getStudentStreak(id);var today=new Date().toISOString().split('T')[0];if(!s.lastLogin){s={days:1,lastLogin:today};saveStudentStreak(id,s);return s;}var ld=new Date(s.lastLogin);var cd=new Date(today);var diff=Math.floor((cd-ld)/(1000*60*60*24));if(diff===0)return s;else if(diff===1){s.days+=1;s.lastLogin=today;saveStudentStreak(id,s);return s;}else{s={days:1,lastLogin:today};saveStudentStreak(id,s);return s;}}

// Theme
function getSavedTheme(){return localStorage.getItem('smartgrade_theme')||'default';}
function saveTheme(t){localStorage.setItem('smartgrade_theme',t);}
function getSavedFontSize(){return localStorage.getItem('smartgrade_font')||'medium';}
function saveFontSize(f){localStorage.setItem('smartgrade_font',f);}

// Compensation
function applyCompensation(studentId,termNum,removedSubjectId){var grades=getStudentGrades(studentId);var subs=getActiveSubjectsWithCoefficients(studentId,termNum);var termAvg=calculateStudentTermAverage(studentId,termNum);var subjAvg=calculateSubjectTermAverage(removedSubjectId,termNum,grades);var remaining=subs.filter(function(s){return s.id!==removedSubjectId;});if(remaining.length===0)return{success:false,message:'Need at least 1 remaining subject'};var gap=roundToTwo(subjAvg-termAvg);var adj=roundToTwo(gap/remaining.length);var seq1=(termNum-1)*2+1;var seq2=seq1+1;remaining.forEach(function(s){var g1=grades.find(function(g){return g.subjectId===s.id&&g.sequenceId===seq1;});if(g1&&g1.value>0){g1.value=roundToTwo(g1.value+adj);}var g2=grades.find(function(g){return g.subjectId===s.id&&g.sequenceId===seq2;});if(g2&&g2.value>0){g2.value=roundToTwo(g2.value+adj);}});saveStudentGrades(studentId,grades);var newSel=getStudentSelectedSubjects(studentId,termNum).filter(function(id){return id!==removedSubjectId;});saveStudentSelectedSubjects(studentId,termNum,newSel);var compData={termNum:termNum,removedSubjectId:removedSubjectId,removedAvg:subjAvg,termAvgBefore:termAvg,termAvgAfter:calculateStudentTermAverage(studentId,termNum),adjustment:adj,date:new Date().toISOString()};var comps=getAllComps(studentId);comps[termNum]=compData;saveAllComps(studentId,comps);return{success:true,data:compData};}
function getAllComps(studentId){var d=localStorage.getItem('smartgrade_compensations_'+studentId);return d?JSON.parse(d):{};}
function saveAllComps(studentId,comps){localStorage.setItem('smartgrade_compensations_'+studentId,JSON.stringify(comps));}

// ============================================
// PROFIL - VERSION AVEC AVATAR BASE64
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
  }
  catch (e) { 
    return { avatarBase64: '', bio: '', favorites: [] };
  }
}

function saveProfile(studentId, profile) {
  localStorage.setItem('smartgrade_profile_' + studentId, JSON.stringify(profile));
}

// Flashcards
function getFlashcards(studentId){var d=localStorage.getItem('smartgrade_flashcards_'+studentId);if(!d)return[];try{return JSON.parse(d);}catch(e){return[];}}
function saveFlashcards(studentId,cards){localStorage.setItem('smartgrade_flashcards_'+studentId,JSON.stringify(cards));}

// Goals detail
function getGoalsDetail(studentId){var d=localStorage.getItem('smartgrade_goals_detail_'+studentId);if(!d)return{};try{return JSON.parse(d);}catch(e){return{};}}
function saveGoalsDetail(studentId,goals){localStorage.setItem('smartgrade_goals_detail_'+studentId,JSON.stringify(goals));}

// History
function addHistory(id,action){var h=JSON.parse(localStorage.getItem('smartgrade_history_'+id)||'[]');h.unshift({action:action,date:new Date().toISOString(),timestamp:Date.now()});if(h.length>50)h=h.slice(0,50);localStorage.setItem('smartgrade_history_'+id,JSON.stringify(h));}

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
  
  var badge = ACHIEVEMENTS.find(function(b) { return b.id === badgeId; });
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
  return true;
}

// Fonction pour vérifier TOUS les badges (appelée régulièrement)
function checkAndUnlockAllNewBadges(studentId) {
  if (!studentId) return;
  
  checkWelcomeBadge(studentId);
  checkPhotoBadge(studentId);
  checkFlashcardBadges(studentId);
  checkComebackBadge(studentId);
}