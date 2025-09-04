import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "A simple Pokedex application with Next.js",
  icons: {
    icon: [
      { url: '/pokeball.svg' },
      { url: '/pokeball.svg', sizes: '32x32', type: 'image/svg' }
    ],
    shortcut: ['/pokeball.svg'],
    apple: [
      { url: '/pokeball.svg' },
      { url: '/pokeball.svg', sizes: '180x180', type: 'image/svg' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
