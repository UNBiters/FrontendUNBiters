'use client'
import React, { useEffect, useState } from 'react';
import CardComent from '@/components/CardComment';
import CardChaza from '@/components/CardChaza';
import Comments from '@/components/Comments';
import Card from '@/components/Card';
import Filter from '@/components/Filter';
import NewPost from '@/components/NewPost';

import client, { myClient } from "@/config/client";
import ModalComments from '@/components/Modal/ModalComments';
import { useSearchParams, useRouter } from 'next/navigation'
import CardReview from '@/components/Cards/CardReview';


async function loadPost() {
  try {
    var res = await client.get("chazas");
    //console.log(res.data.data)
    return res.data.data;
  } catch (err) {
    console.log("err", err);
  }
}


export default function Home() {
  const searchParams = useSearchParams()
  const idSearch = searchParams.get('id')
  const router = useRouter()
  const [chazas, setChazas] = useState([])
  const [posts, setPosts] = useState([])
  useEffect(() => {

    client.get(`chazas`, { next: { revalidate: true | 0 | 60 } })
      .then((res) => {
        if (!res.status == "200") {
          throw new Error('Failed to fetch data')
        }
        setChazas(res.data.data.data)
      })

    client.get(`publications`, { next: { revalidate: true | 0 | 60 } }).
      then((res) => {

        if (!res.status == "200") {
          throw new Error('Failed to fetch data')
        }
        setPosts(res.data.data.data)
        //if (!posts) return "An error has occurred.";
      })
  }, [])
  //const post = await loadPost()
  var comments = [
    {
      "id": 1,
      "review": "¡Este es un comentario genial!",
      "urlImagen": "https://www.example.com/imagen1.jpg"
    },
    {
      "id": 2,
      "review": "Este es otro comentario genial",
      "urlImagen": "https://www.example.com/imagen2.jpg"
    },
    {
      "id": 3,
      "review": "¡Esta imagen es increíble!",
      "urlImagen": "https://www.example.com/imagen3.jpg"
    },
    {
      "id": 4,
      "review": "¡Este es un comentario muy profundo!",
      "urlImagen": "https://www.example.com/imagen4.jpg"
    },
    {
      "id": 5,
      "review": "¡Esta imagen me hace reír!",
      "urlImagen": "https://www.example.com/imagen5.jpg"
    },
    {
      "id": 6,
      "review": "¡Esta imagen es muy triste!",
      "urlImagen": "https://www.example.com/imagen6.jpg"
    },
    {
      "id": 7,
      "review": "¡Esta imagen es muy hermosa!",
      "urlImagen": "https://www.example.com/imagen7.jpg"
    },
    {
      "id": 8,
      "review": "¡Esta imagen es muy graciosa!",
      "urlImagen": "https://www.example.com/imagen8.jpg"
    },
    {
      "id": 9,
      "review": "¡Esta imagen es muy inspiradora!",
      "urlImagen": "https://www.example.com/imagen9.jpg"
    },
    {
      "id": 10,
      "review": "¡Esta imagen es muy creativa!",
      "urlImagen": "https://www.example.com/imagen10.jpg"
    }
  ]
  return (
    <div id='home' className='grid grid-cols-2'>
      {idSearch && (<ModalComments onClose={() => { router.push(`/#${idSearch}`) }} _id={idSearch} />)

      }
      <Filter />
      <div className='newpost col-span-2 flex justify-end px-3 min-[650px]:grid-cols-1'>
        <NewPost></NewPost>
      </div>
      {/* col-span-2 pt-3 CardProfile justify-items-center grid min-[1000px]:grid-cols-2 min-[1300px]:grid-cols-3 min-[1300px]:px-3 */}
      <div className="col-span-2  justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {posts ?
          posts.map((card) => (
            <>
              <CardReview key={"pub" + card._id} card={card} idModal={card._id} comments={card.reviews} className={"ListComment pb-2 md:mx-2 "} />
            </>
          )
          )

          : null}
        {chazas ?
          chazas.map((chaz) => (
            <>
              {/*<Card key={"cha" + chaz._id} card={chaz} idModal={chaz._id} comments={comments} className={"ListComment pb-2"}></Card>*/}
            </>
          )
          )

          : null}
      </div>
      <a href="/unbiters/pricing" className="invisible md:visible btn-flotante text-white  right-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Explora Premium
      </a>

    </div>
  )
}