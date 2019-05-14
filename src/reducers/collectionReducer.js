const initState = {
  shows: [],
  movies: []
};

const collectionReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_COLLECTION":
      return {
        ...state,
        movies: action.payload.newCollection
      };

    case "ADD_SHOW_TO_COLLECTION":
      return {
        ...state,
        shows: state.shows.push(action.payload.id)
      };

    case "GET_MOVIE_COLLECTION_FROM_DATABASE":
      return {
        ...state,
        movies: action.payload.moviesCollection
      };

    default:
      return state;
  }
};

export default collectionReducer;
