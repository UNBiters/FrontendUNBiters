
"use client"

import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import client from "@/config/client";
import { useUsers } from '@/context/UserContext';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Community() {
    const { userChazas } = useUsers()
    //console.log(userChazas)
    const { _id } = userChazas
    const [reciente, setReciente] = useState([])
    let [categories] = useState({
        Reciente: reciente,
        Popular: [
            {
                id: 1,
                title: 'Is tech making coffee better or worse?',
                date: 'Jan 7',
                commentCount: 29,
                shareCount: 16,
            },
            {
                id: 2,
                title: 'The most innovative things happening in coffee',
                date: 'Mar 19',
                commentCount: 24,
                shareCount: 12,
            },
        ],
        "Mas comentado": [
            {
                id: 1,
                title: 'Ask Me Anything: 10 answers to your questions about coffee',
                date: '2d ago',
                commentCount: 9,
                shareCount: 5,
            },
            {
                id: 2,
                title: "The worst advice we've ever heard about coffee",
                date: '4d ago',
                commentCount: 1,
                shareCount: 2,
            },
        ],
    })
    useEffect(() => {
        var token = window.sessionStorage.getItem('token');
        console.log(_id)
        client.get(`publications/me/${_id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }, { next: { revalidate: true | 0 | 60 } })
            .then((res) => {
                console.log(res)
                if (!res.status == "200") {
                    throw new Error('Failed to fetch data')
                }
                var data = res.data.data.data
                if (data.length > 0) {
                    console.log(data)
                    setReciente(data)
                } else {
                    console.log("No hay data")
                }
            })
    },[])
    return (
        <div className="w-full px-4 py-4  ">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-white p-1">
                    {Object.keys(categories).map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-neutral-900',
                                    'ring-white/60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-red-400 shadow text-white'
                                        : 'text-neutral-100 hover:bg-red-400/[0.5] '
                                )
                            }
                        >
                            {category}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {console.log(categories)}
                    {Object.values(categories).map((posts, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                'rounded-xl bg-white p-3',
                                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                            )}
                        >
                            <ul>
                                {posts.map((post) => (
                                    <li
                                        key={post.id}
                                        className="relative rounded-md p-3 hover:bg-gray-100"
                                    >
                                        <h3 className="text-sm font-medium leading-5">
                                            {post.texto}
                                        </h3>

                                        <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                            <li>{post.date}</li>
                                            <li>&middot;</li>
                                            <li>{post.commentCount} comments</li>
                                            <li>&middot;</li>
                                            <li>{post.shareCount} shares</li>
                                        </ul>

                                        <a
                                            href="#"
                                            className={classNames(
                                                'absolute inset-0 rounded-md',
                                                'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                                            )}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
