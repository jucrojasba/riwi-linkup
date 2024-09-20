import React from 'react';
import './textArea.css';

interface ITextAreaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name: string;
    placeholder?: string;
}

export default function TextArea({ value, onChange, name, placeholder }: ITextAreaProps): React.ReactNode {
    return (
        <textarea
            name={name}
            id={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            className="custom-textarea"
        />
    );
}
