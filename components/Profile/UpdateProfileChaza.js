"use client";
import { Listbox, Transition, Switch } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState, Fragment } from "react";
import client from "@/config/client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function UpdateProfile({ user, modal, title, created, _id }) {
    const router = useRouter();

    const searchParams = useSearchParams();

    const searchId = searchParams.get("id");
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
    const notifyDelete = () => toast.success("Publicación eliminada!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyError = (error) =>
        toast.error("Ups hay un problema! " + (error ? error : ""), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const [id, setId] = useState("");
    const [edit, setEdit] = useState(false);
    const [nombre, setNombre] = useState("");
    const [eslogan, setEslogan] = useState("");
    const [fechaFundacion, setFechaFundacion] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [mediosPagos, setMetodos] = useState([]);
    const [ubicacion, setUbicacion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [horarioAtencion, setHorarioAtencion] = useState([]);
    const [facebook, setFace] = useState("");
    const [instagram, setInsta] = useState("");
    const [paginaWeb, setWeb] = useState("");
    const [domicilio, setDomicilio] = useState("");
    const [token, setToken] = useState("");
    const [imagen, setImagen] = useState(null);

    const validation = (data) => {
        var flag = false;
        if (!data.descripcion) {
            notifyError("Por favor introduce una descripción");
            flag = true;
        } else if (data.descripcion.length < 10) {
            notifyError(
                "Por favor introduce un comentario mas largo, mínimo 50 caracteres."
            );
            flag = true;
        }
        if (data.categorias.length > 3) {
            notifyError("Por favor selecciona maximo 3 categorias");
            flag = true;
        }
        if (data.categorias.length < 1) {
            notifyError("Por favor selecciona al menos una categoria");
            flag = true;
        }
        if (data.mediosPagos.length < 1) {
            notifyError("Por favor selecciona al menos un medio de pago");
            flag = true;
        }
        if (data.horarioAtencion.length < 1) {
            notifyError("Por favor selecciona al menos un horario de atención");
            flag = true;
        }
        if (data.imagen < 1) {
            notifyError("Por favor sube una imagen para tu chaza");
            flag = true;
        }
        return flag;
    };
    const onSubmit = async (e) => {
        e.preventDefault();

        //console.log(edit)
        try {
            if (
                !validation({
                    descripcion,
                    categorias,
                    horarioAtencion,
                    mediosPagos,
                    imagen,
                })
            ) {
                if (!edit) {
                    var data = new FormData();
                    data.append("nombre", nombre);
                    data.append("eslogan", eslogan);
                    data.append("domicilios", domicilio == "on" ? true : false);
                    data.append("fechaFundacion", fechaFundacion);
                    data.append("ubicacion", ubicacion);
                    data.append("horarioAtencion", JSON.stringify(horarioAtencion));
                    data.append("paginaWeb", paginaWeb);
                    data.append("instagram", instagram);
                    data.append("facebook", facebook);
                    data.append("descripcion", descripcion);
                    data.append("tags", JSON.stringify(categorias));

                    for (const value of data.values()) {
                        console.log(value);
                    }
                    console.log(data);
                    const response = await client.post("chazas", data, {
                        headers: {
                            "content-type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log("data: ", response);
                    if (response) {
                    }
                } else {
                    var redesSociales = [facebook, instagram, paginaWeb];
                    var body = {
                        nombre,
                        eslogan,
                        mediosPagos,
                        fechaFundacion,
                        categorias,
                        ubicacion,
                        horarioAtencion,
                        redesSociales,
                        domicilio: domicilio == "on" ? true : false,
                        paginaWeb,
                        instagram,
                        facebook,
                        descripcion,
                    };
                    console.log(body);
                    //console.log(id);

                    var data = new FormData();
                    data.append("nombre", nombre);
                    data.append("imagen", imagen);
                    data.append("domicilios", domicilio == "on" ? true : false);
                    data.append("eslogan", eslogan);
                    data.append("mediosPagos", JSON.stringify(mediosPagos));
                    data.append("ubicacion", ubicacion);
                    data.append("horarioAtencion", JSON.stringify(horarioAtencion));
                    data.append("paginaWeb", paginaWeb);
                    data.append("instagram", instagram);
                    data.append("facebook", facebook);
                    data.append("descripcion", descripcion);
                    data.append("tags", JSON.stringify(categorias));
                    const response = await client.patch(
                        `chazas/updateMyChaza/${id}`,
                        data,
                        {
                            headers: {
                                "content-type": "multipart/form-data",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log("data: ", response);
                    if (response.status == "200") {
                        var chaza = response.data.data.updatedChaza;
                        notifyEdit();
                        setId(chaza.id);
                        setNombre(chaza.nombre);
                        setInsta(chaza.instagram);
                        setWeb(chaza.paginaWeb);
                        setFace(chaza.facebook);
                        setDescripcion(chaza.descripcion);
                        setCategorias(chaza.tags);
                        setEslogan(chaza.slug);
                        setMetodos(chaza.mediosPagos);
                        setDomicilio(chaza.domicilios);
                        if (chaza.fechaFundacion) {
                            var fecha = new Date(chaza.fechaFundacion);
                            var month = fecha.getMonth();
                            if (month < 10) {
                                month = "0" + month;
                            }
                            var year = fecha.getFullYear();
                            var day = fecha.getDate();
                            setFechaFundacion(year + "-" + month + "-" + day);
                        }
                        setUbicacion(chaza.ubicacion);
                        setHorarioAtencion(chaza.horarioAtencion);
                    } else {
                        console.error("Error: ");
                        // notifyError()
                    }
                }
            }
        } catch (error) {
            if (error.response.status == "403") {
                //console.log("Error: ", error);
                notifyError(error.response.data.message);
            } else {
                console.log("Error: ", error);
            }
        }
    };
    useEffect(() => {
        try {
            var token = window.sessionStorage.getItem("token");
            //console.log("data", token)
            //console.log("act")
            setToken(window.sessionStorage.getItem("token"));
            var chaza = null;
            if (searchId) {
                client
                    .get("chazas/" + searchId, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((res) => {
                        chaza = res.data.data.data;
                        console.log("page", chaza);
                        if (chaza.length != 0) {
                            setEdit(true);
                            //chaza = chaza[0];
                            //console.log("page2", chaza);
                            setId(chaza.id);
                            setNombre(chaza.nombre);
                            setDescripcion(chaza.descripcion);
                            setCategorias(chaza.tags);
                            setEslogan(chaza.slug);
                            setInsta(chaza.instagram);
                            setWeb(chaza.paginaWeb);
                            setFace(chaza.facebook);
                            setMetodos(chaza.mediosPagos);
                            setDomicilio(chaza.domicilios);
                            if (chaza.fechaFundacion) {
                                var fecha = new Date(chaza.fechaFundacion);
                                var month = fecha.getMonth();
                                if (month < 10) {
                                    month = "0" + month;
                                }
                                var year = fecha.getFullYear();
                                var day = fecha.getDate();
                                setFechaFundacion(year + "-" + month + "-" + day);
                            }
                            setUbicacion(chaza.ubicacion);
                            setHorarioAtencion(chaza.horarioAtencion);
                        } else {
                            setEdit(false);
                        }
                    });
            } else {
                setEdit(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

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
    var mediosPago = [
        {
            id: 1,
            nombre: "Nequi",
        },
        {
            id: 2,
            nombre: "Daviplata",
        },
    ];
    var horario = [
        {
            id: 1,
            nombre: "7-9",
        },
        {
            id: 2,
            nombre: "9-11",
        },
        {
            id: 3,
            nombre: "11-1",
        },
        {
            id: 4,
            nombre: "1-3",
        },
        {
            id: 5,
            nombre: "3-5",
        },
        {
            id: 6,
            nombre: "5-7",
        },
    ];

    function MyMultiSelectCategorias() {
        //console.log(categorias)
        return (
            <div className="w-72">
                <ToastContainer />
                <Listbox value={categorias} onChange={setCategorias} multiple>
                    <div className="relative mt-1">
                        <Listbox.Label>Categorias</Listbox.Label>
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block ">
                                {"Selecciona máximo 3:  "}
                                {categorias.map((cate) => cate).join(", ")}
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
                            <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {categoriasLists.map((cate) => (
                                    <Listbox.Option
                                        key={cate.id}
                                        value={cate.nombreCategoria}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? "bg-amber-100 text-amber-900"
                                                    : "text-gray-900"
                                            }`
                                        }
                                    >
                                        {({ categorias }) => (
                                            <>
                                                <span
                                                    className={`block  ${
                                                        categorias
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {cate.nombreCategoria}
                                                </span>
                                                {categorias ? (
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
    function MyMultiSelectMedios() {
        //console.log(mediosPagos)
        return (
            <div className="w-72">
                <Listbox value={mediosPagos} onChange={setMetodos} multiple>
                    <div className="relative mt-1">
                        <Listbox.Label>Medios de pago</Listbox.Label>
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block ">
                                {"Selecciona varios:  "}
                                {mediosPagos.map((cate) => cate).join(", ")}
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
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {mediosPago.map((cate) => (
                                    <Listbox.Option
                                        key={cate.id}
                                        value={cate.nombre}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? "bg-amber-100 text-amber-900"
                                                    : "text-gray-900"
                                            }`
                                        }
                                    >
                                        {({ mediosPagos }) => (
                                            <>
                                                <span
                                                    className={`block  ${
                                                        mediosPagos
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {cate.nombre}
                                                </span>
                                                {mediosPagos ? (
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
    function MyMultiSelectHorario() {
        //console.log(horarioAtencion)
        return (
            <div className="w-72">
                <Listbox value={horarioAtencion} onChange={setHorarioAtencion} multiple>
                    <div className="relative mt-1">
                        <Listbox.Label>Tu horario de atención</Listbox.Label>
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block ">
                                {"Selecciona varios:  "}
                                {horarioAtencion.map((cate) => cate).join(", ")}
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
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {horario.map((cate) => (
                                    <Listbox.Option
                                        key={cate.id}
                                        value={cate.nombre}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? "bg-amber-100 text-amber-900"
                                                    : "text-gray-900"
                                            }`
                                        }
                                    >
                                        {({ horarioAtencion }) => (
                                            <>
                                                <span
                                                    className={`block  ${
                                                        horarioAtencion
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {cate.nombre}
                                                </span>
                                                {horarioAtencion ? (
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
        <div className="h-full">
            <div className=" bg-gray-100 dark:bg-gray-900 pb-16 sm:pb-14 md:py-18">
                <div className="  px-4 mx-auto max-w-2xl  lg:py-16">
                    {user.chaza ? (
                        <form onSubmit={onSubmit} className="">
                            <div className="flex justify-end">
                                <Link
                                    href="/unbiters/profile"
                                    type="button"
                                    className="mb-2 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-lg  text-white  mx-3 bg-gray-500 hover:bg-gray-300  inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-[#9d5b5b] inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-lg  text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                                >
                                    {edit ? "Actualizar" : "Crear Chaza"}
                                </button>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Nombre de tu chaza:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="nombre"
                                        onChange={(e) => setNombre(e.target.value)}
                                        value={nombre}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="slug"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Eslogan de tu chaza:
                                    </label>
                                    <input
                                        type="text"
                                        name="slug"
                                        id="slug"
                                        onChange={(e) => setEslogan(e.target.value)}
                                        value={eslogan}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required
                                    />
                                </div>
                                <div className="text-start text-sm font-medium ">
                                    {MyMultiSelectCategorias()}
                                </div>
                                <div className="text-start text-sm font-medium ">
                                    {MyMultiSelectMedios()}
                                </div>

                                <div className="w-full">
                                    <label
                                        htmlFor="date"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Fecha de Fundacíon
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="fechaFundacion"
                                        onChange={(e) =>
                                            setFechaFundacion(e.target.value)
                                        }
                                        value={fechaFundacion}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="$2999"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="ubicacion"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Sector en la Universidad
                                    </label>
                                    <input
                                        type="text"
                                        name="ubicacion"
                                        id="ubicacion"
                                        onChange={(e) => setUbicacion(e.target.value)}
                                        value={ubicacion}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Tu ubicación"
                                        required
                                    />
                                </div>
                                <div className="">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Tu sitio web:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="nombre"
                                        onChange={(e) => setWeb(e.target.value)}
                                        value={paginaWeb}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Tu sitio web"
                                    />
                                </div>
                                <div className="">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Tu pagina de facebook:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="nombre"
                                        onChange={(e) => setFace(e.target.value)}
                                        value={facebook}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Tu pagina de facebook"
                                    />
                                </div>
                                <div className="">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Tu usuario de instagram:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="nombre"
                                        onChange={(e) => setInsta(e.target.value)}
                                        value={instagram}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Tu instagram"
                                    />
                                </div>

                                <div className="text-start text-sm font-medium ">
                                    {MyMultiSelectHorario()}
                                </div>
                                <div className="">
                                    <label
                                        for="checked-checkbox"
                                        className="text-sm font-semibold text-gray-900 dark:text-gray-300"
                                    >
                                        Marca esta casilla si haces domicilios{" "}
                                    </label>
                                    {domicilio ? (
                                        <input
                                            id="checked-checkbox"
                                            type="checkbox"
                                            checked
                                            onClick={(e) =>
                                                setDomicilio(e.target.checked)
                                            }
                                            className="text-end w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    ) : (
                                        <input
                                            id="checked-checkbox"
                                            type="checkbox"
                                            onClick={(e) =>
                                                setDomicilio(e.target.checked)
                                            }
                                            className="text-end w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    )}
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="descripcion"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Descripción
                                    </label>
                                    <textarea
                                        id="descripcion"
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        value={descripcion}
                                        rows="8"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Agrega una descripción"
                                    ></textarea>
                                </div>

                                <label
                                    for="cover-photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Actualiza la imagen de tu chaza
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
                                            onChange={(e) => setImagen(e.target.files[0])}
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                        />
                                    </label>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={onSubmit} className="py-3 md:py-5">
                            <div className="flex justify-end px-4 py-8">
                                <Link
                                    href="/unbiters/profile"
                                    type="button"
                                    className="mb-2 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-lg  text-white  mx-3 bg-gray-500 hover:bg-gray-300  inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-[#9d5b5b] inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-lg  text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                                >
                                    Actualizar
                                </button>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 my-auto">
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Nombre completo:
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="nombre"
                                        onChange={(e) => setNombre(e.target.value)}
                                        value={nombre}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Escribe tu nombre"
                                        required
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Tu correo:
                                    </label>
                                    <input
                                        type="email"
                                        name="correo"
                                        id="correo"
                                        onChange={(e) => setNombre(e.target.value)}
                                        value={nombre}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Escribe tu correo"
                                        required
                                    />
                                </div>
                                <label
                                    for="cover-photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Actualiza tu imagen de perfil
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
                                            onChange={(e) => setImagen(e.target.files[0])}
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                        />
                                    </label>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
