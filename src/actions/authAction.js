import { auth, db } from "../db/firebase";

export const loginAction = (email, password) => {
  return (dispatch, getState) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(cred => {
        return db
          .collection("users")
          .doc(cred.user.uid)
          .get();
      })
      .then(doc => {
        dispatch({
          type: "LOGIN",
          payload: { username: doc.data().username, userId: doc.id, email }
        });
      })
      .catch(() => {
        dispatch({ type: "LOGIN_ERR" });
        dispatch({ type: "RESET" });
      });
  };
};

export const signUpAction = (email, password, username) => {
  return dispatch => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        return db
          .collection("users")
          .doc(cred.user.uid)
          .set({ username, shows: [], movies: [] });
      })
      .then(() => {
        return auth.signInWithEmailAndPassword(email, password);
      })
      .then(cred => {
        return db
          .collection("users")
          .doc(cred.user.uid)
          .get();
      })
      .then(doc => {
        dispatch({
          type: "LOGIN",
          payload: { username: doc.data().username, userId: doc.id, email }
        });
      })
      .catch(() => {
        dispatch({ type: "LOGIN_ERR" });
      });
  };
};

export const logoutAction = () => {
  return async (dispatch, getState) => {
    await auth.signOut();
    dispatch({ type: "LOGOUT" });
  };
};
