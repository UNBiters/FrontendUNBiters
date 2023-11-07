import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import client from "@/config/client";

const people = [
    { id: 1, nombre: 'Wade Cooper' },
    { id: 2, nombre: 'Arlene Mccoy' },
    { id: 3, nombre: 'Devon Webb' },
    { id: 4, nombre: 'Tom Cook' },
    { id: 5, nombre: 'Tanya Fox' },
    { id: 6, nombre: 'Hellen Schmidt' },
]

export default function InputChazas({ selected, setSelected }) {
    // const [selected] = useState({})
    const [name, setNames] = useState([])
    const [query, setQuery] = useState('')
    const [input, setInput] = useState('')

    const filteredPeople =
        query === ''
            ? name
            : name.filter((person) =>
                person.nombre
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    const onChange = (e) => {
        e.preventDeafult()

    }
    useEffect(() => {

        client.get(`chazas/every`, { next: { revalidate: true | 0 | 60 } })
            .then((res) => {
                console.log(res)
                if (!res.status == "200") {
                    throw new Error('Failed to fetch data')
                }
                var data = res.data.data.data
                if (data.length > 0) {
                    console.log(data)
                    setNames(data)
                    //setSelected(data[0])
                } else {
                    console.log("No hay data")
                }
            })
    }, [])

    return (
        <div className=" ">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1 ">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="bg-gray-50 w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                            displayValue={(person) => person.nombre}
                            onChange={(event) => { setQuery(event.target.value); setInput(event.target.value) }} />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredPeople.length === 0 ? (
                                <Combobox.Option
                                    key={"0"}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    onClick={() => setNames([...name, { nombre: input }])}
                                    value={{ nombre: input }}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {input}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                        }`}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ) : (
                                filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {person.nombre}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                            }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox >
        </div >
    )
}
