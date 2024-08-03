import type { Metadata } from "next";
import React from "react";
import {Hahmlet, Inter} from "next/font/google";
import Header from "@/component/Header/Header";
import "./globals.css";


// google font
const inter = Inter({ subsets: ["latin"] });
const hahmlet = Hahmlet({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Typing Lab",
  description: "Typing Lab | Landing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={'dark'}>
      <body className={`${hahmlet.className} ${inter.className}`}>
        <div id={'portal'} />
        <Header />
        {children}
      </body>
    </html>
  );
}
