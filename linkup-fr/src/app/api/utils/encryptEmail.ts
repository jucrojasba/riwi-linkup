import crypto from 'crypto'; // Importing the crypto module for encryption and decryption.

const algorithm = 'aes-256-cbc'; // Defining the encryption algorithm.
const secretKey = '12345678901234567890123456789012'; // 32 bytes (256 bits) secret key for AES-256 encryption.

// Function to encrypt the email
export function encryptEmail(email: string): { encryptedEmail: string, iv: string } {
    const iv = crypto.randomBytes(16); // Generating a random initialization vector (IV) of 16 bytes.
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv); // Creating a cipher instance with the algorithm, secret key, and IV.

    let encrypted = cipher.update(email, 'utf8', 'base64'); // Encrypting the email from 'utf8' to 'base64'.
    encrypted += cipher.final('base64'); // Finalizing the encryption and converting the output to 'base64'.

    // Returning the encrypted email and IV in Base64 format
    return {
        encryptedEmail: encrypted, // The encrypted email.
        iv: iv.toString('base64') // The IV converted to Base64 for easy storage/transmission.
    };
}

// Function to decrypt the email
export function decryptEmail(encryptedEmail: string, ivBase64: string): string | null {
    try {
        const iv = Buffer.from(ivBase64, 'base64'); // Converting the IV from Base64 back to a Buffer.
        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv); // Creating a decipher instance with the algorithm, secret key, and IV.

        let decrypted = decipher.update(encryptedEmail, 'base64', 'utf8'); // Decrypting the email from 'base64' to 'utf8'.
        decrypted += decipher.final('utf8'); // Finalizing the decryption to get the original email.

        return decrypted; // Returning the decrypted email.
    } catch (error) {
        console.error('Error decrypting email:', error); // Logging any errors that occur during decryption.
        return null; // Returning null if decryption fails.
    }
}
