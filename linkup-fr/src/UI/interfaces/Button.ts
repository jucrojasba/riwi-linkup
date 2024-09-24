import { ReactElement } from "react";

// ButtonProps interface defines the props for a standard button component
export interface ButtonProps {
  // Optional icon to display alongside the button text
  icon?: ReactElement;
  
  // Specifies the type of the button (default is 'button')
  type?: 'button' | 'submit' | 'reset';
  
  // Optional text or React element to display on the button
  text?: string | ReactElement;
  
  // Function to handle click events on the button
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  
  // Optional CSS class name for additional styling
  className?: string;
}

// IconButtonProps interface defines the props for an icon button component
export interface IconButtonProps {
  // Specifies the type of icon to use ('google' or 'github')
  icon: 'google' | 'github';
  
  // Optional color for the icon
  iconColor?: string;
  
  // Optional background color for the button
  backgroundColor?: string;
  
  // Function to handle click events on the icon button
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  
  // Optional CSS class name for additional styling
  className?: string;
}
