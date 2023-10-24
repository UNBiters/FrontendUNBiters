'use client';
import { Button } from 'flowbite-react';
import Image from "next/image";

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
                            className="block mt-1 text-md leading-tight font-bold text-black text-center">Terminos y condiciones UNBiters
                        </h1>
                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">1. Introducción
                        </h2>
                        <p>Bienvenido a UNBiters. Estos Términos y Condiciones de Uso rigen el uso de nuestra plataforma web y servicios relacionados. Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones en su totalidad.</p>
                        
                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">2. Uso del Sitio
                        </h2>
                        <h3 className="block mt-1 text-md leading-tight font-bold text-black text-center">2.1. Registro de Usuarios:</h3>
                        <p>Para acceder a ciertas funcionalidades de la plataforma, puedes necesitar registrarte y proporcionar información precisa y actualizada.</p>
                        <h3 className="block mt-1 text-md leading-tight font-bold text-black text-center">2.2. Contenido del Usuario: </h3>
                        <p>Al publicar contenido, como reseñas y puntuaciones, garantizas que tienes los derechos necesarios sobre ese contenido y que no viola los derechos de terceros ni las leyes aplicables.</p>

                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">3. Propiedad Intelectual
                        </h2>
                        <h3 className="block mt-1 text-md leading-tight font-bold text-black text-center">3.1. Derechos de Autor:</h3>
                        <p>Todo el contenido generado por los usuarios sigue siendo propiedad de sus respectivos propietarios.</p>
                        <h3 className="block mt-1 text-md leading-tight font-bold text-black text-center">3.2. Licencia: </h3>
                        <p>Al publicar contenido en nuestra plataforma, otorgas a UNBiters una licencia no exclusiva, transferible, sublicenciable, libre de regalías para usar, reproducir, modificar, distribuir y mostrar ese contenido.</p>

                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">4. Contenido Prohibido
                        </h2>
                        <p>Está prohibido publicar contenido que sea ilegal, difamatorio, obsceno, amenazante, ofensivo, o que promueva la violencia o la discriminación.</p>

                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">5. Responsabilidad
                        </h2>
                        <h3 className="block mt-1 text-md leading-tight font-bold text-black text-center">5.1. Precisión del Contenido:</h3>
                        <p>UNBiters no garantiza la exactitud, integridad o actualidad de las reseñas y puntuaciones publicadas en la plataforma.</p>
                        <h3 className="block mt-1 text-md leading-tight font-bold text-black text-center">5.2. Responsabilidad del Usuario:</h3>
                        <p>Eres el único responsable del contenido que publicas en el sitio.</p>

                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">6. Privacidad
                        </h2>
                        <h3 className="block mt-1 text-md leading-tight font-bold text-black text-center">6.1. Consentimiento para la Recopilación de Datos: </h3>
                        <p>Al utilizar este servicio, otorgas tu consentimiento expreso para la recopilación y procesamiento de tu información personal de acuerdo con los términos de nuestra Política de Privacidad.</p>
                        <h3 className="block mt-1 text-md leading-tight font-bold text-black text-center">6.2. Seguridad de la Información:</h3>
                        <p>Implementamos medidas de seguridad adecuadas para proteger tu información contra accesos no autorizados, alteraciones, divulgaciones o destrucciones no autorizadas.</p>
                        <h3 className="block mt-1 text-md leading-tight font-bold text-black text-center">6.3. Terceros y Proveedores de Servicios: </h3>
                        <p>En algunos casos, podemos compartir tu información con terceros y proveedores de servicios de confianza para mejorar y optimizar la funcionalidad de la plataforma. Estos terceros están sujetos a acuerdos de confidencialidad y deben cumplir con las leyes de privacidad aplicables.</p>

                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">7. Modificaciones de los Términos
                        </h2>
                        <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Te recomendamos revisar periódicamente los términos y condiciones.</p>

                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">8. Terminación del Servicio
                        </h2>
                        <p>Nos reservamos el derecho de suspender o terminar tu acceso a la plataforma en cualquier momento y por cualquier motivo, sin previo aviso.</p>

                        <h2
                            className="block mt-5 text-md leading-tight font-bold text-black text-center">9. Contacto
                        </h2>
                        <p>Si tienes preguntas o comentarios sobre estos Términos y Condiciones, contáctanos a través de <a href="/unbiters/contactus"className="text-md leading-tight font-bold text-black hover:underline">Este link</a>.</p>
                        


                    </div>
                </div>
            </div>
        </div>

    )
}