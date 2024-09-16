import "./footerStyles.css";
import Link from "next/link";

interface IFooter {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: IFooter): React.ReactNode {
  return (
    <footer className={`footer`}>
      <Link href="#" className={`link ${isDarkMode ? 'dark-link' : ''}`}>
        Riwi
      </Link>
      <Link href="#" className={`link ${isDarkMode ? 'dark-link' : ''}`}>
        Terms
      </Link>
      <Link href="#" className={`link ${isDarkMode ? 'dark-link' : ''}`}>
        Privacy
      </Link>
      <Link href="#" className={`link ${isDarkMode ? 'dark-link' : ''}`}>
        Docs
      </Link>
    </footer>
  );
}
