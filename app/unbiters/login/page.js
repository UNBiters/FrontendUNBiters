'use client';
import { Button } from 'flowbite-react';

export default function Login() {
    return (
        <div style={{ backgroundImage: 'url(/images/backLogin.png)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>x
            <div className="containerLogin flex justify-center items-center">
                <div className="max-w mx-auto bg-[#F6EEDF] rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="md:flex md:flex-col md:items-center p-10">
                        <img alt="Logo" className="h-20" src="/images/logo.png" />

                        <a href="/unbiters/t&c" className="block mt-1 text-md leading-tight font-medium text-black hover:underline">Al continuar aceptas los terminos y
                            condiciones y aceptas nuestra politica de tratamiento de datos</a>
                        <div >
                            <input type="email" id="email" className="w-full mt-2 mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-bg rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light " placeholder="Email" required />



                            <input type="password" id="s" className="w-full mb-4 shadow-sm bg-[#F5F5F5] border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Contraseña" required />

                        </div>


                        <Button href='/' className='boton-lg px-5 mx-1 hover:bg-sky-700 text-balck shadow-xl'>
                            Iniciar Sesión
                        </Button>

                        <hr className="border-t border-red-500 border-2 my-4" style={{ width: '90%' }} />

                        <Button href='#' className='boton-gx px-5 mx-1 mb-4 text-balck shadow-xl w-full' style={{ width: '70%' }}>
                            <img className='mr-3 lg:h-6 sm:h-6' src='/images/GoogleLogo.png'></img>
                            Iniciar Sesión con Google
                        </Button>
                        <Button href='#' className='boton-gx px-5 mx-1 text-balck shadow-xl w-full' style={{ width: '70%' }}>
                            <img className='mr-3 lg:h-6 sm:h-6' src='/images/XLogo.png'></img>
                            Iniciar Sesión con X
                        </Button>
                        <hr className="border-t border-red-500 border-2 my-6" style={{ width: '90%' }} />
                        <div class="flex flex-row">
                            <div class="basis-32">¿No tienes cuenta?</div>
                            <div class="basis-10">
                                <a href="#" className="block mt-1 text-md leading-tight font-bold text-black hover:underline">
                                    Registrate
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
