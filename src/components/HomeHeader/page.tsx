'use client'
import Autoplay from 'embla-carousel-autoplay'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Moon, Sun } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";
import { useTranslations } from 'next-intl'
import Navbar from '../Navbar/page'

export default function HomeHeader({params : {locale}}: {params : {locale : string}}) {
const t = useTranslations('HomePage');
const entryTitle = [
        { name: t('entrytitle.title2') },
        { name: t('entrytitle.title3') },
        { name: t('entrytitle.title4') },
]
const plugin = React.useRef(
Autoplay({ delay: 3000, stopOnInteraction: true }))
const { setTheme } = useTheme()
    
  return (
    
    <>
        <header id="header" className="pt-32">
          <Navbar params={{
          locale: `${locale}`
          }} />
            <div className="theme fixed top-[600px] right-[20px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="section1 lg:px-8 flex z-50 justify-evenly items-center ">
              <div className="">
                <h1 className="text-7xl">
                  {t('entrytitle.title1')}
                   <span className="text-mycolor6">Bri</span>kol
                </h1>
                {entryTitle.map((item) => (
                  <h1 key={item.name} className="text-7xl pb-1">
                    {item.name}
                  </h1>
                ))}
                <div className="">
                  <p>{t('entrytitle.subtitle1')}</p>
                  <p>{t('entrytitle.subtitle2')}</p>
                </div>
                <div className="pt-2">
                  <Button variant="default" className="border-none">
                    <Link href={`/${locale}/${authFlowNavLinks.signUp.href}`} className="text-sm/6 text-white">{t('buttons.getstarted')}</Link>
                  </Button>
                </div>
                
              </div>
              <div className="carousel flex justify-center items-center h-full" >
                <Carousel 
                  className="max-w-lg overflow-hidden"
                  plugins={[plugin.current]}
                  opts={{loop : true}}
                >
                <CarouselContent className="-mt-1 h-[500px]">
                  <CarouselItem ><img src="/assets/images/heroSlide1.svg" alt="heroSlide1"/></CarouselItem>
                  <CarouselItem >
                    <div className="relative w-[520px] h-[520px] flex justify-center items-center text-[30px]">
                      <h1>{t('entrytitle.slide2')}</h1>
                      <img className="absolute top-[150px] right-1/4" src="/assets/images/hammer.svg" alt="hammerSvg" />
                      <img className="absolute bottom-[150px] left-1/4" src="/assets/images/fingerprint.svg" alt="fingerPrintSvg" />
                    </div>
                    </CarouselItem>
                  <CarouselItem >
                    <div className="relative w-[520px] h-[520px] flex justify-center items-center text-[25px]">
                      <h1>{t('entrytitle.slide3')}</h1>
                      <img className="absolute top-[20px] right-[120px]" src="/assets/images/heroTopImg.svg" alt="heroTopImg" />
                      <img className="absolute top-[290px] left-[10px]" src="/assets/images/heroLeftImg.svg" alt="heroLeftImg" />
                      <img className="absolute top-[270px] right-[50px]" src="/assets/images/heroRightImg.svg" alt="heroRightImg" />
                    </div></CarouselItem>
                </CarouselContent>
                </Carousel> 
              </div>

            </div>
        </header>
    </>

  )
}
