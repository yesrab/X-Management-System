import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/Theme/theme-provider";

import "@/app/globals.css";
import { Header } from "@/components/landing/header";
import FooterLanding from "@/components/landing/footer-landing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X Management System | Schools, Colleges & Universities",
  description: "Unified management platform for educational institutions—students, courses, faculty, and administration in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <Header />
          {children}
          <FooterLanding />
        </ThemeProvider>
      </body>
    </html>
  );
}
