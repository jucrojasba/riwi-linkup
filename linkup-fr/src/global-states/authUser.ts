import {create} from 'zustand';

interface IAuthUser{
    name: string,
    email:string,
    token: string,
    role: number
}

interface IAuthUserState{
    authUser: IAuthUser,
    setAuthUser: (value:IAuthUser) => void; 
}

export const useAuthUser = create<IAuthUserState>((set)=>({
    authUser: {
        name: "jose barreto",
        email: "",
        token: "",
        role: 2
    },
    setAuthUser: (value:IAuthUser)=>
        set(()=>({
            authUser:value
        }))
}))