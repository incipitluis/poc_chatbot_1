import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from '../components/nav';
import Footer from '../components/footer';
import { ThemeProvider } from "@/components/theme-provider";
import {
  ClerkProvider,
} from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ink Spot - Tattoo Studio",
  description: "Discover your perfect tattoo artist at Ink Spot. Let our AI find your ideal match.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <Nav />
        {children}
        <Footer />
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}