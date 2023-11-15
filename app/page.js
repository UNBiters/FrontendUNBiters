import HomeFetch from "@/components/Home/HomeFetch";
import LoadingHome from "@/components/Loading/LoadingHome";
import { Suspense } from "react";

export default function Home() {
    return (
        <>
            <Suspense fallback={<LoadingHome />}>
                <HomeFetch />
            </Suspense>
        </>
    );
}
