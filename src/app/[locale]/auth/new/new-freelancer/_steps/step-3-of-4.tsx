"use client"
import {useEffect, useState} from 'react';
import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Search, X} from "lucide-react";
import {cn} from "@/lib/utils";
import {TNavToggle} from "@/app/[locale]/auth/new/new-freelancer/page";
import FooterNav from "@/app/[locale]/auth/new/new-freelancer/nav-footer";
import {useNewFreelancerFormContext} from "@/context/multisteps-newuser-context";
import {newFreelancerSchema, TCategory} from "@/definitions/schema/new-freelancer-schema";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormLabel, FormMessage} from "@/components/ui/form";
import {Badge} from "@/components/ui/badge";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import {useDebounce} from "@/hooks/use-debounce";
import {useTranslations} from "next-intl";
import {Locale} from "@/lib/types";


const categoriesDump: TCategory[] = [
    {
        id: "1",
        en: {
            title: "Web Development",
            description: "Web Development"
        },
        fr: {
            title: "Développement Web",
            description: "Développement Web"
        },
        ar: {
            title: "تطوير الويب",
            description: "تطوير الويب"
        }
    },
    {
        id: "2",
        en: {
            title: "Mobile Development",
            description: "Mobile Development"
        },
        fr: {
            title: "Développement Mobile",
            description: "Développement Mobile"
        },
        ar: {
            title: "تطوير الجوال",
            description: "تطوير الجوال"
        }
    },
    {
        id: "3",
        en: {
            title: "Design",
            description: "Design"
        },
        fr: {
            title: "Design",
            description: "Design"
        },
        ar: {
            title: "تصميم",
            description: "تصميم"
        }
    },
    {
        id: "4",
        en: {
            title: "Marketing",
            description: "Marketing"
        },
        fr: {
            title: "Marketing",
            description: "Marketing"
        },
        ar: {
            title: "تسويق",
            description: "تسويق"
        }
    },
    {
        id: "5",
        en: {
            title: "Writing",
            description: "Writing"
        },
        fr: {
            title: "Écriture",
            description: "Écriture"
        },
        ar: {
            title: "كتابة",
            description: "كتابة"
        }
    },
    {
        id: "6",
        en: {
            title: "Video & Animation",
            description: "Video & Animation"
        },
        fr: {
            title: "Vidéo & Animation",
            description: "Vidéo & Animation"
        },
        ar: {
            title: "فيديو ورسوم متحركة",
            description: "فيديو ورسوم متحركة",
        }
    }
]

const findCategory = (categories: TCategory[], id: string): TCategory | undefined => {
    return categories.find((category: TCategory) => category.id === id)
}

const stepThreeSchema = newFreelancerSchema.pick({
    categories: true
})

type TStepThreeForm = z.infer<typeof stepThreeSchema>

