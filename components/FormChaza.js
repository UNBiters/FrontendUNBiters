"use client"
import { useEffect, useState } from "react";
import client from "@/config/client"

export default function FormChaza({ modal, title }) {

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaFundacion, setFechaFundacion] = useState('');
    const [categorias, setCategorias] = useState([]);
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
            console.log(body)
            return
            const response = await client.post('chazas', body);
            console.error('adta: ', response);
            if (response) {
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    useEffect(() => {
        try {
            var token = window.sessionStorage.getItem('token');
            console.log("data", token)
            var chaza = null
            client.get("chazas/myChaza", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((res) => {
                console.log("page", res)
                chaza = res.data.data.myChaza
                console.log("page", chaza)
                setNombre(chaza.nombre)
                setDescripcion(chaza.descripcion)
                setCategorias(chaza.categorias)
                setFechaFundacion(chaza.fechaFundacion)
                setUbicacion(chaza.ubicacion)
                setHorarioAtencion(chaza.horarioAtencion)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

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
    var horario = [
        {
            "id": 1,
            "nombre": "7-9"
        },
        {
            "id": 2,
            "nombre": "9-11"
        },
        {
            "id": 3,
            "nombre": "11-1"
        },
        {
            "id": 4,
            "nombre": "1-3"
        },
        {
            "id": 5,
            "nombre": "3-5"
        },
        {
            "id": 6,
            "nombre": "5-7"
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
                        </div>
                        <section className="bg-white dark:bg-gray-900">
                            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                                <form onSubmit={onSubmit}>
                                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                        <div className="sm:col-span-2">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de tu chaza:</label>
                                            <input type="text" name="name" id="nombre" onChange={(e) => setNombre(e.target.value)} value={nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Eslogan de tu chaza:</label>
                                            <input type="text" name="slug" id="slug" onChange={(e) => setNombre(e.target.value)} value={nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                                        </div>
                                        <div className="text-center">
                                            <label htmlFor="date" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categorias</label>
                                            <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" className="w-60 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                                Selecciona tus categorias
                                                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                </svg></button>
                                            <div id="dropdownSearch" className="z-10 hidden bg-white rounded-lg shadow dark:bg-gray-700">
                                                <ul className="px-3 pb-3 w-60 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
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
                                        <div className="text-center">
                                            <label htmlFor="date" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Medios de pago</label>
                                            <button id="pagosdropdown" data-dropdown-toggle="pagos" className="w-60  inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                                Selecciona tus medios de pago
                                                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                </svg></button>
                                            <div id="pagos" className="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                                <ul className="px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="pagosdropdown">
                                                    {mediosPago.map((cate) => (
                                                        <li key={cate.id}>
                                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                                <input id="pagos" type="checkbox" value={cate.nombre} onChange={(e) => setCategorias(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                <label htmlFor="pagos" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{cate.nombre}</label>
                                                            </div>
                                                        </li>
                                                    ))

                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="ubicacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sector en la Universidad</label>
                                            <input type="text" name="ubicacion" id="ubicacion" onChange={(e) => setUbicacion(e.target.value)} value={ubicacion} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Tu ubicación" required />
                                        </div>
                                        <div className="text-center">
                                            <label htmlFor="date" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Horario de Atención</label>
                                            <button id="pagosdropdown" data-dropdown-toggle="pagos" className="w-60  inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                                Selecciona tu horario
                                                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                </svg></button>
                                            <div id="pagos" className="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                                <ul className="px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="pagosdropdown">
                                                    {horario.map((cate) => (
                                                        <li key={cate.id}>
                                                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                                <input id="pagos" type="checkbox" value={cate.nombre} onChange={(e) => setCategorias(e.target.value)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                                                <label htmlFor="pagos" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{cate.nombre}</label>
                                                            </div>
                                                        </li>
                                                    ))

                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                                            <textarea id="descripcion" onChange={(e) => setDescripcion(e.target.value)} value={descripcion} rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Agrega una descripción"></textarea>
                                        </div>
                                    </div>
                                    <div class="relative mt-2 rounded-md shadow-sm">
                                        <input type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="@facebook" />
                                        <div class="absolute inset-y-0 right-0 flex items-center">
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="relative mt-2 rounded-md shadow-sm">
                                        <input type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="@instagram" />
                                        <div class="absolute inset-y-0 right-0 flex items-center">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                                        </div>
                                    </div>
                                    <div class="relative mt-2 rounded-md shadow-sm">
                                        <input type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="www.website.com" />
                                        <div class="absolute inset-y-0 right-0 flex items-center">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
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