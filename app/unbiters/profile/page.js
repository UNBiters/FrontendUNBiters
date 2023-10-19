import CardComent from '../../../components/CardComment';
import NavbarProfile from '../../../components/NavbarProfile';
import client from "../../../config/client";

async function loadPost() {
    try {
        console.log("loadPost")
        const res = await fetch("https://backend-un-biters.vercel.app/api/v1/chazas")
        const data = await res.json()
        /*var res = await client.get("chazas");
        await new Promise((resolve) => setTimeout(resolve, 5000))*/
        return data;
    } catch (err) {
        //console.log("err", err);
    }
}
async function ProfileView() {

    const post = (await loadPost())
    console.log(post)
    var cards = [
        { name: "sad" },
        { name: "sad" },
        { name: "sad" },
        { name: "sad" }
    ]

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
    //if (!post) return <></>
    return (
        <>
            <div className='containerProfile mt-10'>

                <img src='/images/logo.png'></img>

            </div>
            <NavbarProfile></NavbarProfile>
            <div className="CardProfile grid justify-items-center">
                {post ?
                    post.data.map((card) => (
                        <CardComent key={card._id} card={card} comments={comments} className={"ListComment pb-2"}></CardComent>
                    ))

                : null}
            </div>
        </>
    )
}

export default ProfileView

