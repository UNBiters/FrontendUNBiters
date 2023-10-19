'use client'
import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import client from "@/config/client";
import axios from 'axios';


export default function ForgotPassword() {
    const [correo, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await client.post('users/forgotPassword', { correo });
            console.log(response)
            if (response.data.status === 'success') {
                alert('Correo enviado con éxito'); 
            }
        } catch (error) {
            console.error('Error al enviar el correo', error);
        }
    };

    return (
        <div style={{ backgroundImage: 'url(/images/backLogin.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>x
        <div className="containerLogin flex justify-center items-center">
            <div className="max-w mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex md:flex-col md:items-center p-10">
                    <img alt="Logo" className="h-20" src="/images/logo.png" />

                    <a className="block mt-1 text-bg leading-tight font-bold text-black">Ingrese el correo asociado a la cuenta que desea recuperar.</a>
                    <a className="block mt-1 text-md leading-tight font-medium text-black">Se le enviará un link al correo para que pueda reestablcer su contraseña.</a>

                    <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                id="correo"
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
  