import { LOGIN, LOGOUT } from "../action"

const initialState = {
    email: "",
    pass: "",
    isLoggedin: false,
}

const AuthReducer = (state = initialState, action) => {
    switch(action?.type) {
        case LOGIN: 
            return {
                ...state,
                email: action?.payload.email,
                pass: action?.payload.password,
                isLoggedin: action?.payload.isLoggedin
            }
        case LOGOUT:
            return {

            }
        default: 
            return state
    }
}

export default AuthReducer