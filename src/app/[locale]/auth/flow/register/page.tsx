"use client";

import {authProvidersNavLinks, type TProviderNavLink} from "@/config/navigation/auth-providers-navlinks";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent, CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {calculatePasswordStrength, cn} from "@/lib/utils";
import {Link, useRouter} from "@/i18n/routing";
import {Logo} from "@/components/ui/logo";
import {
    handleSignUpAction,
    type TAuthActionState
} from "@/actions/common/auth-flow-actions";
import {useEffect, useState} from "react";
import {Progress} from "@/components/ui/progress";
import { useForm} from "react-hook-form";
import {signUpSchema, TSignUpSchema} from "@/definitions/schema/auth-flow-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/hooks/use-toast";
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";
import {useTranslations} from "next-intl";
import {Locale} from "@/lib/types";
import type {TRadioButtonOptions} from "@/components/ui/radio-group-rectangular";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";

const PRIMARY_TEXT = "text-slate-800 dark:text-white";
const SECONDARY_TEXT = "text-slate-500 dark:text-slate-100";

const options: TRadioButtonOptions[] = [
    {
        value: "Client",
        label: "client",
    },
    {
        value: "Freelancer",
        label: "freelancer"
    }
];

const RegisterPage = ({params: {locale}}: {params: {locale: string}}) => {
    const t = useTranslations("RegisterPage");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        setPasswordStrength(calculatePasswordStrength(password));
    }, [password]);

    const form = useForm<TSignUpSchema>(
        {
            resolver: zodResolver(signUpSchema),
            mode: "onSubmit",
            defaultValues: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                accountType: "Client",
            }
        })

    const onSubmit = async (data: TSignUpSchema) => {
        try {
            const res: TAuthActionState = await handleSignUpAction(data);
            if(res)
                toast({
                    title: t(`toast.${res.message}.title`),
                    description: t(`toast.${res.message}.message`),
                });
            if(res.status === "success"){
                await new Promise((resolve) => setTimeout(resolve, 1000));
                router.replace(authFlowNavLinks.singIn.href);
                return;
            }

        } catch (error) {
            toast({
                title: t("toast.500.title"),
                description: t("toast.500.message"),
            });
            console.error("Error during sign-in:", error);
        }
    };
    type TFieldValues = "name" | "email" | "password" | "confirmPassword" | "accountType"
    const ErrorMessage = ({field}: { field: TFieldValues }) =>
        (
            form.getFieldState(field).error && <div className="text-red-500 text-sm">{t(`field.${field}.error.${form.getFieldState(field).error?.message}`)}</div>
        )
    return (
        <Form {...form}>
            <form
                className={"pt-12 w-full min-h-screen flex items-center justify-center"}>
                <Card className="p-4 md:py-16 md:px-24">
                    <CardHeader className={""}>
                        <CardTitle className={"mx-auto"}>
                            <Logo variant={"short"} width={80} height={80}/>
                        </CardTitle>
                        <CardTitle className={cn("pt-10 pb-2 text-3xl", PRIMARY_TEXT)}>
                            {t("title")}
                            <CardDescription className={"pt-4"}>
                                {t("description")}
                            </CardDescription>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="min-w-80 grid w-full items-center gap-4">
                            <FormField name={"name"} control={form.control}
                                       render={({field}) => (
                                           <div className="flex flex-col space-y-1.5">
                                               <FormLabel className={cn("", PRIMARY_TEXT)}>
                                                   {t("field.name.label")}
                                               </FormLabel>
                                               <FormControl>
                                                   <Input {...field} className={cn("h-12", SECONDARY_TEXT)}
                                                          placeholder="John Doe"/>
                                               </FormControl>
                                               <ErrorMessage field={"name"}/>
                                           </div>
                                       )}/>
                            <FormField name={"email"} control={form.control}
                                       render={({field}) => (
                                           <div className="flex flex-col space-y-1.5">
                                               <FormLabel className={cn("", PRIMARY_TEXT)}>
                                                   {t("field.email.label")}
                                               </FormLabel>
                                               <FormControl>
                                                   <Input {...field} className={cn("h-12", SECONDARY_TEXT)}
                                                          placeholder="JohnDoe@example.com"/>
                                               </FormControl>
                                               <ErrorMessage field={"email"}/>
                                           </div>
                                       )}/>
                            <FormField name={"password"} control={form.control}
                                       render={({field}) => (
                                           <div className="flex flex-col space-y-1.5">
                                               <FormLabel className={cn("", PRIMARY_TEXT)}>
                                                   {t("field.password.label")}
                                               </FormLabel>
                                               <FormControl>
                                                   <Input {...field} className={cn("h-12", SECONDARY_TEXT)}
                                                          placeholder={"*".repeat(20)}
                                                          onChange={(e) => {
                                                              setPassword(e.target.value)
                                                              field.onChange(e)
                                                   }} />
                                               </FormControl>
                                               <ErrorMessage field={"password"}/>
                                           </div>
                                       )}/>

                            {
                                password && (
                                    <>
                                        <div className={"flex items-center w-full justify-center gap-4 mt-2"}>
                                            <Progress value={passwordStrength} max={100} className={"h-1.5"}/>
                                            <div
                                                className={cn("min-w-24 text-sm w-fit text-primary", passwordStrength < 50 ? "text-red-500" : passwordStrength < 80 ? "text-yellow-500" : "text-green-500")}>
                                                {passwordStrength < 50 ? t("strength.status.weak") : passwordStrength < 80 ? t("strength.status.moderate") : passwordStrength == 100 ? t("strength.status.veryStrong") : t("strength.status.strong")}
                                            </div>
                                        </div>
                                        <p className={cn("text-xs max-w-80 text-justify px-4 opacity-70", SECONDARY_TEXT)}>
                                            {t("strength.text")}
                                        </p>
                                    </>
                                )
                            }
                        <FormField name={"confirmPassword"} control={form.control}
                                   render={({field}) => (
                                       <div className="flex flex-col space-y-1.5">
                                           <FormLabel className={cn("", PRIMARY_TEXT)}>
                                               {t("field.confirmPassword.label")}
                                           </FormLabel>
                                           <FormControl>
                                               <Input {...field} className={cn("h-12", SECONDARY_TEXT)}
                                                      placeholder={"*".repeat(20)}/>
                                           </FormControl>
                                           <ErrorMessage field={"confirmPassword"}/>
                                       </div>
                                   )}/>
                        <FormField name={"accountType"} control={form.control}
                                   render={({field}) => (
                                       <FormItem>
                                           <FormLabel className={cn("", PRIMARY_TEXT)}>
                                               {t("field.accountType.label")}
                                           </FormLabel>
                                           <RadioGroup
                                               defaultValue={field.value}
                                               onValueChange={field.onChange}
                                               className={"flex p-6 items-center justify-center"}
                                           >
                                               {
                                                   options.map((opt, idx) => (
                                                       <FormItem key={idx} className="">
                                                           <FormControl className="hidden">
                                                               <RadioGroupItem value={opt.value}/>
                                                           </FormControl>
                                                           <FormLabel
                                                               className={cn("cursor-pointer py-4 px-6 border-[1px] rounded-md ", field.value === opt.value ? "text-primary-foreground bg-primary bg-opacity-30" : "")}>
                                                               {t(`field.accountType.option.${opt.label}`)}
                                                           </FormLabel>
                                                       </FormItem>
                                                   ))
                                               }
                                           </RadioGroup>
                                       </FormItem>
                                   )}/>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 items-center justify-center">
                        <Button onClick={form.handleSubmit(onSubmit)} className={"w-full h-12"} type="submit">
                            {form.formState.isSubmitting ? t("buttons.loading") : t("buttons.submit")}
                        </Button>

                        <span className={"text-slate-600 dark:text-slate-100"}>{t("or")}</span>

                        {
                            authProvidersNavLinks.map((provider: TProviderNavLink, idx) => (
                                <Button
                                    key={idx}
                                    className={"w-full h-12 flex items-center justify-center"}
                                    variant={"outline"}
                                >
                                    <Link href={"/api/auth/" + provider?.id}
                                          className={"w-fit flex justify-start items-center gap-2 "} key={idx}>
                                        <Image src={provider.icon} alt={provider.title[locale as Locale]} width={24}
                                               height={24}/>
                                        <p>
                                            {t("links.continue")} {provider.title[locale as Locale]}
                                        </p>
                                    </Link>
                                </Button>
                            ))
                        }

                        <span className={"pt-12"}>
                        {t("links.signinText")}
                            <Link href={authFlowNavLinks.singIn.href}
                                  className={"ms-2 font-bold text-primary"}>{t("links.signin")}</Link>
                    </span>
                    </CardFooter>
                </Card>
            </form>

        </Form>
    );
};

export default RegisterPage;