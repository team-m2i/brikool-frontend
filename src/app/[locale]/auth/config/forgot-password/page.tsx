"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {forgotPasswordSchema, TForgotPasswordSchema} from "@/definitions/schema/auth-flow-schema";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {useTranslations} from "next-intl";
import {Logo} from "@/components/ui/logo";
import {handleForgotPasswordAction} from "@/actions/common/auth-flow-actions";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "@/i18n/routing";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";

function ForgotPasswordPage() {
    const t = useTranslations('ForgotPasswordPage');
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onSubmit",
        defaultValues: {
            email: ""
        }
    });
    const onSubmit = async (data: TForgotPasswordSchema) => {
        const res = await handleForgotPasswordAction(data);
        console.log("res", res);
        if(res){
            toast({
                title: t(`toast.${res.message}.title`),
                description: t(`toast.${res.message}.message`),
            });
            if(res.status == "success"){
                await new Promise(resolve => setTimeout(resolve, 1000))
                router.replace(`${authFlowNavLinks.confirmEmail.href}?requestUid=${res.optional}&origin=forgot-password`);
            }
        }
        else
            toast({
                title: t(`toast.500.title`),
                description: t(`toast.500.message`),
            });
    };
    return (
        <div className={"pt-12 w-full min-h-screen flex items-center justify-center px-3"}>
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
                        <form className={"grid gap-4 "}>
                            <FormField
                                name={"email"}
                                control={form.control}
                                render={({field}) => (
                                    <div className="space-y-1 w-full">
                                        <FormLabel
                                            className={cn("font-semibold", "primary-text")}>{t("field.email.label")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={"JohnDoe@example.com"} {...field}
                                                   className={"h-12 secondary-text w-full"}/>
                                        </FormControl>
                                        {form.getFieldState("email").error && <div className="text-red-500 text-sm">{t(`field.email.error.${form.getFieldState("email").error?.message}`)}</div>}
                                    </div>
                                )}
                            />
                            <FormItem>
                                <Button type={"submit"} onClick={form.handleSubmit(onSubmit)} className={"w-full"} disabled={form.formState.isSubmitting}>
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

export default ForgotPasswordPage;