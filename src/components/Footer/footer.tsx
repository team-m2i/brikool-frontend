'use client'
import React, { useState } from 'react'
import { Logo } from '../ui/logo'
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import AboutUs from '../AboutUs/AboutUs';
import {Link} from "@/i18n/routing";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import {Mail, Phone} from "lucide-react";

export default function Footer() {
    const t = useTranslations('HomePage');
    const [showModal, setShowModal] = useState(false)


  return (
    <>
        <footer id="footer" className="bg-gray-200 text-gray-800 py-8 rounded-lg h-full">
          {/* Logo et Newsletter */}
          <div className="flex w-full items-center justify-center flex-col mb-12">
            <h2 className="text-lg font-bold"><Logo /></h2>
            <div className="mt-4">
              <h3 className="text-sm w-full text-center font-semibold">{t('footer.subscribenow')}</h3>
              <div className="flex mt-2 items-center justify-center gap-1">
                <div className="">
                  <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder={t('footer.placeholder')}
                      className="rounded border-0 py-1.5 bg-white shadow-sm text-black sm:text-sm/6 items w-42.5"
                  />
                </div>
                <Button
                    variant="ghost"
                    type="submit"
                    className="flex bg-black justify-center items-center rounded-md text-sm/6 font-semibold
                        text-white shadow-sm "
                >
                  {t('footer.subscribe')}
                </Button>

              </div>
            </div>
          </div>
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Information */}
              <div>
                <h3 className="text-sm font-semibold">{t('footer.Information.information')}</h3>
                <ul className="mt-4 space-y-2 text-sm">




                  <li><Link href={`/`} onClick={() => setShowModal(true)}>{t('navigation.nav1')}</Link></li>
                  <li><Link href="#">Blog</Link></li>
                  <li><Link href="#">{t('footer.Information.testimonials')}</Link></li>
                  <li><Link href="#">{t('footer.Information.events')}</Link></li>
                </ul>
              </div>

              {/* Helpful Links */}
              <div>
                <h3 className="text-sm font-semibold">{t('footer.HelpfulLinks.title')}</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>{t('footer.HelpfulLinks.services')}</li>
                  <li>{t('footer.HelpfulLinks.supports')}</li>
                  <li><Link href={`/terms-and-privacy`}>{t('footer.HelpfulLinks.terms&privacy')}</Link></li>
                </ul>
              </div>

              {/* Our Services */}
              <div>
                <h3 className="text-sm font-semibold">Our Services</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>{t('services.title1')}</li>
                  <li>{t('services.title2')}</li>
                  <li>{t('services.title3')}</li>
                  <li>{t('services.title4')}</li>
                  <li>{t('services.title5')}</li>
                </ul>
              </div>

              {/* Contact Us */}
              <div>
                <h3 className="text-sm font-semibold">{t('navigation.nav4')}</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className={"flex items-center gap-0.5"}>
                    <Phone size={24} /> +2126-1234-5678
                  </li>
                  <li className={"flex items-center gap-0.5"}>
                    <Mail size={24}/> serv@brikool.com
                  </li>
                </ul>
                <div className="mt-4 w-full justify-start flex items-center gap-1.5">
                  <Link href="#" className="text-gray-600">
                    <span className="text-2xl"><Image width={20} height={20} src="/assets/images/linkedin.svg" alt="linkedin" /></span>
                  </Link>
                  <Link href="#" className="text-gray-600">
                    <span className="text-2xl"><Image width={20} height={20} src="/assets/images/twitter.svg" alt="twitter" /></span>
                  </Link>
                  <Link href="#" className="text-gray-600">
                    <span className="text-2xl"><Image width={20} height={20} src="/assets/images/facebook.svg" alt="facebook" /></span>
                  </Link>
                  <Link href="#" className="text-gray-600">
                  <span className="text-2xl"><Image width={24} height={24} src="/assets/images/instagram.svg" alt="instagram" /></span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-300 pt-4 text-center text-sm text-gray-600">
            {t('footer.company')}
            </div>
            <AboutUs isVisible ={showModal} onClose={() => setShowModal(false)} />

          </footer>
    </>
  )
}