function Step3({toggleNav} : {toggleNav: (action: TNavToggle) => void}) {
    const t = useTranslations("NewFreelancerPage.step3")
    const [visibility, setVisibility] = useState(false);
    const newFreelancerFormContext = useNewFreelancerFormContext()
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [filteredCategories, setFilteredCategories] = useState<TCategory[]>(categoriesDump)
    const debouncedTerm = useDebounce<string>(searchTerm)
    const [selectedCategories, setSelectedCategories] = useState<TCategory[]>(newFreelancerFormContext.newFreelancer.categories)

    const stepThreeForm = useForm<TStepThreeForm>(
        {
            resolver: zodResolver(stepThreeSchema),
            mode: "onSubmit",
            defaultValues: {
                categories: newFreelancerFormContext.newFreelancer.categories
            }
        })

    const onSubmit = (values: TStepThreeForm)=> {
        newFreelancerFormContext.updateNewUser(values)
        toggleNav("inc")
    }

    const onCancel = () => {
        toggleNav("dec")
    }

    useEffect(()=>{

        // filter categories
        const categories = categoriesDump.filter((category: TCategory) =>
            category.en.title.toLowerCase().includes(debouncedTerm.toLowerCase())
            || category.ar.title.includes(debouncedTerm)
            || category.fr.title.toLowerCase().includes(debouncedTerm.toLowerCase()))
        setFilteredCategories(categories)

    }, [debouncedTerm])

    useEffect(() => {
        stepThreeForm.setValue("categories", selectedCategories)
    }, [selectedCategories, stepThreeForm])

    const addCategory = (category: TCategory) => {
        if(!findCategory(selectedCategories, category.id) && selectedCategories.length < 3) {
            setSelectedCategories([... selectedCategories, category])
        }
    }

    const removeCategory = (category: TCategory) => {
        setSelectedCategories(selectedCategories.filter((selected) => selected.id !== category.id));
    }
    return (
        <Form {...stepThreeForm}>
            <CardHeader>
                <CardTitle className={"primary-text"}>{t("title")}</CardTitle>
                <CardDescription className={cn("secondary-text", "max-w-96 text-justify")}>
                    {t("description")}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 h-full">
                <form className="space-y-1">
                    <FormField
                        control={stepThreeForm.control}
                        name={"categories"}
                        render={({field}) => (
                            <div className="space-y-1">
                                <FormLabel htmlFor="categories" className={cn("font-semibold", "primary-text")}>
                                    {t("field.categories.label")}
                                </FormLabel>
                                <FormControl>
                                    <div className={"max-w-96"}>
                                        <div
                                            className={"relative will-change-auto"}>
                                            <Input
                                                type="search" placeholder={t('field.categories.placeholder')}
                                                className={cn("peer ps-12 h-12 ", "placeholder-style")}
                                                onBlur={() => {
                                                    setVisibility(false)
                                                    field.onBlur()
                                                }}
                                                onFocus={() => {
                                                    setVisibility(true)
                                                }}
                                                value={searchTerm}
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value)
                                                }}
                                            />
                                            <Search
                                                className={cn("absolute left-4 top-1/2 -translate-y-1/2 peer-focus:text-ring z-20", "secondary-text")}
                                                size={24}/>
                                        </div>
                                        <div
                                            onMouseDown={(e) => e.preventDefault()}
                                            className={"mt-1 flex gap-1 flex-row flex-wrap"}>
                                            {
                                                selectedCategories.map((category: TCategory, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant={"outline"}
                                                        className={"primary-text rounded-full px-4 py-2 hover:bg-primary hover:text-white"}>
                                                        <X size={20} className={"me-2"}
                                                           onClick={() => {
                                                               removeCategory(category)
                                                           }}/>
                                                        {category[t("field.categories.code") as Locale].title}
                                                    </Badge>
                                                ))
                                            }

                                        </div>
                                        <Separator className={"mt-2 mb-2"} />
                                        <ScrollArea
                                            className={cn("h-48 max-w-96 mt-1 p-4 bg-white dark:bg-black shadow-sm z-10", "", visibility ? "" : "hidden")}>
                                            <div
                                                onMouseDown={(e) => e.preventDefault()}
                                                className="flex flex-wrap gap-1">
                                                {
                                                    filteredCategories.map((category: TCategory, idx: number) => (
                                                        <Badge
                                                            variant={"outline"}
                                                            key={idx}
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                addCategory(category)
                                                            }}
                                                            className={cn("rounded-full px-4 py-2 primary-text cursor-pointer", findCategory(selectedCategories, category.id) ? "cursor-not-allowed opacity-50": "hover:bg-primary hover:text-white")}>
                                                            {category[t("field.categories.code") as Locale].title}
                                                        </Badge>
                                                    ))
                                                }
                                                {filteredCategories.length === 0 && <div className={"text-center w-full secondary-text"}>No results found</div>}
                                            </div>
                                        </ScrollArea>
                                    </div>
                                </FormControl>
                                {
                                    stepThreeForm.getFieldState("categories").error && <div className="text-red-500">{t(`field.categories.error.${stepThreeForm.getFieldState("categories").error?.message}`)}</div>
                                }
                            </div>
                        )}/>
                    <FooterNav onSubmit={stepThreeForm.handleSubmit(onSubmit)} onCancel={onCancel}/>
                </form>
            </CardContent>
        </Form>
    );
}

export default Step3