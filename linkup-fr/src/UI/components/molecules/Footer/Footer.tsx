import "./footerStyles.css";
import Link from "next/link";
export default function Footer(): React.ReactNode {
  return (
    <footer className="footer">
      <Link href="#" className="link">
        Riwi
      </Link>
      <Link href="#" className="link">
        Terms
      </Link>
      <Link href="#" className="link">
        Privacy
      </Link>
      <Link href="#" className="link">
        Docs
      </Link>
    </footer>
  );
}
