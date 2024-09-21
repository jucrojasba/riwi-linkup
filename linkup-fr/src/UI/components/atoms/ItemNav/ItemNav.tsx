import Link from "next/link";
import React from "react";
import "./itemNavStyles.css";

interface IItemNavProps {
  icon: React.ComponentType;
  href: string;
  name: string;
  openSidebar?: boolean;
  onClick?: () => void;
}

export default function ItemNav({
  icon: Icon,
  href,
  name,
  openSidebar,
  onClick
}: IItemNavProps): React.ReactNode {
  return (
    <li className="nav-list-item" onClick={onClick}>
      <Link
        className="list-item-link"
        href={href}
        style={{ color: "var(--white-color)", textDecoration: "none", display: "flex", alignItems: "center" }}
      >
        <Icon />
        {!openSidebar && name}
      </Link>
    </li>
  );
}

