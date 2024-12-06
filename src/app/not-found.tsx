import {redirect} from "@/i18n/routing";
function NotFound() {
    redirect("/not-found")
    return (
        <div>
            not found
        </div>
    );
}

export default NotFound;