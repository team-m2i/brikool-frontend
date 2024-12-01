import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import {ReactNode} from "react";
import {getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";
import { ThemeProvider } from "next-themes";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Brikool",
  description: "Local freelance platform",
};

export default async function RootLayout({children, params: {locale}}: { children: ReactNode; params: {locale: string}; }) {

  const messages = await getMessages();
  return (
    <html lang="en" className="!scroll-smooth">
    <head>
      <link rel="icon" type="image/png" href="/assets/images/favicon/favicon-48x48.png" sizes="48x48"/>
      <link rel="icon" type="image/svg+xml" href="/assets/images/favicon/favicon.svg"/>
      <link rel="shortcut icon" href="/assets/images/favicon/favicon.ico"/>
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-touch-icon.png"/>
      <meta name="apple-mobile-web-app-title" content="Brikool"/>
      <link rel="manifest" href="/assets/images/favicon/site.webmanifest"/>
      <title>Brikool</title>
    </head>
    <body
        style={{direction: locale === "ar" ? "rtl" : "ltr"}}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} 
    >
    <ThemeProvider attribute={"class"}
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>

    </body>
    </html>
  );
}
