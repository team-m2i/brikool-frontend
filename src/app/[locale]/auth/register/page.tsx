"use client"
import {authProvidersNavLinks, type TProviderNavLink} from "@/config/navigation/auth-providers-navlinks"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent, CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { InputPassword } from "@/components/ui/input-password"
import { Label } from "@/components/ui/label"
import Image from "next/image";
import {calculatePasswordStrength, cn} from "@/lib/utils";
import {Link} from "@/i18n/routing";
import {Logo} from "@/components/ui/logo";
import {
    handleSignUpAction,
    type TAuthActionState
} from "@/actions/common/auth-flow-action"
import {useEffect, useRef, useState} from "react"
import {Progress} from "@/components/ui/progress";
import {SubmitHandler, useForm} from "react-hook-form";
import {signUpSchema, TSignUpSchema} from "@/definitions/schema/auth-flow-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/hooks/use-toast";

const PRIMARY_TEXT = "text-slate-800 dark:text-white"
const SECONDARY_TEXT = "text-slate-500 dark:text-slate-100"



const RegisterPage = ()=> {
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [password, setPassword] = useState("")

    useEffect(() => {
        setPasswordStrength(calculatePasswordStrength(password))
    }, [password])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TSignUpSchema>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        resolver: zodResolver(signUpSchema)
    });

    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit: SubmitHandler<TSignUpSchema> = async () => {
        try {
            const formData = new FormData(formRef.current!);
            const res: TAuthActionState = await handleSignUpAction(formData);
            console.log("res", res);
            if(res)
                toast({
                    title: res.status === "success" ? "Registration succeeded" : "Registration failed",
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
                        <Logo variant={"short"} width={80} height={80}/>
                    </CardTitle>
                    <CardTitle className={cn("pt-10 pb-2 text-3xl", PRIMARY_TEXT)}>
                        Register
                        <CardDescription className={"pt-4"}>
                            Get started today!
                        </CardDescription>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="min-w-80 grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name" className={cn("", PRIMARY_TEXT)}>Name</Label>
                            <Input {...register("name")} id="name" className={cn("h-12", SECONDARY_TEXT)} placeholder="John Doe"/>
                            {errors.name && (
                                <div className="text-red-500">{errors.name.message}</div>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email" className={cn("", PRIMARY_TEXT)}>Email</Label>
                            <Input {...register("email")} id="email" className={cn("h-12", SECONDARY_TEXT)} placeholder="Johndoe@example.com"/>
                            {errors.email && (
                                <div className="text-red-500">{errors.email.message}</div>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password" className={cn("", PRIMARY_TEXT)}>Password</Label>
                            <InputPassword
                                {...register("password")}
                                id="password"
                                className={cn("h-12", SECONDARY_TEXT)}
                                placeholder={"*".repeat(20)}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                                <div className="text-red-500">{errors.password.message}</div>
                            )}
                            {
                                password && (
                                    <>
                                        <div className={"flex items-center justify-center gap-4 mt-2"}>
                                            <Progress value={passwordStrength} max={100} className={"h-2"}/>
                                            <div
                                                className={cn("min-w-24 text-sm text-primary", passwordStrength < 50 ? "text-red-500" : passwordStrength < 80 ? "text-yellow-500" : "text-green-500")}>
                                                {passwordStrength < 50 ? "Weak" : passwordStrength < 80 ? "Moderate" : passwordStrength == 100 ? "Very strong" :"Strong"}
                                            </div>
                                        </div>
                                        <p className={cn("text-xs max-w-80 text-justify px-4 opacity-70", SECONDARY_TEXT)}>
                                            Password must be at least 8 characters long,
                                            contain at least one uppercase letter,
                                            one lowercase letter,
                                            one number and one special character.
                                        </p>
                                    </>
                                )
                            }
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="confirmPassword" className={cn("", PRIMARY_TEXT)}>Confirm password</Label>
                            <InputPassword {...register("confirmPassword")} id="confirmPassword"
                                           className={cn("h-12", SECONDARY_TEXT)}
                                           placeholder={"*".repeat(20)}/>
                            {errors.confirmPassword && (
                                <div className="text-red-500">{errors.confirmPassword.message}</div>
                            )}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 items-center justify-center">
                <Button className={"w-full h-12"}>
                    {isSubmitting ? "Loading..." : "Create your account"}
                </Button>

                    <span className={"text-slate-600 dark:text-slate-100"}>Or</span>

                    {
                        authProvidersNavLinks.map((provider: TProviderNavLink, idx) => (
                            <Button
                                key={idx}
                                className={"w-full h-12 ps-16"}
                                variant={"outline"}
                            >
                                <Link href={"/api/auth/" + provider?.id} className={"w-full flex justify-start gap-2 "} key={idx}>
                                    <Image src={provider.icon} alt={provider.title} width={24} height={24} />
                                    Continue with {provider.title}
                                </Link>
                            </Button>
                        ))
                    }

                    <span className={"pt-12"}>
                        Already have an account?
                        <Link href={"/auth/login"} className={"ms-2 font-bold text-primary"}>Sign in</Link>
                    </span>
                </CardFooter>
            </Card>
        </form>
    )
}

export default RegisterPage