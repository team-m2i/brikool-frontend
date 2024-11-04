"use client"
import {
    Card, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {Progress} from "@/components/ui/progress";
import Step1 from "@/app/[locale]/auth/new-user/step-1-of-4";
import Step2 from "@/app/[locale]/auth/new-user/step-2-of-4";
import Step3 from "@/app/[locale]/auth/new-user/step-3-of-4";
import {Button} from "@/components/ui/button";
import Step4 from "@/app/[locale]/auth/new-user/step-4-of-4";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";

const NewUserPage = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const newProgress = (currentStep - 1) * 33
        setProgress(newProgress > 100 ? 100 : newProgress)
    }, [currentStep])
    return (
        <form className={"w-full h-screen flex items-center justify-center"}>
            <Card className={"min-w-96 min-h-96 p-16"}>
                <CardHeader>
                    <CardTitle className={cn("text-3xl md:text-4xl text-slate-500 dark:text-slate-300 pt-12 pb-6")}>
                        Finish your account
                    </CardTitle>
                </CardHeader>
                <Tabs defaultValue={"step1"} value={"step" + currentStep} className="">
                    <TabsList className="relative bg-transparent flex w-fil items-center justify-between">
                        <div className={"z-10 w-full flex items-center justify-center px-4 absolute top-1/2 -translate-y-1/2 left-0"}>
                            <Progress value={progress} className="w-full bg-muted" />
                        </div>
                        {
                            [1, 2, 3, 4].map((step) => (
                                <TabsTrigger
                                    onClick={() => setCurrentStep(step)}
                                    key={step}
                                    disabled={step > currentStep}
                                    value={"step" + step}
                                    className={cn("disabled:opacity-100 data-[state=active]:text-primary tab-trigger-style", currentStep >= step ? "tab-trigger-style-active" : "tab-trigger-style-disabled")}
                                >
                                    {step}
                                </TabsTrigger>
                            ))
                        }
                    </TabsList>
                    <TabsContent className={"min-w-[400px] min-h-[400px]"} value={"step1"}>
                        <Step1 />
                    </TabsContent>
                    <TabsContent className={"min-w-[400px] min-h-[400px]"} value={"step2"}>
                        <Step2 />
                    </TabsContent>
                    <TabsContent className={"min-w-[400px] min-h-[400px]"} value={"step3"}>
                        <Step3 />
                    </TabsContent>
                    <TabsContent className={"min-w-[400px] min-h-[400px]"} value={"step4"}>
                        <Step4 />
                    </TabsContent>
                </Tabs>
                <CardFooter className={"flex justify-end"}>
                    <Button onClick={(e) => {
                        e.preventDefault()
                        const maxStep = 4
                        if (currentStep >= maxStep) {
                            return
                        }
                        setCurrentStep(currentStep + 1)
                    }}>Continue</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default NewUserPage
