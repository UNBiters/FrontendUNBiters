'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import client from "@/config/client";
import { useRouter } from 'next/navigation';
import NotSesion from './Modal/NotSesion';
import InputChazas from './Input.js/InputChazas';

export default function NewPost({ mode, open, onClose, post }) {

    //console.log(post)
    const router = useRouter();
    const [selected, setSelected] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen1, setIsOpen1] = useState(false)
    const [notLogin, setNotLogin] = useState(false)
    const [error, setError] = useState('');
    const [succes, setSucces] = useState('');
    const [token, setToken] = useState('');
    const [texto, setComment] = useState('');
    //const [imagen, setImages] = useState('');
    const [rating, setRating] = useState('');
    const [classe, setClasse] = useState('');
    const [classe1, setClasse1] = useState('');
    const [classe2, setClasse2] = useState('');
    const [classe3, setClasse3] = useState('');
    const [classe4, setClasse4] = useState('');
    const [nombreChaza, setNombreChaza] = useState('');
    const [imagen, setImagen] = useState(null);

    function openModalPost() {
        if (!token) {
            console.log(token)
            //setIsOpen(false)
            setIsOpen1(true)
            console.log(isOpen1)
        } else {
            console.log(isOpen)
            setIsOpen(true)
        }
    }
    function closeModal() {
        setIsOpen(false)
    }
    function clean() {
        setError()
        setSucces()
        setComment()
        //setImages()
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
                var data = new FormData();
                data.append('imagen', imagen);
                data.append('texto', texto);
                data.append('rating', rating);
                if (selected.id) {
                    data.append('chaza', selected.id);
                } else {

                    data.append('nombreChaza', selected.nombre);
                }
                var body = {
                    texto,
                    imagen: imagen,
                    rating,
                    nombreChaza,
                    selected
                }
                for (const value of data.values()) {
                  console.log(value);
                }
                //console.log(body)
                
                const response = await client.post('publications/', data, {
                    headers: {
                        "content-type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.status == "201") {
                    console.log('sucess: ', response);
                    setError('')
                    setSucces("La publicacíon se ha creado exitosamente!")
                    //refresh()
                    setTimeout(function () {
                        clean()
                    }, 4000);
                } else {
                    console.log('DATA: ', response.data.message);
                    setError(response.data.message)
                    setTimeout(function () {
                        setError("")
                    }, 2000);
                }
            }
            setTimeout(function () {
                setError("")
            }, 5000);

        } catch (error) {
            console.error('Error: ', error);
            setError(error.response.data.message)
            setTimeout(function () {
                setError("")
            }, 5000);
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
        setIsOpen(open)
        if (post) {
            setComment(post.texto)
            setNombreChaza(post.nombreChaza)
            onClick(post.rating) |
                setImagen(post.urlImagen)
        }
    }, [open, post])
    return (
        <>
            {mode == "edit" ? <></>
                : <></>
            }
            {isOpen1 && (<NotSesion onClose={() => { router.push("/"); setIsOpen1(false) }}
                onRedirect={() => { router.push("/unbiters/login"); setIsOpen1(false) }} />)
            }
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                    <div className=" pt-16 pb-16 fixed inset-0 overflow-y-auto">
                        <div className="mx-auto flex items-center justify-center p-4 text-center max-w-lg">
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

                                    {mode == "edit" ? <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900"
                                    >   Edita tu publicación </Dialog.Title>
                                        : <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900"
                                        >   Crea tu publicación </Dialog.Title>
                                    }

                                    <div className="mt-2">

                                        <form onSubmit={onSubmit} encType='multipart/form-data'>
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

                                                    <div className=" mx-auto my-auto items-center">
                                                        <div className=" w-full">
                                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de la chaza:</label>
                                                            <InputChazas selected={selected} setSelected={setSelected} />
                                                        </div>
                                                    </div>
                                                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Escribe tu opinión</label>
                                                    <div><textarea name="message" rows="4" onChange={(e) => setComment(e.target.value)} value={texto} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Algún comentario..." maxLength="600" ></textarea></div>
                                                    <label htmlFor="message" className="block  text-sm font-medium text-gray-900 dark:text-white">Califica tu experiencia en la chaza</label>
                                                    <div className="grid grid-cols-2 grid-flow-col items-baseline">

                                                        <div className="flex col-span-2 ">
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
                                                    </div>

                                                    <label for="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Sube una imagen de tu experiencia</label>

                                                    <div className="flex items-center justify-center w-full">

                                                        <label className="block">
                                                            <span className="sr-only">Choose profile photo</span>
                                                            <input id="imagen" type="file" multiple accept="image/*"  onChange={(e) => setImagen(e.target.files[0])} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">

                                                        {mode == "edit" ?
                                                            <button type="submit" className="text-white bg-[#9d5b5b] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                Actualizar
                                                            </button> : <button className="text-white bg-[#9d5b5b] hover:bg-[#9d5b5b]/[0.7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"  type="submit">
                                                                Publicar
                                                            </button>
                                                        }
                                                        <button onClick={onClose} type="button" className="text-dark bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancelar</button>
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