import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {RadioGroupRectangular, type TRadioButtonOptions} from "@/components/ui/radio-group-rectangular";
import {cn} from "@/lib/utils";


function Step1() {

    const options: TRadioButtonOptions[] = [
        {
            value: "client",
            label: "client",
            checked: true
        },
        {
            value: "freelancer",
            label: "Freelancer"
        }
    ]
    return (
        <>
            <CardHeader>
                <CardTitle className={cn("" ,"primary-text")}>Almost there</CardTitle>
                <CardDescription className={cn("pt-4 text-justify gap-4 grid w-[400px]", "secondary-text")}>
                        Welcome to our platform! We&apos;re excited to have you join our community. To help us tailor your experience, please take a moment to specify your account type by selecting either Client or Freelancer.
                </CardDescription>
                <CardDescription className={cn("pt-4 text-justify gap-4 grid w-[400px]", "secondary-text")}>
                    This will allow us to provide you with the tools and resources best suited to your needs.
                    If you have any questions, feel free to reach out
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <RadioGroupRectangular parentClassName={"secondary-text"} label={"I am"} options={options} name={"name"} />
            </CardContent>
        </>
    );
}

export default Step1;