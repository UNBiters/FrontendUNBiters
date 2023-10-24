import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


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

function onchange() {

}
export default function MyMultiSelectCategorias() {
    const [categoriasList, setCategoriasList] = useState([])
    console.log(categoriasList)
    return (
        <div className="w-72">
            <Listbox value={categoriasList} onChange={setCategoriasList} multiple>
                <div className="relative mt-1">
                    <Listbox.Label>Categorias</Listbox.Label>
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block ">
                            {"Selecciona máximo 3:  "}
                            {categoriasList.map((cate) => cate).join(', ')}</span>
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
                                    {({ categoriasList }) => (
                                        <>
                                            <span
                                                className={`block  ${categoriasList ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {cate.nombreCategoria}
                                            </span>
                                            {categoriasList ? (
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
