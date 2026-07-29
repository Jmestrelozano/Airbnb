import { Nunito } from "next/font/google";
import { Suspense } from "react";

import { NavbarView } from "@/features/navigation/NavbarView";
import { ToasterProvider } from "@/shared/providers/ToasterProvider";
import { RegisterModalView } from "@/features/auth/RegisterModalView";
import { LoginModalView } from "@/features/auth/LoginModalView";
import { RentModalView } from "@/features/listings/RentModalView";
import { SearchModalView } from "@/features/search/SearchModalView";

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
    <html lang="es">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModalView />
        <RegisterModalView />
        <Suspense fallback={null}>
          <SearchModalView />
        </Suspense>
        <RentModalView />
        <NavbarView currentUser={currentUser} />

        <div className="pb-20 pt-48 md:pt-52">{children}</div>
      </body>
    </html>
  );
}
