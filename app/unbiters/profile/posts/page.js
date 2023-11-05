'use client'
import CardReview from '@/components/Cards/CardReview';
import NotFoundChaza from '@/components/NotFound/NotFoundChaza';
import { myClient } from "@/config/client";
import client from "@/config/client";
import { useEffect, useState } from 'react';
import ModalComments from '@/components/Modal/ModalComments';
import { useSearchParams, useRouter } from 'next/navigation'
import NewPost from '@/components/NewPost';

async function loadPost() {
    try {
        var res = await client.get("chazas");
        return res.data.data;
    } catch (err) {
        console.log("err", err);
    }
}
function Posts() {

    const [posts, setPosts] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()
    const idSearch = searchParams.get('id')
    const [id, setId] = useState('');
    useEffect(() => {
        try {

            var token = window.sessionStorage.getItem('token');
            client.get("publications/myPublications", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((res) => {
                    var post = res.data.data.publications
                    console.log(post)
                    console.log(post.length)
                    if (post.length != 0) {
                        setPosts(post)
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
            {posts ?
                <div className="col-span-2 CardProfile justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {posts ?
                        posts.map((card) => {
                            return <CardReview mode="edit" idSearch={idSearch} key={"pub" + card._id} card={card} idModal={card._id} comments={card.reviews} className={"ListComment pb-2 md:mx-2 "} />

                        })

                        : null}
                </div > :
                <NotFoundChaza tittle={"Opiniones "}></NotFoundChaza>
            }
        </>
    )
}

export default Posts

