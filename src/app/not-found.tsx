import {redirect} from "@/i18n/routing";
import {getLocale, setRequestLocale} from "next-intl/server";
async function NotFound() {
    const locale = await getLocale();
    redirect({href:"/not-found", locale})
    // Enable static rendering
    setRequestLocale(locale);
    return (
        <div>
            not found
        </div>
    );
}

export default NotFound;