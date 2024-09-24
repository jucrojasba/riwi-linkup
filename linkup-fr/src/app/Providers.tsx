"use client";

// Import the SessionProvider from next-auth/react to handle session management
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

// This component provides session context to its children
export default function Providers({ children,session }: { children: React.ReactNode; session: Session | null }) {
    return (
        // Using SessionProvider to wrap children so they can access session info
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}
