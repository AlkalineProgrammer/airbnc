import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext: any = createContext({});

export function UserContextProvider({ children }: any) {
    const [user, setUser] = useState({})
    
    useEffect(()=> {
        if(!user) {
            axios.get('/profile',)
        }
    },[])
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}