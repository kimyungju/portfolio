import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Syne } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kim Yungju | Software Engineer",
  description:
    "Personal portfolio of Kim Yungju — CS student at NUS, building AI-powered full-stack applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${syne.variable} ${dmSans.variable} ${geistMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
