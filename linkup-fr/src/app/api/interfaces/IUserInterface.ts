// Interface representing the structure for user registration data
export interface IUserRegister {
    name: string;      // User's name
    email: string;     // User's email address
    password: string;  // User's password
    phone: string;     // User's phone number
    sector: number;    // ID of the sector the user belongs to
}

// Interface representing the structure for user login data
export interface IUserLogin {
    email: string;     // User's email address
    password: string;  // User's password
}

// Interface representing the structure for user data returned from the backend
export interface IUserBack {
    roleId: number;    // ID of the user's role
    email: string;      // User's email address
    token: string;      // Authentication token for the user
    name: string;       // User's name
}

// Interface representing a user entity in the system
export interface IUser {
    id:           number;        // Unique identifier for the user
    name:         string;        // User's name
    email:        string;        // User's email address
    isConfirmed:  boolean;       // Indicates if the user's email is confirmed
    passwordHash: string;        // Hashed password for the user
    passwordSalt: string;        // Salt used for hashing the password
    phoneNumber:  string;        // User's phone number
    createdAt:    Date;          // Date when the user was created
    sectorId:     number;        // ID of the sector the user belongs to
    sector:       IRole;         // Sector information associated with the user
    roleId:       number;        // ID of the user's role
    role:         IRole;         // Role information associated with the user
}

// Interface representing a role entity in the system
export interface IRole {
    id:    number;      // Unique identifier for the role
    name:  string;      // Name of the role (e.g., Admin, User)
    users: any[];       // Array of users associated with this role
}

// Interface representing optional fields for updating user data in the backend
export interface IPatchUserBack {
    email?: string;      // Optional new email address for the user
    phoneNumber?: string; // Optional new phone number for the user
}
