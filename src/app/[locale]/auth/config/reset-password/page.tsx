"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {resetPasswordSchema, TResetPasswordSchema} from "@/definitions/schema/auth-flow-schema";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {calculatePasswordStrength, cn} from "@/lib/utils";
import {useTranslations} from "next-intl";
import {Logo} from "@/components/ui/logo";
import {useRouter} from "@/i18n/routing";
import {InputPassword} from "@/components/ui/input-password";
import {useEffect, useState} from "react";
import {Progress} from "@/components/ui/progress";
import {useSearchParams} from "next/navigation";
import {handleResetPassword, logout} from "@/actions/common/auth-flow-actions";
import {toast} from "@/hooks/use-toast";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";

function ResetPasswordPage({params: {locale}}:{params: {locale: string}}) {
    const t = useTranslations('ResetPasswordPage');
    const searchParams = useSearchParams()
    const router = useRouter()
    const requestUId = searchParams.get("requestUid")

    if(!requestUId) {
        router.back()
    }
    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onSubmit",
        defaultValues: {
            requestUid: requestUId || "",
            password: "",
            confirmPassword: ""
        }
    });
    const onSubmit = async (data: TResetPasswordSchema) => {
        const res = await handleResetPassword(data);
        if(res){
            toast({
                title: t(`toast.${res.message}.title`),
                description: t(`toast.${res.message}.message`),
            });
            if(res.status == "success"){
                // wait for 2s before redirecting to login page
                await new Promise(resolve => setTimeout(resolve, 1000))
                await logout(locale + authFlowNavLinks.singIn.href)
            }
        }
        else
            toast({
                title: t(`toast.500.title`),
                description: t(`toast.500.message`),
            });
    };
    const [password, setPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0)
    useEffect(() => {
        setPasswordStrength(calculatePasswordStrength(password))
    }, [password])
    return (
        <div className={"pt-12 w-full min-h-screen flex items-center justify-center"}>
            <Form {...form} >
                <Card className="p-4 md:py-16 md:px-24">
                    <CardHeader className={""}>
                        <CardTitle className={"mx-auto"}>
                            <Logo variant={"short"} width={80} height={80} />
                        </CardTitle>
                        <CardTitle className={cn("pt-10 pb-2 text-xl text-primary")}>
                            {t("title")}
                        </CardTitle>
                        <CardDescription className={"max-w-96 text-justify"}>
                            {t("description")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={"grid gap-4 "}>
                            <FormField
                                name={"password"}
                                control={form.control}
                                render={({field}) => (
                                    <div className="space-y-1 w-full">
                                        <FormLabel
                                            className={cn("font-semibold", "primary-text")}>{t("field.password.label")}</FormLabel>
                                        <FormControl>
                                            <InputPassword  placeholder={"*".repeat(20)} {...field}
                                                            onChange={(e) => {
                                                                field.onChange(e);
                                                                setPassword(e.target.value);
                                                            }}
                                                            className={"h-12 secondary-text w-full"}/>
                                        </FormControl>
                                        {form.getFieldState("password").error && <div className="text-red-500 text-sm">{t(`field.password.error.${form.getFieldState("password").error?.message}`)}</div>}
                                        {
                                            password && (
                                                <>
                                                    <div className={"flex items-center justify-center gap-4 mt-2"}>
                                                        <Progress value={passwordStrength} max={100} className={"h-2"}/>
                                                        <div
                                                            className={cn("min-w-24 text-sm text-primary", passwordStrength < 50 ? "text-red-500" : passwordStrength < 80 ? "text-yellow-500" : "text-green-500")}>
                                                            {passwordStrength < 50 ? t("strength.status.weak") : passwordStrength < 80 ? t("strength.status.moderate") : passwordStrength == 100 ? t("strength.status.veryStrong") : t("strength.status.strong")}
                                                        </div>
                                                    </div>
                                                    <p className={cn("text-xs max-w-80 text-justify px-4 opacity-70 secondary-text")}>
                                                        {t("strength.text")}
                                                    </p>
                                                </>
                                            )
                                        }
                                    </div>
                                )}
                            />
                            <FormField
                                name={"confirmPassword"}
                                control={form.control}
                                render={({field}) => (
                                    <div className="space-y-1 w-full">
                                        <FormLabel
                                            className={cn("font-semibold", "primary-text")}>{t("field.confirmPassword.label")}</FormLabel>
                                        <FormControl>
                                            <InputPassword placeholder={"*".repeat(20)} {...field} className={"h-12 secondary-text w-full"}/>
                                        </FormControl>
                                        {form.getFieldState("confirmPassword").error && <div className="text-red-500 text-sm">{t(`field.confirmPassword.error.${form.getFieldState("confirmPassword").error?.message}`)}</div>}
                                    </div>
                                )}
                            />
                            <FormItem>
                                <Button className={"w-full"} disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? t("button.loading") : t("button.submit")}
                                </Button>
                            </FormItem>
                        </form>
                    </CardContent>
                </Card>
            </Form>
        </div>
    );
}

export default ResetPasswordPage;