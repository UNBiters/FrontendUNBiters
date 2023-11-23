"use client";
import { useEffect, useState } from "react";
import client from "@/config/client";
import NotFoundChaza from "@/components/NotFound/NotFoundChaza";
import { useUsers } from "@/context/UserContext";
import Card from "@/components/Cards/Card";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ProfileUser from "../Profile/ProfileUser";
import LoadingPost from "../Loading/LoadingPost";
import Banner from "../Profile/Banner";
import Delete from "../Modal/Delete";

export default function CardProfile({ chazasFetch }) {
    const { setLogin, userData, setIsToken } = useUsers();
    console.log(userData)
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [chazas, setChaza] = useState([]);
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [fechaFundacion, setFechaFundacion] = useState("");
    const [categorias, setCategorias] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [horarioAtencion, setHorarioAtencion] = useState("");
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenDesactivar, setIsOpenDesactivar] = useState(false);

    const router = useRouter();
    const desactivar = async () => {

        const res = await client.get(`payment/mySubscription`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res);
        if (res.status == "200") {
            const idSus = res.data.data.subscription.id

            const response = await client.patch(`payment/subscription/${idSus}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response);
            if (response.status == "200") {

                setIsToken(null)
                Cookies.remove("token", { path: "/" });
                Cookies.remove("user");
                window.sessionStorage.clear();
                setLogin(false);
                router.push("/unbiters/login");
            }
        }
    }
    const deleteCuenta = async () => {

    }
    useEffect(() => {

        var tkn = Cookies.get("token");
        setToken(tkn);
        console.log(tkn)
        setUser(JSON.parse(Cookies.get("user")))
        client.get("chazas/myChaza", {
            headers: {
                Authorization: `Bearer ${tkn}`,
            },
        }).then(res => {
            res.data.data.myChaza
            setChaza(res.data.data.myChaza);
            setIsLoading(false);
        })
        /*setNombre(userChazas.nombre);
        setDescripcion(userChazas.descripcion);
        setCategorias(userChazas.categorias);
        setFechaFundacion(userChazas.fechaFundacion);
        setUbicacion(userChazas.ubicacion);
        setHorarioAtencion(userChazas.horarioAtencion);*/
    }, []);
    if (user.chaza && chazas.length == 0) {
        //return <LoadingPost />;
    }
    return (
        <div className=" bg-[#ffffff] ">
            {isLoading ? (
                <LoadingPost />
            ) : (
                <>
                    {isOpenDelete && (
                        <Delete
                            message={"Eliminar Cuenta"}
                            text={"¿Deseas eliminar tu cuenta en UNBiters? Te extrañaremos. :c"}
                            btnText={"Continuar"}
                            onClose={() => {
                                router.push("/unbiters/profile", { scroll: false });
                                setIsOpenDelete(false);
                            }}
                            onRedirect={() => {
                                deleteCuenta();
                                //router.push("/unbiters/login", { scroll: false });
                                setIsOpenDelete(false);
                            }}
                        />
                    )}
                    {isOpenDesactivar && (
                        <Delete
                            text={"¿Deseas desactivar tu suscripción a UNBiters? Te redirigiremos al login si el proceso fue exitoso. Te extrañaremos. :c"}
                            message={"Desactivar Suscripción  "}
                            btnText={"Continuar"}
                            onClose={() => {
                                router.push("/unbiters/profile", { scroll: false });
                                setIsOpenDesactivar(false);
                            }}
                            onRedirect={() => {
                                desactivar();
                                //router.push("/unbiters/login", { scroll: false });
                                setIsOpenDesactivar(false);
                            }}
                        />
                    )}
                    {
                        userData.nivelSuscripcion == 0 && userData.chaza ? <Banner className="visible md:invisible " text={"Revisa lo que puedes hacer con nuestra cuenta premium."} />
                            : null
                    }
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
                                        {/*
                                        <button
                                            onClick={() => setIsOpenDelete(true)}
                                            type="button"
                                            className="bg-[#d63447] inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-lg  text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                                        >
                                            {"Eliminar Cuenta"}
                                        </button> */}
                                        {userData.nivelSuscripcion == 1 ?
                                            <button
                                                onClick={() => setIsOpenDesactivar(true)}
                                                type="button"
                                                className="bg-[#d63447] inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-lg  text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                                            >
                                                {"Desactivar suscripción"}
                                            </button> : null

                                        }
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
                </>
            )}
        </div>
    );
}
