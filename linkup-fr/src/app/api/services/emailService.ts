import sengridEmail from "@sendgrid/mail";
export async function sendEmailService(email:string, emailLinkUp: string, subject: string, text:string):Promise<{message:string} | undefined>{
    sengridEmail.setApiKey(process.env.SENDGRID_API_KEY as string);
    try{
        const message = {
            to:email,
            from: emailLinkUp,
            subject,
            text,
            html:`<p>${text}</p>`
    
        }
        const send = await sengridEmail.send(message);
        if(send)return({message: "Email send correctly"});
        
    }catch(error){
        return({message: "Error to send message email"});
    }
}