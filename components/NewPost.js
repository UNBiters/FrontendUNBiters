"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import { Listbox, Switch } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import client from "@/config/client";
import { useRouter } from "next/navigation";
import NotSesion from "./Modal/NotSesion";
import InputChazas from "./Input.js/InputChazas";
import Cookies from "js-cookie";

export default function NewPost({
    isOpen1,
    setIsOpen1,
    mode,
    open,
    onClose,
    post,
    setIsOpenH,
    token,
    id,
    posts,
    setPosts,
}) {
    var categoriasLists = [
        {
            id: 1,
            nombreCategoria: "Platos principales",
        },
        {
            id: 2,
            nombreCategoria: "Entrantes",
        },
        {
            id: 3,
            nombreCategoria: "Postres",
        },
        {
            id: 4,
            nombreCategoria: "Bebidas",
        },
        {
            id: 5,
            nombreCategoria: "Comidas rápidas",
        },
        {
            id: 6,
            nombreCategoria: "Comidas vegetarianas",
        },
        {
            id: 7,
            nombreCategoria: "Comidas veganas",
        },
        {
            id: 8,
            nombreCategoria: "Comidas saludables",
        },
        {
            id: 9,
            nombreCategoria: "Comidas internacionales",
        },
        {
            id: 10,
            nombreCategoria: "Comidas tradicionales",
        },
    ];
    const [tags, setCategorias] = useState([]);
    //console.log(post)
    const notifyEdit = () =>
        toast.success("Actualizado con exito!", {
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
    const router = useRouter();
    const [selected, setSelected] = useState({});
    const [chazaId, setChazaId] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    //const [isOpen1, setIsOpen1] = useState(false)
    const [notLogin, setNotLogin] = useState(false);
    const [error, setError] = useState("");
    const [succes, setSucces] = useState("");
    //const [token, setToken] = useState("");
    const [texto, setComment] = useState("");

    //const [imagen, setImages] = useState('');
    const [rating, setRating] = useState("");
    const [classe, setClasse] = useState("");
    const [classe1, setClasse1] = useState("");
    const [classe2, setClasse2] = useState("");
    const [classe3, setClasse3] = useState("");
    const [classe4, setClasse4] = useState("");
    const [nombreChaza, setNombreChaza] = useState("");
    const [imagen, setImagen] = useState(null);

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
    function closeModal() {
        setIsOpenH(false);
        setIsOpen(false);
    }
    function clean() {
        setError("");
        setSucces("");
        setComment("");
        //setImages()
        setRating("");
        setClasse("");
        setClasse1("");
        setClasse2("");
        setClasse3("");
        setClasse4("");
        setNombreChaza("");
        setSelected({});
        setImagen(null);
        closeModal();
    }
    const validation = (data) => {
        var flag = false;
        if (!data.texto) {
            setError("Por favor introduce un comentario");
            flag = true;
        } else if (data.texto.length < 30) {
            setError(
                "Por favor introduce un comentario mas largo, mínimo 50 caracteres."
            );
            flag = true;
        }
        if (!data.rating) {
            setError("Por favor introduce un calificacíon");
            flag = true;
        }
        if (!data.imagen) {
            setError("Por favor sube una imagen");
            flag = true;
        }
        if (data.tags.length < 1) {
            setError("Por favor agrega al menos una etiqueta");
            flag = true;
        }
        if (data.tags.length > 3) {
            setError("Por favor selecciona menos de 3 etiquetas");
            flag = true;
        }
        return flag;
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(imagen);
        try {
            if (!validation({ texto, rating, imagen, tags })) {
                if (mode != "edit") {
                    var data = new FormData();
                    data.append("imagen", imagen);
                    data.append("texto", texto);
                    data.append("rating", rating);
                    data.append("tags", JSON.stringify(tags));

                    data.append("nombreChaza", selected.nombre);
                    var body = {
                        texto,
                        imagen: imagen,
                        rating,
                        nombreChaza,
                        selected,
                        tags,
                    };
                    for (const value of data.values()) {
                        console.log(value);
                    }
                    console.log(body);
                    const response = await client.post("publications/", data, {
                        headers: {
                            "content-type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.status == "201") {
                        console.log("sucess: ", response);
                        setError("");
                        setSucces("La publicacíon se ha creado exitosamente!");
                        //refresh()
                        var res = await client.get("publications");
                        //console.log(res.data.data)
                        res.data.data.data;
                        //console.log(response.data.data.data);
                        //var newPost = posts
                        //newPost.push(response.data.data.data)
                        setPosts(res.data.data.data);
                        closeModal();
                        clean();
                        //setPosts(newPosts)
                        setTimeout(function () {
                            clean();
                        }, 4000);
                    } else {
                        console.log("DATA: ", response.data.message);
                        setError(response.data.message);
                        setTimeout(function () {
                            setError("");
                        }, 2000);
                    }

                    setTimeout(function () {
                        setError("");
                    }, 5000);
                } else {
                    var data = new FormData();
                    data.append("imagen", imagen);
                    data.append("texto", texto);
                    data.append("rating", rating);
                    data.append("tags", JSON.stringify(tags));

                    data.append("nombreChaza", selected.nombre);
                    //console.log("edittttt22", id)
                    for (const value of data.values()) {
                        console.log(value);
                    }
                    const response = await client.patch(
                        `publications/updateMyPublication/${id}`,
                        data,
                        {
                            headers: {
                                "content-type": "multipart/form-data",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log(response)
                    if (response.status == "200") {
                        const postUp = response.data.data.publication;
                        //console.log('sucess: ', postUp);
                        //refresh()
                        const newPosts = posts.map((post) => {
                            if (post.id == id) {
                                post = postUp;
                            }
                            return post;
                        });
                        console.log("newPosts", newPosts)
                        setPosts(newPosts);
                        posts = newPosts
                        onClose();
                        notifyEdit();
                    } else {
                        notifyError();
                    }

                }
            } else {
                setTimeout(() => {
                    setError("");
                }, 3000);
            }
        } catch (error) {
            console.log("Error: ", error);
            onClose();
            notifyError();
        }
    };
    const onClick = (number) => {
        var func = [setClasse, setClasse1, setClasse2, setClasse3, setClasse4];
        for (var i = 0; i < 5; i++) {
            func[i]("text-gray-300 ");
        }
        for (var i = 0; i < number; i++) {
            func[i]("text-yellow-300");
        }
        setRating(number);
    };
    useEffect(() => {
        //var tkn = Cookies.get("token");
        //setToken(Cookies.get("token") ? Cookies.get("token") : "");
        //setToken(window.sessionStorage.getItem("token"));
        setIsOpen(open);
        if (post) {
            //console.log(post)
            setComment(post.texto);
            setCategorias(post.tags);
            setNombreChaza(post.nombreChaza);
            if (post.chaza) {
                //setSelected({ nombre: selected.map((item) => item.id == post.chaza) })
                setChazaId(post.chaza);
            } else {
                setSelected({ nombre: post.nombreChaza });
            }
            onClick(post.rating);
            setImagen(post.imagenUrl);
        }
    }, [open, post]);

    function MyMultiSelectCategorias() {
        return (
            <div className="bg-[#9d5b5b] rounded-lg">
                <Listbox value={tags} onChange={setCategorias} multiple>
                    <div className="relative mt-1  ">
                        <Listbox.Button className="hover:bg-[#9d5b5b]/[0.7]  relative w-full cursor-default  rounded-md py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block ">{"Añade algunas etiquetas"}</span>
                            <span className="block text-white">
                                {tags.map((cate) => cate).join(", ")}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {categoriasLists.map((cate) => (
                                    <Listbox.Option
                                        key={cate.id}
                                        value={cate.nombreCategoria}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active
                                                ? "bg-amber-100 text-amber-900"
                                                : "text-gray-900"
                                            }`
                                        }
                                    >
                                        {({ tags }) => (
                                            <>
                                                <span
                                                    className={`block  ${tags
                                                        ? "font-medium"
                                                        : "font-normal"
                                                        }`}
                                                >
                                                    {cate.nombreCategoria}
                                                </span>
                                                {tags ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                        <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
        );
    }
    return (
        <>
            <ToastContainer />
            {mode == "edit" ? <></> : <></>}
            {isOpen1 && (
                <NotSesion
                    onClose={() => {
                        router.push("/");
                        setIsOpen1(false);
                    }}
                    onRedirect={() => {
                        router.push("/unbiters/login");
                        setIsOpen1(false);
                    }}
                />
            )}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className=" pt-16 pb-16 fixed inset-0 overflow-y-auto">
                        <div className="mx-auto flex items-center justify-center p-4 text-center max-w-lg">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-screen-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    {mode == "edit" ? (
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            {" "}
                                            Edita tu publicación{" "}
                                        </Dialog.Title>
                                    ) : (
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            {" "}
                                            Crea tu publicación{" "}
                                        </Dialog.Title>
                                    )}

                                    <div className="mt-2">
                                        <form
                                            onSubmit={onSubmit}
                                            encType="multipart/form-data"
                                        >
                                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                {error ? (
                                                    <div
                                                        className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                                                        role="alert"
                                                    >
                                                        <svg
                                                            className="flex-shrink-0 inline w-4 h-4 mr-3"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                                        </svg>
                                                        <span className="sr-only">
                                                            Info
                                                        </span>
                                                        <div>
                                                            <span className="font-medium">
                                                                Advertencia!
                                                            </span>{" "}
                                                            {error}
                                                        </div>
                                                    </div>
                                                ) : null}

                                                {succes ? (
                                                    <div
                                                        className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                                                        role="alert"
                                                    >
                                                        <svg
                                                            className="flex-shrink-0 inline w-4 h-4 mr-3"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                                        </svg>
                                                        <span className="sr-only">
                                                            Info
                                                        </span>
                                                        <div>
                                                            <span className="font-medium">
                                                                Exitoso!
                                                            </span>{" "}
                                                            {succes}
                                                        </div>
                                                    </div>
                                                ) : null}
                                                <div className="p-6 space-y-6">
                                                    <div className=" mx-auto my-auto items-center">
                                                        <div className=" w-full">
                                                            <label
                                                                htmlFor="name"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Nombre de la chaza:
                                                            </label>
                                                            <InputChazas
                                                                chazaId={chazaId}
                                                                selected={selected}
                                                                setSelected={setSelected}
                                                            />
                                                        </div>
                                                    </div>
                                                    <label
                                                        htmlFor="message"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Escribe tu opinión
                                                    </label>
                                                    <div>
                                                        <textarea
                                                            name="message"
                                                            rows="4"
                                                            onChange={(e) =>
                                                                setComment(e.target.value)
                                                            }
                                                            value={texto}
                                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            placeholder="Algún comentario..."
                                                            maxLength="600"
                                                        ></textarea>
                                                    </div>
                                                    <label
                                                        htmlFor="message"
                                                        className="block  text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        Califica tu experiencia en la
                                                        chaza
                                                    </label>
                                                    <div className="grid grid-cols-2 grid-flow-col items-baseline">
                                                        <div className="flex col-span-2 ">
                                                            <div className="flex flex-row-reverse mx-auto items-center space-x-1">
                                                                <svg
                                                                    onClick={() =>
                                                                        onClick(5)
                                                                    }
                                                                    className={
                                                                        classe4 +
                                                                        " w-8 h-8 text-gray-300 peer peer-hover:text-yellow-300 hover:text-yellow-300"
                                                                    }
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 22 20"
                                                                >
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                                </svg>
                                                                <svg
                                                                    onClick={() =>
                                                                        onClick(4)
                                                                    }
                                                                    className={
                                                                        classe3 +
                                                                        " w-8 h-8 text-gray-300 peer peer-hover:text-yellow-300 hover:text-yellow-300"
                                                                    }
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 22 20"
                                                                >
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                                </svg>
                                                                <svg
                                                                    onClick={() =>
                                                                        onClick(3)
                                                                    }
                                                                    className={
                                                                        classe2 +
                                                                        " w-8 h-8 text-gray-300 peer peer-hover:text-yellow-300 hover:text-yellow-300"
                                                                    }
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 22 20"
                                                                >
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                                </svg>
                                                                <svg
                                                                    onClick={() =>
                                                                        onClick(2)
                                                                    }
                                                                    className={
                                                                        classe1 +
                                                                        " w-8 h-8 text-gray-300 peer peer-hover:text-yellow-300 hover:text-yellow-300"
                                                                    }
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 22 20"
                                                                >
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                                </svg>
                                                                <svg
                                                                    onClick={() =>
                                                                        onClick(1)
                                                                    }
                                                                    className={
                                                                        classe +
                                                                        " w-8 h-8 text-gray-300 dark:text-gray-500 peer peer-hover:text-yellow-300 hover:text-yellow-300"
                                                                    }
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 22 20"
                                                                >
                                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className=" mx-auto my-auto items-center">
                                                        <div className=" w-full">
                                                            {MyMultiSelectCategorias()}
                                                        </div>
                                                    </div>
                                                    <label
                                                        htmlFor="cover-photo"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Sube una imagen de tu experiencia
                                                    </label>

                                                    <div className="flex items-center justify-center w-full">
                                                        <label className="block">
                                                            <span className="sr-only">
                                                                Choose profile photo
                                                            </span>
                                                            <input
                                                                id="imagen"
                                                                type="file"
                                                                multiple
                                                                accept="image/*"
                                                                onChange={(e) =>
                                                                    setImagen(
                                                                        e.target.files[0]
                                                                    )
                                                                }
                                                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                                            />
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                        {mode == "edit" ? (
                                                            <button
                                                                type="submit"
                                                                className="text-white bg-[#9d5b5b] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                            >
                                                                Actualizar
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="text-white bg-[#9d5b5b] hover:bg-[#9d5b5b]/[0.7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                type="submit"
                                                            >
                                                                Publicar
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={onClose}
                                                            type="button"
                                                            className="text-dark bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    {/*<div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Got it, thanks!
                                        </button>
                                            </div>*/}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
