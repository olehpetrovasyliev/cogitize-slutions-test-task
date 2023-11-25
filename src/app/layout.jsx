import localFont from "next/font/local";
import "./globals.scss";
import styles from "./header.module.scss";
import NavBar from "./navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const font = localFont({
  src: [
    {
      path: "../../public/fonts/TTSmalls-Thin.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/TTSmalls-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/TTSmalls-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/TTSmalls-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../../public/fonts/TTSmalls-Bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/TTSmalls-ExtraBold.ttf",
      weight: "800",
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
      <body className={font.className}>
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
