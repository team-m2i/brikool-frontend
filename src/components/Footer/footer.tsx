'use client'
import React, { useState } from 'react'
import { Logo } from '../ui/logo'
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import AboutUs from '../AboutUs/AboutUs';
import {Link} from "@/i18n/routing";

export default function Footer() {
    const t = useTranslations('HomePage');
    const [showModal, setShowModal] = useState(false)


  return (
    <>
        <footer id="footer" className="bg-gray-200 text-gray-800 py-8 rounded-lg h-full">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Logo et Newsletter */}
              <div className="items-center">
                <h2 className="text-lg font-bold"><Logo /></h2>
                <div className="mt-4">
                  <h3 className="text-sm font-semibold">{t('footer.subscribenow')}</h3>
                  <div className="flex mt-2 items-center justify-center">
                    <div className="">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={t('footer.placeholder')}
                        className="rounded border-0 py-1.5 bg-white shadow-sm text-black sm:text-sm/6 items"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        type="submit"
                        className="flex bg-black text-white justify-center items-center rounded-md text-sm/6 font-semibold
                        text-white shadow-sm "
                    >
                        {t('footer.subscribe')}
                    </Button>

                  </div>
                </div>
              </div>

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
                  <li>
                    <span className="font-bold">📞</span> +91 9999 999 999
                  </li>
                  <li className="display flex items-center">
                    <span className="font-bold"><img className="pr-2" src="/assets/images/mail.svg" alt="mail" /></span> youremailid.com
                  </li>
                </ul>
                <div className="mt-4 flex space-x-4">
                  <Link href="#" className="text-gray-600">
                    <span className="text-2xl"><img src="/assets/images/linkedin.svg" alt="linkedin" /></span>
                  </Link>
                  <Link href="#" className="text-gray-600">
                    <span className="text-2xl"><img src="/assets/images/twitter.svg" alt="twitter" /></span>
                  </Link>
                  <Link href="#" className="text-gray-600">
                    <span className="text-2xl"><img src="/assets/images/facebook.svg" alt="facebook" /></span>
                  </Link>
                  <Link href="#" className="text-gray-600">
                  <span className="text-2xl"><img src="/assets/images/instagram.svg" alt="instagram" /></span>
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
