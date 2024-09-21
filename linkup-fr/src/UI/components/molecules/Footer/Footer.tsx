import { useExpand } from "@/global-states/expandSideBar";
import "./footerStyles.css";
import Link from "next/link";

interface IFooter {
  isDarkMode: boolean | undefined;
}

export default function Footer({ isDarkMode }: IFooter): React.ReactNode {
  const expand = useExpand((state) => state.expand);
  
  return (
    <footer className={`${expand ? 'footer-colapsed' : 'footer'}`}>
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

