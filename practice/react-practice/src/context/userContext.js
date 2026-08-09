import { createContext, useContext, useState } from "react";

const UserContext = createContext(null)

export const UserContextProvider = ({children}) => {
    const [userDetail, setUserDetail] = useState({});

    const logout = () => {
        setUserDetail({})
    }
    const login = (userDetail) => {
        setUserDetail(prev => ({...userDetail }));
    }

    const contextData = {logout: logout, login: login, userDetail}

    return (
        <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
    )
}

export const useUserContext = () =>{
    const userContextData = useContext(UserContext)
    console.log("usercontextData: ", userContextData)
    return userContextData
}
