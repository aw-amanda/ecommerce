import type { Metadata } from "next";
import { Geist, Mr_De_Haviland } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/navbar";
import { Footer } from "@/components/footer";
import LenisProvider from "@/components/lenis-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true
});

const havilandCursive = Mr_De_Haviland({
  variable: "--font-haviland-cursive",
  style: "normal",
  weight: "400",
  preload: true
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Macaron Patisserie",
  description: "Local dessert bakery specializing in authentic french macarons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${havilandCursive.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-gray-900">
        <Navbar />
        <LenisProvider>
          <main className="grow pt-32">
            {children}
          </main>
        </LenisProvider>
        <Footer />
      </body>
    </html>
  );
}
