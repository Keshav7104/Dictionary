// "use client";
import { UserProvider } from "@/components/Context";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/component/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: 'Dictionary',
  description: 'Find it or miss it',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.variable}>
        <UserProvider>
          <Navbar />
          <ToastContainer
            theme={"dark"}
            position={"top-right"}
            autoClose={5000}
            closeOnClick={true}
            closeButton={true}
            draggable={true}
          />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
