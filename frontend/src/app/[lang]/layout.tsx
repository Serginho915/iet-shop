import React from "react";
import type { Metadata } from "next";
import { Roboto, Rubik, Roboto_Flex } from "next/font/google";
import Script from "next/script";
import "./globals.scss";
import { Header } from "@/components/header/Header/Header";
import { Footer } from "@/components/footer/Footer/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";
import { CourseProvider } from "@/lib/CourseContext";
import { BlogProvider } from "@/lib/BlogContext";
import { CookieBanner } from "@/components/ui/CookieBanner/CookieBanner";
import { i18n } from "@/i18n-config";

const PassThroughProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SafeLanguageProvider = LanguageProvider ?? PassThroughProvider;
const SafeBlogProvider = BlogProvider ?? PassThroughProvider;
const SafeCourseProvider = CourseProvider ?? PassThroughProvider;
const SafeCookieBanner = CookieBanner ?? (() => null);

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

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
  title: "ИОТ",
  description: "Get your right course",
  icons: {
    icon: "/favicon.ico",
  },
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TPK2B89YT8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied'
            });

            gtag('config', 'G-TPK2B89YT8');
          `}
        </Script>
        <SafeLanguageProvider initialLang={lang as "en" | "bg"}>
          <SafeBlogProvider>
            <SafeCourseProvider>
              {children}
              <SafeCookieBanner />
            </SafeCourseProvider>
          </SafeBlogProvider>
        </SafeLanguageProvider>
      </body>
    </html>
  );
}
