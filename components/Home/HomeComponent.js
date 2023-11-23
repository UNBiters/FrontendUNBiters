"use client";
import React, { useEffect, useState } from "react";
import CardComent from "@/components/CardComment";
import CardChaza from "@/components/CardChaza";
import Comments from "@/components/Comments";
import Card from "@/components/Cards/Card";
import Filter from "@/components/Filter";
import NewPost from "@/components/NewPost";
import { Suspense } from "react";

import client from "@/config/client";
import ModalComments from "@/components/Modal/ModalComments";
import { useSearchParams, useRouter } from "next/navigation";
import CardReview from "@/components/Cards/CardReview";
import Container from "../Container";
import LoadingPost from "../Loading/LoadingPost";
import { useUsers } from "@/context/UserContext";
import Link from "next/link";
import Banner from "../Profile/Banner";

export default function HomeComponent({ postsFetch, namesFetch }) {
    const searchParams = useSearchParams();
    const [categorias, setCategorias] = useState([]);
    const idSearch = searchParams.get("id");
    const router = useRouter();
    const { token, userData } = useUsers();
    //console.log(token)
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const [chazas, setChazas] = useState([]);
    //const [token, setToken] = useState("");
    const [names, setName] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);

    function openModalPost() {
        if (!token) {
            console.log(token);
            //setIsOpen(false)
            setIsOpen1(true);
            console.log(isOpen1);
        } else {
            console.log(isOpen);
            setIsOpen(true);
        }
    }
    useEffect(() => {
        //console.log(postsFetch)
        setPosts(postsFetch);
        setName(namesFetch);
        setIsLoading(false)
        //console.log(posts)
        //setToken(window.sessionStorage.getItem("token"));
        /*client.get(`chazas`, { next: { revalidate: true | 0 | 60 } })
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
      })*/
    }, []);
    return (
        <>
            {isLoading ? <LoadingPost /> :
                <div>
                    {
                        userData.nivelSuscripcion == 0 ? <Banner className="visible md:invisible " text={"Revisa lo que puedes hacer con nuestra cuenta premium."} />
                            : null
                    }
                    (< div id="home" className="homePage grid grid-cols-2">
                        {idSearch && (
                            <ModalComments
                                token={token}
                                setPosts={setPosts}
                                onClose={() => {
                                    router.push(`/`, { scroll: false });
                                }}
                                _id={idSearch}
                            />
                        )}
                        <Filter
                            search={search}
                            setSearch={setSearch}
                            posts={posts}
                            setPosts={setPosts}
                            categorias={categorias}
                            setCategorias={setCategorias}
                        />
                        <div className="newpost col-span-2 flex justify-end px-3 min-[650px]:grid-cols-1">
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                                <button
                                    onClick={() => router.refresh()}
                                    type="button"
                                    className="btn-hover bg-[#9d5b5b] text-white px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-r rounded-l-lg  focus:z-10 focus:ring-2 focus:ring-gray-500 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                                >
                                    Actualizar Publicaciones
                                </button>
                                <button
                                    type="button"
                                    onClick={() => openModalPost()}
                                    className="btn-hover bg-[#9d5b5b] text-white px-4 py-2 text-sm font-medium text-gray-900 bg-transparent  rounded-r-md  focus:z-10 focus:ring-2 focus:ring-gray-500 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                                >
                                    Crear publicacíon
                                </button>
                            </div>
                            <NewPost
                                token={token}
                                posts={posts}
                                setIsOpenH={setIsOpen}
                                setPosts={setPosts}
                                isOpen1={isOpen1}
                                setIsOpen1={setIsOpen1}
                                open={isOpen}
                                onClose={() => {
                                    router.push("/");
                                    setIsOpen(false);
                                }}
                            ></NewPost>
                        </div>
                        {posts.length != 0 ? (
                            /* col-span-2 pt-3 CardProfile justify-items-center grid min-[1000px]:grid-cols-2 min-[1300px]:grid-cols-3 min-[1300px]:px-3 */
                            <div className="col-span-2  justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                                {posts.map((card) => (
                                    <CardReview
                                        token={token}
                                        names={names}
                                        key={card._id}
                                        card={card}
                                        idModal={card._id}
                                        comments={card.reviews}
                                        className={"ListComment pb-2 md:mx-2 "}
                                    />
                                ))}
                            </div>
                        ) : (
                            <>
                                {categorias.length != 0 || search != "" ? (
                                    <Container
                                        setPosts={setPosts}
                                        categorias={categorias}
                                        setCategorias={setCategorias}
                                    />
                                ) : (
                                    <LoadingPost />
                                )}
                            </>
                        )}{
                            userData.nivelSuscripcion == 0 ?
                                <Link
                                    href="/unbiters/pricing"
                                    className="invisible md:visible btn-flotante text-white  right-2.5 hover:[#9d5b5b] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                                >
                                    Explora Premium
                                </Link>
                                : null}
                    </div >)</div>
            }
        </>
    );
}
