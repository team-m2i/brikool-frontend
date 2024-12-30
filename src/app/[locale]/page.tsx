import { Button } from "@/components/ui/button"
import React from 'react'
import HomeHeader from "@/components/HomeHeader/header"
import { authFlowNavLinks } from "@/config/navigation/auth-flow-navlinks";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer/footer"
import {Link} from "@/i18n/routing";
import {LanguageSwitcher} from "@/components/ui/LanguageSwitcher";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import Image from "next/image";
import {CheckCircle, DollarSign} from "lucide-react";





export default function HomePage({params: {locale}}: {params: { locale: string }}) {
    const t = useTranslations('HomePage');
    const services = [
        {
            title: t('services.title1'),
            description: t('services.description1'),
            bgColor: "bg-myColor3",
            textColor: "text-black",
            rotate:"rotate-6",
        },
        {
            title: t('services.title2'),
            description: t('services.description2'),
            bgColor: "bg-white",
            textColor: "text-black",
        },
        {
            title: t('services.title3'),
            description: t('services.description3'),
            bgColor: "bg-white",
            textColor: "text-black",
        },
        {
            title: t('services.title4'),
            description: t('services.description4'),
            bgColor: "bg-white",
            textColor: "text-black",
        },
        {
            title: t('services.title5'),
            description: t('services.description5'),
            bgColor: "bg-white",
            textColor: "text-black",
        },
    ];
    return (
        <>
            <HomeHeader/>
            <LanguageSwitcher classname='bg-myColor6 z-100 fixed top-[550px] end-[20px]' locale={locale}/>
            <ThemeSwitcher className='z-100 fixed top-[600px] end-[20px]'/>
            <section id="services" className="py-12 px-8 lg:px-16 h-auto flex flex-col justify-center items-center space-y-10 lg:space-y-0">
                
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
                <div className="lg:w-1/3 text-left pt-16">
                    <h1 className="primary-text text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{t('services.title')}</h1>
                    <p className="secondary-text text-sm sm:text-lg">
                    {t('services.subtitle')}
                    </p>
                    <div className="pt-2" 
                    // style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
                    >
                    <Button variant="default" className="border-none">
                        <Link href={`/${authFlowNavLinks.signUp.href}`} className="text-sm text-white">
                        {t('buttons.getstarted')}
                        </Link>
                    </Button>
                    </div>
                </div>
                {/* Right Section: Cards */}
                <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:w-10/12">
                    {services.map((service, index) => (
                    <div
                        key={index}
                        className={`p-6 sm:p-10 rounded-lg shadow-md
                        transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200
                        ${service.bgColor} ${service.textColor} ${service.rotate}`}
                    >
                        <h2 className="primary-text font-bold text-base sm:text-lg">{service.title}</h2>
                        <p className="secondary-text mt-2 text-xs sm:text-sm">{service.description}</p>
                    </div>
                    ))}
                </div>
            </div>
      </section>
      <section id="pricing" className="pt-16 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row z-50 justify-evenly items-center h-auto lg:h-full">
        <div className="hidden lg:block">
          <Image width={200} height={150} src="/assets/images/pricingImage.svg" alt="pricingImage" className="w-full max-w-lg" />
        </div>
        <div className="space-y-6">
          <div className="p-6">
            <h1 className="primary-text text-2xl sm:text-3xl lg:text-4xl font-bold text-900 mb-4 flex items-center gap-2 "><DollarSign className={"text-yellow-400"} size={24} /> {t('pricing.title1')}</h1>
            <p className="secondary-text text-sm sm:text-base flex items-center gap-2 "><CheckCircle className={"text-emerald-500"} size={20} /> {t('pricing.subtitle1')}</p>
            <p className="secondary-text text-sm sm:text-base flex items-center gap-2 "><CheckCircle className={"text-emerald-500"} size={20} /> {t('pricing.subtitle2')}</p>
          </div>
          <div className="p-6 pb-16">
            <h1 className="primary-text text-2xl sm:text-3xl lg:text-4xl font-bold text-900 mb-4 flex items-center gap-2"><DollarSign className={"text-yellow-400"} size={24} /> {t('pricing.title2')}</h1>
            <p className="secondary-text text-sm sm:text-base flex items-center gap-2 "><CheckCircle className={"text-emerald-500"} size={20} /> {t('pricing.subtitle3')}</p>
            <p className="secondary-text text-sm sm:text-base flex items-center gap-2 "><CheckCircle className={"text-emerald-500"} size={20} /> {t('pricing.subtitle4')}</p>
          </div>
        </div>
      </section>
            <Footer/>

        </>

    )
}
