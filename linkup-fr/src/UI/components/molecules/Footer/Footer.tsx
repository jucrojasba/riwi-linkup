import { useExpand } from "@/global-states/expandSideBar";
import "./footerStyles.css";
import Link from "next/link";
import { useState, useEffect } from "react";

interface IFooter {
  isDarkMode: boolean | undefined;
}

export default function Footer({ isDarkMode }: IFooter): React.ReactNode {
  const expand = useExpand((state) => state.expand);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const breakpointMd = 794; // Define el valor del breakpoint en píxeles
    const handleResize = () => setShouldRender(window.innerWidth >= breakpointMd);

    handleResize(); // Verifica el tamaño actual al iniciar

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!shouldRender) return null;

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
