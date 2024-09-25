// Function to calculate age from a given birthday string
export default function calculateAge(birthday: string): number {
    // Convert the birthday string to a Date object
    const birthDate = new Date(birthday);
    
    // Get the current year
    const currentYear = new Date().getFullYear();
    
    // Get the year of birth from the birthDate
    const birthYear = birthDate.getFullYear();
    
    // Calculate and return the age by subtracting birthYear from currentYear
    return currentYear - birthYear;
}
