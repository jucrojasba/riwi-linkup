export function verifyData(...fields: (string | number)[]): boolean{
    return fields.every(field=>field);
}