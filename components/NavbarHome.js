'use client';

import { Button, Navbar } from 'flowbite-react';

export default function NavbarHome() {
    return (
        <Navbar
            fluid
            rounded
            className='NavbarHome justify-end'
        >
            <Navbar.Brand href="https://flowbite-react.com">
                <img
                    alt="Flowbite React Logo"
                    className="mr-3 h-6 sm:h-9"
                    src="../vercel.svg"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    UNBiters
                </span>
            </Navbar.Brand>
            <div className="flex md:order-3">
                <Button className='px-5 mx-1'>
                    ¿Tienes una chaza?
                </Button>
                <Button className='px-5 mx-1'>
                    Iniciar Sesion
                </Button>
                <Button className='px-5 mx-1'>
                    Registrarse
                </Button>
            </div>
        </Navbar>
    )
}


