import { auth, db } from '../db/firebase';

export const loginAction = (email, password) => {
    return (dispatch, getState) => {
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            console.log(cred.user.uid)
            dispatch({type: 'LOGIN', payload: {username: email}})
        }).catch(() => {
            dispatch({type: 'LOGIN_ERR'})
        })
    }
}

export const signUpAction = (email, password, username) => {
    return () => {
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            return db.collection('users').doc(cred.user.uid).set({username})
        }).then(() => {
            alert("You are registered! Now log in")
        })
    }
}

export const logoutAction = () => {
    return (dispatch, getState) => {
        dispatch({type: 'LOGOUT'})
    }
}