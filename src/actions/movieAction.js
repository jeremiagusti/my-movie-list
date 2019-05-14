import { db } from "../db/firebase";

export const addMovieToMyCollection = (movieId, newCollection, userId) => {
  return dispatch => {
    // Update state with new movie
    console.log("Adding new moovies!");
    dispatch({
      type: "ADD_MOVIE_TO_COLLECTION",
      payload: { movieId, newCollection, userId }
    });

    // Update database
    const userRef = db.collection("users").doc(userId);
    userRef
      .get()
      .then(doc => {
        // Get old data from database
        let userData = doc.data();
        userData.movies.push(movieId);

        // Save new data to database
        return userRef.update({ movies: userData.movies });
      })
      .catch(e => console.log(e));
  };
};

export const getMovieCollection = userId => {
  return async dispatch => {
    const userRef = db.collection("users").doc(userId);

    try {
      const dataFromUserDB = await userRef.get();
      const moviesCollection = dataFromUserDB.data().movies;
      console.log(moviesCollection);
      dispatch({
        type: "GET_MOVIE_COLLECTION_FROM_DATABASE",
        payload: {
          moviesCollection
        }
      });
    } catch {
      console.log("There's an error");
    }
  };
};
