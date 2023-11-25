"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./header.module.scss";

const NavBar = () => {
  const navLinks = [
    { href: "/hierarchy", text: "Иерархия" },
    { href: "/positions", text: "Должности" },
    { href: "/staffList", text: "Список персонала" },
    { href: "/equipmentSets", text: "Наборы экипировки" },
  ];
  const pathname = usePathname();
  return navLinks.map((link, index) => {
    const isActive = pathname.startsWith(link.href);
    return (
      <Link
        key={index}
        href={link.href}
        className={
          isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
        }
      >
        {link.text}
      </Link>
    );
  });
};

export default NavBar;
