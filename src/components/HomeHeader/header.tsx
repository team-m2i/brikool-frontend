'use client'
import Autoplay from 'embla-carousel-autoplay'
import React from 'react'
import { Button } from '../ui/button'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import {authFlowNavLinks} from "@/config/navigation/auth-flow-navlinks";
import { useTranslations } from 'next-intl'
import Navbar from '../Navbar/navbar'
import {Link} from "@/i18n/routing";
import Image from "next/image";

export default function HomeHeader() {
const t = useTranslations('HomePage');
const entryTitle = [
        { name: t('entrytitle.title2') },
        { name: t('entrytitle.title3') },
        { name: t('entrytitle.title4') },
]
const plugin = React.useRef(
Autoplay({ delay: 3000, stopOnInteraction: true }))
    
  return (
    
    <>
         <header id="header" className="pt-32">
                <Navbar />
                <div className="section1 px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row z-50 justify-evenly items-center space-y-10 lg:space-y-0">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold primary-text">
                            {t('entrytitle.title1')}
                            <span className="text-myColor6">Bri</span>kol
                        </h1>
                        {entryTitle.map((item) => (
                            <h1 key={item.name} className="primary-text text-2xl sm:text-4xl lg:text-7xl pb-1">
                                {item.name}
                            </h1>
                        ))}
                        <div className="mt-4 space-y-2">
                            <p className="secondary-text text-sm sm:text-base">{t('entrytitle.subtitle1')}</p>
                            <p className="secondary-text text-sm sm:text-base">{t('entrytitle.subtitle2')}</p>
                        </div>
                        <div className="pt-4">
                            <Button variant="default" className="border-none">
                                <Link href={`/${authFlowNavLinks.signUp.href}`} className="text-sm/6 text-white">{t('buttons.getstarted')}</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Hide Carousel on Small Screens */}
                    <div className="hidden lg:flex carousel justify-center items-center h-full w-full lg:w-auto">
                        <Carousel
                            className="max-w-full lg:max-w-lg overflow-hidden"
                            plugins={[plugin.current]}
                            opts={{ loop: true }}
                        >
                            <CarouselContent className="h-[300px] sm:h-[400px] lg:h-[500px]">
                                <CarouselItem ><Image width={400} height={400} src="/assets/images/heroSlide1.svg" alt="heroSlide1" className="w-full h-full object-contain" /></CarouselItem>
                                <CarouselItem >
                                    <div className="relative w-full lg:w-[520px] h-[300px] sm:h-[400px] lg:h-[520px] flex justify-center items-center text-lg sm:text-xl lg:text-[30px]">
                                        <h1>{t('entrytitle.slide2')}</h1>
                                        <Image width={50} height={50} className="absolute top-20 lg:top-[150px] right-1/4" src="/assets/images/hammer.svg" alt="hammerSvg" />
                                        <Image width={50} height={50} className="absolute bottom-20 lg:bottom-[150px] left-1/4" src="/assets/images/fingerprint.svg" alt="fingerPrintSvg" />
                                    </div>
                                </CarouselItem>
                                <CarouselItem >
                                    <div className="relative w-full lg:w-[520px] h-[300px] sm:h-[400px] lg:h-[520px] flex justify-center items-center text-base sm:text-lg lg:text-[25px]">
                                        <h1>{t('entrytitle.slide3')}</h1>
                                        <Image width={100} height={100} className="absolute top-5 sm:top-[20px] right-[60px] sm:right-[120px]" src="/assets/images/heroTopImg.svg" alt="heroTopImg" />
                                        <Image width={100} height={100} className="absolute top-[200px] sm:top-[290px] left-[10px]" src="/assets/images/heroLeftImg.svg" alt="heroLeftImg" />
                                        <Image width={100} height={100} className="absolute top-[180px] sm:top-[270px] right-[30px] sm:right-[50px]" src="/assets/images/heroRightImg.svg" alt="heroRightImg" />
                                    </div></CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            </header>
    </>

  )
}
