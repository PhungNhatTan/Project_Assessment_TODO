import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./clientcomponent/nav/Navbar";
import Modal from "./clientcomponent/modals/Modal";
import LoginModal from "./clientcomponent/modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import RegisterModal from "./clientcomponent/modals/RegisterModal";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./clientcomponent/ClientOnly";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TODO app",
  description: "TODO management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
