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
        <div className='w-[1000px] flex flex-col'>
            <button className="text-white text-xl place-self-end" onClick={() => onClose()}>x</button>
            <div className='bg-white p-6 rounded'>
            {/* <div className="mx-auto h-10 w-auto"> */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center">    
                    <Logo />
                </div>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Log in to your account
                </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded border-0 py-1.5 bg-white shadow-sm ring-1 ring-inset ring-gray-300 text-black sm:text-sm/6"
                        />
                    </div>
                    </div>

                    <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                        Password
                        </label>
                        <div className="text-sm">
                        <a href="#" className="font-semibold text-myColor2 hover:text-indigo-300">
                            Forgot password?
                        </a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded border-0 py-1.5 bg-white shadow-sm ring-1 ring-inset ring-gray-300 text-black sm:text-sm/6"
                        />
                    </div>
                    </div>

                    <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-myColor2 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-myColor2-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Log in
                    </button>
                    {/* <Button className="bg-myColor border-none">
                    <a href="#" className="text-sm/6 ">Get Started </a>
                    </Button> */}
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Not a member?{' '}
                    <a href="#" className="font-semibold text-myColor2 hover:text-indigo-300">
                    Start a 14 day free trial
                    </a>
                </p>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
