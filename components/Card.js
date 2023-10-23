
'use client'
import Comments from './Comments';

export default function Card({ className, card, comments, idModal }) {

    const stars = (length) => {
        var arrStar = []
        for (let index = 0; index < length; index++) {
            arrStar.push(<svg key={index} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>)
        }
        return arrStar
    }
    return (
        <div className={className}>

            <button data-modal-target={idModal} data-modal-toggle={idModal} className="block" type="button">
                <div className="max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="rounded-t-lg" src="/images/test.jpg" alt="" />
                    <div className="p-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <div className="grid grid-flow-col">
                            <div className='flex items-center'>
                                <p className="mx-auto">
                                    Noteworthy technology acquisitions 2021
                                </p>
                            </div>
                            <div className="grid grid-rows-2 grid-flow-col">
                                <svg className="p-1 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                                </svg>
                                <span className="rounded bg-cyan-100 text-center text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                                    50
                                </span>
                                <svg className="p-1 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z" />
                                </svg>
                                <span className="rounded bg-cyan-100 text-center text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                                    50
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className=" p-2 text-center font-normal text-gray-700 dark:text-gray-400">
                        <p className='mx-auto'>
                            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                        </p>
                        <div className="flex justify-end mb-5 mt-2.5 items-center">
                            {stars(5).map((star) => {
                                return star
                            })}
                            <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                                <p>
                                    5.0
                                </p>
                            </span>
                        </div>
                        <div className="flex justify-end mb-5 mt-2.5 items-center">
                            <div className="tags">
                                <div className="overlap">
                                    <ul className="text-wrapper-3 flex flex-wrap items-center sm:flex-row md:text-lg">

                                        {card.categorias.map((categorias) => (

                                            <li key={categorias.index} className="mr-2">{categorias}</li>)
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </button>
            <Comments id={idModal} data={comments}></Comments>
        </div>

    )
}