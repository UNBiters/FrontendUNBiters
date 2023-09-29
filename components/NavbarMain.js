'use client';

import { Button, Dropdown, Navbar, Avatar } from 'flowbite-react';

export default function NavbarMain({ isLogin }) {
    return (
        <div className=''>

            <Navbar
                fluid
                
                className='NavbarMain justify-end fixed w-full z-20 top-0 left-0'
            >
                <Navbar.Brand href="/">
                    <img
                        alt="Logo"
                        className="mr-3 lg:h-12 sm:h-9"
                        src="/images/logo.png"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        UNBiters
                    </span>
                </Navbar.Brand>
                {isLogin ?

                    <div className="NavbarProfile flex md:order-2">
                        <div className="pt-2 mr-5">

                            <Navbar.Collapse>
                                <span className="bar"></span>
                                <Button href='/' className='px-5 mx-1'>
                                    Comunidad
                                </Button>
                                <span className="bar"></span>
                                <Button href='/unbiters/chazas' className='px-5 mx-1'>
                                    Chazas
                                </Button>
                                <span className="bar"></span>
                                <Button href='/unbiters/tags' className='px-5 mx-1'>
                                    Categorias
                                </Button>
                                <span className="bar"></span>
                            </Navbar.Collapse>
                        </div>
                        <div className=" flex md:order-2">
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={<Avatar className="pr-2" alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">
                                        Bonnie Green
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        name@flowbite.com
                                    </span>
                                </Dropdown.Header>
                                <Dropdown.Item href='/unbiters/profile'>
                                    Editar Perfil
                                </Dropdown.Item>
                                <Dropdown.Item href='/'>
                                    Información
                                </Dropdown.Item>
                                <Dropdown.Item href='/'>
                                    Actividad reciente
                                </Dropdown.Item>
                                <Dropdown.Item href='/'>
                                    Calificaciones
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href='/login'>
                                    Cerrar Sesion
                                </Dropdown.Item>
                            </Dropdown>
                            <Navbar.Toggle />

                        </div>
                    </div> :
                    <div className="flex md:order-3">
                        <Button href='/register' className='px-5 mx-1'>
                            ¿Tienes una chaza?
                        </Button>
                        <Button href='/login' className='px-5 mx-1'>
                            Iniciar Sesion
                        </Button>
                        <Button href='/register' className='px-5 mx-1'>
                            Registrarse
                        </Button>
                    </div>}
            </Navbar>
        </div>
    )
}


