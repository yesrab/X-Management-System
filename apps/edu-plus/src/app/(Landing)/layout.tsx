import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/Theme/theme-provider";

import "@/app/globals.css";
import { Header } from "@/components/landing/header";
import FooterLanding from "@/components/landing/footer-landing";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X Management System | Schools, Colleges & Universities",
  description:
    "Unified management platform for educational institutions—students, courses, faculty, and administration in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning className='scroll-smooth'>
      <body className={`${jetbrainsMono.variable} antialiased`}>
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
