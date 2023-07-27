import { Nunito } from "next/font/google";
import ClientOnly from "./components/client-only";
import AuthModal from "./components/modals/auth-modal";

import "./globals.css";
import ToasterProvider from "./providers/toaster-provider";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone app",
};

const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <AuthModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
