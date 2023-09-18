import { Nunito } from "next/font/google";

import { Navbar } from "./components/navbar/Navbar";
import { ToasterProvider } from "./providers/ToasterProvider";
import { RegisterModal } from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import { RentModal } from "./components/modals/RentModal";
import { SearchModal } from "./components/modals/SearchModal";

import getCurrentUser from "./actions/dbUser";

import "./globals.css";

export const metadata = {
  metadataBase: new URL('https://glistening-tulumba-d9f060.netlify.app'),
  title: "Airbnb",
  description: "Informacion sobre viajes",
  openGraph: {
    title: 'Airbnb',
    description: 'Viajes y hoteles a todo destino disponibles a cualquier precio',
    image: ['https://res.cloudinary.com/dwx09pwkr/image/upload/v1694786760/Airbnb/dw60oorhyozfer4dsfph.webp']
  },
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
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        <RentModal />
        <Navbar currentUser={currentUser} />

        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
