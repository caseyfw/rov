import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ROV UI",
  description: "Cellular ROV control interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <Script
          src="https://cdn.socket.io/4.7.5/socket.io.min.js"
          integrity="sha384-2huaZvOR9iDzHqslqwpR87isEmrfxqyWOF7hr7BY6KG0+hVKLoEXMPUJw3ynWuhO"
          crossOrigin="anonymous"
        /> */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
