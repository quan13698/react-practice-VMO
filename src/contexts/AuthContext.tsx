import { createContext, useEffect, useState } from "react";

export interface ILoginPayload {
    mail: string,
    password: string
}

export const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: (callback: () => void) => {},
    onLogin: (value: ILoginPayload, callback: () => void) => {}
});

export const AuthProvider = ({children}: any) => {
    const [loggedIn, setLoggedIn] = useState(false);
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
        localStorage.setItem('isLogged', '1');
        setLoggedIn(true)
        callback()
    }
       return (
        <AuthContext.Provider 
            value={{
                isLoggedIn: loggedIn,
                onLogout: logoutHandler,
                onLogin: loginHandler
            } as any}
        >
            {children}
        </AuthContext.Provider>
       )
}
