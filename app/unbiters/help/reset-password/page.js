'use client';
import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { useEffect } from 'react';
import client from "@/config/client";

export default function ResetPassword() {

    const [token, setToken] = useState(null);
    const [contraseña, setPassword] = useState('');
    const [confirmarContraseña, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');



    useEffect(() => {
        const url = window.location.hash;
        const token = url.substring(1)
        setToken(token);

        console.log(token)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (contraseña !== confirmarContraseña) {
            setError('Las contraseñas no coinciden');
            
            return;
        }
        

        try {
            const response = await client.patch(`users/resetPassword/${token}`, { contraseña, confirmarContraseña });
            console.log(response)
            alert('Contraseña cambiada con éxito');
            window.location.href = '/unbiters/login';
        } catch (error) {
            console.log('Error al enviar la solicitud:', error);
            setError("Error al enviar la solicitud")
        }
    };

    return (
        <div style={{ backgroundImage: 'url(/images/backLogin.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>x
            <div className="mt-8">
                <div className=" pt-24 pb-24 flex justify-center items-center">
                    <div className=" max-w-bg mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden">
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

                            <a className="block mt-1 text-bg leading-tight font-bold text-black">Ingrese la nueva contraseña para su cuenta.</a>

                            <form onSubmit={handleSubmit}>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light "
                                    placeholder="Nueva contraseña"
                                    required
                                    value={contraseña}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    type="password"
                                    id="passwordConfirm"
                                    className="w-full mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light "
                                    placeholder="Repita la contraseña"
                                    required
                                    value={confirmarContraseña}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                />



                                <Button type='submit' className='px-5 mx-1 mb-4 font-bold text-balck shadow-xl' style={{ background: "#D63447" }}>
                                    Restablecer contraseña
                                </Button>
                            </form>
                            <p>¿Necesitas ayuda?, contáctanos a través de <a href="/unbiters/contactus" className="text-md leading-tight font-bold text-black hover:underline">Este link</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}