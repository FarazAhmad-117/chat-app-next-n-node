import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SocketProvider } from "../context/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scalable Chat App",
  description: "Created by Faraz Ahmad",
};

export default function RootLayout({children}:Readonly<{children: React.ReactNode;}>){
  return (
    <html lang="en">
      <SocketProvider>
        <body className={inter.className}>{children}</body>
      </SocketProvider>
    </html>
  );
}
