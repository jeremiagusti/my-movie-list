const initState = {
    isLoggedIn: false, 
    username: "",
    wrongCred: undefined
}

// Reducer
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN': 
            return {
                ...state, 
                isLoggedIn: true, 
                username: action.payload.username,  
                wrongCred: undefined
            }
        
        case 'LOGOUT':
            return {
                ...state, 
                isLoggedIn: false,
                username: ""
            }    
            
        case 'LOGIN_ERR': 
            return {
                ...state, 
                wrongCred: true
            }

        default: 
            return state;
    }
}

export default authReducer;