import "./TitleHome.css";

interface ITitleHomeProps {
  title: string;
  subtitle?: string;
  isDarkMode: boolean;
}

export default function TitleHome({
  title,
  subtitle,
  isDarkMode,
}: ITitleHomeProps): React.ReactNode {
  return (
    <div className="title-container">
      <h1 className={`title-home ${isDarkMode ? 'dark-mode' : ''}`}>
        {title}
      </h1>
      <h3 className={`home-subtitle ${isDarkMode ? 'dark-mode' : ''}`}>
        {subtitle}
      </h3>
    </div>
  );
}
