import Image from "next/image";
import Link from "next/link";

export default function Values() {
    const team = [
        {
            id: "1",
            nombre: "Andrés Felipe López Gutiérrez",
            cargo: "Desarrollador Frontend Junior",
            description:
                "Estoy perfeccionando mis habilidades y aumentando mis conociminetos día a día :D",
            facebook: "https://web.facebook.com/andres.lopezgutierrez.94/",
            linkedin: "https://www.linkedin.com/in/anlopezgu/",
            github: "https://github.com/anlopezgu",
            url: "/images/Andrelo.jpg",
        },

        {
            id: "2",
            nombre: "John Jairo Riaño Martinez",
            cargo: "Desarrollador FullStack",
            description:
                "Cuento con habildades en desarrollo de Frontend con tecnologias como ReactJS, NextJS",
            facebook: "https://www.facebook.com/jhonjairo.rianomartinez.3?mibextid=ZbWKwL",
            linkedin: "https://www.linkedin.com/in/jorianom/",
            github: "https://github.com/jorianom",
            url: "/images/1697919953864.jpg",
        },
        {
            id: "3",
            nombre: "David Stiven Poveda Tabirda",
            cargo: "Desarrollador Backend",
            description:
                "Cuento con habildades en desarrollo de Backend con NodeJS, Django. Manejo bases de datos especializadas en NoSQL pero tambien trabjo en tecnologias como MySQL y PostgresSQL. Soy un programador en constante busqueda de nuevas herramientas!",
            facebook: "https://www.facebook.com/davidstiven.povedat/",
            linkedin:
                "https://www.linkedin.com/in/david-stiven-poveda-taborda-521ab7207/",
            github: "https://github.com/Dapstab",
            url: "/images/12311421.jpg",
        },
        {
            id: "4",
            nombre: "Gian Emanuel Morales González",
            cargo: "Desarrollador Frontend",
            description:
                "Cuento con habilidades en desarrollo de Frontend en Frameworks como NextJS, Vue o tailwindCSS",
            facebook: "",
            linkedin: "https://www.linkedin.com/in/gmoralesg/",
            github: "https://github.com/gimoralesg",
            url: "/images/gemgpfp.jpg",
        },
    ];
    return (
        <div className="h-full">
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <span className="mb-1 text-lg font-bold leading-none text-gray-900 dark:text-white">
                        Visión
                    </span>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        Ser la plataforma líder de la Universidad Nacional de Colombia
                        sede Bogotá en promover la calidad y transparencia de nuestros
                        servicios, y en un plazo de dos años, expandirnos a otras sedes a
                        nivel nacional.
                    </p>
                </li>
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <span className="mb-1 text-lg font-bold leading-none text-gray-900 dark:text-white">
                        Misión
                    </span>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Dar a conocer la opinión de las chazas en la Universidad Nacional
                        de Colombia sede Bogotá. A través de un foro web en el que la
                        comunidad universitaria califica y reseñan sus experiencias,
                        permitiendo a propietarios mejorar la calidad de sus servicios.
                    </p>
                </li>
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <span className="mb-1 text-lg font-bold leading-none text-gray-900 dark:text-white">
                        Nuestros valores
                    </span>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Nuestro equipo se destaca por su flexibilidad, empatia, sinceridad
                        y colaboración.
                    </p>
                </li>
                <li className="ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <span className="mb-1 text-lg font-bold leading-none text-gray-900 dark:text-white">
                        Nuestro equipo
                    </span>
                    <p className="mb-10 text-base font-normal text-gray-500 dark:text-gray-400">
                        {" "}
                        El equipo de UNBiters está formado por un grupo de apasionados por
                        el desarrollo que están comprometidos a mejorar como grupo e
                        individualmente en el desarrollo profesional.
                    </p>
                    <div className="grid gap-8 mb-6 lg:mb-16 sm:grid-cols-2">
                        {team
                            ? team.map((tea) => (
                                  <div
                                      key={tea.id}
                                      className="mb-10 items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
                                  >
                                      <div className="sm:min-w-250 relative flex w-full min-w-[12rem] max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                                          {tea.url != "" ? (
                                              <Image
                                                  src={tea.url}
                                                  width={500}
                                                  height={500}
                                                  alt="Picture of the author"
                                              />
                                          ) : null}
                                      </div>
                                      <div className="p-5">
                                          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                              <a href="#">{tea.nombre}</a>
                                          </h3>
                                          <span className="text-gray-500 dark:text-gray-400">
                                              {tea.cargo}
                                          </span>
                                          <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                                              {tea.description}
                                          </p>
                                          <ul className="flex space-x-4 sm:mt-0">
                                              {tea.facebook != "" ? (
                                                  <li>
                                                      <a
                                                          href={tea.facebook}
                                                          target="_blank"
                                                          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                                      >
                                                          <svg
                                                              className="w-5 h-5"
                                                              fill="currentColor"
                                                              viewBox="0 0 24 24"
                                                              aria-hidden="true"
                                                          >
                                                              <path
                                                                  fillRule="evenodd"
                                                                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                                  clipRule="evenodd"
                                                              />
                                                          </svg>
                                                      </a>
                                                  </li>
                                              ) : null}
                                              {tea.linkedin != "" ? (
                                                  <li>
                                                      <a
                                                          href={tea.linkedin}
                                                          target="_blank"
                                                          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                                      >
                                                          <svg
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              width="20"
                                                              height="20"
                                                              fill="currentColor"
                                                              className="bi bi-linkedin"
                                                              viewBox="0 0 16 16"
                                                          >
                                                              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
                                                          </svg>
                                                      </a>
                                                  </li>
                                              ) : null}
                                              {tea.github != "" ? (
                                                  <li>
                                                      <a
                                                          href={tea.github}
                                                          target="_blank"
                                                          className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                                      >
                                                          <svg
                                                              className="w-5 h-5"
                                                              fill="currentColor"
                                                              viewBox="0 0 24 24"
                                                              aria-hidden="true"
                                                          >
                                                              <path
                                                                  fillRule="evenodd"
                                                                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                                  clipRule="evenodd"
                                                              />
                                                          </svg>
                                                      </a>
                                                  </li>
                                              ) : null}
                                          </ul>
                                      </div>
                                  </div>
                              ))
                            : null}
                    </div>
                </li>
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <span className="mb-1 text-lg font-bold leading-none text-gray-900 dark:text-white">
                        Nuestros Colores
                    </span>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        {" "}
                        <span className="bg-[#FFD31D] text-black">#FFD31D: </span>El
                        amarillo brillante está asociado con la energía, la felicidad y la
                        positividad. En el contexto de comida, el amarillo puede evocar
                        sensaciones de sabor y frescura, siendo un color atractivo para
                        resaltar platos y productos alimenticios.
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        {" "}
                        <span className="bg-[#D63447] text-black">#D63447: </span> El rojo
                        cereza es un tono de rojo profundo que sugiere pasión, apetito y
                        energía. En la industria alimentaria, el rojo a menudo se asocia
                        con la tentación y puede estimular el apetito, haciéndolo un color
                        atractivo para resaltar platillos o productos de comida.
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        {" "}
                        <span className="bg-[#F57B51] text-black">#F57B51: </span>El
                        melocotón es un tono suave de naranja que transmite calidez,
                        frescura y apertura. En la comida, el melocotón puede evocar
                        sabores frutales y naturales, siendo un color acogedor para
                        entornos relacionados con alimentos y bebidas.
                    </p>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        {" "}
                        <span className="bg-[#F6EEDF:] text-black">#F6EEDF:: </span>El
                        blanco roto es un tono suave y cálido de blanco que transmite
                        pureza, limpieza y simplicidad. En el contexto de la comida, el
                        blanco roto puede utilizarse para resaltar la frescura y la
                        calidad de los ingredientes, así como para crear una sensación de
                        limpieza y profesionalismo en el entorno alimentario.
                    </p>
                </li>
                <li className="mb-10 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <span className="mb-1 text-lg font-bold leading-none text-gray-900 dark:text-white">
                        Nuestras politicas
                    </span>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        {" "}
                        Para UNBiters es muy importante que sepas cómo funcionamos. A
                        continuación, te proporcionamos toda la{" "}
                        <Link
                            href="/unbiters/help/legal"
                            className="text-md leading-tight font-bold text-black hover:underline"
                        >
                            información legal
                        </Link>{" "}
                        y{" "}
                        <Link
                            href="/unbiters/help/t&c"
                            className="text-md leading-tight font-bold text-black hover:underline"
                        >
                            nuestros términos y condiciones
                        </Link>
                        .
                    </p>
                </li>
            </ol>
        </div>
    );
}
