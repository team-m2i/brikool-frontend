import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Link} from "@/i18n/routing";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {AtSign, BadgeDollarSign, Link2, Minus, Star} from "lucide-react";
import {TAnnounce} from "@/lib/types";
import {getLocale} from "next-intl/server";

export async function AnnounceCard({announce}: {announce: TAnnounce}) {
    const locale = await getLocale();
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className={"primary-text font-extrabold text-xl"}>{announce?.titre}</CardTitle>
                <CardDescription className={"secondary-text h-10 break-words whitespace-break-spaces line-clamp-2"}>{announce?.description}</CardDescription>
                <CardDescription className={"pt-2 space-x-1"}>
                    <Badge variant={"default"}>New</Badge>
                    <Badge variant={"destructive"}>Hot</Badge>
                    <Badge variant={"outline"}>{locale == "ar" ? announce?.category?.titreAr : locale == "en" ? announce?.category?.titreEn : announce?.category?.titreFr}</Badge>
                </CardDescription>
                <CardDescription className={"flex items-center gap-1"}>
                    <span className="secondary-text text-sm flex items-center justify-start gap-1">by
                        <Link
                        className={"flex items-center justify-center hover:underline hover:text-primary font-bold"}
                        href={`/portfolio/${announce.freelancer.id}`} ><AtSign size={14}/> {announce?.freelancer?.nickname} </Link></span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className={"flex items-center justify-between"}>
                    <div>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className={"flex items-center justify-center gap-2"}>
                        <span className="primary-text text-xl font-extrabold">{announce?.prix > 0 ? announce?.prix : <Minus size={20} /> }</span>
                        <span className="secondary-text"><BadgeDollarSign className={"text-yellow-400"} width={20}/></span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <StarRating rating={4} />
                <Button variant={"link"}>
                    <Link className={"text-primary flex items-center justify-center gap-1"} href={`/announces/${announce.id}`}><Link2 size={20} /> See more </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

const StarRating = ({rating}: {rating: number}) => {
    return (
        <div className={"flex items-center gap-1"}>
            {[1, 2, 3, 4, 5].map((star, idx) => (
                <Star width={16} key={idx} className={`text-yellow-400 ${star <= rating ? "text-yellow-400" : "text-gray-400"}`} />
            ))}
        </div>
    )
}
