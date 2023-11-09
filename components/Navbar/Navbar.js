"use client"
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useUsers } from '@/context/UserContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import Logout from '../Modal/Logout';

const navigationLogin = [
    { name: 'Comunidad', href: '/', current: true },
    { name: 'Chazas', href: '/unbiters/chazas', current: false },
    { name: 'Nosotros', href: '/unbiters/about', current: false },
]
const navigationNotLogin = [
    { name: '¿Tienes una chaza?', href: '/unbiters/register', current: false },
    { name: 'Inicia Sesion', href: '/unbiters/login', current: false },
    { name: 'Registrate', href: '/unbiters/register', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar({ profile }) {
    const { isLogin, userData } = useUsers()
    const { chaza } = userData
    //console.log(chaza)
    //console.log("islogin", userData)
    //const [isLogin, setIsLogin] = useState("")
    const [navigation, setNavigation] = useState([])
    const [className, setClassName] = useState("")
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const router = useRouter();
    const [isOpen1, setIsOpen1] = useState(false)

    const isLogout = () => {
        Cookies.remove('token', { path: '/' })
        window.sessionStorage.clear()
        router.push('/unbiters/login')

    }

    const navigationProfile = [
        { name: 'Mi comunidad', href: '/unbiters/profile/community', current: false },
        { name: 'Mis publicaciones', href: '/unbiters/profile/posts', current: false },
        { name: 'Mis estadisticas', href: '/unbiters/profile', current: false },
        { name: 'Mis comentarios', href: '/unbiters/profile/comments', current: false },
        { name: chaza ? 'Editar mi chaza' : "Mi perfil", href: '/unbiters/profile/me', current: true },
    ]
    useEffect(() => {
        if (profile) {
            setNavigation(navigationProfile)
            setClassName("NavbarMain")
        } else {
            if (isLogin) {
                setNavigation(navigationLogin)
            } else {
                setNavigation(navigationNotLogin)
            }
            setClassName("NavbarMain md:fixed w-full z-20 top-0 left-0")
        }
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
    }, [isLogin])
    return (<>
        {isOpen1 && (<Logout onClose={() => { setIsOpen1(false) }} onLogout={() => { router.push("/unbiters/login"); isLogout(); setIsOpen1(false); }}
            onRedirect={() => { setIsOpen1(false) }} />)
        }
        <Disclosure as="nav" className={className}>

            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center  rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex  items-center items-stretch  justify-center md:justify-start flex-1 md:flex-none ">
                                {!profile ?
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="h-10 w-auto"
                                            src="/images/logo.png"
                                            alt="Your Company"
                                        />
                                    </div>
                                    : null
                                }
                                <div className="hidden sm:ml-6 md:block md:visible" >
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-[#e24557] text-white' : 'text-gray-300 hover:bg-[#e24557] hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/* Profile dropdown */}
                                {isLogin && !profile ?
                                    <>
                                        {/*<button
                                            type="button"
                                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>*/}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src="/images/default.png"
                                                        alt=""
                                                    />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        <div className='block px-4 py-2 text-sm text-gray-700' >
                                                            <span className="block text-sm">
                                                                Bienvenido {nombre}
                                                            </span>
                                                        </div>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="/unbiters/profile"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Mi Perfil
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="/unbiters/profile/posts"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Mis publicaciones
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="/unbiters/profile/comments"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Mis comentarios
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href="#"
                                                                onClick={() =>
                                                                    setIsOpen1(true)}
                                                                className={classNames(active ? 'bg-gray-100' : '', 'bg-red-100 block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Cerrar Sesion
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </>
                                    : null}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    className={classNames(
                                        item.current ? 'bg-[#e24557] text-white' : 'text-white hover:bg-[#e24557] hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >

                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-[#e24557] text-white' : 'text-gray-300 hover:bg-[#e24557] hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Link>
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    </>
    )
}