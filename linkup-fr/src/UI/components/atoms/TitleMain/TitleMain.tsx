import "./titleMainStyles.css"; // Importing CSS for styling

// Defining the interface for the component props
interface ITitleMainProps {
  className: string; // Required className prop for custom styling
  title: string; // Required title prop
  subtitle?: string; // Optional subtitle prop
}

// Functional component definition
export default function TitleMain({
  className,
  title,
  subtitle,
}: ITitleMainProps): React.ReactNode {
  return (
    <div className={className}> {/* Applying the provided className */}
      <h2 className="title-main">{title}</h2> {/* Title heading */}
      <h4 className="main-subtitle">{subtitle}</h4> {/* Subtitle heading */}
    </div>
  );
}
