
'use client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import client from "@/config/client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NotSesion from '../Modal/NotSesion';
import Image from 'next/image';
import NewPost from '../NewPost';
import Delete from '../Modal/Delete';

export default function CardReview({ numComments, setNumComments, names, posts, setPosts, className, card, mode, idModal, idSearch, deletePostUp, editPostUp }) {

    const notifyDelete = () => toast("Publicación eliminada!");
    var start = [1, 1, 1, 1]
    const router = useRouter();
    //const [names, setName] = useState([])
    const [id, setId] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen1, setIsOpen1] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [fill, setFill] = useState("")
    const [fillText, setFillText] = useState("")
    const [token, setToken] = useState('');
    const [likes, setLikes] = useState(card.likes);
    //const [numComments, setNumComments] = useState(card.numComentarios);
    var src = "/images/1499696010180-025ef6e1a8f9.jpg"
    if (card.imagenUrl) {
        src = card.imagenUrl
    }
    //console.log("card", card)
    function openModal(token) {
        var flag = true
        if (!token) {
            setIsOpen1(true)
            console.log(isOpen1)
            flag = false
        }
        return flag
    }
    function openModalPost() {
        if (!token) {
            console.log(token)
            //setIsOpen(false)
            setIsOpen1(true)
            console.log(isOpen1)
        } else {
            console.log(true)
            setIsOpen(true)
        }
    }
    async function deletePost(id) {
        //notify()
        try {
            console.log(token)
            console.log(card.id)
            const response = await client.delete(`publications/deleteMyPublication/${card.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status == "204") {
                //notifyDelete()
                notifyError()
                //router.refresh()
            }
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    const onClick = async (e) => {
        try {
            if (openModal(token)) {
                //console.log(token)
                const response = await client.post('publications/' + card._id + "/likes", {}, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (response.status == "200") {
                    console.log('adta: ', response.data.data.userLike.active);
                    if (response.data.data.userLike.active) {
                        setFill("fill-rose-800 ")
                        setFillText("text-rose-800 ")
                        setLikes(likes + 1)
                    } else {
                        setFill("")
                        setFillText("")
                        setLikes(likes - 1)
                    }
                    //refreshData();
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        setNumComments(card.numComentarios)
        var tkn = (window.sessionStorage.getItem('token'))
        setToken(tkn)
        if (tkn) {
            client.get('publications/' + card.id + "/likes/myLikeInPublication", {
                headers: {
                    "Authorization": `Bearer ${tkn}`
                }
            }).then((res) => {
                //console.log(res)
                if (res.data.data.status) {
                    setFill("fill-rose-800 ")
                    setFillText("text-rose-800 ")
                }
            })
        }
    }, [])

    return (
        <div className={className}>
            <ToastContainer />
            <div className='newpost col-span-2 flex justify-end px-3 min-[650px]:grid-cols-1'>
                <NewPost mode="edit" posts={posts} setPosts={setPosts} id={id} post={card} open={isOpen} editPostUp={editPostUp} onClose={() => { router.push("/unbiters/profile/posts", { scroll: false }); setIsOpen(false) }} ></NewPost>
            </div>
            {isOpen1 && (<NotSesion onClose={() => { router.push("/"); setIsOpen1(false) }}
                onRedirect={() => { router.push("/unbiters/login"); setIsOpen1(false) }} />)
            }
            {isOpenDelete && (<Delete message={"Borrar publicación"} onClose={() => { router.push("/unbiters/profile/posts", { scroll: false }); setIsOpenDelete(false) }}
                onRedirect={() => { deletePostUp(card._id); router.push("/unbiters/profile/posts", { scroll: false }); setIsOpenDelete(false) }} />)
            }
            <div id={card._id} class="relative flex  max-w-[28rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">

                {mode == "edit" ?
                    <div class="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">

                        <Image
                            width={500}
                            height={500}
                            src={src}
                            alt="ui/ux review check"
                            className='max-w-full h-auto'
                        />
                        <div class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>

                    </div>
                    : <Link href={`?id=` + card._id} type="button" className="">
                        <div class="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">

                            <Image
                                width={500}
                                height={500}
                                src={src}
                                alt="ui/ux review check"
                                className='max-w-full h-auto'
                            />
                            <div class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>

                        </div>
                    </Link>}

                {mode == "edit" ?
                    <>
                        <button
                            class="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            onClick={() => { setIsOpen(true); setId(card.id) }}
                            data-ripple-dark="true"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                            </svg>

                        </button>

                        <button
                            class="!absolute top-12 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            onClick={() => setIsOpenDelete(true)}
                            data-ripple-dark="true"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                            </svg>
                        </button></>
                    :
                    <button
                        class="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        data-ripple-dark="true"
                    >
                        <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill=""
                                aria-hidden="true"
                                class={fill + "w-6 h-6"}
                            >
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                            </svg>
                        </span>
                    </button>
                }
                <div class="px-5 py-2">
                    <div class="flex items-center justify-between mb-3">
                        <h5 class="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                            {card.chaza && card.user ? names.filter(item => item.id == card.chaza)[0].nombre : card.nombreChaza}
                        </h5>
                        <p class="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                class="-mt-0.5 h-5 w-5 text-yellow-700"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            {Number(card.rating).toFixed(1)}
                        </p>
                    </div>
                    <p class="block break-words font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                        {card.texto}
                    </p>
                    <div class="px-2 pt-4">

                        {card.tags ? card.tags.map((categorias) => (

                            <span key={"re" + categorias.indexOf(categorias)} class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{categorias}</span>

                        )) : null}

                    </div>
                </div>
                <div class="px-5 pb-3 grid grid-cols-2 gap-4 content-center">
                    <div>
                        <button onClick={onClick}
                            className="block w-full select-none rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                            data-ripple-light="true"
                        >

                            <div class="flex px-8 items-center justify-between">
                                <svg className={fill + "  w-5 h-5"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />

                                </svg>
                                <span className={fillText + ' font-bold text-lg'}>{likes}</span>
                            </div>
                        </button>
                    </div>
                    <div>
                        {mode == "edit" ?

                            <Link href={"/unbiters/profile/posts/?id=" + card._id} type="button" className="block w-full select-none rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                <div class="flex px-8 items-center justify-between">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
                                    </svg>
                                    <span className='font-bold text-lg'>
                                        {numComments}
                                    </span>
                                </div>
                            </Link> :

                            <Link href={"/?id=" + card._id} type="button" className="block w-full select-none rounded-lg bg-pink-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            >
                                <div class="flex px-8 items-center justify-between">
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
                                    </svg>
                                    <span className='font-bold text-lg'>
                                        {numComments}
                                    </span>
                                </div>
                            </Link>}
                    </div>
                    <div className='col-span-2'>
                        <p class="text-end block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
                            By: {card.user ? card.user.nombre : null}
                        </p></div>
                </div>
            </div ></div >
    )
}