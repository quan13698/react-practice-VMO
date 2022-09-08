import { createContext, useEffect, useState } from "react";

  
export const AuthContext = createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email: string,password: string) => {}
});

export const AuthProvider = ({children}: any) => {
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const loggedUser = localStorage.getItem('isLogged');
        if(loggedUser === '1'){
            setLoggedIn(true)
        }
    },[])
    const logoutHandler = () => {
        localStorage.removeItem('isLogged');
        setLoggedIn(false)
        alert('aaaa')
    }
    
    const loginHandler = () => {
        localStorage.setItem('isLogged', '1');
        setLoggedIn(true)
        alert('save')
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

// export { AuthContext }
