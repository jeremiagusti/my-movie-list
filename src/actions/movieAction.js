import { db, images } from "../db/firebase";

// Called once to sync my collection with database
export const getMovieCollection = userId => {
  return async dispatch => {
    const userRef = db.collection("users").doc(userId);

    try {
      const dataFromUserDB = await userRef.get();
      const movieIds = dataFromUserDB.data().movies;
      let movies = [];

      // Getting movies from database
      for (let i = 0; i < movieIds.length; i++) {
        const doc = await db
          .collection("movies")
          .doc(movieIds[i])
          .get();
        const movieData = doc.data();

        // Getting cover url for each movie
        const coverURL = await images
          .child(`${movieData.title.toLowerCase()}.jpg`)
          .getDownloadURL();

        const movie = {
          ...movieData,
          id: movieIds[i],
          coverURL
        };

        movies.push(movie);
      }

      dispatch({
        type: "GET_MOVIE_COLLECTION_FROM_DATABASE",
        payload: {
          moviesCollection: movies
        }
      });
    } catch (error) {
      console.log("There's an error", error);
    }
  };
};

export const addMovieToMyCollection = (movie, userId, oldCollection) => {
  return async dispatch => {
    const userRef = db.collection("users").doc(userId);

    // Get user data from database
    const dbDoc = await userRef.get();
    let userData = dbDoc.data();

    // Add one movie to movies
    userData.movies.push(movie.id);
    await userRef.update({ movies: userData.movies });

    // Update state
    const newMovieCollection = [...oldCollection, movie];
    dispatch({
      type: "ADD_MOVIE_TO_COLLECTION",
      payload: { movies: newMovieCollection }
    });
  };
};

export const deleteMovieFromCollection = (movie, userId, movieCollection) => {
  return async dispatch => {
    // Update database
    const userRef = db.collection("users").doc(userId);
    const dbDoc = await userRef.get();
    const userMovies = dbDoc.data().movies;

    const filteredMovieCollection = userMovies.filter(
      checkedID => checkedID !== movie.id
    );

    await userRef.update({ movies: filteredMovieCollection });

    // Update state
    console.log(movieCollection);
    for (let i = 0; i < movieCollection.length; i++) {
      const obj = movieCollection[i];
      if (movie.id === obj.id) {
        movieCollection.splice(i, 1);
        break;
      }
    }
    console.log(movieCollection);

    dispatch({
      type: "REMOVE_MOVIE_FROM_COLLECTION",
      payload: {
        movies: movieCollection
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
      const showIds = dataFromUserDB.data().shows;
      let shows = [];

      // Getting shows from database
      for (let i = 0; i < showIds.length; i++) {
        const doc = await db
          .collection("tv")
          .doc(showIds[i])
          .get();
        const showData = doc.data();
        console.log(showData);

        // Getting cover url for each show
        const coverURL = await images
          .child(`${showData.title.toLowerCase()}.jpg`)
          .getDownloadURL();

        const show = {
          ...showData,
          id: showIds[i],
          coverURL
        };

        shows.push(show);
      }

      dispatch({
        type: "GET_SHOW_COLLECTION_FROM_DATABASE",
        payload: {
          showsCollection: shows
        }
      });
    } catch (error) {
      console.log("There's an error", error);
    }
  };
};

export const addShowToMyCollection = (show, userId, oldCollection) => {
  return async dispatch => {
    const userRef = db.collection("users").doc(userId);

    // Get user data from database
    const dbDoc = await userRef.get();
    let userData = dbDoc.data();

    // Add one show to shows
    userData.shows.push(show.id);
    console.log(userData.shows);
    await userRef.update({ shows: userData.shows });

    // Update state
    const newShowCollection = [...oldCollection, show];
    dispatch({
      type: "ADD_SHOW_TO_COLLECTION",
      payload: { shows: newShowCollection }
    });
  };
};

export const deleteShowFromCollection = (show, userId, showCollection) => {
  return async dispatch => {
    const userRef = db.collection("users").doc(userId);
    const dbDoc = await userRef.get();
    const userShows = dbDoc.data().shows;

    const filteredShowCollection = userShows.filter(
      checkedID => checkedID !== show.id
    );

    await userRef.update({ shows: filteredShowCollection });

    // Update state
    console.log(showCollection);
    for (let i = 0; i < showCollection.length; i++) {
      const obj = showCollection[i];
      if (show.id === obj.id) {
        showCollection.splice(i, 1);
        break;
      }
    }
    console.log(showCollection);

    dispatch({
      type: "REMOVE_SHOW_FROM_COLLECTION",
      payload: {
        shows: showCollection
      }
    });
  };
};
