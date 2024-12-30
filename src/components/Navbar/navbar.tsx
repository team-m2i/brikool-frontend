'use client'
import React, { useState } from 'react'
import { Logo } from '../ui/logo'
import { staticNavLinks } from '@/config/navigation/static-navlinks'
import { authFlowNavLinks } from '@/config/navigation/auth-flow-navlinks'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import AboutUs from '../AboutUs/AboutUs'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {Link} from "@/i18n/routing";
import {cn} from "@/lib/utils";



export default function Navbar({className}: {className: string}) {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const [showModal, setShowModal] = useState(false)
const t = useTranslations('HomePage');


  return (
    <>
          <nav 
            aria-label="Global" 
            className={cn("fixed inset-x-0 top-0 flex items-center justify-between p-3 lg:px-8 bg-myColor4 bg-opacity-25 backdrop-blur-sm z-50 shadow-lg rounded-b-lg ", className)}>
              <div className="flex lg:flex-1">
                <Link href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <Logo />
                </Link>
              </div>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="navigation hidden lg:flex lg:gap-x-12 text-7xl	">
                <Link href="#" className="text-sm/6 font-semibold  
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 ..."
                  onClick={() => setShowModal(true)}>{t("navigation.nav1")}</Link>
                  <Link
                  href={staticNavLinks.services.href} 
                  className="text-sm/6 font-semibold  
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 ..."
                  > 
                     {t("navigation.nav2")} 
                  </Link>
                  <Link 
                  href={staticNavLinks.pricing.href}
                  className="text-sm/6 font-semibold  
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 ..."
                  > 
                     {t("navigation.nav3")} 
                     </Link>
                  <Link 
                  href={staticNavLinks.contactus.href}
                  className="text-sm/6 font-semibold  
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 ..."
                  > 
                     {t("navigation.nav4")} 
                     </Link>
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 ">
                <Button variant="none">
                  <Link href={authFlowNavLinks.singIn.href}
                  >
                     {t("buttons.login")} 

                    </Link>
                </Button>
                <Button variant="default" className="text-sm/6 border-none"> 
                  <Link 
                  href={authFlowNavLinks.signUp.href}
                  className="text-sm/6 text-white">{t("buttons.signup")}</Link>
                </Button>
              </div>
              <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
              <div className="fixed inset-0 z-50" />
              <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <Link href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <Logo />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                    <Link href="#" className="text-sm/6 font-semibold  
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 ..."
                  onClick={() => setShowModal(true)}>{t("navigation.nav1")}</Link>
                  <Link 
                  href={staticNavLinks.services.href} 
                  className="text-sm/6 font-semibold  
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 ..."
                  > 
                     {t("navigation.nav1")} 
                  </Link>
                  <Link 
                  href={staticNavLinks.pricing.href}
                  className="text-sm/6 font-semibold  
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 ..."
                  > 
                    {t("navigation.nav2")} 
                  </Link>
                  <Link 
                  href={staticNavLinks.contactus.href}
                  className="text-sm/6 font-semibold  
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 ..."
                  > 
                    {t("navigation.nav3")} 
                  </Link>
                    </div>
                    <div className="py-6">
                      <Link
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 "
                      >
                        {t("buttons.login")}
                      </Link>
                      <Link
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 "
                      >
                        {t("buttons.signup")}
                      </Link>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </Dialog>
            </nav>
            <AboutUs isVisible ={showModal} onClose={() => setShowModal(false)} />

    </>
  )
}
