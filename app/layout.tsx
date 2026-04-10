import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/header/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

// FONT PRIMARY
export const alfathan = localFont({
  src: [
    {
      path: "./fonts/GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
});

// FONT SECONDARY
export const fontNeue = localFont({
  src: [
    {
      path: "./fonts/BebasNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-Neue",
});

// METADATA
export const metadata: Metadata = {
  title: "Saint Hotel",
  description: "Website Booking Room",
};

// ROOT LAYOUT
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  return (
    <html lang="en" className="font-alfathan">
      <body
        className={`${alfathan.className} ${fontNeue.variable} antialiased`}
      >
        <SessionProvider session={session}>
          <main className="min-h-screen bg-gray-50">
            <Navbar />
            {children}
          </main>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
