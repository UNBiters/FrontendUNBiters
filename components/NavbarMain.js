'use client';

import { Button, Dropdown, Navbar, Avatar } from 'flowbite-react';

export default function NavbarMain({ isLogin }) {
    return (
        <Navbar
            fluid
            rounded
            className='NavbarMain justify-end'
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
            {isLogin ?

                <div className="NavbarProfile flex md:order-2">
                    <div className="pt-2 mr-5">

                        <Navbar.Collapse>
                            <span className="bar"></span>
                            <Button className='px-5 mx-1'>
                                Comunidad
                            </Button>
                            <span className="bar"></span>
                            <Button className='px-5 mx-1'>
                                Chazas
                            </Button>
                            <span className="bar"></span>
                            <Button className='px-5 mx-1'>
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
                            <Dropdown.Item>
                                Editar Perfil
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Información
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Actividad reciente
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Calificaciones
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                Cerrar Sesion
                            </Dropdown.Item>
                        </Dropdown>
                        <Navbar.Toggle />

                    </div>
                </div> :
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
                </div>}
        </Navbar>
    )
}


