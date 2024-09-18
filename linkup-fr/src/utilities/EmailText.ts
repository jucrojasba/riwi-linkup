
export function generateTextEmailIncorrect(subject:string, name:string, email:string):string{
    const emailText = 
    `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; }
            .container { width: 100%; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; }
            h1 { color: #6b5cff; }
            h2 { color: #333; }
            .section { margin-bottom: 20px; padding: 10px; background-color: #fff; border-radius: 5px; }
            ul { padding-left: 20px; }
            .footer { margin-top: 20px; font-size: 0.9em; color: #777; }
            a { color: #007bff; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Access Issue - RiwiLinkUp</h1>
            <p>Dear ${name},</p>
            <p>We encountered an issue while attempting to access your account. It appears that the user already exists in our system.</p>
            <p>Your account was accessed via an external provider.</p>
            
            <div class="section">
                <h2>Account Details</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Password:</strong> [Not displayed for security reasons]</p>
            </div>
            
            <div class="section">
                <h2>Issue Information</h2>
                <p>The problem seems to be related to an existing user account. To resolve this issue, please follow these steps:</p>
                <ul>
                    <li><strong>Verify your credentials:</strong> Ensure you are using the correct login information.</li>
                    <li><strong>Reset your password:</strong> If you forgot your password, you can reset it (link_to_password_reset).</li>
                </ul>
            </div>
            
            <p>If the problem persists or you need further assistance, please contact us immediately at this email address.</p>
            
            <div class="footer">
                <p>Thank you for your patience and understanding.</p>
                <p>Best regards, <br> The RiwiLinkUp Team <br> <a href="https://riwi-linkup.vercel.app/">riwi-linkup</a></p>
            </div>
        </div>
    </body>
    </html>
 
`;

    return emailText;
}

export function generateTextEmailCorrect(subject:string, name:string, email:string, password:string):string{
    const emailText = 
    `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; }
            .container { width: 100%; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; }
            h1 { color: #6b5cff; }
            h2 { color: #333; }
            .section { margin-bottom: 20px; padding: 10px; background-color: #fff; border-radius: 5px; }
            ul { padding-left: 20px; }
            .footer { margin-top: 20px; font-size: 0.9em; color: #777; }
            a { color: #007bff; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Successful Login to RiwiLinkUp</h1>
            <p>Dear ${name},</p>
            <p>We’re pleased to inform you that your account login was successful. Below are the details of your recent login:</p>
            <p>Your account was accessed via an external provider.</p>
            
            <div class="section">
                <h2>Account Details</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Password:</strong> ${password}</p>
            </div>
            
            <div class="section">
                <h2>Login Information</h2>
                <p>You accessed your account through one of our providers. If you did not initiate this login or have any concerns, please let us know immediately.</p>
            </div>
            
            <div class="section">
                <h2>Next Steps</h2>
                <ul>
                    <li><strong>Verify your account:</strong> Ensure your account details are correct and up-to-date.</li>
                    <li><strong>Review your activity:</strong> Check your recent login activities and make sure everything looks as expected.</li>
                </ul>
            </div>
            
            <p>If you have any questions or need further assistance, please feel free to contact us at this email address.</p>
            
            <div class="footer">
                <p>Thank you for using RiwiLinkUp!</p>
                <p>Best regards, <br> The RiwiLinkUp Team <br> <a href="https://riwi-linkup.vercel.app/">riwi-linkup</a></p>
            </div>
        </div>
    </body>
    </html>
    
    `;

    return emailText;
}