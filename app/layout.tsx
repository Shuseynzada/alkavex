import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Alkavex — Steel Trading by Alkagesta Group",
  description:
    "Alkavex is the dedicated steel-trading arm of Alkagesta Group, powering reliable and risk-controlled steel flows into fast-growing markets across West and East Africa.",
  keywords: [
    "steel trading",
    "logistics",
    "trade financing",
    "Africa",
    "Alkagesta",
    "Alkavex",
  ],
  icons: {
    icon: "/Logo_square.png",
    apple: "/Logo_square.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
