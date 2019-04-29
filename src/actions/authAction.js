export const loginAction = (email, password) => {
    return (dispatch, getState) => {
        dispatch({type: 'LOGIN', payload: {username: email}})
    }
}

export const logoutAction = () => {
    return (dispatch, getState) => {
        dispatch({type: 'LOGOUT'})
    }
}