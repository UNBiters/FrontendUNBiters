'use client'

import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import client from "@/config/client";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Login() {

    const { push } = useRouter();
    const [correo, setEmail] = useState('');
    const [contraseña, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await client.post('users/login', { correo, contraseña });

            console.log(response)
            if (response.data.status === 'success') {
                const { token } = response.data;
                const { nombre, _id, chaza } = response.data.data.user;
                console.log(response)
                Cookies.set('token', token)
                window.sessionStorage.setItem('token', token);
                window.sessionStorage.setItem('nombre', nombre);
                window.sessionStorage.setItem('id', _id);
                window.sessionStorage.setItem('sesion', 'true');
                if (chaza) {
                    window.sessionStorage.setItem('chaza', 'true');
                } else {
                    window.sessionStorage.setItem('chaza', 'false');
                }
                push('/')
            }
        } catch (error) {
            console.log('Error al enviar la solicitud:', error);
        }
    }
    return (
        <div style={{ backgroundImage: 'url(/images/backLogin.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>x
            <div className=" pt-24 flex justify-center items-center">
                <div className=" max-w-sm mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden ">
                    <div className="md:flex md:flex-col md:items-center p-5">
                        <Image
                            alt="Logo"
                            height={110}
                            width={110}
                            src="/images/logo.png"
                        />


                        <a
                            href="/unbiters/help/t&c"
                            className="block mt-1 text-xs leading-tight font-medium text-black hover:underline text-center">Al continuar aceptas los terminos y
                            condiciones y aceptas nuestra politica de tratamiento de datos
                        </a>


                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                id="correo"
                                className="w-full mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light "
                                placeholder="Email"
                                required
                                value={correo}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                id="contraseña"
                                className="w-full mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="Contraseña"
                                required
                                value={contraseña}
                                onChange={(e) => setPassword(e.target.value)}
                            />



                            <Button type="submit" style={{ background: "#D63447" }}
                                className="px-5 mx-1 shadow-xl">
                                Iniciar Sesión
                            </Button>
                        </form>

                        <a href="/unbiters/help/password" className='text-sm mt-2 mb-3 block ml-auto hover:underline'>¿Olvido su contraseña?</a>



                        <div className="flex items-center w-full space-x-2">
                            <hr className="flex-1 border-t border-[#D63447]" />
                            <span className=" text-[#D63447] ">o</span>
                            <hr className="flex-1 border-t border-[#D63447]" />
                        </div>


                        <Button href='#' style={{ background: "#F5F5F5" }} className='px-5 mx-1 mb-4 text-balck shadow-xl w-full' >
                            <Image
                                alt="Logo de google"
                                width={20}
                                height={20}
                                className="mr-2"
                                src="/images/GoogleLogo.png"
                            ></Image>
                            Continua con Google
                        </Button>
                        <Button href='#' style={{ background: "#F5F5F5" }} className='px-5 mx-1 text-balck shadow-xl w-full' >
                            <Image
                                alt="Logo de google"
                                width={20}
                                height={20}
                                className="mr-2"
                                src="/images/XLogo.png"
                            ></Image>

                            Iniciar Sesión con X
                        </Button>
                        <hr className="border-t border-red-500 border-2 my-6" style={{ width: '90%' }} />
                        <div className="flex flex-row">
                            <div className="basis-32">¿No tienes cuenta?</div>
                            <div className="basis-10">
                                <a href="#" className="block mt-1 text-md leading-tight font-bold text-black hover:underline">
                                    Registrate
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

