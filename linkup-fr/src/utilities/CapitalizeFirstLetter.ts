// Function to capitalize the first letter of a given text
export function capitalizeFirstLetter(text: string) {
    // Check if the input text is falsy (null, undefined, or empty)
    if (!text) return; // If it is, return undefined

    // Capitalize the first character and concatenate it with the rest of the text
    return text.charAt(0).toUpperCase() + text.slice(1);
}
