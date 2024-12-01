'use client'

import { Button } from "@/components/ui/button"
import React from 'react'
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from "../../../components/ui/logo"
import Login from "../../../components/Login/Login"
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Moon, MoonIcon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const navigation = [
    { name: 'About us', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact us', href: '#' },
  ]
const entryTitle = [
    { name: 'Your MarketPlace' },
    { name: 'For Skilled' },
    { name: 'Freelancers!' },
  ]

const services = [
      {
        title: "Agent d'entretien",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Ipsa, placeat porro.",
        bgColor: "bg-myColor3",
        textColor: "text-black",
        rotate:"rotate-6",
      },
      {
        title: "Peintre en bâtiment",
        description: "Applique de la peinture sur les murs et surfaces, en intérieur comme en extérieur.",
        bgColor: "bg-white",
        textColor: "text-black",
      },
      {
        title: "Charpentier",
        description: "Fabrique et installe des structures en bois pour les bâtiments, toitures, etc.",
        bgColor: "bg-white",
        textColor: "text-black",
      },
      {
        title: "Jardinier/Paysagiste",
        description: "Entretient les espaces verts, crée et aménage des jardins et parcs.",
        bgColor: "bg-white",
        textColor: "text-black",
      },
      {
        title: "Mécanicien",
        description: "Technicien qui répare et entretient les véhicules et les machines.",
        bgColor: "bg-white",
        textColor: "text-black",
      },
    ];

  
export default function Accueil({params : {locale}}: {params : {locale : string}}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }))
    const { setTheme } = useTheme()
  return (
    <>
          <header id="header" className="pt-32">
            <nav 
            aria-label="Global" 
            className="fixed inset-x-0 top-0 flex items-center justify-between p-3 lg:px-8 
            bg-myColor4 bg-opacity-25 backdrop-blur-sm z-50 shadow-lg rounded-b-lg ">
              <div className="flex lg:flex-1">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <Logo />
                </a>
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
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="text-sm/6 font-semibold  
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-200 ...">
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 ">
                <Button variant="default" onClick={() => setShowModal(true)}>
                  <Link href="#" className="text-sm/6 text-white ">Log In</Link>
                </Button>
                <Button variant="outline"> 
                  <Link 
                  href={`/${locale}/signup`}
                  className="text-sm/6 text-gray">Sign Up</Link>
                </Button>
              </div>
            </nav>
            <div className="theme fixed top-[600px] right-[70px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="none" size="icon">
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
            
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
              <div className="fixed inset-0 z-50" />
              <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <Logo />
                  </a>
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
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className="py-6">
                      <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 "
                      >
                        Log in
                      </a>
                      <a
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 "
                      >
                        Sign in
                      </a>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </Dialog>

            <div className="section1 lg:px-8 flex z-50 justify-evenly items-center ">
              <div className="">
                <h1 className="text-7xl">
                  Welcome To <span className="bri">Bri</span>kol
                </h1>
                {entryTitle.map((item) => (
                  <h1 key={item.name} className="text-7xl pb-1">
                    {item.name}
                  </h1>
                ))}
                <div className="">
                  <p>Find top professionals for any project, or showcase your</p>
                  <p>skills for seamless collaboration and success.</p>
                </div>
                <div className="pt-2">
                  <Button variant="none" className="bg-myColor2 border-none">
                    <Link href="/signUp" className="text-sm/6 text-white">Get Started</Link>
                  </Button>
                </div>
                
              </div>
              <div className="carousel flex justify-center items-center h-full" >
                <Carousel 
                  className="max-w-lg overflow-hidden"
                  plugins={[plugin.current]}
                >
                <CarouselContent className="-mt-1 h-[500px]">
                  <CarouselItem ><img src="/assets/images/heroSlide1.svg" alt="heroSlide1"/></CarouselItem>
                  <CarouselItem >
                    <div className="relative w-[520px] h-[520px] flex justify-center items-center text-[30px]">
                      <h1>Start By Creating Your Profile</h1>
                      <img className="absolute top-[150px] right-1/4" src="/assets/images/hammerSvg.svg" alt="hammerSvg" />
                      <img className="absolute bottom-[150px] left-1/4" src="/assets/images/fingerPrintSvg.svg" alt="fingerPrintSvg" />
                    </div>
                    </CarouselItem>
                  <CarouselItem >
                    <div className="relative w-[520px] h-[520px] flex justify-center items-center text-[25px]">
                      <h1>And Be The Freelancer Of the Month !</h1>
                      <img className="absolute top-[20px] right-[120px]" src="/assets/images/heroTopImg.svg" alt="heroTopImg" />
                      <img className="absolute top-[270px] left-[10px]" src="/assets/images/heroLeftImg.svg" alt="heroLeftImg" />
                      <img className="absolute top-[270px] right-[50px]" src="/assets/images/heroRightImg.svg" alt="heroRightImg" />
                    </div></CarouselItem>
                </CarouselContent>
                </Carousel> 
              </div>

            </div>
          </header>
          <section id="services" className="py-12 px-8 lg:px-16 h-screen flex justify-center items-center">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
              <div className="lg:w-1/3 text-left">
                <h1 className="text-5xl font-bold mb-4">Amazing Services</h1>
                <p className='text-lg'>
                Find skilled professionals and tailored services easily with our app. 
                Whether for personal projects or business needs,
                connect with top freelancers and get the job done seamlessly
                </p>
                <div className="pt-2">
                    <Button variant="none" className="bg-myColor2 border-none">
                      <Link href="/signUp" className="text-sm/6 text-white">Get Started</Link>
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
                    <h1 className="text-4xl font-bold text-900 mb-4">For Clients</h1>
                    <p>Clients can discover freelancers at every price point, with options to fit</p> 
                    <p>any budget and project needs.</p>
                </div>
                <div className='p-6'>
                <h1 className="text-4xl font-bold text-900 mb-4">For Freelancers</h1>
                    <p>Freelancers have the freedom to set their own prices and find projects</p> 
                    <p>that match their skill level and goals starting from 50DH.</p>
                </div>
            </div>
          </section>
          <Login isVisible ={showModal} onClose={() => setShowModal(false)} />
            
    </>  
    
  )
}
