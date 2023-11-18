"use client";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import client from "@/config/client";
import Delete from "../Modal/Delete";
import { useState } from "react";

export default function Card({
    setChaza,
    token,
    className,
    card,
    comments,
    idModal,
    mode,
}) {
    //console.log(card.redesSociales[0])
    const notifyDelete = () =>
        toast.success("Publicación eliminada!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const notifyError = () =>
        toast.error("Ups hubo un error!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const router = useRouter();

    var src = "/images/test.jpg";
    if (card.imagenUrl) {
        src = card.imagenUrl;
    }
    async function deleteChaza(id) {
        console.log("borrado", token);
        try {
            const response = await client.delete(`chazas/deleteMyChaza/${card.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            if (response.status == "204") {
                //notifyDelete()
                notifyDelete();
                /*setComments(comments => {
                    return comments.filter(post => post.id !== id)
                })*/
                //router.refresh()
                var res = await client.get("chazas/myChaza", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                //console.log(res.data.data)
                setChaza(res.data.data.myChaza);
            } else {
                notifyError();
            }
            //console.log(response)
        } catch (error) {
            notifyError();
            console.log(error);
        }
    }
    return (
        <div className={className} style={{ paddingBottom: "120px" }}>
            <ToastContainer />
            {isOpenDelete && (
                <Delete
                    message={"Borrar chaza:  " + card.nombre}
                    onClose={() => {
                        router.push("/unbiters/profile", { scroll: false });
                        setIsOpenDelete(false);
                    }}
                    onRedirect={() => {
                        deleteChaza(card._id);
                        router.push("/unbiters/profile", { scroll: false });
                        setIsOpenDelete(false);
                    }}
                />
            )}
            <div className="max-w-lg bg-white text-center border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {/*<Link href={`?id=` + card._id} type="button" className="">*/}
                <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                    <Image
                        priority={true}
                        width={500}
                        height={500}
                        src={src}
                        alt="ui/ux review check"
                        className="max-w-full h-auto rounded-t-lg"
                    />
                    <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>

                    {mode == "edit" ? (
                        <>
                            <Link
                                href={`profile/me?id=` + card._id}
                                className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                data-ripple-dark="true"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                </svg>
                            </Link>

                            <button
                                className="!absolute top-12 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                onClick={() => setIsOpenDelete(true)}
                                data-ripple-dark="true"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <span
                            //href={"/unbiters/profile?" + card._id}
                            //target="_blanck"
                            className="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            //type="button"
                            //data-ripple-dark="true"
                        >
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path d="M2.879 7.121A3 3 0 007.5 6.66a2.997 2.997 0 002.5 1.34 2.997 2.997 0 002.5-1.34 3 3 0 104.622-3.78l-.293-.293A2 2 0 0015.415 2H4.585a2 2 0 00-1.414.586l-.292.292a3 3 0 000 4.243zM3 9.032a4.507 4.507 0 004.5-.29A4.48 4.48 0 0010 9.5a4.48 4.48 0 002.5-.758 4.507 4.507 0 004.5.29V16.5h.25a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75v-3.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75v3.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5H3V9.032z" />
                                </svg>
                            </span>
                        </span>
                    )}
                </div>
                {/*</Link>*/}
                <div className=" p-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <div className="grid grid-cols-5 ">
                        <div className="col-span-3">
                            <p className="mx-auto">{card.nombre}</p>
                            <span className="mx-auto text-center text-sm font-normal text-gray-700">
                                {card.slug}
                            </span>
                        </div>
                        <div className="col-span-2 items-center grid grid-cols-3 ">
                            <span>
                                <div className="flex mx-auto ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                                    </svg>
                                    <span className="flex items-center rounded text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                                        {card.likes}
                                    </span>
                                </div>
                            </span>
                            <span>
                                <div className="flex mx-auto">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
                                        <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 001.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0014 6z" />
                                    </svg>
                                    <span className="flex items-center align-middle rounded text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                                        50
                                    </span>
                                </div>
                            </span>
                            <div className="flex mx-auto">
                                <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="fill-[#efb810] -mt-0.5 h-5 w-5 text-yellow-700"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    {Number(card.ratingsAverage).toFixed(1)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center font-normal text-gray-700 dark:text-gray-400">
                        <div>
                            <p className="text-lg font-sans  mx-auto">
                                {card.descripcion}
                            </p>
                        </div>
                        <div className="text-end ">
                            <span className="text-sm font-normal text-gray-700">
                                <b className="pr-2">Buscanos en:</b> {card.ubicacion}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <div>
                                <ul>
                                    <li className="flex justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                                            <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                                        </svg>

                                        <span className="text-sm font-normal text-gray-700">
                                            <b>Nuestras redes sociales</b>
                                        </span>
                                    </li>
                                    <li className="flex justify-center">
                                        <Link
                                            href={"/unbiters/profile?" + card._id}
                                            target="_blanck"
                                            className="text-sm font-normal text-gray-700"
                                        >
                                            UNBiters
                                        </Link>
                                    </li>
                                    {card.redesSociales
                                        ? card.redesSociales.map((redesSociales) => (
                                              <li
                                                  key={uuidv4()}
                                                  className="flex justify-center"
                                              >
                                                  <Link
                                                      href={redesSociales}
                                                      target="_blanck"
                                                      className="text-sm font-normal text-gray-700"
                                                  >
                                                      {redesSociales}
                                                  </Link>
                                              </li>
                                          ))
                                        : null}
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li className="flex justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="text-sm font-normal text-gray-700">
                                            <b> Nuestros medios de pago</b>
                                        </span>
                                    </li>
                                    {card.mediosPagos
                                        ? card.mediosPagos.map((mediosPagos) => (
                                              <li
                                                  key={uuidv4()}
                                                  className="flex justify-center"
                                              >
                                                  <span className="text-sm font-normal text-gray-700">
                                                      {mediosPagos}
                                                  </span>
                                              </li>
                                          ))
                                        : null}
                                </ul>
                            </div>
                        </div>
                        <div className="pt-2  px-2">
                            {card.categorias
                                ? card.categorias.map((categorias) => (
                                      <span
                                          key={uuidv4()}
                                          className="inline-block bg-[#9d5b5b] rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2 mb-2"
                                      >
                                          #{categorias}
                                      </span>
                                  ))
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
