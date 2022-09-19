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

export interface IloginPayload {
    mail: string,
    password: string
}

export const UserContext = createContext({
    storageUser: false,
    onSignedUp: (value: IRegisterPayload, callback: () => void) => { },
    onLogout: () => { },
    onEditUser: (value: IRegisterPayload, callback: () => void) => { },
    onDisplayUser: () => { },
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
        const userList = JSON.parse(localStorage.getItem('userList') || "[]")
        const findUserEmail = userList.some((e: any) => e.mail === value.mail)

        if (!findUserEmail) {
            localStorage.setItem('userList', JSON.stringify([...userList, value]))
            setSignedUp(true)
            callback()
            alert('save')
        } else {
            alert('mail is existing');
        }
    }

    const displayUserHandler = () => {
        alert('ok')
    }

    const editUserHandler = (value: any, callback: () => void) => {
        const editingData = JSON.parse(localStorage.getItem('isEditing') as any);
        const userData = JSON.parse(localStorage.getItem('userList') as any);
        userData.map((e: any) => {
            if (editingData === e.mail) {
                const { mail } = e;
                let index: any;
                userData.filter((e: any, i: any) => {
                    if (e.mail === mail) {
                        index = i
                        userData.splice(index, 1)
                        localStorage.setItem('userList', JSON.stringify(userData))
                    }
                })
                userData.push(value)
                alert('update successfully')
                return localStorage.setItem('userList', JSON.stringify(userData))
            }
        })
        callback()
    }

    return (
        <UserContext.Provider
            value={{
                storageUser: signedUp,
                onSignedUp: signedUpHandler,
                onDisplayUser: displayUserHandler,
                onEditUser: editUserHandler
            } as any}
        >
            {children}
        </UserContext.Provider>
    )
}