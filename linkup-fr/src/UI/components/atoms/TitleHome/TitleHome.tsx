import "./TitleHome.css";

interface ITitleHomeProps {
  title: string;
  subtitle?: string;
}

export default function TitleHome({
  title,
  subtitle,
}: ITitleHomeProps): React.ReactNode {
  return (
    <div className="title-container">
      <h1 className="title-home">{title}</h1>
      <h3 className="home-subtitle">{subtitle}</h3>
    </div>
  );
}
