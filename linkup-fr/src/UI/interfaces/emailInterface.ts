// IEmail interface defines the structure for an email object
export interface IEmail {
    email: string;     // Primary email address
    emailLinkUp: string; // LinkUp email address (possibly a secondary or system email)
    subject?: string;     // Subject of the email (optional)
    text?: string;     // Body text of the email (optional)
}
