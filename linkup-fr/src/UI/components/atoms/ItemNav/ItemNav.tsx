import Link from "next/link"; // Importing Link from Next.js for client-side navigation
import React from "react"; // Importing React to use JSX
import "./itemNavStyles.css"; // Importing CSS styles for the component

// Interface defining the expected props for the ItemNav component
interface IItemNavProps {
  icon: React.ComponentType; // The icon component to display
  href: string; // URL to navigate to
  name: string; // Name of the navigation item
  openSidebar?: boolean; // Optional prop to control sidebar visibility
  onClick?: () => void; // Optional click handler for the list item
}

// Functional component for rendering a navigation item
export default function ItemNav({
  icon: Icon, // Destructuring the icon prop and renaming it for clarity
  href,
  name,
  openSidebar,
  onClick
}: IItemNavProps): React.ReactNode {
  return (
    <li className="nav-list-item" onClick={onClick}> {/* List item with an optional onClick handler */}
      <Link
        className="list-item-link" // Class for styling the link
        href={href} // URL for navigation
        style={{ color: "var(--white-color)", textDecoration: "none", display: "flex", alignItems: "center" }} // Inline styles
      >
        <Icon /> {/* Rendering the icon component */}
        {!openSidebar && name} {/* Conditionally rendering the name based on sidebar state */}
      </Link>
    </li>
  );
}
