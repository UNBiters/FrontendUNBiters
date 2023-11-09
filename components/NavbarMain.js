'use client';

import { Button, Dropdown, Navbar, Avatar } from 'flowbite-react';
import { useUsers } from '@/context/UserContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import Logout from './Modal/Logout';

export default function NavbarMain() {
    const { isLogin } = useUsers()
    console.log("islogin", isLogin)
    //const [isLogin, setIsLogin] = useState("")
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const router = useRouter();
    const [isOpen1, setIsOpen1] = useState(false)

    const isLogout = () => {
        Cookies.remove('token', { path: '/' })
        window.sessionStorage.clear()
        router.push('/unbiters/login')

    }

    useEffect(() => {
        //console.log(window.sessionStorage.getItem('token'))
        if (window.sessionStorage.getItem('token') !== null) {
            //setIsLogin(true)
        } else {
            //setIsLogin(false)
        }
        console.log(window.sessionStorage.getItem('email'))
        var correo = window.sessionStorage.getItem('email')
        if (correo !== null) {
            setEmail(correo)
        } else {
            setEmail("")
        }
        console.log(window.sessionStorage.getItem('nombre'))
        var name = window.sessionStorage.getItem('nombre')
        if (name !== null) {
            setNombre(name)
        } else {
            setNombre("false")
        }
    }, [])

    if (isLogin == null) return <></>
    return (
        <div className=''>

            {isOpen1 && (<Logout onClose={() => { setIsOpen1(false) }} onLogout={() => { router.push("/unbiters/login"); isLogout(); setIsOpen1(false); }}
                onRedirect={() => { setIsOpen1(false) }} />)
            }
            <Navbar
                fluid
                className='NavbarMain justify-end md:fixed w-full z-20 top-0 left-0'
            >
                <Navbar.Brand href="/">
                    <img
                        id='logo'
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
                                <Link href='/' className='px-5 mx-1'>
                                    Comunidad
                                </Link>
                                <span className="bar"></span>
                                <Link href='/unbiters/chazas' className='px-5 mx-1'>
                                    Chazas
                                </Link>
                                <span className="bar"></span>
                                <Link href='/unbiters/about' className='px-5 mx-1'>
                                    Nosotros
                                </Link>
                                <span className="bar"></span>
                            </Navbar.Collapse>
                        </div>
                        <div className="flex sm:order-2">
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={<Avatar className="pr-2" alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />}
                            >
                                <Dropdown.Header className='text-center'>
                                    <span className="block text-sm">
                                        {nombre}
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        {email}
                                    </span>
                                </Dropdown.Header>
                                <ul className='bg-white text-end mx-auto px-auto '>
                                    <li className='pr-4'>
                                        <Link href='/unbiters/profile'>
                                            Editar Perfil
                                        </Link>
                                    </li>
                                    <li className='pr-4'>
                                        <Link href='/'>
                                            Información
                                        </Link>
                                    </li>
                                    <li className='pr-4'>
                                        <Link href='/'>
                                            Actividad reciente
                                        </Link>
                                    </li>
                                    <li className='pr-4'>
                                        <Link href='/'>
                                            Calificaciones
                                        </Link>
                                    </li>
                                    <Dropdown.Divider />
                                    <li className='pr-4'>
                                        <button onClick={() =>
                                            setIsOpen1(true)}>
                                            Cerrar Sesion
                                        </button>
                                    </li>
                                </ul>
                            </Dropdown>
                            <Navbar.Toggle />

                        </div>
                    </div> :
                    <div className="flex md:order-3">
                        <Link href='/unbiters/register' className='px-5 mx-1'>
                            ¿Tienes una chaza?
                        </Link>
                        <Link href='/unbiters/login' className='px-5 mx-1'>
                            Iniciar Sesion
                        </Link>
                        <Link href='/unbiters/register' className='px-5 mx-1'>
                            Registrarse
                        </Link>
                    </div>
                }
            </Navbar >
        </div >
    )
}


