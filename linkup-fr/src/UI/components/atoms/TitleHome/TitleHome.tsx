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
      <h1 className={`${isDarkMode ? 'title-home-dark-mode' : 'title-home'}`}>
        {title}
      </h1>
      <h3 className={`${isDarkMode ? 'home-subtitle-dark-mode' : 'home-subtitle'}`}>
        {subtitle}
      </h3>
    </div>
  );
}
