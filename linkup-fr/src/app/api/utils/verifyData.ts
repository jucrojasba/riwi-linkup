// Function to verify that all provided fields are truthy
export function verifyData(...fields: (string | number)[]): boolean {
    // The every method tests whether all elements in the fields array pass the provided function
    return fields.every(field => field);
}
