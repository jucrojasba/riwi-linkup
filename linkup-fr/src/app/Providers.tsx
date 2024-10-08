"use client";

// Import the SessionProvider from next-auth/react to handle session management
import { SessionProvider } from "next-auth/react";

// This component provides session context to its children
export default function Providers({ children}: { children: React.ReactNode}) {
    return (
        // Using SessionProvider to wrap children so they can access session info
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}
