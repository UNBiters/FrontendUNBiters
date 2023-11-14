"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "flowbite-react";
import client from "@/config/client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

export default function Register() {
  const { push } = useRouter();
  const [errors, setErrors] = useState([]);
  const [nombre, setNombre] = useState("");
  const [sexo, setSexo] = useState("");
  const [chaza, setChaza] = useState("");
  const [terms, setTerms] = useState(false);
  const [esChaza, setEsChaza] = useState(false);
  const [correo, setEmail] = useState("");
  const [contraseña, setPassword] = useState("");
  const [confirmarContraseña, setconfirmarContraseña] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  //const [confirmarContraseña, setconfirmarContraseña] = useState("");
  //const [confirmarContraseña, setconfirmarContraseña] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!terms) {
      setErrors(["Debes aceptar los términos y condiciones para registrarte."]);
    }
    try {
      var body = {
        nombre,
        sexo,
        correo,
        contraseña,
        confirmarContraseña,
        chaza: chaza == "on" ? true : false,
        fechaNacimiento
      };
      console.log(body);
      const response = await client.post("users/signup", body);

      console.log("request ", response);
      if (response.data.status === "success") {
        const { token } = response.data;
        const { nombre, sexo, _id, chaza, fechaNacimiento } = response.data.data.user;
        window.sessionStorage.setItem("token", token);
        window.sessionStorage.setItem("nombre", nombre);
        window.sessionStorage.setItem("sexo", sexo);
        window.sessionStorage.setItem("id", _id);
        window.sessionStorage.setItem("sesion", "true");
        window.sessionStorage.setItem("fechaNacimiento", fechaNacimiento);
        if (chaza) {
          window.sessionStorage.setItem("chaza", "true");
        } else {
          window.sessionStorage.setItem("chaza", "false");
        }
        push("/unbiters/profile");
      }
    } catch (err) {
      console.log("log al registrarte", err);
      var error = err.response.data.error;
      console.error("Error al registrarte", err.response.data);
      setErrors([error]);
    }
  };

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
        <div className="pt-32 flex justify-center items-center">
          <div className=" max-w-sm mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden ">
            {!errors
              ? errors.map((err) => (
                  <div
                    key="e"
                    id="alert-2"
                    className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ml-3 text-sm font-medium">
                      {err.message}
                    </div>
                    <button
                      type="button"
                      className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                      data-dismiss-target="#alert-2"
                      aria-label="Close"
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              : null}

            <div className="flex flex-col items-center p-5 ">
              <Image
                alt="Logo"
                height={110}
                width={110}
                src="/images/logo.png"
              />
              <a
                href="/unbiters/help/t&c"
                className="block mt-1 text-xs leading-tight font-medium text-black hover:underline text-center"
              >
                Al continuar aceptas los términos y condiciones al igual que
                nuestra política de tratamiento de datos
              </a>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-start w-full">
                  <label className="mt-4 text-s leading-tight font-medium text-black">
                    Nombre Completo:
                  </label>
                </div>
                <input
                  id="nombre"
                  className="w-80 mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Nombre Completo"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <div className="flex flex-col items-start w-full">
                  <label className="mt-1 text-s leading-tight font-medium text-black">
                    Sexo:
                  </label>
                </div>
                <select
                  id="sexo"
                  className="w-80 mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  required
                  defaultValue={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                  disabled={esChaza}
                >
                  <option value="" disabled hidden>
                    Selecciona una opción
                  </option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
                <div className="flex flex-col items-start w-full">
                  <label className="mt-1 text-s leading-tight font-medium text-black">
                    Fecha de Nacimiento:
                  </label>
                </div>
                <DatePicker
                  id="fechaNacimiento"
                  selected={fechaNacimiento}
                  onChange={(date) => setFechaNacimiento(date)}
                  className="w-80 mt-2 mb-4 p-2.5 rounded-lg border border-gray-300"
                  placeholderText="Fecha de Nacimiento"
                  dateFormat="yyyy/MM/dd"
                  isClearable
                  showYearDropdown
                  scrollableYearDropdown
                />
                <div className="flex flex-col items-start w-full">
                  <label className="mt-1 text-s leading-tight font-medium text-black">
                    Correo:
                  </label>
                </div>
                <input
                  type="email"
                  id="correo"
                  className="w-full mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light "
                  placeholder="Email"
                  required
                  value={correo}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex flex-col items-start w-full">
                  <label className="mt-1 mb-1 text-s leading-tight font-medium text-black">
                    Contraseña:
                  </label>
                </div>
                <input
                  type="password"
                  id="contraseña"
                  className="w-full mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Contraseña"
                  required
                  value={contraseña}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex flex-col items-start w-full">
                  <label className="mt-1 mb-1 text-s leading-tight font-medium text-black">
                    Confirmar Contraseña:
                  </label>
                </div>
                <input
                  type="password"
                  id="confirmarContraseña"
                  className="w-full mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Confirmar Contraseña"
                  required
                  value={confirmarContraseña}
                  onChange={(e) => setconfirmarContraseña(e.target.value)}
                />

                <div className="pb-2 flex justify-end items-center w-full">
                  <label
                    htmlFor="checked-checkbox"
                    className="mr-5 text-md text-semibold text-gray-900 dark:text-gray-300"
                  >
                    Soy representante legal de una chaza
                  </label>
                  <input
                    id="checked-checkbox"
                    type="checkbox"
                    onChange={(e) => {
                      setChaza(e.target.value);
                      setEsChaza(e.target.checked);
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="pb-2 flex justify-end items-center w-full">
                  <label
                    htmlFor="terms-checkbox"
                    className="mr-11 text-md text-semibold text-gray-900 dark:text-gray-300"
                  >
                    Acepto los terminos y condiciones
                  </label>
                  <input
                    id="terms-checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                </div>
                <Button
                  type="submit"
                  style={{ background: "#D63447" }}
                  className="px-5 mb-4 w-full shadow-xl"
                >
                  Registrarse
                </Button>

                <hr className="flex-1 border-t border-[#D63447]" />

                <div className="flex justify-center items-center">
                  <p className="mr-2">¿Ya tienes cuenta?</p>
                  <Link
                    href={"/unbiters/login"}
                    className="block mt-1 text-md leading-tight font-bold text-black hover:underline"
                  >
                    Inicia sesión
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
