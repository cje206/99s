// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAKgD0dCM2YEtSl3cMZqWKWDitFVdtAYd8',
  authDomain: 'blog-post-4dd93.firebaseapp.com',
  projectId: 'blog-post-4dd93',
  storageBucket: 'blog-post-4dd93.appspot.com',
  messagingSenderId: '323958002489',
  appId: '1:323958002489:web:f3bb77c829d0c4c8c1cee8',
  measurementId: 'G-N90ZKRPDTG',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
