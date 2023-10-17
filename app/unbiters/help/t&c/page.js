'use client';
import { Button } from 'flowbite-react';

export default function TC() {
    return (
        <div style={{ backgroundImage: 'url(/images/backLogin.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>x
            <div className="containerLogin flex justify-center items-center">
                <div className="max-w mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="md:flex md:flex-col md:items-center p-10">
                        <img alt="Logo" className="h-20" src="/images/logo.png" />

                        <a href="/unbiters/help/t&c" className="block mt-1 text-md leading-tight font-medium text-black hover:underline">Al continuar aceptas los terminos y
                            condiciones y aceptas nuestra politica de tratamiento de datos</a>

                        
                    </div>
                </div>
            </div>
        </div>

    )
}