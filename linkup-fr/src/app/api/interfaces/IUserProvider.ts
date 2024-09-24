// Interface representing the structure for user provider registration data
export interface IUserProviderRegister {
    roleId: number;      // ID of the role assigned to the user provider
    email: string;       // User provider's email address
    token: string;       // Authentication token for the user provider
    password?: string;   // Optional password for the user provider
    name: string;        // User provider's name
}

// Interface representing the structure for user provider login data
export interface IUserProviderLogin {
    roleId: number;      // ID of the role assigned to the user provider
    email: string;       // User provider's email address
    token: string;       // Authentication token for the user provider
    name: string;        // User provider's name
    password: string;    // User provider's password
}
