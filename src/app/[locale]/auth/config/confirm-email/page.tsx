"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Logo} from "@/components/ui/logo";
import {cn} from "@/lib/utils";
import {useSearchParams} from "next/navigation";
import {useRouter} from "@/i18n/routing";
import {useEffect} from "react";
import {confirmEmailSchema, TConfirmEmailSchema} from "@/definitions/schema/auth-flow-schema";
import {handleConfirmEmail} from "@/actions/common/auth-flow-actions";
import {toast} from "@/hooks/use-toast";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";
import {useTranslations} from "next-intl";

type Origin = "forgot-password" | "sign-up"

const ConfirmEmailPage = () => {
    const t = useTranslations("ConfirmEmailPage")
    const searchParams = useSearchParams()
    const origin = searchParams.get("origin") as Origin
    const router = useRouter()
    const requestUId = searchParams.get("requestUid")
    const form = useForm<TConfirmEmailSchema>({
        resolver: zodResolver(confirmEmailSchema),
        mode:"onSubmit",
        defaultValues: {
            token: "",
            requestUid: requestUId || "",
            origin: origin || "forgot-password",
        },
    })

    useEffect(() => {
        if (!origin || !requestUId) {
            router.back();
        }
    }, [origin, requestUId, router]);



    const onSubmit = async(data: TConfirmEmailSchema) =>{
        const res = await handleConfirmEmail(data)
        toast({
            title: t(`toast.${res.message}.title`),
            description: t(`toast.${res.message}.message`),
        });
        if(res.status === "success"){
            await new Promise(resolve => setTimeout(resolve, 1000))
            router.replace(authFlowNavLinks.resetPassword.href+"?requestUid=" + requestUId)
        }

    }
    return (
        <div className={"pt-12 w-full min-h-screen flex items-center justify-center px-3"}>
            <Form {...form}>
                <Card className="p-4 md:py-16 md:px-24">
                    <CardHeader className={""}>
                        <CardTitle className={"mx-auto"}>
                            <Logo variant={"short"} width={80} height={80} />
                        </CardTitle>
                        <CardTitle className={cn("pt-10 pb-2 text-xl text-primary")}>
                            {t('title')}
                        </CardTitle>
                        <CardDescription className={"max-w-96 text-justify"}>
                            {t('description')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex justify-center items-center flex-col gap-8" style={{direction: "ltr"}}>
                            <FormField
                                control={form.control}
                                name="token"
                                render={({field}) => (
                                    <FormItem className={"w-full flex justify-center items-center flex-col"}>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0}/>
                                                    <InputOTPSlot index={1}/>
                                                    <InputOTPSlot index={2}/>
                                                    <InputOTPSlot index={3}/>
                                                    <InputOTPSlot index={4}/>
                                                    <InputOTPSlot index={5}/>
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        {form.getFieldState("token").error && <div className="text-red-500 text-sm">{t(`field.token.error.${form.getFieldState("token").error?.message}`)}</div>}
                                    </FormItem>
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
    )
}

export default ConfirmEmailPage