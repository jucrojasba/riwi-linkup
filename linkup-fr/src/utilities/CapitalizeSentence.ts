export function capitalizeSentece(sentence: string | undefined): string | undefined{
    if (!sentence) return sentence;

    return sentence
        .split(' ')
        .map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');
}