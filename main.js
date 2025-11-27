// main.js - controls auth-protected index page
document.addEventListener('DOMContentLoaded', () => {
  const loading = document.getElementById('loading-screen');
  const app = document.getElementById('app');
  const onlineCount = document.getElementById('online-count');
  const usersList = document.getElementById('users-list');
  const userName = document.getElementById('user-name');
  const userPhoto = document.getElementById('user-photo');
  const signout = document.getElementById('signout');
  document.getElementById('year').innerText = new Date().getFullYear();

  function showApp() {
    loading.style.display = 'none';
    app.classList.remove('hidden-fade');
    app.style.opacity = 1;
  }

  function redirectToLogin() {
    window.location.href = '/login.html';
  }

  // Wait until firebase is initialized
  const waitForFirebase = setInterval(() => {
    if (window.auth && window.rtdb && window.db) {
      clearInterval(waitForFirebase);
      init();
    }
  }, 100);

  function init() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Show UI
        showApp();
        userName.textContent = user.displayName || user.email;
        userPhoto.src = user.photoURL || '';
        setupPresence(user);
      } else {
        redirectToLogin();
      }
    });

    signout.addEventListener('click', () => {
      auth.signOut().then(() => redirectToLogin());
    });
  }

  function setupPresence(user) {
    const uid = user.uid;
    const userRef = rtdb.ref('online/'+uid);
    const metaRef = rtdb.ref('meta/onlineCount');

    // Set presence true and remove on disconnect
    userRef.set({
      name: user.displayName || null,
      photo: user.photoURL || null,
      lastSeen: Date.now()
    });
    userRef.onDisconnect().remove();

    // Listen for online users and update UI
    const onlineRef = rtdb.ref('online');
    onlineRef.on('value', snapshot => {
      const val = snapshot.val() || {};
      const count = Object.keys(val).length;
      onlineCount.innerText = count;
      usersList.innerHTML = '';
      Object.keys(val).forEach(key => {
        const u = val[key];
        const pill = document.createElement('div');
        pill.className = 'user-pill';
        pill.innerHTML = '<img src="'+(u.photo||'')+'" width="28" height="28" style="border-radius:50%;object-fit:cover;margin-right:8px" />'+(u.name||'Invité');
        usersList.appendChild(pill);
      });
    });

    // Update Firestore user profile
    const docRef = db.collection('users').doc(uid);
    docRef.set({
      email: user.email,
      name: user.displayName || null,
      photoURL: user.photoURL || null,
      uid: uid,
      firstSeen: firebase.firestore.FieldValue.serverTimestamp(),
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).catch(e => console.error('Firestore write failed', e));
  }
});
