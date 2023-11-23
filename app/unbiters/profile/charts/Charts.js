"use client";
import { useEffect, useState } from "react";
import client from "@/config/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundChaza from "@/components/NotFound/NotFoundChaza";
import { useUsers } from "@/context/UserContext";
import Card from "@/components/Cards/Card";
import Link from "next/link";
import Cookies from "js-cookie";
import ProfileUser from "@/components/Profile/ProfileUser";
import LoadingPost from "@/components/Loading/LoadingPost";
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Container from "@/components/Container";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
export default function ChartsView({ chazasFetch }) {
    const { userChazas, userData } = useUsers();

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
    const dataPersons = {
        labels: ['Masculino', 'Femenino', 'Otros'],
        datasets: [
            {
                label: 'Análisis por perspectiva de sexo ',
                data: [3, 4, 1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };
    const dataPersonsAge = {
        nombreChaza: "CHaza",
        labels: ['', 'Femenino', 'Otros'],
        datasets: [
            {
                label: 'Análisis por perspectiva de edad ',
                data: [3, 4, 1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };
    const [charts, setCharts] = useState([data, dataPersons, dataPersonsAge])
    const [datasets, setDatasets] = useState([])
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

    useEffect(() => {
        var tkn = Cookies.get("token");
        setToken(tkn);
        console.log(tkn)
        setUser(JSON.parse(Cookies.get("user")))
        if (userData.nivelSuscripcion == 1) {
            try {
                client.get("/publications/sexStats", {
                    headers: {
                        Authorization: `Bearer ${tkn}`,
                    },
                }).then(res => {
                    var data = res.data.data.conteoChazas
                    //console.log(data)
                    var jsonData = []
                    for (var x = 0; x < data.length; x++) {
                        //console.log(data[x])
                        var masculino = data[x].conteoPorSexo.M
                        var femenino = data[x].conteoPorSexo.F
                        var otro = data[x].conteoPorSexo.Otro

                        var json = {
                            descripcion: "Con este análisis, podra examinar la participación por género en su chaza con el objetivo de comprender cómo diferentes géneros interactúan y contribuyen al ambiente y la clientela de esta.",
                            cantData: (masculino + femenino + otro),
                            nombreChaza: data[x].nombreChaza,
                            labels: ["Masculino", "Femenino", "Otro"],
                            datasets: [{
                                label: "Análisis por pespectiva de genero",
                                data: [masculino, femenino, otro],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                ],
                                borderWidth: 2,
                            }]
                        }
                        jsonData.push(json)
                        //setDatasets([...datasets, json])
                    }

                    client.get("/publications/ageStats", {
                        headers: {
                            Authorization: `Bearer ${tkn}`,
                        },
                    }).then(res => {
                        var data = res.data.data.conteoChazas
                        //console.log(data)
                        for (var x = 0; x < data.length; x++) {
                            console.log(x)
                            var menordieciocho = 0
                            var menortreinta = 0
                            var menorcuarentacinco = 0
                            var menorsesenta = 0
                            var menorsetentacinco = 0
                            var menornoventa = 0
                            var estadisticas = data[x].estadisticas
                            //console.log("estadisticas", estadisticas)
                            for (var i = 0; i < estadisticas.length; i++) {
                                console.log("estadisticas", estadisticas[i]._id)
                                if (estadisticas[i]._id == 18) {
                                    menordieciocho = estadisticas[i].count
                                }
                                if (estadisticas[i]._id == 30) {
                                    menortreinta = estadisticas[i].count
                                }
                                if (estadisticas[i]._id == 45) {
                                    menorcuarentacinco = estadisticas[i].count
                                }
                                if (estadisticas[i]._id == 60) {
                                    menorsesenta = estadisticas[i].count
                                }
                                if (estadisticas[i]._id == 75) {
                                    menorsetentacinco = estadisticas[i].count
                                }
                                if (estadisticas[i]._id == "90+") {
                                    menornoventa = estadisticas[i].count
                                }
                            }
                            var json = {
                                descripcion: "Este análisis tiene como objetivo permitirle examinar el perfil de edad de la clientela que opina sobre su chaza. Entender la distribución de edades puede proporcionar un panorama valioso sobre la dinámica de su clientela y orientar estrategias de marketing y experiencia del cliente.",
                                cantData: (menordieciocho + menortreinta + menorcuarentacinco + menorsesenta + menorsetentacinco + menornoventa),
                                nombreChaza: data[x].nombreChaza,
                                labels: ["Menor a 18 años", "Entre 19 años a 30 años ", "Entre 31 años a 45 años", "Entre 46 años a 60 años", "Entre 61 años a 75 años", "Mayor de 75 años"],
                                datasets: [{
                                    label: "Análisis por pespectiva de edad",
                                    data: [menordieciocho, menortreinta, menorcuarentacinco, menorsesenta, menorsetentacinco, menornoventa],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                    ],
                                    borderWidth: 2,
                                }]
                            }
                            jsonData.push(json)
                            //setDatasets([...datasets, json])
                        }
                        setDatasets((datasets) => [...datasets, ...jsonData]);
                    })
                    setIsLoading(false);
                })
            } catch (error) {
                notifyError(error.response.data.message)
                console.log(error.response)
            }
        } else {
            notifyError("No tienes una subscripción premium, no puedes ver tus estadísticas.")

            setIsLoading(false);
        }
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
        <div className=" bg-[#ffffff] py-4" style={{ paddingBottom: "60px" }}>

            <ToastContainer />
            {isLoading ? (
                <LoadingPost />
            ) : (
                <>
                    {console.log(userData)}
                    <div className="p-5">
                        {userData.nivelSuscripcion == 0 ?
                            <Container
                                title={
                                    "Aún no tienes una cuenta premium "
                                }
                                message={
                                    "Lo sentimos, no has actualizado tu cuenta a premium, te invitamos a suscribirte."
                                }
                                mode={"premium"}
                            /> :

                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

                                {datasets.map((graph, idx) => (
                                    <div key={idx} className="mx-auto block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{graph.datasets[0].label + " "} <br />{"Chaza: " + graph.nombreChaza}</h5>
                                        <p className="font-normal text-gray-700 dark:text-gray-400">{graph.descripcion}</p>
                                        {graph.cantData == 0 ?
                                            <div className="">
                                                <div className="pt-4  "><p className="font-normal text-gray-900 dark:text-gray-400">Ups, lo sentimos, aún no tenemos los datos suficientes para generar este reporte. Te invitamos a seguir opinando y hacerte más visible.</p>
                                                    <Link href="/" className="mx-auto bg-[#9d5b5b] inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Ver publicaciones
                                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                        </svg>
                                                    </Link></div> </div> :
                                            <Pie data={graph} />}
                                    </div>
                                ))

                                }
                            </div>}
                    </div>
                </>
            )}
        </div>
    );
}
