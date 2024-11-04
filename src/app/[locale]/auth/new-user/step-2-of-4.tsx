import {CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import citiesRaw from "@/raw/cities.json";
import { type City } from "@/lib/types";
const cities: City[] = citiesRaw;
function Step2() {
    return (
        <>
            <CardHeader>
                <CardTitle className={"primary-text"}>Brand</CardTitle>
                <CardDescription className={cn("", "secondary-text")}>
                    Please provide us with some information about your brand.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className={"flex items-center gap-2 w-full"}>
                    <div className="space-y-1">
                        <Label htmlFor="nickname" className={cn("font-semibold", "primary-text")}>Nickname
                            (Brand)</Label>
                        <Input id="nickname" className={"placeholder-style"} placeholder={"Your public identity"}
                               type="text"/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="professionalEmail" className={cn("font-semibold", "primary-text")}>Professional
                            email (optional)</Label>
                        <Input id="professionalEmail" placeholder={"service@brand.com"} className={"placeholder-style"}
                               type="email"/>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="description" className={cn("font-semibold", "primary-text")}>Description</Label>
                    <Textarea
                        className={cn("resize-none", "placeholder-style")}
                        id={"description"}
                        placeholder="Tell us a little bit about your brand"
                    />
                    <span className={cn("text-xs text-end inline-block w-full", "secondary-text")}>
                        0/100
                    </span>
                </div>
                <div className={"flex items-center gap-2 w-full"}>
                    <div className="space-y-1">
                        <Label htmlFor="tel" className={cn("font-semibold", "primary-text")}>¨Phone</Label>
                        <Input id="tel" placeholder={"05 123 456 78"} className={"placeholder-style"}
                               type="tel"/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="zip" className={cn("font-semibold", "primary-text")}>Code postal</Label>
                        <Input id="zip" placeholder={"654321"} className={"placeholder-style"} type="number"/>
                    </div>
                </div>
                <div className={"flex items-center gap-2 w-full"}>
                    <div className="space-y-1 w-full">
                        <Label htmlFor="address" className={cn("font-semibold", "primary-text")}>Address</Label>
                        <Input id="address" placeholder={"123 any city any street"} className={cn("placeholder-style", "w-full")} type="tel"/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="city" className={cn("font-semibold", "primary-text")}>City</Label>
                        <Select name={"city"}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a city" className={cn("secondary-text")}/>
                            </SelectTrigger>
                            <SelectContent>
                                {cities?.map((city: City) => (
                                    <SelectItem key={city.names.en} value={city.names.en}>
                                        {city.names.en}
                                    </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

            </CardContent>
        </>
    );
}

export default Step2;