export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}