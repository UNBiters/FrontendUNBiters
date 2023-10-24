import { useState } from 'react'
import { Combobox } from '@headlessui/react'

const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
]

export default function Listbox() {
    const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]])

    return (
        <Combobox value={selectedPeople} onChange={setSelectedPeople} multiple>
            {selectedPeople.length > 0 && (
                <ul>
                    {selectedPeople.map((person) => (
                        <li key={person.id}>{person.name}</li>
                    ))}
                </ul>
            )}
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    />
                </div>
            </div>
            <Combobox.Options>
                {people.map((person) => (
                    <Combobox.Option key={person.id} value={person}>
                        {person.name}
                    </Combobox.Option>
                ))}
            </Combobox.Options>
        </Combobox>
    )
}