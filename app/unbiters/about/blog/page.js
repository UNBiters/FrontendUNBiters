'use client';
import { Button } from 'flowbite-react';
import Image from "next/image";

export default function confirmEmail() {
    return (
        
            <div className="justify-items-center bg-white pt-12 text-center h-full " >
                    <div className="flex flex-col items-center p-5">
                        <Image
                            alt="Logo"
                            height={110}
                            width={110}
                            src="/images/logo.png"
                        />
                        <h1
                            className="block mt-3 mb-1 text-2xl leading-tight font-bold text-black text-center">PONTE AL CORRIENTE CON UNBITERS
                        </h1>
                        
                        <p>Te hemos enviado un enlace al correo registrado para que puedas continuar con el proceso de recuperación de tu contraseña. Recuerda revisar la carpeta de SPAM en caso de que no encuentres el correo.</p>
                        
                        <h2
                            className="block mt-2 mb-1 text-md leading-tight font-bold text-black text-center">Tienes 10 minutos para hacer uso de ese link.
                        </h2>
                        
                        <p>Si tienes preguntas contáctanos a través de <a href="/unbiters/contactus"className="text-md leading-tight font-bold text-black hover:underline">Este link</a>.</p>
                        


                    </div>
                </div>
            
        

    )
}