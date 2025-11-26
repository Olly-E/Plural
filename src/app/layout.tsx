import { Geist, Geist_Mono } from "next/font/google";
import "react-phone-number-input/style.css";
import type { Metadata } from "next";
import "./react-date-picker.css";
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
  title: "Plural Health",
  description: "Building better healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="">{children}</div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
