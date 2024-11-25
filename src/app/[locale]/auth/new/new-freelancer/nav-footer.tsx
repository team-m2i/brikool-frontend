import {Button} from "@/components/ui/button";
import {CardFooter} from "@/components/ui/card";
import {useTranslations} from "next-intl";

function FooterNav({atStart = false, atEnd = false, onSubmit, onCancel, skip=false}: {skip?: boolean, atStart?: boolean, atEnd?: boolean, onSubmit: () => void, onCancel?:() => void}) {
    const t = useTranslations("NewFreelancerPage.footer")
    return (
        <CardFooter className={"pt-6 flex justify-end"}>
            {!atStart && <Button variant={"outline"} className={"me-2 h-12 min-w-24 w-fit px-4"} onClick={(e) => {
                e.preventDefault()
                if(onCancel !== undefined)
                    onCancel()
            }}>{t("button.back")}</Button>}
            <Button className={"h-12 min-w-24 w-fit px-8"} onClick={onSubmit}>
                {atEnd ? t("button.end") : skip ? t("button.skip") : t("button.next")}
            </Button>
        </CardFooter>
    );
}

export default FooterNav;