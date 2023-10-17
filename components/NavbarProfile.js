
'use client';

import { Button, Dropdown, Navbar, Avatar } from 'flowbite-react';

export default function NavbarProfile() {
    return (
        <div>

            <Navbar
                fluid

                className='NavbarMain MiniNav'
            >
                <div className="NavbarProfile justify-items-center flex md:order-2">
                    <div className="">
                        <Navbar.Collapse>
                            <span className="bar"></span>
                            <Button className='px-5 mx-1'>
                                Mis comentarios
                            </Button>
                            <span className="bar"></span>
                            <Button className='px-5 mx-1'>
                                Seguidos
                            </Button>
                            <span className="bar"></span>
                            <Button className='px-5 mx-1'>
                                Mis estadisticas
                            </Button>
                            <span className="bar"></span>
                            <Button id='action' data-modal-target="edit" data-modal-toggle="edit" className="action hover:bg-sky-700 px-5 mx-1">
                                Editar Perfil
                            </Button>

                            <div id="edit" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div class="relative w-full max-w-2xl max-h-full">
                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                                Actualiza tus datos
                                            </h3>
                                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit">
                                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span class="sr-only">Close</span>
                                            </button>
                                        </div><section class="bg-white dark:bg-gray-900">
                                            <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                                                <form action="#">
                                                    <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                                        <div class="sm:col-span-2">
                                                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                                            <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                                                        </div>
                                                        <div class="w-full">
                                                            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                                            <input type="text" name="brand" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required="" />
                                                        </div>
                                                        <div class="w-full">
                                                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                                            <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                                                        </div>
                                                        <div>
                                                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                                            <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                                <option selected="">Select category</option>
                                                                <option value="TV">TV/Monitors</option>
                                                                <option value="PC">PC</option>
                                                                <option value="GA">Gaming/Console</option>
                                                                <option value="PH">Phones</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                                                            <input type="number" name="item-weight" id="item-weight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required="" />
                                                        </div>
                                                        <div class="sm:col-span-2">
                                                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                            <textarea id="description" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                                                        </div>
                                                    </div>
                                                    <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                                        Actualizar
                                                    </button>
                                                </form>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </Navbar.Collapse>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}


