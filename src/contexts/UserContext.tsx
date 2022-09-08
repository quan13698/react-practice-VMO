import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({
    storageUser: false,
    // onLogout: () => {},
    // onLogin: (email: string,password: string) => {}
    onSignedUp: (
        firstName: string,
        lastName: string,
        sex: string,
        birthday: string,
        phone: string,
        mail: string) => { }
});

export const UserProvider = ({ children }: any) => {
    const [signedUp, setSignedUp] = useState(false);
    useEffect(() => {
        const loggedUser = localStorage.getItem('isSignedUp');
        if (loggedUser === '1') {
            setSignedUp(true)
        }
    }, [])
    // const logoutHandler = () => {
    //     localStorage.removeItem('isSignedUp');
    //     setSignedUp(false)
    //     alert('aaaa')
    // }
    const signedUpHandler = () => {
        localStorage.setItem('isSignedUp', '1');
        console.log('ttttt');
        
        setSignedUp(true)
        alert('save')
    }
    return (
        <UserContext.Provider
            value={{
                storageUser: signedUp,
                // onLogout: logoutHandler,
                onSignedUp: signedUpHandler
            } as any}
        >
            {children}
        </UserContext.Provider>
    )
}