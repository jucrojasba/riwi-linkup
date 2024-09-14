'use client';

import React, { ReactElement } from "react";
import './DashboardCard.css'

interface IDashboardCardProps {
    icon: ReactElement,
    title: string,
    number: number,
    color: string,
}

const DashboardCard: React.FC<IDashboardCardProps> = ({ icon, title, number, color }) => {
    return (
        <div className="dashboard-card" style={{ backgroundColor: color }}>
            <div className="icon-title-container">
                <div className="dashboard-card-icon">
                {React.cloneElement(icon, { fontSize: "large" })}
                </div>
                <p className="dashboard-card-title">{title}</p>
            </div>
            <h2 className="dashboard-card-number">{number}</h2>
        </div>
    );
};

export default DashboardCard;
