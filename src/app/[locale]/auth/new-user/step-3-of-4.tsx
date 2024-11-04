"use client"
import {useState} from 'react';
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import {cn} from "@/lib/utils";



function Step3() {
    const [visibility, setVisibility] = useState(false);

    return (
        <>
            <CardHeader>
                <CardTitle className={"primary-text"}>Showcase your mastery</CardTitle>
                <CardDescription className={cn("secondary-text", "w-96 text-justify")}>
                    Make your services discoverable by adding them to categories. You can select up to 3 categories.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="categories" className={cn("font-semibold", "primary-text")}>Search categories</Label>
                    <div className={"relative"}>

                        <Input onBlur={() => setVisibility(false)} onFocus={() => setVisibility(true)} id="categories" type="search"  placeholder={"Search something ..."} className={cn("peer ps-12 h-12", "placeholder-style")}/>
                        <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2 peer-focus:text-ring", "secondary-text")} size={24} />
                        <div className={cn("p-4 absolute w-full h-48 shadow-md z-10", "secondary-text", visibility ? "" : "hidden")}>
                            nothing here...
                        </div>
                    </div>
                </div>

            </CardContent>
        </>
    );
}

export default Step3;