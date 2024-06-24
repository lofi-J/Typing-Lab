import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import Header from "@/component/Header";
import "../globals.css";


// google font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lofi Typing",
  description: "Lofi Typing | Chill",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme={'dark'}>
      <body className={`${inter.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
