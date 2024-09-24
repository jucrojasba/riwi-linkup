"use client"; // Indicates that this is a client component in Next.js

import RecoveryPasswordForm from "@/UI/components/molecules/RecoveryPassword/RecoveryPassword"; // Import the RecoveryPasswordForm component

// Define the RecoveryPassword functional component
export default function RecoveryPassword(): React.ReactNode {
    return (
        <main> {/* Main container for the recovery password view */}
            <div>
                <h1>Recovery Password</h1> {/* Title of the page */}
            </div>
            <RecoveryPasswordForm /> {/* Render the recovery password form component */}
        </main>
    );
}
