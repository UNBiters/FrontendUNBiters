import Values from "@/components/About/Values";

export default function About() {
    return (
        <div className="pb-32 justify-items-center bg-white pt-12 text-center h-full " >

            <section className="h-full  pt-12 dark:bg-gray-900 content-center">
                <div className="text-left py-8 px-4 mx-auto max-w-screen-xl max-h-screen-xl lg:py-16 lg:px-6">
                    <Values></Values>
                </div>
            </section>
        </div>
    )
}