"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardReview from "@/components/Cards/CardReview";
import NotFoundChaza from "@/components/NotFound/NotFoundChaza";
import { myClient } from "@/config/client";
import client from "@/config/client";
import { useEffect, useState } from "react";
import ModalComments from "@/components/Modal/ModalComments";
import { useSearchParams, useRouter } from "next/navigation";
import NewPost from "@/components/NewPost";
import Container from "../Container";

async function loadPost() {
    try {
        var res = await client.get("chazas");
        return res.data.data;
    } catch (err) {
        console.log("err", err);
    }
}
function PostComponent({ postsFetch, namesFetch, token }) {
    const notifyDelete = () => toast("Publicación eliminada!");
    const notifyError = () =>
        toast.error("Ups hubo un error!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const [posts, setPosts] = useState([]);
    const [names, setName] = useState([]);
    const [numComments, setNumComments] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();
    //const [token, setToken] = useState("")
    const idSearch = searchParams.get("id");
    const [id, setId] = useState("");
    useEffect(() => {
        try {
            //console.log(postsFetch)
            setPosts(postsFetch);
            setName(namesFetch);
            /*var tkn = (window.sessionStorage.getItem('token'))
            setToken(tkn)
            client.get("publications/myPublications", {
                headers: {
                    "Authorization": `Bearer ${tkn}`
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
        } catch (error) {
            console.log(error);
        }
    }, []);

    async function deletePostUp(id) {
        console.log("borrarrrr", id);
        try {
            const response = await client.delete(
                `publications/deleteMyPublication/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status == "204") {
                //notifyDelete()
                notifyDelete();
                setPosts((posts) => {
                    return posts.filter((post) => post.id !== id);
                });
                //router.refresh()
            } else {
                notifyError();
            }
            console.log(response);
        } catch (error) {
            notifyError();
            console.log(error);
        }
    }

    async function editPostUp(id, postUp) {
        console.log("editarr", postUp, id);
        //console.log("editarr", token)
        return;
        try {
            const response = await client.patch(
                `publications/myPublications/${id}`,
                postUp,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status == "200") {
                //notifyDelete()
                const newComments = posts.map((comment) => {
                    if (comment.id == id) {
                        comment.review = postUp;
                    }
                    return comment;
                });
                notifyEdit();
                setPosts(newComments);
                //router.refresh()
            } else {
                notifyError();
            }
            //console.log(response)
        } catch (error) {
            notifyError();
            console.log(error);
        }
    }
    return (
        <>
            <ToastContainer />
            {idSearch && (
                <ModalComments
                setPosts={setPosts}
                    numComments={numComments}
                    setNumComments={setNumComments}
                    onClose={() => {
                        router.push(`/unbiters/profile/posts/#${idSearch}`);
                    }}
                    _id={idSearch}
                />
            )}
            {posts.length != 0 ? (
                <div className="col-span-2 CardProfile justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {posts
                        ? posts.map((card) => {
                              return (
                                  <CardReview
                                      numComments={numComments}
                                      setNumComments={setNumComments}
                                      names={names}
                                      posts={posts}
                                      setPosts={setPosts}
                                      mode="edit"
                                      idSearch={idSearch}
                                      key={"pub" + card._id}
                                      card={card}
                                      idModal={card._id}
                                      comments={card.reviews}
                                      editPostUp={editPostUp}
                                      deletePostUp={deletePostUp}
                                      className={"ListComment pb-2 md:mx-2 "}
                                  />
                              );
                          })
                        : null}
                </div>
            ) : (
                <Container
                    title={"Publicaciones no econtradas "}
                    message={
                        "Lo sentimos no encontramos ninguna publicación de tu autoria, te invitamos a opinar."
                    }
                    mode={"profile"}
                />
            )}
        </>
    );
}

export default PostComponent;
