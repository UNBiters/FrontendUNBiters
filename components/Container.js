import client from "@/config/client";
import Link from "next/link";

export default function Container({ setPosts, setCategorias, title, message, mode }) {
    async function filterPostOff() {
        try {
            client
                .get(`publications`, { next: { revalidate: true | 0 | 60 } })
                .then((res) => {
                    if (!res.status == "200") {
                        throw new Error("Failed to fetch data");
                    }
                    setPosts(res.data.data.data);
                    setCategorias([]);
                    //if (!posts) return "An error has occurred.";
                });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {/*
          This example requires updating your template:
  
          ```
          <html className="h-full">
          <body className="h-full">
          ```
        */}
            <main className="pt-10 mx-auto my-auto grid min-h-full place-items-center ">
                <div className="text-center bg-white  p-10 rounded-lg ">
                    <p className="text-base font-semibold text-indigo-600">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        {title ? title : "Filtro no encontrado"}
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        {message
                            ? message
                            : "Lo sentimos, no hay publicaciones relacionadas con el filtro escogido, prueba borrando los filtros."}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        {mode != "profile" ? (
                            <button
                                onClick={filterPostOff}
                                className="bg-[#9d5b5b] rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:-[#9d5b5b]/0.75  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Quitar Filtros
                            </button>
                        ) : (
                            <Link
                                href={"/"}
                                className="bg-[#9d5b5b] rounded-md  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:-[#9d5b5b]/0.75  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Ver Publicaciones
                            </Link>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
