import sengridEmail from "@sendgrid/mail";  // Importing SendGrid's mail module

// This function sends an email using SendGrid's email API.
// It takes in the recipient's email, sender's email, the subject, and the message text.
// Returns a success or error message.
export async function sendEmailService(
  email: string,              // Recipient email address
  emailLinkUp: string,        // Sender email address
  subjectText: string,        // Subject of the email
  textSend: string            // Text content of the email
): Promise<{ message: string }> {
    
    // Set the SendGrid API key from environment variables
    sengridEmail.setApiKey(process.env.SENDGRID_API_KEY as string);
    
    try {
        // Email message object with recipient, sender, subject, and content
        const message = {
            to: email,                             // Recipient email
            from: emailLinkUp,                     // Sender email
            subject: subjectText || "default subject",  // Subject of the email, default if none provided
            text: textSend,                        // Text content of the email
            html: `${textSend}`                    // HTML content (for rich formatting)
        };
        
        // Send the email via SendGrid
        await sengridEmail.send(message);
        
        // Return a success message if the email is sent correctly
        return ({ message: "Email sent correctly" });
        
    } catch (error) {
        // Return an error message if something goes wrong while sending the email
        return ({ message: `Error to send message email` });
    }
}
