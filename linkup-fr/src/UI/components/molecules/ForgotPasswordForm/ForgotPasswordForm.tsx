import React, { ChangeEvent, useState } from "react";
import { TextInput } from "../../atoms";
import {MainButton} from "../../atoms";
import { getUserServiceByEmail } from "@/services/userService";
import { inputAlert } from "../Alert/Alert";
import { generateTextEmailCorrect, generateTextEmailForgotPassword } from "@/utilities/EmailText";
import { emailService } from "@/services/emailService";
import { generateKeyService } from "@/services/generaKeyService";
import { encryptEmailService } from "@/services/encryptEmailService";

export default function ForgotPasswordForm():React.ReactNode{

    const emailDataInitial:string = "";
    const [emailData, setEmail]= useState<string>(emailDataInitial);

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value);
    }
    const handleClick = async() =>{
        const userServiceByEmailGet = await getUserServiceByEmail(emailData);
        if(userServiceByEmailGet && "message" in userServiceByEmailGet){
            inputAlert("User not found, try again!", "error");
            return;
        }
        const {name,email,isConfirmed, sectorId, roleId,phoneNumber} = userServiceByEmailGet.user;
        
        const {key} = await generateKeyService({name,email,sectorId,roleId,phoneNumber});
        const emailServiceEncrypt = await encryptEmailService(email);
        if (emailServiceEncrypt && "message" in emailServiceEncrypt) {
            console.log("Error encrypting email");
            return;
        }
        console.log("dasddadasda---",emailServiceEncrypt)
        const { encryptedEmail, iv } = emailServiceEncrypt;
        const encodedEmail = encodeURIComponent(encryptedEmail);
        const encodedIv = encodeURIComponent(iv);
        const link = `https://www.riwilinkup.com/forgot-password/recovery-password?key=${key}&encryptedEmail=${encodedEmail}&iv=${encodedIv}`;
        const textEmail = generateTextEmailForgotPassword(
            name,
            link,
            key
        );
        await emailService({
            email,
            emailLinkUp: "riwilinkup@gmail.com",
            subject: "Forgot password",
            text: textEmail
        });
        inputAlert("Email send correctly.", "success");
    }
    return(
        <form action="">
            <h2>Forgot Password</h2>
            <TextInput 
            label="Email"
            name="email"
            onChange={(e)=>handleChange(e)}
            required
            type="text"
            />
            <MainButton
            onClick={handleClick}
            className="button-forgot-password"
            text={"Send Password"}
            type="button"
            />

        </form>
    )
}