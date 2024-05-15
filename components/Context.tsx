'use client'
import { Dispatch, FC, ReactNode, SetStateAction, createContext,useContext,useState } from "react";

const UserContext = createContext<[string,Dispatch<SetStateAction<string>>] >(["",()=>{}]);

export const UserProvider : FC<{children : ReactNode}> = ({children}) =>{
    const [User, setUser] = useState("");

    return(
        <UserContext.Provider value={[User,setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () : [string,Dispatch<SetStateAction<string>>] => {
    const context = useContext(UserContext);

    return context;
}