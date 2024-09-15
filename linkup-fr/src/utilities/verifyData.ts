export default function verifyData(...fields: (number | string | undefined)[]): boolean{
    return fields.every((field) =>field);
}