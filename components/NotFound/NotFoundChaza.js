

import { Button, Dropdown, Navbar, Avatar } from 'flowbite-react';
import Link from 'next/link';
export default function NotFoundChaza({tittle}) {


    return (
        <div className="heightTotal bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600"></p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{tittle} not found</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">Aun no haz creado tu Chaza, creala ahora!!</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="profile/me" id='action' data-modal-target="edit" data-modal-toggle="edit" className="action hover:bg-sky-700 px-5 mx-1">
                        Crear Chaza
                    </Link> </div>
            </div>
        </div>
    )
}