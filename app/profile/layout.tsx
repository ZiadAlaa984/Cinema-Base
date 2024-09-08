import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ApiContextProvider } from "@/Context/ApiContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ProfileContextProvider } from "@/Context/ProfileContext";
import React from "react";
import Heading from "../../components/Heading";
import ContainerWidth from "../../components/ContainerWidth";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Importing Link from next/link

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.className}>
      <head>
        <title>WithList</title>
      </head>
      <body>
        <Navbar />
        <div className="pt-20">
          <ContainerWidth>
            <Heading text="WithList" />
            <div className="flex gap-6 items-center mb-4">
              <Link href="/profile/fav_movie" passHref>
                <Button className="md:text-xl text-md text-black bg-white hover:bg-white">
                  Movies
                </Button>
              </Link>
              <Link href="/profile/fav_series" passHref>
                <Button className="md:text-xl text-md text-black bg-white hover:bg-white">
                  Series
                </Button>
              </Link>
            </div>
            {children}
          </ContainerWidth>
        </div>

        <Footer />
      </body>
    </html>
  );
}
