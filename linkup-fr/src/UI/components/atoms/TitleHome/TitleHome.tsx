import "./TitleHome.css"; // Importing CSS for styling

// Defining the interface for the component props
interface ITitleHomeProps {
  title: string; // Required title prop
  subtitle?: string; // Optional subtitle prop
  isDarkMode: boolean; // Prop to determine if dark mode is active
}

// Functional component definition
export default function TitleHome({
  title,
  subtitle,
  isDarkMode,
}: ITitleHomeProps): React.ReactNode {
  return (
    <div className="title-container"> {/* Container for the title and subtitle */}
      <h1 className={`${isDarkMode ? 'title-home-dark-mode' : 'title-home'}`}> {/* Conditional class for title */}
        {title} {/* Displaying the title */}
      </h1>
      <h3 className={`${isDarkMode ? 'home-subtitle-dark-mode' : 'home-subtitle'}`}> {/* Conditional class for subtitle */}
        {subtitle} {/* Displaying the subtitle */}
      </h3>
    </div>
  );
}
