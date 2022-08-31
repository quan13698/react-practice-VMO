import { createContext, useEffect, useState } from "react";

export interface IRegisterPayload {
    firstName: string,
    lastName: string,
    sex: string,
    birthday: string,
    phone: string,
    mail: string,
    password: string
}

export const UserContext = createContext({
    storageUser: false,
    onSignedUp: (value: IRegisterPayload, callback: ()=> void) => {},
    onLogout: () => {}
});

export const UserProvider = ({ children }: any) => {
    const [signedUp, setSignedUp] = useState(false);
    useEffect(() => {
        const loggedUser = localStorage.getItem('isSignedUp');
        if (loggedUser === '1') {
            setSignedUp(true)
        }
    }, [])
    const signedUpHandler = (value: any, callback: () => void) => {
        // let userList = []
        // userList.push(JSON.parse(localStorage.getItem('userList') as any))
        
        // userList.push(value)
        // localStorage.setItem('userList', JSON.stringify(userList))
        let a = [];
        a = JSON.parse(localStorage.getItem('userList')!)
        a.push(value);
        localStorage.setItem('userList', JSON.stringify(a))
        
        setSignedUp(true)
        callback()
        alert('save')
    }
    return (
        <UserContext.Provider
            value={{
                storageUser: signedUp,
                onSignedUp: signedUpHandler
            } as any}
        >
            {children}
        </UserContext.Provider>
    )
}