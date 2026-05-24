/* Firebase SDK must be loaded before this file */
var firebaseConfig = {
  apiKey: "AIzaSyBtan3WctlMmv5jFZyJFGGmC42vCyQAMAI",
  authDomain: "jee-pilates.firebaseapp.com",
  projectId: "jee-pilates",
  storageBucket: "jee-pilates.firebasestorage.app",
  messagingSenderId: "152632618824",
  appId: "1:152632618824:web:5fc6f26cf01fe6f5a88d7d",
  measurementId: "G-G9ZSEFCGPG"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();
