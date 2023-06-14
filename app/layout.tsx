import { Nunito } from "next/font/google";

import { Navbar } from "./components/navbar/Navbar";
import { ToasterProvider } from "./providers/ToasterProvider";
import { RegisterModal } from "./components/modals/RegisterModal";

import "./globals.css";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/dbUser";
import { RentModal } from "./components/modals/RentModal";

export const metadata = {
  title: "Airbnb",
  description: "Generated by create next app",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        {/* <SearchModal />
          <RentModal /> */}
        <Navbar currentUser={currentUser} />

        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
