import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import FooterNav from "@/app/[locale]/auth/new/new-freelancer/nav-footer";
import {TNavToggle} from "@/app/[locale]/auth/new/new-freelancer/page";
import {useTranslations} from "next-intl";

function Step1({toggleNav} : {toggleNav: (action: TNavToggle) => void}) {
    const t = useTranslations("NewFreelancerPage.step1")
    return (
        <>
            <CardHeader>
                <CardTitle className={cn("" ,"primary-text")}>{t("title")}</CardTitle>
                <CardDescription className={cn("pt-4 text-justify gap-4 grid max-w-[400px]", "secondary-text")}>
                    {t("p1")}
                </CardDescription>
                <CardDescription className={cn("pt-4 text-justify gap-4 grid max-w-[400px]", "secondary-text")}>
                    {t("p2")}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <FooterNav atStart onSubmit={() => toggleNav("inc")}/>
            </CardContent>
        </>
    );
}

export default Step1;