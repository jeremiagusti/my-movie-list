import { db } from "../db/firebase";

export const getMovieCollection = userId => {
  return async dispatch => {
    const userRef = db.collection("users").doc(userId);

    try {
      const dataFromUserDB = await userRef.get();
      const moviesCollection = dataFromUserDB.data().movies;
      console.log("Movies getMovieCollection");
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

export const deleteMovieFromCollection = (deletedMovieId, userId) => {
  return async dispatch => {
    const userRef = db.collection("users").doc(userId);
    const dataFromUserDB = await userRef.get();
    const movieCollection = dataFromUserDB.data().movies;
    console.log("Movies deleteMovieCollection");

    const filteredMovieCollection = movieCollection.filter(
      movieId => movieId !== deletedMovieId
    );

    // Update database
    await userRef.update({ movies: filteredMovieCollection });

    // Update state
    dispatch({
      type: "REMOVE_MOVIE_FROM_COLLECTION",
      payload: {
        filteredMovieCollection
      }
    });
  };
};

// /////////////////////////////
export const getShowCollection = userId => {
  return async dispatch => {
    const userRef = db.collection("users").doc(userId);

    try {
      const dataFromUserDB = await userRef.get();
      const showsCollection = dataFromUserDB.data().shows;
      dispatch({
        type: "GET_SHOW_COLLECTION_FROM_DATABASE",
        payload: {
          showsCollection
        }
      });
    } catch {
      console.log("There's an error");
    }
  };
};

export const addShowToMyCollection = (showId, newCollection, userId) => {
  return dispatch => {
    // Update state with new show
    console.log("Adding new moovies!");
    dispatch({
      type: "ADD_SHOW_TO_COLLECTION",
      payload: { showId, newCollection, userId }
    });

    // Update database
    const userRef = db.collection("users").doc(userId);
    userRef
      .get()
      .then(doc => {
        // Get old data from database
        let userData = doc.data();
        userData.shows.push(showId);

        // Save new data to database
        return userRef.update({ shows: userData.shows });
      })
      .catch(e => console.log(e));
  };
};

export const deleteShowFromCollection = (deletedShowId, userId) => {
  return async dispatch => {
    const userRef = db.collection("users").doc(userId);
    const dataFromUserDB = await userRef.get();
    const showCollection = dataFromUserDB.data().shows;

    const filteredShowCollection = showCollection.filter(
      showId => showId !== deletedShowId
    );

    // Update database
    userRef.update({ shows: filteredShowCollection });

    // Update state
    dispatch({
      type: "REMOVE_SHOW_FROM_COLLECTION",
      payload: {
        filteredShowCollection
      }
    });
  };
};
