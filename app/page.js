'use client'
import React, { useEffect, useState } from 'react';
import CardComent from '@/components/CardComment';
import CardChaza from '@/components/CardChaza';
import Comments from '@/components/Comments';
import Card from '@/components/Card';
import Filter from '@/components/Filter';
import NewPost from '@/components/NewPost';

import client from "@/config/client";
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
  const [categorias, setCategorias] = useState([]);
  const [numComments, setNumComments] = useState("");
  const idSearch = searchParams.get('id')
  const router = useRouter()
  const [chazas, setChazas] = useState([])
  const [names, setName] = useState([])
  const [posts, setPosts] = useState([])
  const [isOpen, setIsOpen] = useState(false)
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

    client.get(`chazas/every`, { next: { revalidate: true | 0 | 60 } })
      .then((res) => {
        //console.log(res)
        if (!res.status == "200") {
          throw new Error('Failed to fetch data')
        }
        var data = res.data.data.data
        if (data.length > 0) {
          //console.log(data)
          setName(data)
        } else {
          console.log("No hay data")
        }
      })
  }, [])
  return (
    <div id='home' className='grid grid-cols-2'>
      {idSearch && (<ModalComments numComments={numComments} setNumComments={setNumComments} onClose={() => { router.push(`/#${idSearch}`) }} _id={idSearch} />)

      }
      <Filter posts={posts} setPosts={setPosts} categorias={categorias} setCategorias={setCategorias} />
      <div className='newpost col-span-2 flex justify-end px-3 min-[650px]:grid-cols-1'>
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button onClick={() => router.refresh()} type="button" className="text-white px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
            Actualizar Publicaciones
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="text-white px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
          >
            Crear publicacíon
          </button>
        </div>
        <NewPost open={isOpen} onClose={() => { router.push("/"); setIsOpen(false) }}></NewPost>
      </div>
      {/* col-span-2 pt-3 CardProfile justify-items-center grid min-[1000px]:grid-cols-2 min-[1300px]:grid-cols-3 min-[1300px]:px-3 */}
      <div className="col-span-2  justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {posts ?
          posts.map((card) => (
            <>
              <CardReview numComments={numComments} setNumComments={setNumComments} names={names} key={card._id} card={card} idModal={card._id} comments={card.reviews} className={"ListComment pb-2 md:mx-2 "} />
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