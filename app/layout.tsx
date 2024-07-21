import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Container, Theme, ThemePanel } from "@radix-ui/themes";
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
          <Container>
            <main className="p-5 md:p-10">{children}</main>
          </Container>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
