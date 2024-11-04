import React from 'react';
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {cn} from "@/lib/utils";
import {Link} from "@/i18n/routing";

function Step4() {

    return (
        <>
            <CardHeader>
                <CardTitle className={"primary-text"}>All done</CardTitle>
                <CardDescription className={cn("pt-4 text-justify gap-4 grid w-[400px]", "secondary-text")}>
                    Your account setup is complete, and you&apos;re all set to start your freelance journey with us. Click &quote;Continue&quote; to proceed, and please make sure to check the &quote;Accept Terms&quote; box to move forward. Let&apos;s get started!
                </CardDescription>
                <CardDescription className={cn("inline pt-4 text-justify w-[400px]", "secondary-text")}>
                    By checking the box below, you agree to our <Link href={"/terms-and-privacy"} className={"hover:underline underline-offset-2  inline hover:text-blue-400 font-semibold "}> Terms of Service, Privacy Policy </Link>.
                </CardDescription>
                <CardContent>
                    <div className="flex items-center space-x-2 pt-4">
                        <Checkbox id="terms"/>
                        <label
                            htmlFor="terms"
                            className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", "secondary-text")}
                        >
                            Accept terms and conditions
                        </label>
                    </div>
                </CardContent>
            </CardHeader>
        </>
    );
}

export default Step4;