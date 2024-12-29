'use client'
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Modal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('HomePage');

  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLDivElement).id === 'wrapper') {
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 px-4 sm:px-8"
        id="wrapper"
        onClick={handleClose}
      >
        <div className="w-full max-w-[1100px] flex flex-col bg-black rounded-lg overflow-hidden">
          {/* Close Button */}
          <button
            className="self-end p-2 text-white bg-black rounded hover:bg-gray-800 transition"
            onClick={() => onClose()}
          >
            X
          </button>
          {/* Modal Content */}
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Section */}
            <div className="bg-black p-6 w-full md:w-2/3 flex flex-col justify-center text-center md:text-left">
              <h1 className="text-white text-3xl sm:text-4xl font-bold mb-4">
                {t('navigation.nav1')}
              </h1>
              <h3 className="text-myColor6 text-2xl sm:text-3xl font-bold mb-4">
                {t('aboutus.subtitle')}
              </h3>
              <p className="text-white text-base sm:text-lg font-semibold">
                {t('aboutus.paragraphe')}
              </p>
            </div>
            {/* Right Section: Image */}
            <div className="hidden md:block md:w-1/3">
              <img
                src="/assets/images/aboutUsimg.png"
                alt="aboutUsimg"
                className="w-full h-[500px] max-w-sm mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}