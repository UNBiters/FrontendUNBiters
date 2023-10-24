'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import client from "@/config/client";
export default function Comments({ id, data }) {
    const [comments, setComments] = useState(data);
    const router = useRouter();
    const [error, setError] = useState('');
    const [succes, setSucces] = useState('');
    const [token, setToken] = useState('');
    const [review, setComment] = useState('');
    const [idReview, setIdReview] = useState('');

    const validation = (data) => {
        var flag = false
        if (data.review == "") {
            setError("Por favor introduce un comentario")
            flag = true
        }
        return flag
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!validation({ review })) {
                var body = {
                    review
                }
                console.log(body)
                const response = await client.post('publications/' + id + "/reviews", body, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.status == "201") {
                    setError('')
                    setSucces("Tu comentario se ha creado exitosamente!")
                    setComment("")

                    const response = await client.get('reviews/' + id, {
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
                    }, 2000);
                    //refresh()
                } else {
                    setError(response.data.message)
                }
            } else {
                setTimeout(function () {
                    setError("")
                }, 2000);
            }
        } catch (error) {
            console.error('Error: ', error);
            setError(error.response.data.message)

            setTimeout(function () {
                setError("")
            }, 2000);
        }
    }

    const refreshData = () => {
        router.replace(router.asPath);
    }
    useEffect(() => {
        console.log("act")
        setToken(window.sessionStorage.getItem('token'))
    }, [])
    if (!data) return <></>
    return (
        <div>


            <div id={id} data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Comentarios {id}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide={id}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
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
                                    <textarea id={"message" + data.id} onChange={(e) => setComment(e.target.value)} value={review} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                                </div>
                                <div className="flex justify-end">
                                    <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                                        Comentar
                                    </button>

                                </div>
                            </form>
                        </div>
                        {
                            /**<div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide={id} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                            <button data-modal-hide={id} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                        </div> */
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}