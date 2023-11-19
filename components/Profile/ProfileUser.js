import { PaperClipIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function ProfileUser({ user }) {
    return (
        <div className="mx-auto py-24 sm:py-12 lg:px-8">
            <div className=" my-auto py-4 px-4">
                <div className="flex justify-end pb-2">
                    <Link
                        href="profile/me"
                        type="button"
                        className="bg-[#9d5b5b] inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-lg  text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                    >
                        {"Actualiza tus datos"}
                    </Link>
                </div>
                <div className="mx-auto text-center">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                        Bienvenido {user.nombre.split(" ")[0]}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                        {/*user.createdAt */}
                    </p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Nombre Completo:
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {user.nombre}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Nivel de subscripción
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {user.nivelSuscripcion != 0 ? "Usuario Premium" : "Usuario Gratuito"}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Mi correo
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {user.correo}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
