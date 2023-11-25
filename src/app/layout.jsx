import { Inter } from "next/font/google";
import "./globals.scss";
import styles from "./header.module.scss";
import NavBar from "./navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

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
