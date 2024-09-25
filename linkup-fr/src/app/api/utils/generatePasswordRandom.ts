// Function to generate a random password of a specified length
export function generateRandomPassword(length: number): string {
  // Defining the character set from which the password will be generated
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?/"; 
  
  let password = ""; // Initialize an empty string to build the password

  // Loop to generate the password
  for (let i = 0; i < length; i++) {
    // Generate a random index within the bounds of the charset
    const randomIndex = Math.floor(Math.random() * charset.length);
    
    // Append the character at the random index to the password string
    password += charset[randomIndex];
  }

  return password; // Return the generated random password
}
