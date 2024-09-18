import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
        GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
    ]
})

export {handler as GET, handler as POST}