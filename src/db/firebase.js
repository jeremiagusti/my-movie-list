import firebase from 'firebase'

// Connect firebase to my app
var config = {
    apiKey: "AIzaSyB-zDALOFDne6EyoCgCj7IncOQyGcQsCTw",
    authDomain: "netflix-final-project-b4060.firebaseapp.com",
    databaseURL: "https://netflix-final-project-b4060.firebaseio.com",
    projectId: "netflix-final-project-b4060",
    storageBucket: "netflix-final-project-b4060.appspot.com",
    messagingSenderId: "370712063707"
  };

firebase.initializeApp(config);

export const db = firebase.firestore(); // Database
export const auth = firebase.auth(); // Authentication 
