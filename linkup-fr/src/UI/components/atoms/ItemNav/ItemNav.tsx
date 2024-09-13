import Link from "next/link";
import React from "react";
import "./itemNavStyles.css";

interface IItemNavProps {
  //
  icon: React.ComponentType;
  href: string;
  name: string;
  openSidebar?: boolean;
}

export default function ItemNav({
  icon: Icon,
  href,
  name,
  openSidebar,
}: IItemNavProps): React.ReactNode {
  return (
    <li className="nav-list-item">
      <Icon />
      <Link
        className="list-item-link"
        href={href}
        style={{ color: "var(--white-color)", textDecoration: "none" }}
      >
        {name}
      </Link>
    </li>
  );
}
