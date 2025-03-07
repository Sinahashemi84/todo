"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import store from "./redux/store";
import { Provider } from "react-redux";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased lg:p-10 p-2 `}
      >
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
