import React from 'react'
import { Button } from '../ui/button';
import Logo from '../ui/logo';

export default function Modal({ isVisible, onClose }: { isVisible: boolean; onClose: () => void } ) {
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
        <div className='w-[1200px] flex flex-col'>
            <button className="text-white text-xl place-self-end" 
            onClick={() => onClose()}>x</button>
            <div className='bg-white rounded flex justify-between'>
            {/* <div className="mx-auto h-10 w-auto"> */}
            <div className='bg-black w-[700px] flex flex-col justify-center pl-2'>
              <h1 className='text-white text-5xl font-bold pb-4'>About Us</h1>
              <h3 className='text-myColor2 text-3xl font-bold pb-4'>Safe, comprehensive and fast platform</h3>
              <p className='text-white text-lg font-bold	'>Welcome to our platform, a dynamic space where creativity meets opportunity. 
                Our mission is to empower freelancers by providing them with a professional environment
                 to showcase their skills and services. At the same time, we strive to connect clients 
                 with talented individuals who can bring their projects to life. Whether you're a freelancer 
                 looking to grow your career or a client searching for the perfect collaborator, 
                 our platform is designed to simplify connections, ensure transparency, and foster collaboration. 
                 Together, let's redefine the way work gets done!</p>
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
