'use client'
import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import client from "@/config/client";
import Link from 'next/link';


export default function ForgotPassword() {
    const [correo, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await client.post('users/forgotPassword', { correo });

            if (response.data.status === 'success') {
                alert('Correo enviado con éxito');
                window.location.href = '/unbiters/help/confirmEmail';

            }
        } catch (error) {
            console.error('Error al enviar el correo, por favor revisar el correo', error);
            setError('Error al enviar el correo, por favor revisar el correo')

            setTimeout(function () {
                setError("")
            }, 5000);
        }
    };

    return (
        <div style={{ backgroundImage: 'url(/images/backLogin.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>x
            <div className="containerLogin flex justify-center items-center">
                <div className="max-w mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="flex flex-col items-center p-10">
                        {error ?
                            <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">Advertencia!</span> {error}
                                </div>
                            </div>
                            : null}
                        <img alt="Logo" className="h-20" src="/images/logo.png" />

                        <a className="block mt-1 text-bg leading-tight font-bold text-black">Ingrese el correo asociado a la cuenta que desea recuperar.</a>
                        <a className="block mt-1 text-md leading-tight font-medium text-black">Se le enviará un link al correo para que pueda reestablcer su contraseña.</a>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                id="email"
                                className="w-full mt-5 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light "
                                placeholder="Email"
                                required
                                value={correo}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Button type='submit' className='px-5 mx-1 font-bold text-balck shadow-xl' style={{ background: "#D63447" }}>
                                Restablecer contraseña
                            </Button>
                        </form>


                        <hr className="border-t border-red-500 border-2 my-6" style={{ width: '90%' }} />
                        <div className="flex flex-row">
                            <div className="basis-32">¿No tienes cuenta?</div>
                            <div className="basis-10">
                                <Link href="/unbiters/register" className="block mt-1 text-md leading-tight font-bold text-black hover:underline">
                                    Registrate
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}