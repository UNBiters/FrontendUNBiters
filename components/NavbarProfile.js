
'use client'
import { Button, Dropdown, Navbar, Avatar } from 'flowbite-react';
import FormChaza from './Forms/FormChaza';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import client from "@/config/client"

export default function NavbarProfile({ id, data }) {
    const [isChaza, setIsChaza] = useState('false')
    const [chaza, setChaza] = useState([])
    const [existChaza, setExistChaza] = useState(false)
    useEffect(() => {
        setIsChaza(window.sessionStorage.getItem('chaza'))

        var token = window.sessionStorage.getItem('token');
        client.get("chazas/myChaza", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((res) => {
                var chaza = res.data.data.myChaza[0]
                if (chaza) {
                    setChaza(chaza)
                    setExistChaza(true)
                }
            })
    }, [])
    return (
        <div className='md:0px' style={{height: "60px"}}>

            <Navbar
                fluid
                className='NavbarMain justify-end w-full'
            >
                <Navbar.Brand href="/">
                </Navbar.Brand>
                <div className="NavbarProfile flex md:order-2">
                    <div className="pt-2 mr-5">
                        <Navbar.Collapse >
                            <span className="bar"></span>
                            <Link href='/unbiters/profile/posts' className='grid content-center px-5 mx-1'>
                                Mis publicaciones
                            </Link>
                            <span className="bar"></span>
                            <Link href='/unbiters/profile' className='grid content-center  px-5 mx-1'>
                                Mis estadisticas
                            </Link>
                            <span className="bar"></span>
                            <Link href='/unbiters/profile/comments' className='grid content-center  px-5 mx-1'>
                                Mis comentarios
                            </Link>
                            <span className="bar"></span>

                            <Link href='/unbiters/profile/me' id='action' className='py-2 rounded-md action hover:bg-sky-700 grid content-center  px-5 mx-1'>
                                <span className="bar"></span>
                                {existChaza ? isChaza ? "Editar Chaza" : "Editar Perfil" : "Crea tu chaza"}
                            </Link>
                            {/*data-modal-target="edit" data-modal-toggle="edit"  */}
                            {/*<FormChaza modal="edit" title={!existChaza ? "Crea tu chaza" : "Editar Perfil"} created={!existChaza ? true : false} _id={id}></FormChaza>*/}
                        </Navbar.Collapse>
                    </div>
                    <div className="flex sm:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline  >
                            <Dropdown.Header className='text-center'>
                            </Dropdown.Header>
                        </Dropdown>
                        <Navbar.Toggle />

                    </div></div>
            </Navbar>
        </div>
    )
}


