"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "flowbite-react";

export default function Register() {
  return (
    <>
      <div
        style={{
          backgroundImage: "url(/images/backgroundRegister.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div className=" pt-24 flex justify-center items-center">
          <div className=" max-w-sm mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden ">
            <div className="md:flex md:flex-col md:items-center p-5">
              {/* <img alt="Logo" className="h-20" src="/images/logo.png" /> */}

              <Image
                alt="Logo"
                height={110}
                width={110}
                src="/images/logo.png"
              />
              <a
                href="#"
                className="block mt-1 text-xs leading-tight font-medium text-black hover:underline text-center"
              >
                Al continuar aceptas los terminos y condiciones y aceptas
                nuestra politica de tratamiento de datos
              </a>

              <div>
                <input
                  type="nombre"
                  id="nombre"
                  className="w-80 mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Nombres"
                  required
                />
                <input
                  type="apellido"
                  id="apellido"
                  className="w-full mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light "
                  placeholder="Apellidos"
                  required
                />
                <input
                  type="email"
                  id="email"
                  className="w-full mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light "
                  placeholder="Email"
                  required
                />

                <input
                  type="password"
                  id="s"
                  className="w-full mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Contraseña"
                  required
                />
                <Button
                  href="#"
                  style={{ background: "#D63447" }}
                  className="px-5 mx-1 shadow-xl"
                >
                  Registrarse
                </Button>

                <div className="flex items-center w-full space-x-2">
                  <hr className="flex-1 border-t border-[#D63447]" />
                  <span className=" text-[#D63447] ">o</span>
                  <hr className="flex-1 border-t border-[#D63447]" />
                </div>

                <Button
                  href="#"
                  className="px-5 mx-1 mb-4 text-balck shadow-xl w-full"
                  style={{ width: "97%", background: "#F5F5F5" }}
                >
                  <Image
                    alt="Logo de google"
                    width={20}
                    height={20}
                    className="mr-2"
                    src="/images/GoogleLogo.png"
                  ></Image>
                  Continua con Google
                </Button>

                <Button
                  href="#"
                  className="px-5 mx-1 mb-2 text-balck shadow-xl w-full"
                  style={{ width: "97%", background: "#F5F5F5" }}
                >
                  <Image
                    alt="Logo de google"
                    width={20}
                    height={20}
                    className="mr-2"
                    src="/images/XLogo.png"
                  ></Image>
                  Continua con X
                </Button>

                <hr className="flex-1 border-t border-[#D63447]" />

                <div className="flex justify-center items-center">
                  <p className="mr-2">¿Ya tienes cuenta?</p>
                  <Link
                    href={"/unbiters/login"}
                    className="text-black-500 hover:underline"
                  >
                    Inicia sesión
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
