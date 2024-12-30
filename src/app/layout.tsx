import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
})
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
})

export const metadata: Metadata = {
    title: "Brikool",
    description: "Local freelancer platform",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
    const messages = await getMessages();
    return (
        <html lang="en" className="!scroll-smooth">
        <head>
            <link rel="icon" type="image/png" href="/assets/images/favicon/favicon-48x48.png" sizes="48x48" />
            <link rel="icon" type="image/svg+xml" href="/assets/images/favicon/favicon.svg" />
            <link rel="shortcut icon" href="/assets/images/favicon/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-touch-icon.png" />
            <meta name="apple-mobile-web-app-title" content="Brikool" />
            <link rel="manifest" href="/assets/images/favicon/site.webmanifest" />
            <title>Brikool</title>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        <div suppressHydrationWarning>
        <SessionProvider>
            <ThemeProvider attribute={"class"}>
                 <NextIntlClientProvider messages={messages}>
                    {children}
                 </NextIntlClientProvider>
            </ThemeProvider>
            <Toaster />
        </SessionProvider></div>
        </body>
        </html>
    );
}