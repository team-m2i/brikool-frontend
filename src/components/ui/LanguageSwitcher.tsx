import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useTranslations} from "next-intl";
import {Link, locales} from "@/i18n/routing";
import {Languages} from "lucide-react";
import { cn } from "@/lib/utils";


export function LanguageSwitcher({classname="",locale = locales[0]}:{locale?: string, classname?: string}) {
    const t = useTranslations('lang');
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={cn("w-6 h-6", classname)} variant={"ghost"}>
                    <Languages />
                    <p className={"sr-only"}>{t("title")}</p>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-16">
                <DropdownMenuLabel>{t("title")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={locale}>
                    {locales.map((lang, idx) =>
                        (<DropdownMenuRadioItem key={idx} value={lang}>
                                <Link href={`/`} locale={lang}>{t(`languages.${lang}`)}</Link>
                            </DropdownMenuRadioItem>
                        ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

