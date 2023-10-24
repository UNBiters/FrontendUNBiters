'use client'
import { useEffect, useState } from "react";
import client from "@/config/client"

export default function CreateChaza({ modal, title, _id }) {

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaFundacion, setFechaFundacion] = useState('');
    const [categorias, setCategorias] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [horarioAtencion, setHorarioAtencion] = useState('');


    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            var body = {
                nombre,
                fechaFundacion,
                categorias,
                ubicacion,
                horarioAtencion
            }
            const response = await client.post('chazas', body);
            console.error('adta: ', response);
            if (response) {
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    /*useEffect(() => {
        var chaza = null
        client.get("chazas/" + _id)
            .then((res) => {
                chaza = res.data.data.data
                setNombre(chaza.nombre)
                setFechaFundacion(chaza.fechaFundacion)
                setUbicacion(chaza.ubicacion)
                setHorarioAtencion(chaza.horarioAtencion)
            })

        //console.log(chaza);
    }, [_id])*/

    var categoriasList = [
        {
            "id": 1,
            "nombreCategoria": "Platos principales"
        },
        {
            "id": 2,
            "nombreCategoria": "Entrantes"
        },
        {
            "id": 3,
            "nombreCategoria": "Postres"
        },
        {
            "id": 4,
            "nombreCategoria": "Bebidas"
        },
        {
            "id": 5,
            "nombreCategoria": "Comidas rápidas"
        },
        {
            "id": 6,
            "nombreCategoria": "Comidas vegetarianas"
        },
        {
            "id": 7,
            "nombreCategoria": "Comidas veganas"
        },
        {
            "id": 8,
            "nombreCategoria": "Comidas saludables"
        },
        {
            "id": 9,
            "nombreCategoria": "Comidas internacionales"
        },
        {
            "id": 10,
            "nombreCategoria": "Comidas tradicionales"
        }
    ]
    var mediosPago = [
        {
            "id": 1,
            "nombre": "Nequi"
        },
        {
            "id": 2,
            "nombre": "Daviplata"
        }
    ]
    return (
        <>
            <div id={modal} data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide={modal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close</span>
                            </button>
                        </div><section className="bg-white dark:bg-gray-900">
                            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                                <form onSubmit={onSubmit}>
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div className="sm:col-span-2">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de tu chaza:</label>
                                            <input type="text" name="name" id="nombre" onChange={(e) => setNombre(e.target.value)} value={nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categorias</label>
                                            <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown search <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                            </svg></button>
                                            <div id="dropdownSearch" className="z-10 hidden bg-white rounded-lg shadow dark:bg-gray-700">
                                                <ul className="px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                                                    {categoriasList.map((cate) => (
                                                        <li key={cate.id}>
                                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                                <input id="categorias" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                <label htmlFor="categorias" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{cate.nombreCategoria}</label>
                                                            </div>
                                                        </li>
                                                    ))

                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Fundacíon</label>
                                            <input type="date" name="date" id="fechaFundacion" onChange={(e) => setFechaFundacion(e.target.value)} value={fechaFundacion} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
                                        </div>
                                        <div className="">
                                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medios de pago</label>
                                            <button id="pagosdropdown" data-dropdown-toggle="pagos" className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Medios de pagos<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                            </svg></button>
                                            <div id="pagos" className="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                                <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="pagosdropdown">
                                                    {mediosPago.map((cate) => (
                                                        <li key={cate.id}>
                                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                                <input id="pagos" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                <label htmlFor="pagos" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{cate.nombre}</label>
                                                            </div>
                                                        </li>
                                                    ))

                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="ubicacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ubicación</label>
                                            <input type="text" name="ubicacion" id="ubicacion" onChange={(e) => setUbicacion(e.target.value)} value={ubicacion} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Tu ubicación" required />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                                            <textarea id="descripcion" onChange={(e) => setDescripcion(e.target.value)} value={descripcion} rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                        Actualizar
                                    </button>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}