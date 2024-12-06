"use client"
import {useRouter} from "@/i18n/routing";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
type Variant = "default" | "secondary" | "destructive"

type InfoCardProps = {
    variant: Variant;
    image: string;
    title: string;
    description: string;
    buttonText: string;
}
const getColor =(variant: Variant) => {
    switch (variant){
        case "destructive":
            return "text-destructive"
        case "secondary":
            return "text-secondary"
        default:
            return "text-primary"

    }
}
function InfoCard({image, title, description, buttonText, variant}: InfoCardProps) {
    const router = useRouter();
    return (
        <section className={"w-full min-h-screen flex items-center justify-center"}>
            <div className={"rounded-3xl shadow dark:shadow-gray-900 p-12 flex items-center justify-center flex-col gap-6"}>
                <Image src={image} alt={"Access Denied"} width={150} height={100}/>
                <h1 className={cn("font-extrabold text-3xl uppercase text-des", getColor(variant))}>{title}</h1>
                <p className={"secondary-text text-justify w-96"}>
                    {description}
                </p>
                <Button onClick={() => router.back()} variant={variant} className={"py-2 px-6 self-end"}> {buttonText}</Button>
            </div>
        </section>
    );
}

export default InfoCard;