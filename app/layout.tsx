import type { Metadata } from "next";
import React from "react";
import {Inter, Inconsolata} from "next/font/google";
import Header from "@/component/Header/Header";
import "./globals.css";


// google font
const inter = Inter({ subsets: ["latin"] });
const inconsolata = Inconsolata({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: 'swap',
});

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
    <body className={`${inter.className} ${inconsolata.className}`}>
      <div id={'portal'}/>
      <Header/>
      {children}
    </body>
    </html>
  );
}
