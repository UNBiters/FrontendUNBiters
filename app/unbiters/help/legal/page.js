'use client';
import { Button } from 'flowbite-react';
import Image from "next/image";
import Link from 'next/link'

export default function TC() {
    return (
        <div style={{ backgroundImage: 'url(/images/backLogin.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>x
            <div className=" pt-24 pb-24 flex justify-center items-center">
                <div className=" max-w-bg mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden ancho-personalizado">
                    <div className="md:flex md:flex-col md:items-center p-5">
                        <Image
                            alt="Logo"
                            height={110}
                            width={110}
                            src="/images/logo.png"
                        />
                        <h1
                            className="block mt-1 text-md leading-tight font-bold text-black text-center">Información Legal UNBiters
                        </h1>
                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">1. Protección de Datos Personales
                        </h2>
                        <p>En UNBiters, entendemos la importancia de la privacidad y nos regimos por la Ley Estatutaria 1581 de 2012. Esta ley tiene como objetivo proteger, regular y reglamentar el uso y tratamiento de la información personal de las personas. Te invitamos a revisar el contenido completo de esta ley en el siguiente enlace: <a href="https://www.suin-juriscol.gov.co/viewdocument.asp?ruta=leyes/1684507"className="text-md leading-tight font-bold text-black hover:underline">Ley 1581 de 2012</a>. Valoramos la confianza que depositas en nosotros al proporcionarnos tu información y nos comprometemos a utilizarla de manera segura y conforme a lo establecido en esta normativa.</p>
                        
                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">2. Términos y Condiciones:
                        </h2>
                        <p>Nuestros Términos y Condiciones son un conjunto de reglas y acuerdos que rigen el uso de nuestra plataforma. Estos términos abarcan aspectos como la participación de los usuarios, el contenido permitido, la propiedad intelectual y la responsabilidad legal. Te invitamos a revisar detenidamente estos términos en el siguiente enlace:  <Link href="/unbiters/help/t&c"className="text-md leading-tight font-bold text-black hover:underline">Términos y Condiciones</Link>. Al utilizar nuestra plataforma, aceptas estos términos y te comprometes a cumplir con ellos.</p>
                        
                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">3. Propiedad Intelectual
                        </h2>
                        <p>Entendemos y respetamos la importancia de la propiedad intelectual. Cualquier contenido que publiques en nuestro foro sigue siendo de tu propiedad. Sin embargo, al compartirlo en UNBiters, nos otorgas una licencia no exclusiva, transferible, sublicenciable y libre de regalías para usar, reproducir, modificar, distribuir y mostrar ese contenido en el contexto de nuestra plataforma. Esto nos permite proporcionar y mejorar nuestros servicios para beneficio de toda la comunidad.</p>
                        
                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">4. Ley de Comercio Electrónico
                        </h2>
                        <p>Colombia cuenta con una legislación específica sobre comercio electrónico que establece normas y regulaciones para las transacciones en línea. En UNBiters, nos aseguramos de cumplir con estas regulaciones para garantizar una experiencia segura y confiable para nuestros usuarios. Esto incluye aspectos como la autenticación de transacciones y la protección de datos sensibles.</p>

                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">5. Ley de Protección al Consumidor
                        </h2>
                        <p>En UNBiters, nos tomamos muy en serio la protección de nuestros usuarios. Nos comprometemos a salvaguardar tus datos personales y a promover un ambiente de respeto y colaboración en nuestra plataforma. Esto implica un compromiso activo en la prevención de prácticas engañosas o perjudiciales para los consumidores.</p>
                        
                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">6. Responsabilidad Legal
                        </h2>
                        <p>Nos reservamos el derecho de reportar a las autoridades competentes a los usuarios que lleguen a infringir leyes dentro de nuestra plataforma. Esto se hace con el propósito de garantizar un entorno seguro y legal para todos los usuarios de UNBiters. Cumplir con las leyes vigentes es esencial para mantener la integridad y confiabilidad de nuestra comunidad.</p>
                        
                       
                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">7. Contacto
                        </h2>
                        <p>Si tienes preguntas o comentarios sobre nuestra información legal, contáctanos a través de <Link href="/unbiters/contactus"className="text-md leading-tight font-bold text-black hover:underline">Este link</Link>.</p>
                        


                    </div>
                </div>
            </div>
        </div>

    )
}