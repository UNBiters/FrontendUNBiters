'use client';
export default function ContactUs() {
    const handleEmailClick = () => {
        window.location.href = "mailto:unbiters@gmail.com";
    }

    const handleWhatsAppClick = () => {
        window.open("https://wa.me/qr/RCGW42NNRI6OK1", "_blank");
    }

    const handleDiscordClick = () => {
        window.open("https://discord.gg/Eece7KnMHq", "_blank");
    }

    return (
        <div className="mt-8 general">
            <div className=" pt-24 flex justify-center items-center">
                <div className=" max-w-bg mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden">
                    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md text-center">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Contactanos</h2>
                        <p className=" mb-8 lg:mb-16 font-dark text-gray-800 dark:text-gray-500 sm:text-xl">
                            ¿Tienes alguna duda o problema con nuestra app?
                            <br />
                            En UNBiters, nos comprometemos a ofrecer un soporte de alta calidad a nuestros usuarios.
                            Nuestro equipo de expertos está disponible para ayudarte con cualquier problema que puedas tener con nuestra app.
                            <br />
                        </p>
                        <div className="space-y-4">
                            <button onClick={handleEmailClick} className="py-3 px-5 ml-2.5 mr-2.5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Contactar por Correo
                            </button>
                            <button onClick={handleWhatsAppClick} className="py-3 px-5 ml-2.5 mr-2.5 text-sm font-medium text-center text-white rounded-lg bg-green-500 sm:w-fit hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-primary-800">
                                Contactar por WhatsApp
                            </button>
                            <button onClick={handleDiscordClick} className="py-3 px-5 ml-2.5 mr-2.5 text-sm font-medium text-center text-white rounded-lg bg-purple-500 sm:w-fit hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-primary-800">
                                Unirse a Discord
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}