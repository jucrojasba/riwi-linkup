import React from 'react'; // Importing React library
import './textArea.css'; // Importing CSS file for styling

// Interface defining the props for the TextArea component
interface ITextAreaProps {
    value: string; // The current value of the textarea
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Function to handle changes to the textarea
    name: string; // The name attribute for the textarea
    placeholder?: string; // Optional placeholder text for the textarea
}

// Functional component for the TextArea
export default function TextArea({ value, onChange, name, placeholder }: ITextAreaProps): React.ReactNode {
    return (
        <textarea
            name={name} // Setting the name attribute
            id={name} // Setting the id attribute for accessibility
            onChange={onChange} // Setting the change event handler
            placeholder={placeholder} // Setting the placeholder text if provided
            value={value} // Setting the current value of the textarea
            className="custom-textarea" // Applying custom CSS class for styling
        />
    );
}
