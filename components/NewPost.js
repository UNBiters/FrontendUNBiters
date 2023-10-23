'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import client from "@/config/client";
import { useRouter } from 'next/navigation';

export default function NewPost() {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState('');
    const [succes, setSucces] = useState('');
    const [token, setToken] = useState('');
    const [texto, setComment] = useState('');
    const [imagen, setImages] = useState('');
    const [rating, setRating] = useState('');
    const [classe, setClasse] = useState('');
    const [classe1, setClasse1] = useState('');
    const [classe2, setClasse2] = useState('');
    const [classe3, setClasse3] = useState('');
    const [classe4, setClasse4] = useState('');


    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }
    function clean() {
        setError()
        setSucces()
        setComment()
        setImages()
        setRating()
        closeModal()
    }
    const validation = (data) => {
        var flag = false
        if (!data.texto) {
            setError("Por favor introduce un comentario")
            flag = true
        } else if (data.texto.length < 50) {
            setError("Por favor introduce un comentario mas largo, mínimo 50 caracteres.")
            flag = true
        }
        if (!data.rating) {
            setError("Por favor introduce un calificacíon")
            flag = true
        }
        return flag
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!validation({ texto, rating })) {
                var body = {
                    texto,
                    imagen,
                    rating
                }
                console.log(body)
                const response = await client.post('publications/', body, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log('sucess: ', response);
                if (response.status == "201") {
                    console.log('sucess: ', response);
                    setError('')
                    setSucces("La publicacíon se ha creado exitosamente!")
                    //refresh()
                    setTimeout(function () {
                        clean()
                    }, 2000);
                } else {
                    console.log('DATA: ', response.data.message);
                    setError(response.data.message)
                    setTimeout(function () {
                        setError("")
                    }, 2000);
                }
            }

        } catch (error) {
            console.error('Error: ', error);
            setError(error.response.data.message)
            setTimeout(function () {
                setError("")
            }, 2000);
        }
    }
    const onClick = (number) => {
        var func = [setClasse, setClasse1, setClasse2, setClasse3, setClasse4]
        for (var i = 0; i < 5; i++) {
            func[i]("text-gray-300 ")
        }
        for (var i = 0; i < number; i++) {
            func[i]("text-yellow-300")
        }
        setRating(number)
    }
    useEffect(() => {
        setToken(window.sessionStorage.getItem('token'))
    }, [])
    return (
        <>
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button onClick={() => router.refresh()} type="button" className="text-white px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                    Actualizar Publicaciones
                </button>
                <button
                    type="button"
                    onClick={openModal}
                    className="text-white px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                    Crear publicacíon
                </button>
            </div>


            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="pt-16 pb-16 fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-screen-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Crea tu publicación
                                    </Dialog.Title>
                                    <div className="mt-2">

                                        <form onSubmit={onSubmit}>
                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                {error ?
                                                    <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                                                        <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                                        </svg>
                                                        <span className="sr-only">Info</span>
                                                        <div>
                                                            <span className="font-medium">Advertencia!</span> {error}
                                                        </div>
                                                    </div>
                                                    : null}

                                                {succes ?
                                                    <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                                                        <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                                        </svg>
                                                        <span className="sr-only">Info</span>
                                                        <div>
                                                            <span className="font-medium">Exitoso!</span> {succes}
                                                        </div>
                                                    </div>
                                                    : null}
                                                <div className="p-6 space-y-6">

                                                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Escribe tu opinión</label>
                                                    <div><textarea name="message" rows="4" onChange={(e) => setComment(e.target.value)} value={texto} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Algún comentario..." maxLength="600" ></textarea></div>
                                                    <label htmlFor="message" className="block  text-sm font-medium text-gray-900 dark:text-white">Califica tu experiencia y selecciona la chaza de la cual opinaras</label>
                                                    <div className="grid grid-cols-2 grid-flow-col items-baseline">

                                                        <div className="flex  ">

                                                            <div className="flex flex-row-reverse mx-auto items-center space-x-1">
                                                                <svg onClick={() => onClick(5)} className={classe4 + " w-8 h-8 text-gray-300 peer peer-hover:text-yellow-300 hover:text-yellow-300"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                                </svg>
                                                                <svg onClick={() => onClick(4)} className={classe3 + " w-8 h-8 text-gray-300 peer peer-hover:text-yellow-300 hover:text-yellow-300"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                                </svg>
                                                                <svg onClick={() => onClick(3)} className={classe2 + " w-8 h-8 text-gray-300 peer peer-hover:text-yellow-300 hover:text-yellow-300"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                                </svg>
                                                                <svg onClick={() => onClick(2)} className={classe1 + " w-8 h-8 text-gray-300 peer peer-hover:text-yellow-300 hover:text-yellow-300"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                                </svg>
                                                                <svg onClick={() => onClick(1)} className={classe + " w-8 h-8 text-gray-300 dark:text-gray-500 peer peer-hover:text-yellow-300 hover:text-yellow-300"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="flex  mx-auto my-auto items-center">
                                                            <select id="small" className="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                                <option selected>Selecciona la chaza </option>
                                                                <option value="US">United States</option>
                                                                <option value="CA">Canada</option>
                                                                <option value="FR">France</option>
                                                                <option value="DE">Germany</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Sube tus fotos</label>
                                                    <input onChange={(e) => setImages(e.target.value)} value={imagen} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />

                                                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Publicar</button>
                                                        <button onClick={() => closeModal()} type="button" className="text-dark bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    {/*<div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </button>
                                            </div>*/}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}