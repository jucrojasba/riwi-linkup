import "./buttonCoderStyles.css"; // Importing CSS styles for the button

// Defining the interface for the props that the ButtonCoder component will receive
interface IButtonCoderProps {
    content: string | React.ReactElement; // Content of the button, can be a string or a React element
    onClick: () => void; // Function to call when the button is clicked
    className?: string; // Optional class name for custom styling
}

// Creating the ButtonCoder component
export default function ButtonCoder({ content, onClick, className }: IButtonCoderProps): React.ReactNode {
    return (
        <button 
            onClick={onClick} // Setting the click event handler
            className={className || "button-coder"} // Applying the provided class name or a default class name
        >
            {content}
        </button>
    );
}
