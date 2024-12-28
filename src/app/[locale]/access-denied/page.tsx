import {useTranslations} from "next-intl";
import InfoCard from "@/components/info-card";


function Page() {
    const t = useTranslations("AccessDeniedPage")
    return (
        <InfoCard
            variant={"destructive"}
            image={"/assets/images/gifs/access-denied.gif"}
            title={t("title")}
            description={t("description")}
            buttonText={t("button.label")}/>
    )
}

export default Page;