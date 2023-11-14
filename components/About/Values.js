import Image from "next/image"
import Link from "next/link";


export default function Values() {
    const team = [
        {
            "id": "1",
            "nombre": "Andrés Felipe López Gutiérrez",
            "cargo": "Desarrollador Frontend Junior",
            "description": "Estoy perfeccionando mis habilidades y aumentando mis conociminetos día a día :D",
            "facebook": "https://web.facebook.com/andres.lopezgutierrez.94/",
            "linkedin": "https://www.linkedin.com/in/anlopezgu/",
            "github": "https://github.com/anlopezgu",
            "url": "/images/Andrelo.jpg"
        },

        {
            "id": "2",
            "nombre": "John Jairo Riaño Martinez",
            "cargo": "Desarrollador FullStack",
            "description": "Cuento con habildades en desarrollo de Frontend con tecnologias como ReactJS, NextJS",
            "facebook": "ada",
            "linkedin": "",
            "github": "",
            "url": "/images/1697919953864.jpg"
        },
        {
            "id": "3",
            "nombre": "David Stiven Poveda Tabirda",
            "cargo": "Desarrollador Backend",
            "description": "Cuento con habildades en desarrollo de Backend con NodeJS, Django. Manejo bases de datos especializadas en NoSQL pero tambien trabjo en tecnologias como MySQL y PostgresSQL. Soy un programador en constante busqueda de nuevas herramientas!",
            "facebook": "https://www.facebook.com/davidstiven.povedat/",
            "linkedin": "https://www.linkedin.com/in/david-stiven-poveda-taborda-521ab7207/",
            "github": "https://github.com/Dapstab",
            "url": "/images/12311421.jpg"
        },
        {
            "id": "4",
            "nombre": "Gian Emanuel Morales González",
            "cargo": "Desarrollador Frontend",
            "description": "Cuento con habilidades en desarrollo de Frontend en Frameworks como NextJS, Vue o tailwindCSS",
            "facebook": "",
            "linkedin": "https://www.linkedin.com/in/gmoralesg/",
            "github": "https://github.com/gimoralesg",
            "url": "/images/gemgpfp.jpg"

        }
    ]
    return (
        <div className="h-full">

            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <span className="mb-1 text-lg font-bold leading-none text-gray-900 dark:text-white">Visión</span>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Ser la plataforma líder de la Universidad Nacional de Colombia sede Bogotá en promover la calidad y transparencia de nuestros servicios, y en un plazo de dos años, expandirnos a otras sedes a nivel nacional.</p>
                </li>
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <span className="mb-1 text-lg font-bold leading-none text-gray-900 dark:text-white">Misión</span>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Dar a conocer la opinión de las chazas en la Universidad Nacional de Colombia sede Bogotá. A través de un foro web en el que la comunidad universitaria califica y reseñan sus experiencias, permitiendo a propietarios mejorar la calidad de sus servicios.</p>
                </li>
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <span className="mb-1 text-lg font-bold leading-none text-gray-900 dark:text-white">Nuestros valores</span>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Nuestro equipo se destaca por su flexibilidad, empatia, sinceridad y colaboración.</p>
                </li>
                <li className="ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <span className="mb-1 text-lg font-bold leading-none text-gray-900 dark:text-white">Nuestro equipo</span>
                    <p className="mb-10 text-base font-normal text-gray-500 dark:text-gray-400"> El equipo de UNBiters está formado por un grupo de apasionados por el desarrollo que están comprometidos a mejorar como grupo e individualmente en el desarrollo profesional.
                    </p>
                    <div className="grid gap-8 mb-6 lg:mb-16 sm:grid-cols-2">
                        {team ? team.map((tea) => (

                            <div key={tea.id} className="mb-10 items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                                <div className="sm:min-w-250 relative flex w-full min-w-[12rem] max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                                    {tea.url != "" ?
                                        <Image
                                            src={tea.url}
                                            width={500}
                                            height={500}
                                            alt="Picture of the author"
                                        />
                                        : null}
                                </div>
                                <div className="p-5">
                                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        <a href="#">{tea.nombre}</a>
                                    </h3>
                                    <span className="text-gray-500 dark:text-gray-400">{tea.cargo}</span>
                                    <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{tea.description}</p>
                                    <ul className="flex space-x-4 sm:mt-0">
                                        {tea.facebook != "" ?
                                            <li>
                                                <a href={tea.facebook} target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                                </a>
                                            </li>
                                            : null}
                                        {tea.linkedin != "" ?
                                            <li>
                                                <a href={tea.linkedin} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                                </a>
                                            </li>
                                            : null}
                                        {tea.github != "" ?
                                            <li>
                                                <a href={tea.github} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                                </a>
                                            </li>
                                            : null}
                                    </ul>
                                </div>
                            </div>
                        )) : null}
                    </div>
                </li>
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <span className="mb-1 text-lg font-bold leading-none text-gray-900 dark:text-white">Nuestros Colores</span>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400"> <span className="bg-[#FFD31D] text-black">#FFD31D: </span>El amarillo brillante está asociado con la energía, la felicidad y la positividad. En el contexto de comida, el amarillo puede evocar sensaciones de sabor y frescura, siendo un color atractivo para resaltar platos y productos alimenticios.</p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400"> <span className="bg-[#D63447] text-black">#D63447: </span> El rojo cereza es un tono de rojo profundo que sugiere pasión, apetito y energía. En la industria alimentaria, el rojo a menudo se asocia con la tentación y puede estimular el apetito, haciéndolo un color atractivo para resaltar platillos o productos de comida.</p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400"> <span className="bg-[#F57B51] text-black">#F57B51: </span>El melocotón es un tono suave de naranja que transmite calidez, frescura y apertura. En la comida, el melocotón puede evocar sabores frutales y naturales, siendo un color acogedor para entornos relacionados con alimentos y bebidas.</p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400"> <span className="bg-[#F6EEDF:] text-black">#F6EEDF:: </span>El blanco roto es un tono suave y cálido de blanco que transmite pureza, limpieza y simplicidad. En el contexto de la comida, el blanco roto puede utilizarse para resaltar la frescura y la calidad de los ingredientes, así como para crear una sensación de limpieza y profesionalismo en el entorno alimentario.</p>
                </li>
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <span className="mb-1 text-lg font-bold leading-none text-gray-900 dark:text-white">Nuestras politicas</span>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400"> Para UNBiters es muy importante que sepas cómo funcionamos. A continuación, te proporcionamos toda la <Link href="/unbiters/help/legal"className="text-md leading-tight font-bold text-black hover:underline">información legal</Link> y <Link href="/unbiters/help/t&c"className="text-md leading-tight font-bold text-black hover:underline">nuestros términos y condiciones</Link>.</p>
                    
                </li>
            </ol>

        </div>
    )
}
