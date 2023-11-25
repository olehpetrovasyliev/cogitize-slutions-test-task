import { Inter } from "next/font/google";
import "./globals.scss";
import styles from "./header.module.scss";
import NavBar from "./navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({
  src: [
    {
      path: "../../public/fonts/TTSmall-Thin.ttf",
      weight: 300,
    },
    {
      path: "../../public/fonts/TTSmall-Regular.ttf",
      weight: 400,
    },
    {
      path: "../../public/fonts/TTSmall-Medium.ttf",
      weight: 500,
    },
    {
      path: "../../public/fonts/TTSmall-Semibold.ttf",
      weight: 600,
    },
    {
      path: "../../public/fonts/TTSmall-Bold.ttf",
      weight: 700,
    },
    {
      path: "../../public/fonts/TTSmall-ExtraBold.ttf",
      weight: 800,
    },
  ],
});

export const metadata = {
  title: "Test task",
  description: "Test task for Cogitize Solutions",
  icon: "../../public/vector/vercel.svg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <header className={styles.header}>
          <NavBar />
        </header>
        <main>
          {children}

          <ToastContainer autoClose={2000} />
        </main>
      </body>
    </html>
  );
}
