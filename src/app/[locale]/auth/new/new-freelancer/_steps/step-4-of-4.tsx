"use client"
import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {Link, redirect, useRouter} from "@/i18n/routing";
import FooterNav from "@/app/[locale]/auth/new/new-freelancer/nav-footer";
import {useNewFreelancerFormContext} from "@/context/multisteps-newuser-context";
import {submitNewFreelancerAction} from "@/actions/common/new-user-actions";
import {TNavToggle} from "@/app/[locale]/auth/new/new-freelancer/page";
import {useTranslations} from "next-intl";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";

function Step4({toggleNav, showToastMessage} : {toggleNav: (action: TNavToggle) => void, showToastMessage: (title: string, description: string) => void}) {
    const t = useTranslations("NewFreelancerPage.step4")
    const newFreelancerContextForm = useNewFreelancerFormContext()
    const router = useRouter()
    const handleSubmit = async () => {

        try{
            const res = await submitNewFreelancerAction(newFreelancerContextForm.newFreelancer)
            if(res){
                showToastMessage(
                    t(`toast.${res.status}.title`),
                    t(`toast.${res.status}.message`),
                );
                if(res.status == "success"){

                    // wait for 2s before redirecting
                    await new Promise(resolve => setTimeout(resolve, 2000))
                    router.replace(authFlowNavLinks.profile.href)
                }
            }
        }catch (e){
            showToastMessage(
                t(`toast.error.title`),
                t(`toast.error.message`),
            )
        }
    }
    const onCancel = () => {
        toggleNav("dec")
    }
    return (
        <>
            <CardHeader>
                <CardTitle className={"primary-text"}>{t("title")}</CardTitle>
                <CardDescription className={cn("pt-4 text-justify gap-4 grid max-w-[400px]", "secondary-text")}>
                    {t("p1")}
                </CardDescription>
                <CardDescription className={cn("inline pt-4 text-justify max-w-[400px]", "secondary-text")}>
                    {t("p2")}
                    <Link target={"_blank"} href={"/terms-and-privacy"} className={"hover:underline underline-offset-2 inline hover:text-blue-500 font-semibold"}> {t("links.terms")} </Link>
                    {t("and")}
                    <Link target={"_blank"} href={"/terms-and-privacy"} className={"hover:underline underline-offset-2 inline hover:text-blue-500 font-semibold"}> {t("links.privacy")} </Link>.
                </CardDescription>
            </CardHeader>
            <FooterNav atEnd onCancel={onCancel} onSubmit={handleSubmit} />
        </>
    );
}

export default Step4;