
"use client"

import {redirect} from "@/i18n/routing";

function Error() {
    redirect("/error")
    return (
        <div>
            error page
        </div>
    );
}

export default Error;