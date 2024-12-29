import {ReactNode} from "react";
import {Toaster} from "@/components/ui/toaster";
import {getMessages} from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import {setRequestLocale} from "next-intl/server";


  const messages = await getMessages();


export default async function RootLayout({children, params: {locale}}: { children: ReactNode; params: {locale: string}; }) {
  setRequestLocale(locale);
  return (
    <div style={{direction: locale === "ar" ? "rtl" : "ltr"}}>
    <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    <Toaster />
    </div>
  );
}
