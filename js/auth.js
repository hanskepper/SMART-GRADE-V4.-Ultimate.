// ============================================
// SMART GRADE v4.0 - AUTHENTIFICATION SIMPLE
// PIN uniquement (fiable à 100%)
// ============================================

// Connexion par PIN
function authenticateWithPin(studentId, pin) {
  var s = getStudentById(studentId);
  if (!s) return { success: false, message: 'Account not found' };
  if (s.pin !== pin) return { success: false, message: 'Incorrect PIN' };
  setCurrentStudent(s);
  updateStreakOnVisit(s.id);
  return { success: true, student: s };
}

// Changer le PIN
function changePin(studentId, oldPin, newPin) {
  var s = getStudentById(studentId);
  if (!s) return { success: false, message: 'Account not found' };
  if (s.pin !== oldPin) return { success: false, message: 'Incorrect current PIN' };
  if (!newPin || newPin.length !== 4 || !/^\d+$/.test(newPin)) return { success: false, message: 'PIN must be 4 digits' };
  
  var st = getAllStudents();
  var i = st.findIndex(function(x) { return x.id === studentId; });
  if (i !== -1) {
    st[i].pin = newPin;
    saveAllStudents(st);
  }
  return { success: true, message: 'PIN changed successfully' };
}

// Déconnexion
function logout() {
  clearCurrentStudent();
  window.location.href = 'index.html';
}

// Vérifier si connecté
function requireAuth() {
  var u = getCurrentStudent();
  if (!u) {
    window.location.href = 'login.html';
    return null;
  }
  return u;
}

// ============================================
// FINGERPRINT - VERSION SIMPLIFIÉE
// Cette version essaie d'utiliser le capteur
// mais si ça échoue, demande le PIN
// ============================================

function isBiometricAvailable() {
  // Vérifier si le navigateur supporte WebAuthn
  if (typeof PublicKeyCredential === 'undefined') return false;
  if (typeof navigator.credentials === 'undefined') return false;
  return true;
}

// Enregistrer une empreinte
function registerFingerprint(studentId, studentName, callback) {
  if (!isBiometricAvailable()) {
    callback({ success: false, message: 'Your device does not support fingerprint authentication. Please use PIN instead.' });
    return;
  }

  var challenge = new Uint8Array(32);
  crypto.getRandomValues(challenge);

  var createOptions = {
    publicKey: {
      challenge: challenge,
      rp: { name: 'SMART GRADE' },
      user: {
        id: new Uint8Array(16),
        name: studentName.toLowerCase().replace(/\s+/g, ''),
        displayName: studentName
      },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      timeout: 60000,
      attestation: 'none',
      authenticatorSelection: {
        userVerification: 'required'
      }
    }
  };

  navigator.credentials.create(createOptions)
    .then(function(credential) {
      // Stocker un marqueur simple
      var students = getAllStudents();
      var i = students.findIndex(function(x) { return x.id === studentId; });
      if (i !== -1) {
        students[i].hasFingerprint = true;
        students[i].fingerprintHash = 'enabled';
        saveAllStudents(students);
      }
      callback({ success: true, message: 'Fingerprint enabled! You can now use it to login.' });
    })
    .catch(function(err) {
      console.log('Fingerprint registration failed:', err.message);
      callback({ 
        success: false, 
        message: 'Could not register fingerprint. Please make sure you have fingerprints set up in your phone settings.' 
      });
    });
}

// Connexion par empreinte
function loginWithFingerprint(callback) {
  if (!isBiometricAvailable()) {
    callback({ success: false, message: 'Fingerprint not available on this device. Use PIN.' });
    return;
  }

  var students = getAllStudents().filter(function(s) {
    return s.hasFingerprint && s.fingerprintHash;
  });

  if (students.length === 0) {
    callback({ success: false, message: 'No accounts with fingerprint. Register one in Settings or use PIN.' });
    return;
  }

  var challenge = new Uint8Array(32);
  crypto.getRandomValues(challenge);

  var getOptions = {
    publicKey: {
      challenge: challenge,
      timeout: 60000,
      userVerification: 'required',
      rpId: window.location.hostname || 'localhost'
    }
  };

  navigator.credentials.get(getOptions)
    .then(function(assertion) {
      // Si on arrive ici, l'empreinte est valide
      // Prendre le premier compte avec fingerprint
      var student = students[0];
      setCurrentStudent(student);
      updateStreakOnVisit(student.id);
      callback({ success: true, student: student });
    })
    .catch(function(err) {
      console.log('Fingerprint login failed:', err.message);
      callback({ 
        success: false, 
        message: 'Fingerprint not recognized. Use your PIN to login.' 
      });
    });
}

// Supprimer l'empreinte
function removeFingerprint(studentId) {
  var s = getAllStudents();
  var i = s.findIndex(function(x) { return x.id === studentId; });
  if (i !== -1) {
    s[i].hasFingerprint = false;
    s[i].fingerprintHash = null;
    saveAllStudents(s);
    return true;
  }
  return false;
}
