'use client'
import CardComent from '@/components/CardComment';
import NotFoundChaza from '@/components/NotFound/NotFoundChaza';
import { myClient } from "@/config/client";
import client from "@/config/client";
import { useEffect, useState } from 'react';

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
    const [id, setId] = useState('');
    useEffect(() => {
        try {

            var token = window.sessionStorage.getItem('token');
            client.get("chazas/myChaza", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((res) => {
                    var chaza = res.data.data.myChaza
                    if (chaza.length != 0) {
                        var id = chaza[0]._id
                        setId(chaza._id)

                        if (id != "") {

                            client.get("publications/me/" + id, {
                                headers: {
                                    "Authorization": `Bearer ${token}`
                                }
                            })
                                .then((res) => {
                                    var post = res.data.data.data
                                    setPosts(post)
                                })
                        }
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>{posts.length != 0 ?
            <div className="CardProfile grid justify-items-center ">
                {posts ?
                    posts.map((card) => {
                        var { _id } = card.user
                        return < CardComent key={_id + card._id} card={card} idModal={_id + card._id} comments={card.reviews} className={"ListComment pb-2"} ></CardComent>
                    })

                    : null}
            </div > :
            <NotFoundChaza tittle={"Opiniones "}></NotFoundChaza>
        }
        </>
    )
}

export default Posts

