import { useAuthUser } from "@/global-states/authUser";
import { useRouter } from "next/navigation";

export default function AccessControl({children}: {children:React.ReactNode}){
    const {authUser} = useAuthUser();
    const router = useRouter();
    console.log(authUser);
    if(authUser.email === ""){
        router.push("/login");
        return null;
    }
    return(
        <>{children}</>
    )
} 