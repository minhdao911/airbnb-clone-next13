import { Nunito } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/client-only";
import AuthModal from "./components/modals/auth-modal";
import Navbar from "./components/navbar";

import "./globals.css";
import ToasterProvider from "./providers/toaster-provider";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone app",
};

const font = Nunito({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <AuthModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
