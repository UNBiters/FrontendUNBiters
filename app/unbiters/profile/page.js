"use client";
import { useEffect, useState } from "react";
import client from "@/config/client";
import NotFoundChaza from "@/components/NotFound/NotFoundChaza";
import { useUsers } from "@/context/UserContext";
import CardProfile from "@/components/Cards/CardProfile";
import Card from "@/components/Card";

export default function ProfileView({ data }) {
    const { userChazas } = useUsers();

    const [chaza, setChaza] = useState([]);
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [fechaFundacion, setFechaFundacion] = useState("");
    const [categorias, setCategorias] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [horarioAtencion, setHorarioAtencion] = useState("");

    useEffect(() => {
        console.log(userChazas)
        setChaza(userChazas);
        setNombre(userChazas.nombre);
        setDescripcion(userChazas.descripcion);
        setCategorias(userChazas.categorias);
        setFechaFundacion(userChazas.fechaFundacion);
        setUbicacion(userChazas.ubicacion);
        setHorarioAtencion(userChazas.horarioAtencion);
    }, [userChazas]);
    return (
        <div className="bg-[#ffffff] ">
            {chaza.length == 0 ? (
                <NotFoundChaza tittle={"Chaza "}></NotFoundChaza>
            ) : (
                chazas.map((chaz) => (
                        <>
                            <Card key={"cha" + chaz._id} card={chaz} idModal={chaz._id} comments={comments} className={"ListComment pb-2 mx-2"}></Card>
                        </>
                    )
                    )
            )}
        </div>
    );
}
