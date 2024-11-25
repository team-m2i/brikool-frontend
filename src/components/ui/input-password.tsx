"use client"
import {Input, InputProps} from "@/components/ui/input";
import {forwardRef, useState} from "react";
import {cn} from "@/lib/utils";
import {Eye, EyeClosed} from "lucide-react";
import {Button} from "@/components/ui/button";
const InputPassword = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {

        const [visibility, setVisibility] = useState(false)
        const toggleVisibility = (e: any) => {
            e.preventDefault()
            setVisibility(!visibility)
        }
        return (
            <div
                className={"relative"}
            >
                <Input
                    className={cn("pe-16", className)}
                    type={visibility ? "text" : "password"}
                    ref={ref}
                    {...props}
                />
                <Button
                    variant={"ghost"}
                    onClick={toggleVisibility}
                    className={"hover:bg-transparent flex items-center justify-center absolute h-2/3 w-fit end-3 top-1/2 -translate-y-1/2 cursor-pointer"}
                >
                    <p className={"sr-only"}>
                        toggle password visibility
                    </p>
                    {visibility
                        ? <Eye
                            size={10}/>
                        :<EyeClosed
                            size={10}/>
                    }
                </Button>
            </div>
        );
    })

export {InputPassword};