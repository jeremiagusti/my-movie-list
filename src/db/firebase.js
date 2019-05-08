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
export const getMovieCover = async (snapshot) => {
    let moviesWithoutCover = [];
    let movieWithCover = [];

    snapshot.forEach((doc) => {
        moviesWithoutCover.push({
            ...doc.data(), 
            id: doc.id
        });
    });

    for (let i = 0; i < moviesWithoutCover.length; i++) {
        try {
            // Getting image for movie 
            let coverURL = await images.child(`${moviesWithoutCover[i].title.toLowerCase()}.jpg`).getDownloadURL(); 
            movieWithCover.push({
                ...moviesWithoutCover[i], 
                coverURL,
            })
        } 
        catch (error) {
            movieWithCover.push({
                ...moviesWithoutCover[i], 
                coverURL: null,
            })
        }
    }

    return movieWithCover;
}