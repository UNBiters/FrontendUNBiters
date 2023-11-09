'use client';
import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { useEffect } from 'react';

export default function ResetPassword() {

    const [token, setToken] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');



    useEffect(() => {
        const url = new URL(window.location.href);
        const token = url.pathname.split('/').pop();
        setToken(token);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== passwordConfirm) {
            alert('Las contraseñas no coinciden');
            return;
        }
    
        try {
            const response = await client.post('users/resetPassword/${token}', { password, passwordConfirm });
            console.log(response)
            alert('Contraseña cambiada con éxito');
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
                    <div className="md:flex md:flex-col md:items-center p-10">
                        <img alt="Logo" className="h-20" src="/images/logo.png" />

                        <a className="block mt-1 text-bg leading-tight font-bold text-black">Ingrese la nueva contraseña para su cuenta.</a>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="password"
                                id="password"
                                className="w-full mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light "
                                placeholder="Nueva contraseña"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                id="passwordConfirm"
                                className="w-full mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light "
                                placeholder="Repita la contraseña"
                                required
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />



                            <Button type='submit' className='px-5 mx-1 mb-4 font-bold text-balck shadow-xl' style={{ background: "#D63447" }}>
                                Restablecer contraseña
                            </Button>
                        </form>
                        <p>¿Necesitas ayuda?, contáctanos a través de <a href="/unbiters/contactus"className="text-md leading-tight font-bold text-black hover:underline">Este link</a>.</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}