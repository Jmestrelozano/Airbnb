import { Nunito } from "next/font/google";

import { Navbar } from "./components/navbar/Navbar";
import { ToasterProvider } from "./providers/ToasterProvider";
import { RegisterModal } from "./components/modals/RegisterModal";

import "./globals.css";

export const metadata = {
  title: "Airbnb",
  description: "Generated by create next app",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}