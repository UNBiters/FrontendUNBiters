'use client'
import { useEffect, useState } from 'react';
import Comments from './Comments';
import client from "@/config/client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NotSesion from './Modal/NotSesion';

export default function CardComent({ className, card, comments, idModal }) {
  //console.log(card)
  var start = [1, 1, 1, 1]
  const router = useRouter();
  const [isOpen1, setIsOpen1] = useState(false)
  const [fill, setFill] = useState("text-blue-700 border border-blue-700 ")
  const [token, setToken] = useState('');
  const stars = (length) => {
    var arrStar = []
    for (let index = 0; index < length; index++) {
      arrStar.push(<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>)
    }
    return arrStar
  }
  function openModal(token) {
    var flag = true
    if (!token) {
      setIsOpen1(true)
      console.log(isOpen1)
      flag = false
    }
    return flag
  }
  const onClick = async (e) => {
    try {
      if (openModal(token)) {
        console.log(token)
        const response = await client.post('publications/' + card._id + "/likes", {}, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        console.log(response)

        if (response.status == "200") {
          console.log('adta: ', response.data.data.userLike.active);
          if (response.data.data.userLike.active) {
            setFill("bg-blue-700 text-white ")
          } else {
            setFill("text-blue-700 border border-blue-700 ")
          }
          //refreshData();
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setToken(window.sessionStorage.getItem('token'))
  }, [])
  return (
    <div className={className}>

      {isOpen1 && (<NotSesion onClose={() => { router.push("/"); setIsOpen1(false) }}
        onRedirect={() => { router.push("/unbiters/login"); setIsOpen1(false) }} />)
      }


      <div className="max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <button data-modal-target={idModal} data-modal-toggle={idModal} className="block" type="button">

          <img className="rounded-t-lg" src="/images/test.jpg" alt="" />

          <div className=" p-2 text-center font-normal text-gray-700 dark:text-gray-400">
            <p className='mx-auto'>
              {card.texto}
            </p>
            <div className="flex justify-end mb-5 mt-2.5 items-center">
              <span className="rounded bg-cyan-100 text-center text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                {card.nombreChaza}
              </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
              <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                <p>
                  {Number(card.rating).toFixed(1)}
                </p>
              </span>
            </div>
            <div className="flex justify-end mb-5 mt-2.5 items-center">
              <div className="tags">
                <div className="overlap">
                  <ul className="text-wrapper-3 flex flex-wrap items-center sm:flex-row md:text-lg">

                    {card.categorias ? card.categorias.map((categorias) => (

                      <li key={"re2" + categorias.indexOf(categorias)} className="mr-2">{categorias}</li>)
                    ) : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </button>
        <div className="p-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">

          <div className="grid grid-cols-2 gap-4 content-center">
            <div>
              <button onClick={onClick} type="button" className={`${fill} hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500`}>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                </svg>
                <span className="rounded bg-cyan-100 text-center text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                  {card.likes}
                </span>
              </button>
            </div>
            <div>
              <Link href={"/?id=" + card._id} type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
                </svg>
                <span className="rounded bg-cyan-100 text-center text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                  {card.numComentarios}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


