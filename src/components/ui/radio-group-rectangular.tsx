"use client"
import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

export type TRadioButtonOptions = {
    value: string,
    label: string,
    checked?: boolean
}
const RadioGroupRectangular = ({ parentClassName ,className, label, options, name, }:{
    parentClassName?: string,
    className?: string,
    label: string,
    options:TRadioButtonOptions[]
    name: string
}) => {
    return (
        <>
            <Label>
                {label}
            </Label>
            <div className={cn("flex items-center justify-center gap-1", parentClassName)}>
                {
                    options.map((option, idx) => (
                        <div key={idx} className={"flex items-center gap-1"}>
                            <Input defaultChecked={option.checked} type={"radio"} name={name} id={option.value} value={option.value} className="hidden peer"/>
                            <Label
                                className={cn("cursor-pointer py-4 px-6 border-[1px] rounded-md peer-checked:text-primary-foreground peer-checked:bg-primary peer-checked:bg-opacity-30", className)}
                                htmlFor={option.value}>
                                {option.label}
                            </Label>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export {RadioGroupRectangular}