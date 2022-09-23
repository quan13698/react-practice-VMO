import { createContext, useEffect, useState } from "react";
import { string } from "yup";

export interface ILoginPayload {
    mail: string,
    password: string
}

export const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: (callback: () => void) => {},
    onLogin: (value: ILoginPayload, callback: () => void) => {},
    loggedUser: { mail: string, password: string }
});

export const AuthProvider = ({children}: any) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('loggeduser') || '{}'));
    useEffect(() => {
        const loggedUser = localStorage.getItem('isLogged');
        if(loggedUser === '1'){
            setLoggedIn(true)
        }
    },[])
    const logoutHandler = (callback: () => void) => {
        localStorage.removeItem('isLogged');
        setLoggedIn(false)
        callback()
    }
    
    const loginHandler = (value: any, callback: () => void) => {
        setLoggedUser(value);
        localStorage.setItem('loggeduser', JSON.stringify(value))
        localStorage.setItem('isLogged', '1');
        setLoggedIn(true)
        callback()
    }
       return (
        <AuthContext.Provider 
            value={{
                isLoggedIn: loggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler,
                loggedUser,
                setLoggedUser
            } as any}
        >
            {children}
        </AuthContext.Provider>
       )
}
