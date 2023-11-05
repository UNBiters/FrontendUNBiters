'use client'
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

    const [comments, setComments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()
    const idSearch = searchParams.get('id')
    const [id, setId] = useState('');
    useEffect(() => {
        try {

            var token = window.sessionStorage.getItem('token');
            client.get("reviews/myReviews", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((res) => {
                    var post = res.data.data.reviews
                    console.log(post)
                    console.log(post.length)
                    if (post.length != 0) {
                        setComments(post)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>

            {idSearch && (<ModalComments onClose={() => { router.push(`/unbiters/profile/posts/#${idSearch}`) }} _id={idSearch} />)

            }
            <div className='CardProfile pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
                {comments ?
                    comments.map((comment) => (

                        <MyComments key={comment._id} comment={comment}></MyComments>
                    ))
                    :
                    <NotFoundChaza tittle={"Opiniones "}></NotFoundChaza>}
            </div>
        </>
    )
}

export default Comments

