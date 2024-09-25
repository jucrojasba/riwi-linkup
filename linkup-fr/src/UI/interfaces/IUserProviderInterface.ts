// Represents a user provider in the system
export interface IUserProvider {
    name: string;   // Name of the user provider
    email: string;  // Email address of the user provider
    image: string;  // URL of the user provider's image
    token: string;  // Authentication token for the user provider
}
