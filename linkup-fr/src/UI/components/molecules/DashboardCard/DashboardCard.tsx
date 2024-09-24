'use client'; // Indicate that this component is intended for client-side rendering

import React, { ReactElement } from "react"; // Importing React and ReactElement type
import './DashboardCard.css'; // Importing CSS styles for the dashboard card

// Define the interface for the props accepted by the DashboardCard component
interface IDashboardCardProps {
    icon: ReactElement; // React element representing the icon
    title: string; // Title of the dashboard card
    number: number; // Number to display in the dashboard card
    color: string; // Background color for the card
}

// Functional component definition with TypeScript props
const DashboardCard: React.FC<IDashboardCardProps> = ({ icon, title, number, color }) => {
    return (
        <div className="dashboard-card" style={{ backgroundColor: color }}> {/* Set background color */}
            <div className="icon-title-container"> {/* Container for icon and title */}
                <div className="dashboard-card-icon">
                    {React.cloneElement(icon, { fontSize: "large" })} {/* Clone the icon with modified props */}
                </div>
                <p className="dashboard-card-title">{title}</p> {/* Title of the card */}
            </div>
            <h2 className="dashboard-card-number">{number}</h2> {/* Display the number */}
        </div>
    );
};

// Export the DashboardCard component for use in other parts of the application
export default DashboardCard;
