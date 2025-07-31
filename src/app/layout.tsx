import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
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
  title: "30 Days of GSAP",
  description: "30 Days of GSAP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="no-scrollbar scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-dvh`}
      >
        <SmoothScrollWrapper>{children}</SmoothScrollWrapper>
      </body>
    </html>
  );
}
