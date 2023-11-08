import 'moment/locale/es';
import moment from "moment";
import Delete from '../Modal/Delete';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import UpdateComment from '../Modal/UpdateComment';
export default function MyComments({ comment, deleteCommentUp, editCommentUp }) {
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)
    const router = useRouter();
    //console.log("asii llegann", comment)

    function deletePost(id) {
        console.log("borrarrrr")
    }
    return (
        <>

            {isOpenDelete && (<Delete message={"Borrar comentario"} onClose={() => { router.push("/unbiters/profile/comments", { scroll: false }); setIsOpenDelete(false) }}
                onRedirect={() => { deleteCommentUp(comment._id); router.push("/unbiters/profile/comments", { scroll: false }); setIsOpenDelete(false) }} />)
            }
            {isOpenUpdate && (<UpdateComment id={comment.id} editCommentUp={editCommentUp} myComment={comment.review} message={"Borrar publicación"} onClose={() => { router.push("/unbiters/profile/comments", { scroll: false }); setIsOpenUpdate(false) }}
                onRedirect={(upcomment) => { editCommentUp(comment.id, upcomment); router.push("/unbiters/profile/comments", { scroll: false }); setIsOpenUpdate(false) }} />)
            }
            <div class="mt-2 bg-white relative  mx-4  flex justify-between gap-x-6 p-5 rounded-md">
                <div class=" flex min-w-0 gap-x-4">
                    <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">{comment.user.nombre}</p>
                        <p class="mt-1 text-clip  text-xs leading-5 text-gray-500">{comment.review}</p>
                    </div>
                    <button
                        class="!absolute top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => setIsOpenDelete(true)}
                        data-ripple-dark="true"
                    >
                        <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                            </svg>

                        </span>
                    </button>
                    <button
                        class="!absolute top-4 right-12 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => setIsOpenUpdate(true)}
                        data-ripple-dark="true"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                        </svg>

                    </button>
                </div>
                <div class="pt-10 hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <button class="flex text-sm leading-6 text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                        </svg>
                        Ver publicación
                    </button>
                    <p class="mt-1 text-xs leading-5 text-gray-500"><time datetime="">{moment(comment.createdAt, "YYYYMMDD").fromNow()}</time></p>

                </div>

            </div>

        </>
    )
}