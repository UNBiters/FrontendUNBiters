"use client";
import { useUsers } from "@/context/UserContext";
import { Button } from "flowbite-react";
import React, { useState } from "react";
import client from "@/config/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Login() {
    const { setLogin, setUser, setChazas } = useUsers();
    const router = useRouter();
    const [correo, setEmail] = useState("");
    const [contraseña, setPassword] = useState("");
    const [error, setError] = useState("");
    const [succes, setSucces] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("Iniciando sesión, espera un momento!");
            const response = await client.post("users/login", { correo, contraseña });

            console.log(response);
            if (response.data.status === "success") {
                setLogin(true);
                const { token } = response.data;

                const { user, chaza } = response.data.data;
                const { nombre, _id } = response.data.data.user;
                setUser(user);
                setChazas(chaza);
                Cookies.set("token", token);
                Cookies.set("user", JSON.stringify(user));
                window.sessionStorage.setItem("user", user);
                window.sessionStorage.setItem("token", token);
                window.sessionStorage.setItem("nombre", nombre);
                window.sessionStorage.setItem("id", _id);
                window.sessionStorage.setItem("sesion", "true");
                window.sessionStorage.setItem('cliente', cliente);
                router.push("/");
            } else {
                setError("Hubo un error inesperado");
                setTimeout(function () {
                    setError("");
                }, 5000);
            }
        } catch (error) {
            console.log("Error al enviar la solicitud:", error);
            if (error.response.status == "401") {
                console.log("Error al enviar la solicitud:", error);
                setError(error.response.data.message);
            } else {
                console.log("Error al enviar la solicitud:", error);
                setError("Error al enviar la solicitud, por favor intenta en unos minutos.");
            }

            setTimeout(function () {
                setError("");
            }, 5000);
        }
    };
    return (
        <div
            style={{
                backgroundImage: "url(/images/backLogin.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
            }}
        >
            x
            <div className=" pt-24 flex justify-center items-center">
                <div className=" max-w-sm mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden ">
                    {error ? (
                        <div
                            className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                            role="alert"
                        >
                            <svg
                                className="flex-shrink-0 inline w-4 h-4 mr-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">Advertencia!</span> {error}
                            </div>
                        </div>
                    ) : null}
                    {succes ? (
                        <div
                            className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                            role="alert"
                        >
                            <svg
                                className="flex-shrink-0 inline w-4 h-4 mr-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">Exitoso!</span> {succes}
                            </div>
                        </div>
                    ) : null}
                    <div className="flex flex-col items-center p-5">
                        <Image
                            alt="Logo"
                            height={110}
                            width={110}
                            src="/images/logo.png"
                        />

                        <Link
                            href="/unbiters/help/t&c"
                            className="block mt-1 text-xs leading-tight font-medium text-black hover:underline text-center"
                        >
                            Al continuar aceptas los terminos y condiciones y aceptas
                            nuestra politica de tratamiento de datos
                        </Link>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center"
                        >
                            <div className="flex flex-col items-start w-full">
                                <label className="mt-3 text-s leading-tight font-medium text-black">
                                    Correo del usuario:
                                </label>
                            </div>
                            <input
                                type="email"
                                id="correo"
                                className="w-full mt-1.5 mb-2 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light "
                                placeholder="Correo"
                                required
                                value={correo}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="flex flex-col items-start w-full">
                                <label className="mt-1 text-s leading-tight font-medium text-black">
                                    Contraseña:
                                </label>
                            </div>
                            <input
                                type="password"
                                id="contraseña"
                                className="w-full mt-1.5 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                placeholder="Contraseña"
                                required
                                value={contraseña}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <Button
                                type="submit"
                                style={{ background: "#D63447" }}
                                className="px-5 mx-1 w-full shadow-xl"
                            >
                                Iniciar Sesión
                            </Button>
                        </form>

                        <Link
                            href="/unbiters/help/password"
                            className="text-sm mt-5 mb-2 block ml-auto hover:underline"
                        >
                            ¿Olvido su contraseña?
                        </Link>

                        <hr
                            className="border-t border-red-500 border-2 my-6"
                            style={{ width: "90%" }}
                        />

                        <div className="flex justify-center items-center">
                            <p className="mr-2">¿No tienes cuenta?</p>
                            <Link
                                href={"/unbiters/register"}
                                className="block mt-1 text-md leading-tight font-bold text-black hover:underline"
                            >
                                Registrate
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
