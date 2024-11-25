"use client"
import {
    Card, CardHeader, CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {Progress} from "@/components/ui/progress";
import Step1 from "@/app/[locale]/auth/new/new-freelancer/_steps/step-1-of-4";
import Step2 from "@/app/[locale]/auth/new/new-freelancer/_steps/step-2-of-4";
import Step3 from "@/app/[locale]/auth/new/new-freelancer/_steps/step-3-of-4";
import Step4 from "@/app/[locale]/auth/new/new-freelancer/_steps/step-4-of-4";
import {cn} from "@/lib/utils";
import { useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {toast} from "@/hooks/use-toast";

export type TNavToggle = "inc" | "dec"
const NewUserPage = ({params: {locale}}: {params: {locale: string}}) => {
    const t = useTranslations("NewFreelancerPage")
    const [currentStep, setCurrentStep] = useState(1)
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const newProgress = (currentStep - 1) * 33
        setProgress(newProgress > 100 ? 100 : newProgress)
    }, [currentStep])

    const toggleNavigation = (action: TNavToggle) => {
        const max = 4
        switch (action) {
            case "inc":
                if (currentStep >= max)
                    return
                setCurrentStep(currentStep + 1)
                break
            case "dec":
                if (currentStep <= 1)
                    return
                setCurrentStep(currentStep - 1)
                break
        }
    }

    const showToastMessage = (title: string, description: string) => {
        toast({
            title: title,
            description: description
        })
    }
    return (
        <div className={"w-full min-h-screen flex items-center justify-center"}>
            <Card className={"min-w-96 border-none shadow-none sm:border-2 sm:shadow-md min-h-96 p-4 md:p-16 pb-2"}>
                <CardHeader>
                    <CardTitle className={cn("text-3xl md:text-4xl max-w-[400px] text-slate-500 dark:text-slate-300 pt-12 pb-6")}>
                        {t("title")}
                    </CardTitle>
                </CardHeader>
                <Tabs defaultValue={"step1"} value={"step" + currentStep} className="p-4">
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
                    <TabsContent style={{direction: locale === "ar" ? "rtl": "ltr"}} className={"max-w-[400px] min-h-[400px] "} value={"step1"}>
                        <Step1 toggleNav={toggleNavigation} />
                    </TabsContent>
                    <TabsContent style={{direction: locale === "ar" ? "rtl": "ltr"}} className={"max-w-[400px] min-h-[400px]"} value={"step2"}>
                        <Step2 toggleNav={toggleNavigation}/>
                    </TabsContent>
                    <TabsContent style={{direction: locale === "ar" ? "rtl": "ltr"}} className={"max-w-[400px] min-h-[400px]"} value={"step3"}>
                        <Step3 toggleNav={toggleNavigation}/>
                    </TabsContent>
                    <TabsContent style={{direction: locale === "ar" ? "rtl": "ltr"}} className={"max-w-[400px] min-h-[400px]"} value={"step4"}>
                        <Step4 toggleNav={toggleNavigation} showToastMessage={showToastMessage}/>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    )
}

export default NewUserPage
