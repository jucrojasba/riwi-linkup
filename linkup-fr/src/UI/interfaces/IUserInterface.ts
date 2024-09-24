// Represents a user in the system
export interface IUser {
    id?: number;             // Unique identifier for the user (optional)
    name: string;           // Name of the user
    email: string;          // Email address of the user
    isConfirmed: boolean;   // Indicates if the user's email is confirmed
    password: string;       // User's password
    phone: string;          // User's phone number
    sector: number;         // ID of the sector the user belongs to
}

// Represents the state containing multiple users
export interface IUserState {
    users: IUser[];         // Array of users
}

// Represents the API response for a user
export interface IApiResponseUser {
    user: IUserBack;        // User details
}

// Represents the detailed structure of a user from the backend
export interface IUserBack {
    id: number;                 // Unique identifier for the user
    name: string;               // Name of the user
    email: string;              // Email address of the user
    isConfirmed: boolean;       // Indicates if the user's email is confirmed
    passwordHash: string;       // Hashed password for security
    passwordSalt: string;       // Salt used for password hashing
    phoneNumber: string;        // User's phone number
    createdAt: Date;            // Date when the user was created
    sectorId: number;           // ID of the sector the user belongs to
    sector: IRole;              // Sector details
    roleId: number;             // ID of the role assigned to the user
    role: IRole;                // Role details
}

// Represents a role in the system
export interface IRole {
    id: number;                // Unique identifier for the role
    name: string;              // Name of the role
    users: any[];              // Array of users associated with this role
}

// Represents a request to patch/update user details
export interface IPatchUserRequest {
    email?: string;           // Updated email address (optional)
    phoneNumber?: string;     // Updated phone number (optional)
}
