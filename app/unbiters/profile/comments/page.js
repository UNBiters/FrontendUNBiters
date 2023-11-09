'use client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardReview from '@/components/Cards/CardReview';
import NotFoundChaza from '@/components/NotFound/NotFoundChaza';
import { myClient } from "@/config/client";
import client from "@/config/client";
import { useEffect, useState } from 'react';
import ModalComments from '@/components/Modal/ModalComments';
import { useSearchParams, useRouter } from 'next/navigation'
import NewPost from '@/components/NewPost';
import MyComments from '@/components/Cards/MyComments';

async function loadPost() {
    try {
        var res = await client.get("chazas");
        return res.data.data;
    } catch (err) {
        console.log("err", err);
    }
}
function Comments() {
    const notifyEdit = () => toast.success('Actualizado con exito!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyDelete = () => toast("Publicación eliminada!");
    const notifyError = () => toast.error('Ups hubo un error!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const [comments, setComments] = useState([])
    const [token, setToken] = useState("")
    const searchParams = useSearchParams()
    const router = useRouter()
    const idSearch = searchParams.get('id')
    const [id, setId] = useState('');
    useEffect(() => {
        try {

            var tkn = (window.sessionStorage.getItem('token'))
            setToken(tkn)
            client.get("reviews/myReviews", {
                headers: {
                    "Authorization": `Bearer ${tkn}`
                }
            })
                .then((res) => {
                    var post = res.data.data.reviews
                    //console.log(post)
                    //console.log(post.length)
                    if (post.length != 0) {
                        setComments(post)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    async function deleteCommentUp(id) {
        //console.log("borrarrrr", id)
        try {
            const response = await client.delete(`reviews/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status == "204") {
                //notifyDelete()
                notifyDelete()
                setComments(comments => {
                    return comments.filter(post => post.id !== id)
                })
                //router.refresh()
            } else {
                notifyError()
            }
            console.log(response)
        } catch (error) {
            notifyError()
            console.log(error)
        }
    }
    async function editCommentUp(id, commentUp) {
        //console.log("editarr", commentUp, id)
        //console.log("editarr", token)
        try {
            const response = await client.patch(`reviews/${id}`, { review: commentUp }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status == "200") {
                //notifyDelete()
                const newComments = comments.map((comment) => {
                    if (comment.id == id) {
                        comment.review = commentUp
                    }
                    return comment
                })
                notifyEdit()
                setComments(newComments)
                //console.log(comments)
                //router.refresh()
            } else {
                notifyError()
            }
            //console.log(response)
        } catch (error) {
            notifyError()
            console.log(error)
        }
    }
    return (
        <>
            <ToastContainer />

            {idSearch && (<ModalComments onClose={() => { router.push(`/unbiters/profile/posts/#${idSearch}`) }} _id={idSearch} />)

            }
            <div className='CardProfile pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                {comments ?
                    comments.map((comment) => (

                        <MyComments key={comment._id} comment={comment} editCommentUp={editCommentUp} deleteCommentUp={deleteCommentUp}></MyComments>
                    ))
                    :
                    <NotFoundChaza tittle={"Opiniones "}></NotFoundChaza>}
            </div>
        </>
    )
}

export default Comments

