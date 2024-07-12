import '@radix-ui/themes/styles.css';

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Theme, ThemePanel } from "@radix-ui/themes";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Bug Manager",
  description: "Created by...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
      <Theme accentColor="crimson" radius="large">
          <NavBar />
          <main className="p-10">{children}</main>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
