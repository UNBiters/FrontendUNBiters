"use client";
import { useEffect, useState } from "react";
import client from "@/config/client";
import NotFoundChaza from "@/components/NotFound/NotFoundChaza";
import { useUsers } from "@/context/UserContext";
import Card from "@/components/Card";

export default function CardProfile({ chazasFetch }) {
    //const { userChazas } = useUsers();

    const [chazas, setChaza] = useState([]);
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [fechaFundacion, setFechaFundacion] = useState("");
    const [categorias, setCategorias] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [horarioAtencion, setHorarioAtencion] = useState("");

    useEffect(() => {
        console.log(chazasFetch);
        setChaza(chazasFetch);
        /*setNombre(userChazas.nombre);
        setDescripcion(userChazas.descripcion);
        setCategorias(userChazas.categorias);
        setFechaFundacion(userChazas.fechaFundacion);
        setUbicacion(userChazas.ubicacion);
        setHorarioAtencion(userChazas.horarioAtencion);*/
    }, [chazasFetch]);
    return (
        <div className="bg-[#ffffff] py-4">
            <div className="pb-12 col-span-2 justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {chazas.length == 0 ? (
                    <NotFoundChaza tittle={"Chaza "}></NotFoundChaza>
                ) : (
                    chazas.map((chaza) => (
                        <div key={chaza._id}>
                            <Card mode="edit"  card={chaza}></Card>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
