const initState = {
  shows: [],
  movies: []
};

const collectionReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_COLLECTION":
      return {
        ...state,
        movies: action.payload.movies
      };

    case "GET_MOVIE_COLLECTION_FROM_DATABASE":
      return {
        ...state,
        movies: action.payload.moviesCollection
      };

    case "REMOVE_MOVIE_FROM_COLLECTION":
      return {
        ...state,
        movies: action.payload.movies
      };

    case "GET_SHOW_COLLECTION_FROM_DATABASE":
      return {
        ...state,
        shows: action.payload.showsCollection
      };

    case "ADD_SHOW_TO_COLLECTION":
      return {
        ...state,
        shows: action.payload.shows
      };

    case "REMOVE_SHOW_FROM_COLLECTION":
      return {
        ...state,
        shows: action.payload.shows
      };

    default:
      return state;
  }
};

export default collectionReducer;
