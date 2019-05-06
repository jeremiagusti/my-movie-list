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
export const images = firebase.storage().ref().child('images'); // Storage

// Getting image cover for movies or TV Shows
export const getImageCover = (dataFromDatabase, numberOfMovie) => {
  return new Promise((resolve, reject) => {
      let tempArray = [];

      dataFromDatabase.forEach((doc) => {
          let movieWithoutCoverURL = doc.data(); 
        console.log(movieWithoutCoverURL)
          images.child(`${movieWithoutCoverURL.title.toLowerCase()}.jpg`).getDownloadURL()
          .then((url) => {
              let movieWithCoverURL = {
                  ...movieWithoutCoverURL, 
                  coverURL: url
              }

              tempArray.push(movieWithCoverURL);

              if (tempArray.length === numberOfMovie) {
                  resolve(tempArray);
              }
          }).catch(() => {
              let movieWithCoverURL = {
                  ...movieWithoutCoverURL, 
                  coverURL: null
              }

              tempArray.push(movieWithCoverURL);

              if (tempArray.length === numberOfMovie) {
                  resolve(tempArray);
              }
          })
      });
  });
}
