"use client"

import Image from "next/image"
import { useTheme} from "next-themes"
import {BASE_LOGO_URL} from "@/lib/constants";

const Base_logo_short_url =  BASE_LOGO_URL + "-short";
const logo_path = {
    dark: {
        short: Base_logo_short_url + "-dark.svg",
        full: BASE_LOGO_URL + "-dark.svg"
    },
    light: {
        short: Base_logo_short_url + "-light.svg",
        full: BASE_LOGO_URL + "-light.svg"
    }
}


const Logo = (
    { variant = "short", width, height,}
        : {
        variant?: "full" | "short",
        width?: number,
        height?: number
    }) => {

    const {theme} = useTheme()
    return (
        <>
            {
                theme === "dark"
                    ? <Image
                        src={logo_path.dark[variant]}
                        alt={"Brikool"}
                        width={width ?? 80}
                        height={height ?? 80}/>
                    : <Image
                        src={logo_path.light[variant]}
                        alt={"Brikool"}
                        width={width ?? 80}
                        height={height ?? 80}/>
            }
        </>
    );
}

export {Logo}