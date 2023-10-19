
'use client';

import { Button, Dropdown, Navbar, Avatar } from 'flowbite-react';
import FomrChaza from './FormChaza';

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
                                Mis comentarios
                            </Button>
                            <span className="bar"></span>
                            <Button className='px-5 mx-1'>
                                Seguidos
                            </Button>
                            <span className="bar"></span>
                            <Button className='px-5 mx-1'>
                                Mis estadisticas
                            </Button>
                            <span className="bar"></span>
                            <Button id='action' data-modal-target="edit" data-modal-toggle="edit" className="action hover:bg-sky-700 px-5 mx-1">
                                Editar Perfil
                            </Button>
                            <FomrChaza modal="edit" title="Actualiza tus datos" _id={"652dbb955de988ab1c455dcc"}></FomrChaza>
                        </Navbar.Collapse>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}


