// Function to capitalize the first letter of each word in a sentence
export function capitalizeSentece(sentence: string | undefined): string | undefined {
    // If the input is undefined or empty, return it as is
    if (!sentence) return sentence;

    // Split the sentence into words, capitalize each word, and then join them back together
    return sentence
        .split(' ') // Split the sentence into an array of words
        .map(word => 
            // Capitalize the first character and lowercase the rest of the word
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' '); // Join the array of words back into a single string
}
