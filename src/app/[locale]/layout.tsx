import {ReactNode} from "react";
import {Toaster} from "@/components/ui/toaster";
import {getMessages} from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";


export default async function RootLayout({children, params: {locale}}: { children: ReactNode; params: {locale: string}; }) {
  const messages = await getMessages();

  return (
    <div style={{direction: locale === "ar" ? "rtl" : "ltr"}}>
    <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    <Toaster />
    </div>
  );
}
