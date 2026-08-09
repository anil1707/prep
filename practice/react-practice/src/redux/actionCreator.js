export const loggin = (payload) => {
    return {
        type: "login",
        payload
    }
}

export const logout = (payload) =>{
    return {
        type: "logout",
        payload
    }
}