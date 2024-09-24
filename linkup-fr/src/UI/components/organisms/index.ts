/**
 * Component exports for better modularity and maintainability.
 */

import AuthLayout from "./AuthLayout/AuthLayout"; // Layout for authentication pages
import DashboardLayout from "./DashboardLayout/DashboardLayout"; // Main layout for dashboard
import SectionCoders from "./SectionCoders/SectionCoders"; // Section for managing coders
import DashboardCardsContainer from "./DashboardCardsContainer/DashboardCardsContainer"; // Container for dashboard cards
import SectionCoderOnly from "./sectionCoderOnly/sectionCoderOnly"; // Detail view for a single coder
import { Modal } from "./Modal/Modal"; // Reusable modal component

export {
    AuthLayout,
    DashboardLayout,
    SectionCoders,
    DashboardCardsContainer,
    SectionCoderOnly,
    Modal
};
