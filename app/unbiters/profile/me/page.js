"use client"
import { Listbox, Transition, Switch } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


import { useEffect, useState, Fragment } from "react";
import client from "@/config/client"
import { useRouter } from "next/navigation";
import MyListbox from "@/components/Forms/Listbox";
import MyMultiSelect from "@/components/Forms/MyMultiSelect";


export default function Form({ modal, title, created, _id }) {
    const router = useRouter()
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [eslogan, setEslogan] = useState('');
    const [fechaFundacion, setFechaFundacion] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [metodos, setMetodos] = useState([]);
    const [ubicacion, setUbicacion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [horarioAtencion, setHorarioAtencion] = useState([]);
    const [facebook, setFace] = useState('')
    const [instagram, setInsta] = useState('')
    const [web, setWeb] = useState('')
    const [domicilio, setDomicilio] = useState('')


    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            var redesSociales = [facebook, instagram, web]
            console.log(metodos)
            var body = {
                nombre,
                eslogan,
                fechaFundacion,
                categorias,
                ubicacion,
                horarioAtencion,
                redesSociales,
                domicilio: domicilio == 'on' ? true : false,
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
    const handleChange = (e) => {
        e.preventDefault()
        const checked = e.target.checked;
        const checkedValue = e.target.value;
        const checkedName = e.target.name;
        if (checked) {
            setCategorias(categorias => [...categorias, checkedValue])
        } else {
            setCategorias(categorias => [categorias.filter((data) => data == checkedValue)])
        }
        console.log("categorias", categorias)
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
                if (chaza.length != 0) {

                    console.log("page2", chaza)
                    setNombre(chaza.nombre)
                    setDescripcion(chaza.descripcion)
                    setCategorias(chaza.categorias)
                    setFechaFundacion(chaza.fechaFundacion)
                    setUbicacion(chaza.ubicacion)
                    setHorarioAtencion(chaza.horarioAtencion)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

    var categoriasLists = [
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

    function MyMultiSelectCategorias() {
        console.log(categorias)
        return (
            <div className="w-72">
                <Listbox value={categorias} onChange={setCategorias} multiple>
                    <div className="relative mt-1">
                        <Listbox.Label>Categorias</Listbox.Label>
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block ">
                                {"Selecciona máximo 3:  "}
                                {categorias.map((cate) => cate).join(', ')}</span>
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

                                {categoriasLists.map((cate) => (
                                    <Listbox.Option
                                        key={cate.id} value={cate.nombreCategoria}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }
                                    >
                                        {({ categorias }) => (
                                            <>
                                                <span
                                                    className={`block  ${categorias ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {cate.nombreCategoria}
                                                </span>
                                                {categorias ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
        )
    }
    function MyMultiSelectMedios() {
        console.log(metodos)
        return (
            <div className="w-72">
                <Listbox value={metodos} onChange={setMetodos} multiple>
                    <div className="relative mt-1">
                        <Listbox.Label>Medios de pago</Listbox.Label>
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block ">
                                {"Selecciona varios:  "}
                                {metodos.map((cate) => cate).join(', ')}</span>
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
                                        key={cate.id} value={cate.nombre}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }
                                    >
                                        {({ metodos }) => (
                                            <>
                                                <span
                                                    className={`block  ${metodos ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {cate.nombre}
                                                </span>
                                                {metodos ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
        )
    }
    function MyMultiSelectHorario() {
        console.log(horarioAtencion)
        return (
            <div className="w-72">
                <Listbox value={horarioAtencion} onChange={setHorarioAtencion} multiple>
                    <div className="relative mt-1">
                        <Listbox.Label>Tu horario de atención</Listbox.Label>
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block ">
                                {"Selecciona varios:  "}
                                {horarioAtencion.map((cate) => cate).join(', ')}</span>
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
                                        key={cate.id} value={cate.nombre}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                            }`
                                        }
                                    >
                                        {({ horarioAtencion }) => (
                                            <>
                                                <span
                                                    className={`block  ${horarioAtencion ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {cate.nombre}
                                                </span>
                                                {horarioAtencion ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
        )
    }
    return (
        <div class="">

            <div className="bg-gray-100 dark:bg-gray-900">
                <div className=" px-4 mx-auto max-w-2xl  lg:py-16">
                    <form onSubmit={onSubmit} className="pt-5 pb-16">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de tu chaza:</label>
                                <input type="text" name="name" id="nombre" onChange={(e) => setNombre(e.target.value)} value={nombre} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Eslogan de tu chaza:</label>
                                <input type="text" name="slug" id="slug" onChange={(e) => setEslogan(e.target.value)} value={eslogan} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                            </div>
                            <div className="text-start text-sm font-medium ">
                                {MyMultiSelectCategorias()}
                            </div>
                            <div className="text-start text-sm font-medium ">
                                {MyMultiSelectMedios()}
                            </div>

                            <div className="w-full">
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Fundacíon</label>
                                <input type="date" name="date" id="fechaFundacion" onChange={(e) => setFechaFundacion(e.target.value)} value={fechaFundacion} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
                            </div>
                            <div>
                                <label htmlFor="ubicacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sector en la Universidad</label>
                                <input type="text" name="ubicacion" id="ubicacion" onChange={(e) => setUbicacion(e.target.value)} value={ubicacion} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Tu ubicación" required />
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu sitio web:</label>
                                <input type="text" name="name" id="nombre" onChange={(e) => setWeb(e.target.value)} value={web} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu pagina de facebook:</label>
                                <input type="text" name="name" id="nombre" onChange={(e) => setFace(e.target.value)} value={facebook} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu usuario de instagram:</label>
                                <input type="text" name="name" id="nombre" onChange={(e) => setInsta(e.target.value)} value={instagram} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                            </div>

                            <div className="text-start text-sm font-medium ">
                                {MyMultiSelectHorario()}
                            </div>
                            <div className="">
                                <label for="checked-checkbox" className="text-sm font-semibold text-gray-900 dark:text-gray-300">Marca esta casilla si haces domicilios </label>
                                <input id="checked-checkbox" type="checkbox"
                                    onChange={(e) => setDomicilio(e.target.value)}
                                    className="text-end w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                                <textarea id="descripcion" onChange={(e) => setDescripcion(e.target.value)} value={descripcion} rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Agrega una descripción"></textarea>
                            </div>

                        </div>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-lg  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
                            Actualizar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
