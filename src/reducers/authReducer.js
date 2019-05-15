const initState = {
  userId: null,
  isLoggedIn: false,
  username: "",
  email: "",
  wrongCred: undefined
};

// Reducer
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        email: action.payload.email,
        userId: action.payload.userId,
        username: action.payload.username,
        wrongCred: undefined
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        username: ""
      };

    case "LOGIN_ERR":
      return {
        ...state,
        wrongCred: true
      };

    case "RESET":
      return {
        ...state,
        wrongCred: undefined
      };

    default:
      return state;
  }
};

export default authReducer;
