'use client';
import React, { useState } from 'react';
import { Button } from 'flowbite-react';

export default function ResetPassword() {

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await client.post('users/resetPassword', { password, passwordConfirm });
            console.log(response)
            if (password == passwordConfirm) {
                console.log("hola");
            }
        } catch (error) {
            console.error('Error al cambiar contraseña', error);
        }
    };

    return (
        <div className="mt-8">
            <div className=" pt-24 pb-24 flex justify-center items-center">
                <div className=" max-w-bg mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden">
                    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md text-center">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Cambiar contraseña</h2>

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



                            <Button type="submit" style={{ background: "#D63447" }}
                                className="px-5 mx-1 shadow-xl">
                                Confirmar
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}