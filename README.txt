
MeetRandom - ready-to-deploy (Vercel)
-----------------------------------
This project is preconfigured to use:
- Firebase Auth (Google)
- Firestore (users collection)
- Realtime Database (online presence under /online)

How to deploy on Vercel (simple):
1. Zip this folder and upload to Vercel as a new project OR connect a GitHub repo.
2. Make sure firebaseConfig in firebase.js is correct (already set).
3. In Firebase Console, add the domain: https://meetrandom-official.vercel.app in Authentication -> Sign-in method -> Authorized domains.
4. Deploy. The login page will be at /login.html and main page at /.

Security note: For a production app, prefer storing Firebase config via environment variables.
