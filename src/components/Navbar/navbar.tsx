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
import { Link } from "@/i18n/routing";
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react";
import {cn} from "@/lib/utils";

export default function Navbar({className}: {className?: string}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const t = useTranslations('HomePage');
  const { data: session, status } = useSession()
  const isLoading = status === 'loading'; // Check if the session is loading

  return (
    <>
      <nav 
        aria-label="Global" 
            className={cn("fixed inset-x-0 top-0 flex items-center justify-between p-3 lg:px-8 bg-myColor4 bg-opacity-25 backdrop-blur-sm z-50 shadow-lg rounded-b-lg ", className)}>

        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Brikool</span>
            <Logo />
          </Link>
        </div>

        {/* Show loading skeleton while the session is loading */}
        {isLoading ? (
          <div className="flex gap-x-6 lg:flex-1 justify-center">
            {/* You can replace this with a loading skeleton or spinner */}
            <span className="text-sm/6 font-semibold">...</span>
          </div>
        ) : (
          session?.user ? (
            <>
              <div className="hidden">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              <div className="navigation hidden lg:flex lg:gap-x-6 xl:gap-x-12 primary-text">
                <Link
                  href="#"
                  className="text-sm/6 font-semibold transition-transform duration-200 hover:scale-110 hover:-translate-y-1"
                  onClick={() => setShowModal(true)}
                >
                  {t("navigation.nav1")}
                </Link>
                <Link
                  href={staticNavLinks.services.href}
                  className="text-sm/6 font-semibold transition-transform duration-200 hover:scale-110 hover:-translate-y-1"
                >
                  {t("navigation.nav2")}
                </Link>
                <Link
                  href={staticNavLinks.pricing.href}
                  className="text-sm/6 font-semibold transition-transform duration-200 hover:scale-110 hover:-translate-y-1"
                >
                  {t("navigation.nav3")}
                </Link>
                <Link
                  href={staticNavLinks.contactus.href}
                  className="text-sm/6 font-semibold transition-transform duration-200 hover:scale-110 hover:-translate-y-1"
                >
                  {t("navigation.nav4")}
                </Link>
              </div>

              <div className="navigation lg:flex lg:mx-6 xl:mx-12">
                <Link
                  href="/announces/"
                  className="text-sm/6 font-semibold transition-transform duration-200 hover:scale-110 hover:-translate-y-1"
                >
                  {t("navigation.nav5")}
                </Link>
              </div>

              <div className='lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 items-center'>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="none">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>{session.user.name?.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{t("navigation.myaccount")}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Button variant="none">
                        <Link href="/dashboard/freelancer/">
                        {t("navigation.profile")}
                        </Link>
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <Button variant="none">
                      {t("buttons.signout")}
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (<>
            <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
            <div className="navigation hidden lg:flex lg:gap-x-6 xl:gap-x-12">
          <Link
            href="#"
            className="text-sm/6 font-semibold transition-transform duration-200 hover:scale-110 hover:-translate-y-1"
            onClick={() => setShowModal(true)}
          >
            {t("navigation.nav1")}
          </Link>
          <Link
            href={staticNavLinks.services.href}
            className="text-sm/6 font-semibold transition-transform duration-200 hover:scale-110 hover:-translate-y-1"
          >
            {t("navigation.nav2")}
          </Link>
          <Link
            href={staticNavLinks.pricing.href}
            className="text-sm/6 font-semibold transition-transform duration-200 hover:scale-110 hover:-translate-y-1"
          >
            {t("navigation.nav3")}
          </Link>
          <Link
            href={staticNavLinks.contactus.href}
            className="text-sm/6 font-semibold transition-transform duration-200 hover:scale-110 hover:-translate-y-1"
          >
            {t("navigation.nav4")}
          </Link>
        </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
              <Button variant="none">
                <Link href={`/${authFlowNavLinks.singIn.href}`}>{t("buttons.login")}</Link>
              </Button>
              <Button variant="default" className="text-sm border-none">
                <Link href={`/${authFlowNavLinks.signUp.href}`} className="text-white">
                  {t("buttons.signup")}
                </Link>
              </Button>
            </div>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-xs overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Brikool</span>
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
              <div className="-my-6 divide-y divide-black-500/10">
                <div className="space-y-4 py-6">
                  <Link
                    href="#"
                    className="text-black block text-sm/6 font-semibold transition-transform duration-200 hover:scale-110 hover:-translate-y-1 hover:text-myColor6"
                    onClick={() => setShowModal(true)}
                  >
                    {t("navigation.nav1")}
                  </Link>
                  <Link
                    href={staticNavLinks.services.href}
                    className="text-black block text-sm/6 font-semibold transition-transform duration-200 hover:scale-110 hover:-translate-y-1 hover:text-myColor6"
                  >
                    {t("navigation.nav2")}
                  </Link>
                  <Link
                    href={staticNavLinks.pricing.href}
                    className="text-black block text-sm/6 font-semibold transition-transform duration-200 hover:scale-110 hover:-translate-y-1 hover:text-myColor6"
                  >
                    {t("navigation.nav3")}
                  </Link>
                  <Link
                    href={staticNavLinks.contactus.href}
                    className="text-black block text-sm/6 font-semibold transition-transform duration-200 hover:scale-110 hover:-translate-y-1 hover:text-myColor6"
                  >
                    {t("navigation.nav4")}
                  </Link>
                </div>
                <div className="py-6">
                  <Link
                    href={`/${authFlowNavLinks.singIn.href}`}
                    className="block rounded-lg py-2.5 text-sm/6 font-semibold text-gray-900
                    transition-transform duration-200 hover:scale-110 hover:-translate-y-1 hover:text-myColor6"
                  >
                    {t("buttons.login")}
                  </Link>
                  <Link
                    href={`/${authFlowNavLinks.signUp.href}`}
                    className="block rounded-lg py-2.5 text-sm/6 font-semibold text-gray-900
                    transition-transform duration-200 hover:scale-110 hover:-translate-y-1 hover:text-myColor6"
                  >
                    {t("buttons.signup")}
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
          </>)
        )}

      </nav>
      <AboutUs isVisible={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
