// Defines the structure for generating a key
export interface IGenerateKey {
    name: string;                  // Name of the user
    email: string;                 // Email address of the user
    roleId: number;                // ID representing the user's role
    sectorId: number;              // ID representing the sector of the user
    phoneNumber: string;           // Phone number of the user
}
