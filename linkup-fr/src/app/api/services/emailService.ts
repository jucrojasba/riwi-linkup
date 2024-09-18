import sengridEmail from "@sendgrid/mail";
export async function sendEmailService(email:string, emailLinkUp: string, subjectText: string, textSend:string):Promise<{message:string} | undefined>{
    sengridEmail.setApiKey(process.env.SENDGRID_API_KEY as string);
    try{
        const message = {
            to:email,
            from: emailLinkUp,
            subject:subjectText || "default subject",
            text: textSend,
            html:`${textSend}`
    
        }
        const send = await sengridEmail.send(message);
        if(send)return({message: "Email send correctly"});
        
    }catch(error:any){
        return({message: `Error to send message email ${error}`,});
    }
}