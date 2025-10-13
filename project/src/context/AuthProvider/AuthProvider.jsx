import { useEffect, useState } from "react";
import { deleteAllCookies, getCookie } from "../../helpers/cookie";
import { createContext } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)

    useEffect(()=>{
        const savedToken = getCookie('token')
        if (savedToken)
            setToken(savedToken)
    }, [])

    const loginContext = (newToken) => {
        setToken(newToken)
        document.cookie = `token=${newToken}; path=/`
    }

    const logoutContext = () => {
        deleteAllCookies()
        setToken(null)
    }

    return(
        <authContext.Provider value={{ token, loginContext, logoutContext }}>
            {children}
        </authContext.Provider>
    )
}
