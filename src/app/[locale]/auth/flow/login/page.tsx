"use client"
import {authProvidersNavLinks, type TProviderNavLink} from "@/config/navigation/auth-providers-navlinks"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InputPassword } from "@/components/ui/input-password"
import { Label } from "@/components/ui/label"
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Link, redirect, useRouter} from "@/i18n/routing";
import {Logo} from "@/components/ui/logo";
import {handleSignInAction, type TAuthActionState} from "@/actions/common/auth-flow-actions";
import {signInSchema, type TSignInSchema} from "@/definitions/schema/auth-flow-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useEffect, useRef} from "react";
import {toast} from "@/hooks/use-toast";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";
import {useTranslations} from "next-intl";
import {Locale} from "@/lib/types";
import {useSession} from "next-auth/react";

const PRIMARY_TEXT = "text-slate-800 dark:text-white"
const SECONDARY_TEXT = "text-slate-500 dark:text-slate-100"

const LoginPage = ({params: {locale}}: {params: { locale: string }}) => {
    const t = useTranslations('LoginPage');
    const {
        register,
        handleSubmit,
        formState: { errors, defaultValues, isSubmitting },
    } = useForm<TSignInSchema>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(signInSchema)
    });

    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit: SubmitHandler<TSignInSchema> = async () => {
        try {
            const formData = new FormData(formRef.current!);
            const res: TAuthActionState = await handleSignInAction(formData);
            console.log("res", res);
            if(res)
                toast({
                    title: t(`toast.${res.status}.title`),
                    description: t(`toast.${res.status}.message`),
                });
        } catch (error) {
            toast({
                title: t(`toast.serverError.title`),
                description: t(`toast.serverError.message`),
            });
            console.error("Error during sign-in:", error);
        }
    }
    return (
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={"pt-12 w-full min-h-screen flex items-center justify-center"}>
            <Card className="p-4 md:py-16 md:px-24">
                <CardHeader className={""}>
                    <CardTitle className={"mx-auto"}>
                        <Logo variant={"short"} width={80} height={80} />
                    </CardTitle>
                    <CardTitle className={cn("pt-10 pb-2 text-xl", PRIMARY_TEXT)}>
                        {t("title")}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="min-w-80 grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email" className={cn("", PRIMARY_TEXT)}>{t("field.email.label")}</Label>
                            <Input defaultValue={defaultValues?.email} {...register("email")} id="email" className={cn("h-12", SECONDARY_TEXT)} placeholder="Johndoe@example.com" />
                            {errors.email && (
                                <div className="text-red-500 text-sm">{t(`field.email.error.${errors.email.message}`)}</div>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password" className={cn("", PRIMARY_TEXT)}>{t("field.password.label")}</Label>
                            <InputPassword defaultValue={defaultValues?.password} {...register("password")} id="password" className={cn("h-12", SECONDARY_TEXT)} placeholder={"*".repeat(20)} />
                            <Link href={authFlowNavLinks.forgotPassword.href} className={"text-sm text-primary w-fit self-end text-end"}>{t("links.forgot")}</Link>
                            {errors.password && (
                                <div className="text-red-500 text-sm">{t(`field.password.error.${errors.password.message}`)}</div>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 items-center justify-center">
                    <Button disabled={isSubmitting} type={"submit"} className={"w-full h-12"}>
                        {isSubmitting ? t("buttons.loading") : t("buttons.submit")}
                    </Button>

                    <span className={"text-slate-600 dark:text-slate-100"}>{t('or')}</span>

                    {
                        authProvidersNavLinks.map((provider: TProviderNavLink) => (
                            <Button
                                key={provider.id}
                                className={"w-full h-12 flex items-center justify-center"}
                                variant={"outline"}
                            >
                                <Link href={`/api/auth/${provider.id}`} className={"w-fit flex justify-start items-center gap-2 "}>
                                    <Image src={provider.icon} alt={provider.title[locale as Locale]} width={24} height={24} />
                                    {t("links.continue")} {provider.title[locale as Locale]}
                                </Link>
                            </Button>
                        ))
                    }

                    <span className={"pt-12"}>
                        {t("links.signupText")}
                        <Link href={authFlowNavLinks.signUp.href} className={"ms-2 font-bold text-primary"}>{t('links.signup')}</Link>
                    </span>
                </CardFooter>
            </Card>
        </form>
    );
}

export default LoginPage;
