import React from "react";
import type { Metadata } from "next";
import { Roboto, Rubik, Roboto_Flex } from "next/font/google";
import "./globals.scss";
import { Header } from "@/components/header/Header/Header";
import { Footer } from "@/components/footer/Footer/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";
import { CookieBanner } from "@/components/ui/CookieBanner/CookieBanner";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin", "cyrillic"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "IET Shop",
  description: "Get your right course",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body
        className={`${roboto.variable} ${robotoFlex.variable} ${rubik.variable} antialiased text-gray-900 bg-gray-50`}
      >
        <LanguageProvider initialLang={lang as "en" | "bg"}>
          {children}
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
