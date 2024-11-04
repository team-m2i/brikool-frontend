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
import {Link} from "@/i18n/routing";
import {Logo} from "@/components/ui/logo";
import {handleSignInAction, type TAuthActionState} from "@/actions/common/auth-flow-action";
import {signInSchema, type TSignInSchema} from "@/definitions/schema/auth-flow-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useRef} from "react";
import {toast} from "@/hooks/use-toast";

const PRIMARY_TEXT = "text-slate-800 dark:text-white"
const SECONDARY_TEXT = "text-slate-500 dark:text-slate-100"

const LoginPage = () => {
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
                    title: res.status === "success" ? "Login success" : "Login failed",
                    description: res.message,
                });
        } catch (error) {
            toast({
                title: "An error occurred",
                description: "Please try again later.",
            });
            console.error("Error during sign-in:", error);
        }
    };


    return (
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={"pt-12 w-full min-h-screen flex items-center justify-center"}>
            <Card className="p-4 md:py-16 md:px-24">
                <CardHeader className={""}>
                    <CardTitle className={"mx-auto"}>
                        <Logo variant={"short"} width={80} height={80} />
                    </CardTitle>
                    <CardTitle className={cn("pt-10 pb-2 text-xl", PRIMARY_TEXT)}>
                        Hey friend! Welcome back
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="min-w-80 grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email" className={cn("", PRIMARY_TEXT)}>Email</Label>
                            <Input defaultValue={defaultValues?.email} {...register("email")} id="email" className={cn("h-12", SECONDARY_TEXT)} placeholder="Johndoe@example.com" />
                            {errors.email && (
                                <div className="text-red-500">{errors.email.message}</div>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password" className={cn("", PRIMARY_TEXT)}>Password</Label>
                            <InputPassword defaultValue={defaultValues?.password} {...register("password")} id="password" className={cn("h-12", SECONDARY_TEXT)} placeholder={"*".repeat(20)} />
                            {errors.password && (
                                <div className="text-red-500">{errors.password.message}</div>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 items-center justify-center">
                    <Button disabled={isSubmitting} type={"submit"} className={"w-full h-12"}>
                        {isSubmitting ? "Loading..." : "Continue"}
                    </Button>

                    <span className={"text-slate-600 dark:text-slate-100"}>Or</span>

                    {
                        authProvidersNavLinks.map((provider: TProviderNavLink) => (
                            <Button
                                key={provider.id}
                                className={"w-full h-12 ps-16"}
                                variant={"outline"}
                            >
                                <Link href={`/api/auth/${provider.id}`} className={"w-full flex justify-start gap-2"}>
                                    <Image src={provider.icon} alt={provider.title} width={24} height={24} />
                                    Continue with {provider.title}
                                </Link>
                            </Button>
                        ))
                    }

                    <span className={"pt-12"}>
                        No account?
                        <Link href={"/auth/register"} className={"ms-2 font-bold text-primary"}>Create one</Link>
                    </span>
                </CardFooter>
            </Card>
        </form>
    );
}

export default LoginPage;
