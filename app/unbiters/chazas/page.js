
import CardComent from '@/components/CardComment';
import CardChaza from '@/components/CardChaza';
import client from "@/config/client";
import Comments from '@/components/Comments';
import Card from '@/components/Card';
import Filter from '@/components/Filter';
import NewPost from '@/components/NewPost';


async function loadPost() {
    try {
        var res = await client.get("chazas");
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return res.data.data;
    } catch (err) {
        //console.log("err", err);
    }
}

async function Home() {
    const post = (await loadPost())
    //console.log(post.data[0])


    var comments = [
        {
            "id": 1,
            "comentario": "¡Este es un comentario genial!",
            "urlImagen": "https://www.example.com/imagen1.jpg"
        },
        {
            "id": 2,
            "comentario": "Este es otro comentario genial",
            "urlImagen": "https://www.example.com/imagen2.jpg"
        },
        {
            "id": 3,
            "comentario": "¡Esta imagen es increíble!",
            "urlImagen": "https://www.example.com/imagen3.jpg"
        },
        {
            "id": 4,
            "comentario": "¡Este es un comentario muy profundo!",
            "urlImagen": "https://www.example.com/imagen4.jpg"
        },
        {
            "id": 5,
            "comentario": "¡Esta imagen me hace reír!",
            "urlImagen": "https://www.example.com/imagen5.jpg"
        },
        {
            "id": 6,
            "comentario": "¡Esta imagen es muy triste!",
            "urlImagen": "https://www.example.com/imagen6.jpg"
        },
        {
            "id": 7,
            "comentario": "¡Esta imagen es muy hermosa!",
            "urlImagen": "https://www.example.com/imagen7.jpg"
        },
        {
            "id": 8,
            "comentario": "¡Esta imagen es muy graciosa!",
            "urlImagen": "https://www.example.com/imagen8.jpg"
        },
        {
            "id": 9,
            "comentario": "¡Esta imagen es muy inspiradora!",
            "urlImagen": "https://www.example.com/imagen9.jpg"
        },
        {
            "id": 10,
            "comentario": "¡Esta imagen es muy creativa!",
            "urlImagen": "https://www.example.com/imagen10.jpg"
        }
    ]
    return (
        <div id='home' className='grid grid-cols-2'>
            <Filter className={"formSearch justify-items-center px-3 flex mx-auto text-center"} ></Filter>
            <div className='formSearch justify-items-center px-3'>
                <form>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>

            </div>
            <div className="col-span-2 pt-3 CardProfile justify-items-center grid min-[1300px]:grid-cols-2 min-[1300px]:px-3">
                {
                    post.data.map((card) => (
                        <>
                            <Card key={card._id} card={card} comments={comments} className={"ListComment pb-2"}></Card>
                        </>
                    )
                    )

                }
            </div>
        </div>
    )
}

export default Home;