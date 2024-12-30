import {ReactNode} from "react";
import {Toaster} from "@/components/ui/toaster";
import {getMessages} from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import {setRequestLocale} from "next-intl/server";
import { ThemeProvider } from "next-themes";


export default async function RootLayout({children, params: {locale}}: { children: ReactNode; params: {locale: string}; }) {
  const messages = await getMessages();
    setRequestLocale(locale);


  return (
    <>
    {/* <div style={{direction: locale === "ar" ? "rtl" : "ltr"}}> */}
    <ThemeProvider attribute={"class"}>  
    <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ThemeProvider>
    <Toaster />
    {/* </div> */}
    </>
  );
}
