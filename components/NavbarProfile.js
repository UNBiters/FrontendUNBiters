
'use client';

import { Button, Dropdown, Navbar, Avatar } from 'flowbite-react';

export default function NavbarProfile() {
    return (
        <div>

            <Navbar
                fluid
                
                className='NavbarMain MiniNav'
            >
                <div className="NavbarProfile justify-items-center flex md:order-2">
                    <div className="">
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
                            <Button id='action' className="action hover:bg-sky-700 px-5 mx-1">
                                Editar Perfil
                            </Button>
                        </Navbar.Collapse>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}


