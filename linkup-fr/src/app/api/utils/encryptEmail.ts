import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = '12345678901234567890123456789012'; // 32 bytes (256 bits)

// Función para cifrar el email
export function encryptEmail(email: string): { encryptedEmail: string, iv: string } {
    const iv = crypto.randomBytes(16); // IV de 16 bytes
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    let encrypted = cipher.update(email, 'utf8', 'base64'); // Cambiado a 'base64'
    encrypted += cipher.final('base64'); // Cambiado a 'base64'

    // Devolver el email cifrado y el IV en formato Base64
    return {
        encryptedEmail: encrypted,
        iv: iv.toString('base64') // IV en Base64
    };
}

// Función para descifrar el email
export function decryptEmail(encryptedEmail: string, ivBase64: string): string | null {
    try {
        const iv = Buffer.from(ivBase64, 'base64'); // Convertir el IV de Base64 a Buffer
        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
        
        let decrypted = decipher.update(encryptedEmail, 'base64', 'utf8'); // Cambiado a 'base64'
        decrypted += decipher.final('utf8');
        
        return decrypted;
    } catch (error) {
        console.error('Error decrypting email:', error);
        return null;
    }
}
