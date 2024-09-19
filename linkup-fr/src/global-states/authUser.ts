import {create} from 'zustand';

export interface IAuthUser{
    name?: string,
    email:string,
    token: string,
    role: number,
    provider?:string,
}

interface IAuthUserState{
    authUser: IAuthUser,
    setAuthUser: (value:IAuthUser) => void; 
}

export const useAuthUser = create<IAuthUserState>((set)=>({
    authUser: {
        name: "",
        email: "",
        token: "",
        role: 0,
        provider: ""
    },
    setAuthUser: (value:IAuthUser)=>
        set(()=>({
            authUser:value
        }))
}))