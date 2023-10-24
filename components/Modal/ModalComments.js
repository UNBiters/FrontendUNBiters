"use client"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import client from "@/config/client";
import { useRouter } from 'next/navigation';
import NotSesion from './NotSesion';

export default function ModalComments({ onClose, _id }) {
    let [isOpen, setIsOpen] = useState(true)
    const [isOpen1, setIsOpen1] = useState(false)
    const router = useRouter();
    let [posts, setPosts] = useState([])
    let [comments, setComments] = useState([])
    let [review, setComment] = useState([])
    const [error, setError] = useState('');
    const [succes, setSucces] = useState('');
    const [token, setToken] = useState('');

    function closeModal() {
        setIsOpen(false)
    }

    function openModalLogin(token) {
        var flag = true
        if (!token) {
            setIsOpen1(true)
            flag = false
        }
        return flag
    }
    function openModal() {
        setIsOpen(true)
    }

    const validation = (data) => {
        var flag = false
        if (data.review == "") {
            setError("Por favor introduce un comentario")
            flag = true
        } else if (data.review.length < 10) {
            setError("Por favor introduce un comentario mas largo, mínimo 10 caracteres.")
            flag = true
        }
        return flag
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(openModalLogin(token))
            if (openModalLogin(token)) {
                if (!validation({ review })) {
                    var body = {
                        review
                    }
                    console.log(body)
                    const response = await client.post('publications/' + _id + "/reviews", body, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    if (response.status == "201") {
                        setError('')
                        setSucces("Tu comentario se ha creado exitosamente!")
                        setComment("")

                        const response = await client.get('reviews/' + _id, {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        });
                        console.log('adta: ', response);
                        if (response.status == "200") {
                            console.log('adta: ', "201");
                            setComments(response.data.data.data)
                            //refreshData();
                        }
                        setTimeout(function () {
                            setSucces("")
                        }, 5000);
                        //refresh()
                    } else {
                        setError(response.data.message)
                    }
                } else {
                    setTimeout(function () {
                        setError("")
                    }, 5000);
                }
            } else {
                openModal()
            }

        } catch (error) {
            console.error('Error: ', error);
            setError(error.response.data.message)

            setTimeout(function () {
                setError("")
            }, 2000);
        }
    }


    useEffect(() => {
        try {
            setToken(window.sessionStorage.getItem('token'))
            client.get("publications/" + _id)
                .then((res) => {
                    var post = res.data.data.data
                    setPosts(post)
                    setComments(post.reviews)
                })
        } catch (error) {
            console.log(error)
        }
    }, [_id])
    return (
        <>
            {isOpen1 && (<NotSesion onClose={() => { router.push("/?id=" + _id); setIsOpen1(false) }}
                onRedirect={() => { router.push("/unbiters/login"); setIsOpen1(false) }} />)
            }
            <Transition appear show={true} as={Fragment}>
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
                                        Comentarios
                                    </Dialog.Title>
                                    <div className="mt-2">

                                        <div className="p-6 space-y-6 ">
                                            <div className="divide-y">
                                                {comments ? comments.map((data) => {
                                                    if (data.user) { var { nombre } = data.user }
                                                    return (<div key={data._id ? data._id : data.id} className="p-2 ">
                                                        <span>{nombre}</span>
                                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                            {data.review}
                                                        </p>
                                                    </div>)

                                                }) : null}
                                            </div>

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
                                            <form onSubmit={onSubmit}>
                                                <div className="p-1">
                                                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu comentario</label>
                                                    <textarea id={"message" + comments.id} onChange={(e) => setComment(e.target.value)} value={review} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                                                </div>
                                                <div className="flex justify-end">
                                                    <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                                                        Comentar
                                                    </button>

                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    {/*<div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={onClose}
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
