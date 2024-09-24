import React, { ChangeEvent, useState } from "react";
import { TextInput } from "../../atoms";
import {MainButton} from "../../atoms";
import { getUserServiceByEmail } from "@/services/userService";
import { inputAlert } from "../Alert/Alert";
import { generateTextEmailCorrect, generateTextEmailForgotPassword } from "@/utilities/EmailText";
import { emailService } from "@/services/emailService";
import { generateKeyService } from "@/services/generaKeyService";
import { encryptEmailService } from "@/services/encryptEmailService";
import './ForgotPassword.css';

// ForgotPasswordForm component
export default function ForgotPasswordForm(): React.ReactNode {
    const emailDataInitial: string = ""; // Initialize email data as an empty string
    const [emailData, setEmail] = useState<string>(emailDataInitial); // State to manage the email input

    // Handle change in email input
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value); // Update the email state with the input value
    };

    // Handle click event for sending password recovery email
    const handleClick = async () => {
        // Retrieve user information by email
        const userServiceByEmailGet = await getUserServiceByEmail(emailData);
        if (userServiceByEmailGet && "message" in userServiceByEmailGet) {
            // If user is not found, show an alert
            inputAlert("User not found, try again!", "error");
            return;
        }

        // Destructure user data from the response
        const { name, email, isConfirmed, sectorId, roleId, phoneNumber } = userServiceByEmailGet.user;

        // Generate a key for password recovery
        const { key } = await generateKeyService({ name, email, sectorId, roleId, phoneNumber });

        // Encrypt the email for security
        const emailServiceEncrypt = await encryptEmailService(email);
        if (emailServiceEncrypt && "message" in emailServiceEncrypt) {
            console.log("Error encrypting email"); // Log error if email encryption fails
            return;
        }

        // Destructure encrypted email and initialization vector
        const { encryptedEmail, iv } = emailServiceEncrypt;
        const encodedEmail = encodeURIComponent(encryptedEmail); // Encode encrypted email for URL
        const encodedIv = encodeURIComponent(iv); // Encode IV for URL

        // Construct the recovery link
        const link = `https://www.riwilinkup.com/forgot-password/recovery-password?key=${key}&encryptedEmail=${encodedEmail}&iv=${encodedIv}`;
        
        // Generate the text for the email
        const textEmail = generateTextEmailForgotPassword(name, link, key);
        
        // Send the recovery email
        await emailService({
            email,
            emailLinkUp: "riwilinkup@gmail.com", // Sender email
            subject: "Forgot password", // Email subject
            text: textEmail // Email body
        });
        inputAlert("Email send correctly.", "success");
    }
    return(
        <form action="" className="forgot-password-form-wrapper">
            <h2>Forgot Password</h2>
        
        // Show success alert
        inputAlert("Email sent correctly.", "success");
    };

    return (
        <form action="">
            <h2>Forgot Password</h2> {/* Form title */}
            {/* Text input for email */}
            <TextInput 
                label="Email"
                name="email"
                onChange={(e) => handleChange(e)} // Handle input change
                required // Make the input required
                type="text" // Input type is text
            />
            {/* Button to send password recovery email */}
            <MainButton
                onClick={handleClick} // Handle button click
                className="button-forgot-password"
                text={"Send Password"} // Button text
                type="button" // Button type is button
            />
        </form>
    );
}
