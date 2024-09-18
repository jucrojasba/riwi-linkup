import "./inputFilterStyles.css";
import { useState } from "react";
interface InputFilterProps {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  className?: string;
}

export default function InputFilter({
  label,
  name,
  onChange,
  checked,
  className
}: InputFilterProps): React.ReactNode {
  return (
    <div>
      <label
        htmlFor={name}
        className={checked ? "checked-filter" : "unchecked"}
      >
        {label}
        <input
          type="checkbox"
          checked={checked}
          id={name}
          name={name}
          onChange={onChange}
          className={className}
        />
      </label>
    </div>
  );
}
