"use client";
import { Inter } from "next/font/google";
import "./globals.scss";
import Link from "next/link";
import styles from "./header.module.scss";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const navLinks = [
  { href: "/hierarchy", text: "Иерархия" },
  { href: "/positions", text: "Должности" },
  { href: "/staffList", text: "Список персонала" },
  { href: "/equipmentSets", text: "Наборы экипировки" },
];

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const navigationLinks = navLinks.map((link, index) => {
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
  return (
    <html lang="ru">
      <body className={inter.className}>
        <header className={styles.header}>{navigationLinks}</header>
        {children}
      </body>
    </html>
  );
}
