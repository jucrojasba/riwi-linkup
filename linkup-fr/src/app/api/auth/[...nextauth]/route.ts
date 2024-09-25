import NextAuth from "next-auth/next"; // Importing the NextAuth library to handle authentication.
import GithubProvider from "next-auth/providers/github"; // Importing the GitHub authentication provider.
import GoogleProvider from "next-auth/providers/google"; // Importing the Google authentication provider.

// Configuring the NextAuth authentication handler.
const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        // Setting up the Google authentication provider with client ID and secret from environment variables.
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string, // Client ID for Google.
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, // Client Secret for Google.
        }),
        // Setting up the GitHub authentication provider with client ID and secret from environment variables.
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string, // Client ID for GitHub.
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, // Client Secret for GitHub.
        })
    ],
    // Customizing the sign-out page to redirect users to the login page.
    pages: {
        signOut: "/login"
    }
});

// Exporting the handler for both GET and POST requests.
export { handler as GET, handler as POST };
