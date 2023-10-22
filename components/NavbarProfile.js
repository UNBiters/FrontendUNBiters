
'use client'
import { Button, Dropdown, Navbar, Avatar } from 'flowbite-react';
import FormChaza from './FormChaza';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NavbarProfile({ id, data }) {
    const [isChaza, setIsChaza] = useState('false')
    useEffect(() => {
        setIsChaza(window.sessionStorage.getItem('chaza'))
    }, [])
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
                            <Link href='/unbiters/profile/posts' className='px-5 mx-1'>
                                Mis comentarios
                            </Link>
                            <span className="bar"></span>
                            <Link href='/unbiters/profile' className='px-5 mx-1'>
                                Seguidos
                            </Link>
                            <span className="bar"></span>
                            <Link href='/unbiters/profile/posts' className='px-5 mx-1'>
                                Mis estadisticas
                            </Link>
                            <span className="bar"></span>
                            <Button id='action' data-modal-target="edit" data-modal-toggle="edit" className="action hover:bg-sky-700 px-5 mx-1">
                                {isChaza ? "Tu Chaza" : "Editar Perfil"}
                            </Button>
                            <FormChaza modal="edit" title={isChaza ? "Tu Chaza" : "Editar Perfil"} _id={id}></FormChaza>
                        </Navbar.Collapse>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}


