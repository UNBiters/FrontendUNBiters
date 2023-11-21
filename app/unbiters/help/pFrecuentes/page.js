'use client';
import { useState } from 'react';
import Image from "next/image";


export default function TC() {
    const [preguntaAbierta, setPreguntaAbierta] = useState(null);

    const handlePreguntaClick = (index) => {
        setPreguntaAbierta(prevIndex => (prevIndex === index) ? null : index);
    }

    const preguntas = [
        {
            pregunta: "¿Qué es una chaza?",
            respuesta: "Las chazas son los puestos de comercio dentro del campus que no le pertenecen a la universidad, generalmente son carritos de comida y carpas."
        },
        {
            pregunta: "¿Tengo que tener una chaza para ser un usuario de UNBiters?",
            respuesta: "No necesariamente, exenten nuestros usuarios pertenecientes a los consumidores de chazas y los dueños de chazas (ten eso en cuenta al REGISTRARTE), los consumidores son la columna de UNBiters ya que ellos dan su opinión sobre las chazas."
        },
        {
            pregunta: "¿Si ya me registré, pero ahora tengo una chaza, tengo que crear otra cuenta?",
            respuesta: "No tienes que crear otra cuenta, desde tu perfil puedes añadir una chaza."
        },
        {
            pregunta: "¿Tengo que ser estudiante de la UNAL para ser parte de UNBiters?",
            respuesta: "No, UNBiters es para toda persona quiera dar su opinión de las chazas de la UNAL sede Bogotá, sin importar si eres estudiante, profesor, administrativo, etc."
        },
        {
            pregunta: "¿Tengo que pagar para hacer uso de UNBiters?",
            respuesta: "No, el uso de UNBiters es totalmente gratuito, sin embargo, tenemos la opción PREMIUM para las chazas, es opcional y permite a las chazas usar UNBiters como un mejor aliado para mejorar sus servicios."
        },
       
       
        
    ];

    return (
        <div className='general'>
            <div className="pt-24 pb-24 flex justify-center items-center">
                <div className="max-w mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden ancho-personalizado">
                    <div className="flex flex-col items-center p-5">
                        <Image
                            alt="Logo"
                            height={110}
                            width={110}
                            src="/images/logo.png"
                        />
                        <h1 
                            className="block mt-1 text-2xl leading-tight font-bold text-black text-center">Preguntas Frecuentes
                        </h1>
                        <h2 
                            className="block mt-1 text-md leading-tight text-black text-center">Para el equipo UNBITERS siempre sera un placer solucionar tus dudas, por eso acá encontaras las preguntas más recurrentes que nos hacen: 
                        </h2>
                        {preguntas.map((item, index) => (
                            <div key={index}>
                                <h3
                                    className="block mt-4 mb-1 text-md leading-tight font-bold text-black text-center"
                                    onClick={() => handlePreguntaClick(index)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {item.pregunta}
                                </h3>
                                {preguntaAbierta === index && (
                                    <p>{item.respuesta}</p>
                                )}
                                
                            </div>
                        ))}
                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">Manual de usuario
                        </h2>
                        <p>Mira nuestro <a href="/Manual_de_usuario.pdf"  className="text-md leading-tight font-bold text-black hover:underline">Manual de usuario</a>.</p>
                    
                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">¿No encontraste la respuesta que necesitas?
                        </h2>
                        <p>Contáctanos a través de <a href="/unbiters/contactus"className="text-md leading-tight font-bold text-black hover:underline">Este link</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}