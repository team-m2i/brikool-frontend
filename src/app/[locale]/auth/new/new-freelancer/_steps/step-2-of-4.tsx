import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {type City, Locale, Region} from "@/lib/types";
import {TNavToggle} from "@/app/[locale]/auth/new/new-freelancer/page";
import {newFreelancerSchema} from "@/definitions/schema/new-freelancer-schema";
import {useNewFreelancerFormContext} from "@/context/multisteps-newuser-context";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormLabel} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import NavFooter from "@/app/[locale]/auth/new/new-freelancer/nav-footer";
import regionsRaw from "@/raw/regions.json"
import allCities from "@/raw/cities.json"
import { useState} from "react";
import {useTranslations} from "next-intl";

const loadCities = (regionId: string) : City[] => {
    return allCities.filter((city: City) => city.region_id === +regionId)
}

const regions :Region[] = regionsRaw

const stepTwoFormSchema = newFreelancerSchema.pick({
    nickname: true,
    publicEmail: true,
    description: true,
    phone: true,
    zip: true,
    address: true,
    city: true,
    region: true
})

type TStepTwoForm = z.infer<typeof stepTwoFormSchema>

function Step2({toggleNav} : {toggleNav: (action: TNavToggle) => void}) {
    const t = useTranslations("NewFreelancerPage.step2")
    const newFreelancerFormContext = useNewFreelancerFormContext()
    const [descriptionLength, setDescriptionLength] = useState<number>(newFreelancerFormContext.newFreelancer.description.length)
    const stepTwoForm = useForm<TStepTwoForm>(
        {
            resolver: zodResolver(stepTwoFormSchema),
            mode: "onSubmit",
            defaultValues: {
                nickname: newFreelancerFormContext.newFreelancer.nickname,
                publicEmail: newFreelancerFormContext.newFreelancer.publicEmail,
                description: newFreelancerFormContext.newFreelancer.description,
                phone: newFreelancerFormContext.newFreelancer.phone,
                zip: newFreelancerFormContext.newFreelancer.zip,
                address: newFreelancerFormContext.newFreelancer.address,
                city: newFreelancerFormContext.newFreelancer.city,
                region: newFreelancerFormContext.newFreelancer.region
            }
        })
    const onSubmit = (values: TStepTwoForm)=> {
        newFreelancerFormContext.updateNewUser(values)
        toggleNav("inc")
    }

    const onCancel = () => {
        toggleNav("dec")
    }
    type TFieldValues = "nickname" | "publicEmail" | "description" | "phone" | "zip" | "region" | "city" | "address"
    const ErrorMessage = ({field}: { field: TFieldValues }) =>
        (
            stepTwoForm.getFieldState(field).error && <div className="text-red-500 text-sm">{t(`field.${field}.error.${stepTwoForm.getFieldState(field).error?.message}`)}</div>
        )

    return (
        <Form {...stepTwoForm}>
            <CardHeader>
                <CardTitle className={"primary-text"}>{t("title")}</CardTitle>
                <CardDescription className={cn("", "secondary-text")}>
                    {t("description")}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <form>
                    <div className={"flex items-center flex-col sm:flex-row gap-2 w-full"}>
                        <FormField
                            control={stepTwoForm.control}
                            name={"nickname"}
                            render={({field}) => (
                                <div className="space-y-1 w-full sm:w-1/3">
                                    <FormLabel className={cn("font-semibold", "primary-text")}>{t("field.nickname.label")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("field.nickname.placeholder")} {...field} className={"placeholder-style"}/>
                                    </FormControl>
                                    <ErrorMessage field={"nickname"} />
                                </div>
                            )}
                        />
                        <FormField
                            control={stepTwoForm.control}
                            name={"publicEmail"}
                            render={({field}) => (
                                <div className="space-y-1 w-full sm:w-2/3">
                                    <FormLabel className={cn("font-semibold", "primary-text")}>{t("field.publicEmail.label")}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={"service@brand.com"} {...field} className={"placeholder-style"}/>
                                    </FormControl>
                                    <ErrorMessage field={"publicEmail"} />                                </div>
                            )}
                        />
                    </div>
                    <FormField
                        control={stepTwoForm.control}
                        name={"description"}
                        render={({field}) => (
                            <div className="space-y-1">
                                <FormLabel className={cn("font-semibold", "primary-text")}>{t("field.description.label")}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className={cn("resize-none", "placeholder-style")}
                                        maxLength={200}
                                        placeholder={t("field.description.placeholder")}
                                        {...field}
                                        onChange={(e) => {
                                            setDescriptionLength(e.target.value.length)
                                            field.onChange(e)
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    <span className={cn("text-xs text-end inline-block w-full", "secondary-text")}>
                                        {descriptionLength}/200
                                    </span>
                                </FormDescription>
                                <ErrorMessage field={"description"} />
                            </div>
                        )}
                    />
                    <div className={"flex items-center gap-2 w-full"}>
                        <FormField
                            control={stepTwoForm.control}
                            name={"phone"}
                            render={({field}) => (
                                <div className="space-y-1 w-2/3">
                                    <FormLabel className={cn("font-semibold", "primary-text")}>{t("field.phone.label")}</FormLabel>
                                    <FormControl>
                                        <Input type={"tel"} placeholder={"05 87 65 43 21"} {...field} className={"placeholder-style"}/>
                                    </FormControl>
                                    <ErrorMessage field={"phone"} />
                                </div>
                            )}
                        />
                        <FormField
                            control={stepTwoForm.control}
                            name={"zip"}
                            render={({field}) => (
                                <div className="space-y-1 w-1/3">
                                    <FormLabel className={cn("font-semibold", "primary-text")}>{t("field.zip.label")}</FormLabel>
                                    <FormControl>
                                        <Input type={"number"} placeholder={"123456"} {...field}
                                               className={"placeholder-style"}/>
                                    </FormControl>
                                    <ErrorMessage field={"zip"} />
                                </div>
                            )}
                        />
                    </div>
                    <div className={"flex items-center gap-2 w-full"}>
                        <FormField name={"region"}
                                   render={({field}) => (
                                       <div className="space-y-1 w-full">
                                           <FormLabel className={cn("font-semibold", "primary-text")}>{t("field.region.label")}</FormLabel>
                                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                                               <FormControl>
                                                   <SelectTrigger className="w-full">
                                                       <SelectValue placeholder={t("field.region.placeholder")}
                                                                    className={cn("secondary-text")}/>
                                                   </SelectTrigger>
                                               </FormControl>
                                               <SelectContent>
                                                   {regions?.map((region: Region) => (
                                                       <SelectItem key={region.id} value={String(region.id)}>
                                                           {region.names[t("field.city.code") as Locale]}
                                                       </SelectItem>
                                                   ))}
                                               </SelectContent>
                                           </Select>
                                           <ErrorMessage field={"region"} />
                                       </div>
                                   )}/>
                        <FormField name={"city"}
                                   render={({field}) => (
                                       <div className="space-y-1 w-full max-w-36">
                                           <FormLabel className={cn("font-semibold", "primary-text")}>{t("field.city.label")}</FormLabel>
                                           <Select disabled={stepTwoForm.getValues("region") === ""} onValueChange={field.onChange} defaultValue={field.value}>
                                               <FormControl>
                                                   <SelectTrigger className="w-full">
                                                       <SelectValue placeholder={t("field.city.placeholder")}
                                                                    className={cn("secondary-text")}/>
                                                   </SelectTrigger>
                                               </FormControl>
                                               <SelectContent>
                                                   {loadCities(stepTwoForm.getValues("region"))?.map((city: City) => (
                                                       <SelectItem key={city.id} value={city.id}>
                                                           {city.names[t("field.city.code") as Locale]}
                                                       </SelectItem>
                                                   ))}
                                               </SelectContent>
                                           </Select>
                                           <ErrorMessage field={"city"} />
                                       </div>
                                   )}/>
                    </div>
                    <FormField
                        control={stepTwoForm.control}
                        name={"address"}
                        render={({field}) => (
                            <div className="space-y-1">
                                <FormLabel className={cn("font-semibold", "primary-text")}>{t("field.address.label")}</FormLabel>
                                <FormControl>
                                    <Input type={"text"} placeholder={"123 anywhere any street"} {...field}
                                           className={"placeholder-style"}/>
                                </FormControl>
                                <ErrorMessage field={"address"} />
                            </div>
                        )}
                    />
                    <NavFooter onSubmit={stepTwoForm.handleSubmit(onSubmit)} onCancel={onCancel}/>
                </form>

            </CardContent>
        </Form>
    );
}

export default Step2;