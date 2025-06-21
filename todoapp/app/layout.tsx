import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./clientcomponent/nav/Navbar";
import LoginModal from "./clientcomponent/modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import RegisterModal from "./clientcomponent/modals/RegisterModal";
import getCurrentUser from "./actions/getCurrentUser";
import NoteModal from "./clientcomponent/modals/NoteModal";
import getUsers from "./actions/getUsers";
import NoteList from "./clientcomponent/todos/NoteList";

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
  const userList = await getUsers();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <ToasterProvider />
        <NoteModal userList={userList || []} />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <NoteList currentUser={currentUser}/>
        <div>{children}</div>
      </body>
    </html>
  );
}
