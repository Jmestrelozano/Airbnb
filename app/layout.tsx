import { Nunito } from "next/font/google";
import { Suspense } from "react";

import { Navbar } from "@/features/navigation/components/Navbar";
import { ToasterProvider } from "@/shared/providers/ToasterProvider";
import { RegisterModal } from "@/features/auth/components/RegisterModal";
import LoginModal from "@/features/auth/components/LoginModal";
import { RentModal } from "@/features/listings/components/RentModal";
import { SearchModal } from "@/features/search/components/SearchModal";

import getCurrentUser from "@/features/auth/actions/dbUser";

import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://glistening-tulumba-d9f060.netlify.app"),
  title: "Airbnb",
  description: "Informacion sobre viajes",
  openGraph: {
    title: "Airbnb",
    description:
      "Viajes y hoteles a todo destino disponibles a cualquier precio",
    images: [
      "https://res.cloudinary.com/dwx09pwkr/image/upload/v1694786760/Airbnb/dw60oorhyozfer4dsfph.webp",
    ],
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
        <Suspense fallback={null}>
          <SearchModal />
        </Suspense>
        <RentModal />
        <Navbar currentUser={currentUser} />

        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
