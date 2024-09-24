// Defines the structure for company registration
export interface ICompanyRegister {
    name: string;                // Company's name
    email: string;               // Company's email address
    password: string;            // Password for account creation
    confirmPassword: string;     // Confirmation of the password
    phone: number;               // Company's phone number
    sector: string;              // Sector or industry of the company
}

// Defines the structure for company login
export interface ICompanyLogin {
    email: string;               // Company's email address
    password: string;            // Password for login
}
