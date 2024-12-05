
import { Button } from "@/components/ui/button"
import React from 'react'
import Link from 'next/link';
import HomeHeader from "@/components/HomeHeader/page"
import { authFlowNavLinks } from "@/config/navigation/auth-flow-navlinks";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer/page"




  
export default function Accueil({params : {locale}}: {params : {locale : string}}) {
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
          <HomeHeader params={{
        locale: `${locale}`
      }} />
          <section id="services" className="py-12 px-8 lg:px-16 h-screen flex justify-center items-center">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
              <div className="lg:w-1/3 text-left">
                <h1 className="text-5xl font-bold mb-4">{t('services.title')}</h1>
                <p className='text-lg'>
                {t('services.subtitle')}
                </p>
                <div className="pt-2" style={{direction: locale === "ar" ? "rtl" : "ltr"}}>
                    <Button variant="default" className="border-none">
                      <Link href={`/${locale}/${authFlowNavLinks.signUp.href}`} className="text-sm/6 text-white">{t('buttons.getstarted')}</Link>
                    </Button>
                </div>
              </div>
              {/* Right Section: Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:w-10/12">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`p-10 rounded-lg shadow-md
                      transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200
                      ${service.bgColor} ${service.textColor} ${service.rotate}`}
                  >
                    <h2 className="font-bold text-lg">{service.title}</h2>
                    <p className="mt-2 text-sm">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section id="pricing" className='lg:px-8 flex z-50 justify-evenly items-center h-full'>
            <div className=''>
                <img src="/assets/images/pricingImage.svg" alt="pricingImage"/>
            </div>
            <div className=''>
                <div className='p-6'>
                    <h1 className="text-4xl font-bold text-900 mb-4">{t('pricing.title1')}</h1>
                    <p>{t('pricing.subtitle1')}</p> 
                    <p>{t('pricing.subtitle2')}</p>
                </div>
                <div className='p-6'>
                <h1 className="text-4xl font-bold text-900 mb-4">{t('pricing.title2')}</h1>
                    <p>{t('pricing.subtitle3')}</p> 
                    <p>{t('pricing.subtitle4')}</p>
                </div>
            </div>
          </section>
          <Footer params={{
        locale: `${locale}`
      }} />
   
    </>  
    
  )
}
