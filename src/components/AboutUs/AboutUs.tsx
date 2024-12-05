'use client'
import { useTranslations } from 'next-intl';
import React from 'react'

export default function Modal({ isVisible, onClose }: { isVisible: boolean; onClose: () => void } ) {
  const t = useTranslations('HomePage');

    if( !isVisible ) return null;
    
    const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // if (e.target.id === 'wrapper') onClose();
        if ((e.target as HTMLDivElement).id === 'wrapper') {
            onClose();
          }
      };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 z-50"
        id="wrapper" onClick={handleClose}>
        <div className='w-[1100px] flex flex-col'>
            <button className="text-white text-xl place-self-end" 
            onClick={() => onClose()}>x</button>
            <div className='bg-white rounded flex justify-between'>
            {/* <div className="mx-auto h-10 w-auto"> */}
            <div className='bg-black w-[700px] flex flex-col justify-center pl-2'>
              <h1 className='text-white text-5xl font-bold pb-4'>{t('navigation.nav1')}</h1>
              <h3 className='text-myColor2 text-3xl font-bold pb-4'>{t('aboutus.subtitle')}</h3>
              <p className='text-white text-lg font-bold	'>{t('aboutus.paragraphe')}</p>
            </div>
            <div>
              <img src="/assets/images/aboutUsimg.png" alt="aboutUsimg" />
            </div>
            </div>
        </div>
      </div>
    </>
  )
}
