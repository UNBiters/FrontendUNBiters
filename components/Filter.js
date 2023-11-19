
'use client'
import client from "@/config/client";
import { Listbox, Transition, Switch } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { useEffect, useState, Fragment } from "react";

export default function Filter({ className, categorias, setCategorias, posts, setPosts, setSearch, search }) {
    //const [search, setSearch] = useState("")
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
    async function filterPost() {
        try {
            if (categorias.length != 0) {

                client.get(`publications`, { next: { revalidate: true | 0 | 60 } }).
                    then((res) => {

                        if (!res.status == "200") {
                            throw new Error('Failed to fetch data')
                        }
                        console.log("filterrr", categorias)
                        var filterPost = posts.filter(item => {
                            if (item.tags.length != 0) {
                                //console.log(item.tags)
                                if (item.tags.includes(categorias[0], categorias[1], categorias[2])) {
                                    return item
                                }
                            }
                        })
                        setPosts(filterPost)
                        //if (!posts) return "An error has occurred.";
                    })
            }
        } catch (error) {
            console.log(error)
        }
    }
    async function filterPostOff() {
        try {
            client.get(`publications`, { next: { revalidate: true | 0 | 60 } }).
                then((res) => {

                    if (!res.status == "200") {
                        throw new Error('Failed to fetch data')
                    }
                    setPosts(res.data.data.data)
                    setCategorias([])
                    //if (!posts) return "An error has occurred.";
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function searchButton() {
        console.log(search)
        try {
            client.post(`publications/searchPublication`, { filter: search }).
                then((res) => {

                    if (!res.status == "200") {
                        throw new Error('Failed to fetch data')
                    }
                    console.log(res.data.data.data)
                    setPosts(res.data.data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        /*console.log(posts)
        if (categorias.length != 0) {
            var filterPost = posts.filter(item => {
                if (item.categorias) {

                    console.log("item ", item)
                    item.categorias.includes(categorias)
                }
            })
            console.log(filterPost)
            setPosts(filterPost)
        }*/
    }, [])
    function MyMultiSelectCategorias() {

        return (
            <div className=" w-72">
                <Listbox value={categorias} onChange={setCategorias} multiple>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">

                            <span className="block ">
                                {"Filtra por categorias "}</span>
                            <span className="block text-white">
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
                            <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

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
    return (
        <div id="filter" className='pb-2 col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4'>

            <div className="grid mx-auto text-sm font-medium ">
                <div>
                    {MyMultiSelectCategorias()}
                </div>
                <div className='flex justify-end pt-1 '>
                    <button type="button" onClick={filterPostOff} className="mr-1 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Quitar Filtros
                    </button>
                    <button type="button" onClick={filterPost} className="text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Filtrar
                    </button>
                </div>
            </div>
            <div className='px-3'>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Buscar</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" name="search" onChange={(e) => setSearch(e.target.value)} value={search} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="La mejor chaza ..." required />
                    <button type="button" onClick={searchButton} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
                </div>
            </div>
        </div>
    )
}