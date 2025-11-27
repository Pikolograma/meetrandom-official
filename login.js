// login.js - Google sign-in
document.addEventListener('DOMContentLoaded', () => {
  const signinBtn = document.getElementById('google-signin');
  const waitForFirebase = setInterval(() => {
    if (window.auth && window.db) {
      clearInterval(waitForFirebase);
      // If already signed in, redirect
      auth.onAuthStateChanged(u => { if (u) window.location.href = '/'; });
    }
  }, 100);

  signinBtn.addEventListener('click', async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const result = await auth.signInWithPopup(provider);
      // user signed in
      window.location.href = '/';
    } catch (err) {
      alert('Échec de la connexion : ' + err.message);
      console.error(err);
    }
  });
});
