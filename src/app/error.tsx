
"use client"

import {redirect} from "@/i18n/routing";
import { useLocale } from "next-intl";
import {setRequestLocale} from "next-intl/server";

function Error() {
    const locale = useLocale();
    redirect({href:"/error", locale})
    setRequestLocale(locale);
    return (
        <div>
            error page
        </div>
    );
}

export default Error;