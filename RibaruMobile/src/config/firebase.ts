import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAwXhN9ihpJN88N529A4cWX0MHBSsejGbw",
  authDomain: "ribaru-b71a5.firebaseapp.com",
  projectId: "ribaru-b71a5",
  storageBucket: "ribaru-b71a5.firebasestorage.app",
  messagingSenderId: "909463616162",
  appId: "1:909463616162:android:aa686fc5c4014f83c2f5fb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
