import type { Metadata } from "next";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/header";
import { Toaster } from "@/components/ui/sonner";

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
    <html lang="en">
      <body
        className={`${quicksand.className} antialiased`}
      >
        <Header/>
        {children}
        <Toaster richColors closeButton position="top-center"/>
      </body>
    </html>
  );
}
