const initState = {
    isLoggedIn: false, 
    username: ""
}

// Reducer
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN': 
            return {
                ...state, 
                isLoggedIn: true, 
                username: action.payload.username
            }
        
        case 'LOGOUT':
            return {
                ...state, 
                isLoggedIn: false,
                username: ""
            }           

        default: 
            return state;
    }
}

export default authReducer;