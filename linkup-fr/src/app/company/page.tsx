"use client";
import { MainButton } from "@/UI/components/atoms";
import { signOut } from "next-auth/react";
import AccessControl from "@/app/accessControl";
import { useAuthUser } from "@/global-states/authUser";
export default function CompanyView():JSX.Element{
    const {setAuthUser} = useAuthUser();

    const handleClick = () =>{
        signOut();
        setAuthUser({name: "", email: "", token: "", role: 2});
    }
    return(
        <AccessControl>
            <main>
                <button onClick={handleClick}>Sign Out</button>
            </main>
        </AccessControl>
    )
}