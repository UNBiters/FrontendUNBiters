"use client";
import { useEffect, useState } from "react";
import client from "@/config/client";
import NotFoundChaza from "@/components/NotFound/NotFoundChaza";
import { useUsers } from "@/context/UserContext";
import Card from "@/components/Cards/Card";
import Link from "next/link";
import ProfileUser from "../Profile/ProfileUser";
import LoadingPost from "../Loading/LoadingPost";

export default function CardProfile({ token, chazasFetch, user }) {
    const { userChazas } = useUsers();

    const [chazas, setChaza] = useState([]);
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [fechaFundacion, setFechaFundacion] = useState("");
    const [categorias, setCategorias] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [horarioAtencion, setHorarioAtencion] = useState("");

    useEffect(() => {
        setChaza(chazasFetch);
        /*setNombre(userChazas.nombre);
        setDescripcion(userChazas.descripcion);
        setCategorias(userChazas.categorias);
        setFechaFundacion(userChazas.fechaFundacion);
        setUbicacion(userChazas.ubicacion);
        setHorarioAtencion(userChazas.horarioAtencion);*/
    }, [chazasFetch]);
    if (user.chaza && chazas.length == 0) {
        return <LoadingPost />;
    }
    return (
        <div className=" bg-[#ffffff] py-4">
            {user.chaza ? (
                <>
                    {chazas.length == 0 ? (
                        <NotFoundChaza tittle={"Chaza "}></NotFoundChaza>
                    ) : (
                        <>
                            <div className="flex justify-end">
                                <Link
                                    href="profile/me"
                                    type="button"
                                    className="bg-[#9d5b5b] inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-lg  text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                                >
                                    {"Crear Chaza"}
                                </Link>
                            </div>
                            <div className="pb-26 col-span-2 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                                {chazas.map((chaza) => (
                                    <Card
                                        key={chaza._id}
                                        setChaza={setChaza}
                                        token={token}
                                        mode="edit"
                                        card={chaza}
                                        className={"ListComment pb-2 mx-2"}
                                    ></Card>
                                ))}
                            </div>
                        </>
                    )}
                </>
            ) : (
                <ProfileUser user={user} />
            )}
        </div>
    );
}
