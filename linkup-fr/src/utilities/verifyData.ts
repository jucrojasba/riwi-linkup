/**
 * Verifies that all provided fields are truthy.
 * @param {...(number|string|undefined)} fields - Fields to check.
 * @returns {boolean} True if all fields are truthy, false otherwise.
 */
export default function verifyData(...fields: (number | string | undefined)[]): boolean {
    return fields.every(field => field !== undefined && field !== null && field !== '');
}