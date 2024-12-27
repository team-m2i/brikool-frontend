import {ReactNode} from "react";
import {Toaster} from "@/components/ui/toaster";
import {setRequestLocale} from "next-intl/server";

export default async function RootLayout({children, params: {locale}}: { children: ReactNode; params: {locale: string}; }) {
  setRequestLocale(locale);
  return (
    <div style={{direction: locale === "ar" ? "rtl" : "ltr"}}>
    {children}
    <Toaster />
    </div>
  );
}
