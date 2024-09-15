"use client";
import { MainButton } from "@/UI/components/atoms"
import { signOut } from "next-auth/react"
export default function CompanyView():React.ReactNode{
    return(
        <div>
            <div>Company</div>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    )
}