import {ReactNode} from "react";

export default async function RootLayout({children, params: {locale}}: { children: ReactNode; params: {locale: string}; }) {
  return (
    <>
     <div style={{direction: locale === "ar" ? "rtl" : "ltr"}}>
       {children}
     </div>
    </>
  );
}
