/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { Nunito } from "next/font/google";
import ClientOnly from "./components/client-only";
import AuthModal from "./components/modals/auth-modal";

import "./globals.css";
import ToasterProvider from "./providers/toaster-provider";
import Script from "next/script";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone app",
};

const font = Nunito({ subsets: ["latin"] });
const source = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          type="text/javascript"
          src={source}
          strategy="beforeInteractive"
        />
      </head>
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
