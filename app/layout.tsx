import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ApiContextProvider } from "@/Context/ApiContext";

import Navbar from "@/components/Navbar";
import { ProfileContextProvider } from "@/Context/ProfileContext";

// Initialize the Outfit font with specified options
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body>
        <ProfileContextProvider>
                 <ApiContextProvider>
        <Navbar/>
          {children}

        </ApiContextProvider>
     </ProfileContextProvider>

      </body>
    </html>
  );
}
