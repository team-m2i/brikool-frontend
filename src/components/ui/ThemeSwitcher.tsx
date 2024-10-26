"use client"


import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {Moon, Sun} from "lucide-react";


interface ThemeSwitcherProps {
    size?: "sm" | "md" | "lg"
}

const setIconSize = (size: ThemeSwitcherProps["size"]) => {
    switch(size) {
        case "sm":
            return "w-4 h-4";
        case "md":
            return "w-6 h-6";
        case "lg":
            return "w-8 h-8";
        default:
            return "w-6 h-6";
    }
}
function ThemeSwitcher({ size = "md" }: ThemeSwitcherProps) {
    const {theme, setTheme} = useTheme();

    const CLASS_NAME = setIconSize(size);
    return (
        <div>
            <Button className={"rounded-full"} variant={"ghost"} size={"icon"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                { theme === "dark" && <Moon className={CLASS_NAME} />}
                { theme === "light" && <Sun className={CLASS_NAME} />}
            </Button>
        </div>
    );
}

export default ThemeSwitcher;