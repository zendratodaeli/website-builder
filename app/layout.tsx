import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/header";
import { Toaster } from "@/components/ui/sonner";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Website Builder",
  description: "Build your own Website without coding",
};

const quicksand = Quicksand({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body
        className={`${quicksand.className} antialiased`}
        >
        <Header/>
        {children}
        <Toaster richColors closeButton position="top-center"/>
      </body>
    </html>
        </ClerkProvider>
  );
}
