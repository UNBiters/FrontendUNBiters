import client from "@/config/client";
import HomeComponent from "./HomeComponent";
import Banner from "../Profile/Banner";
import { cookies } from 'next/headers'

async function loadPost() {
    try {
        var res = await client.get("publications");
        //console.log(res.data.data)
        return res.data.data.data;
    } catch (err) {
        console.log("err", err);
    }
}

async function loadNames() {
    var res = await client.get(`chazas/every`, { next: { revalidate: true | 0 | 60 } });
    if (!res.status == "200") {
        throw new Error("Failed to fetch data");
    }
    var data = res.data.data.data;
    if (data.length > 0) {
        //console.log(data)
        return data;
    } else {
        console.log("No hay data");
    }
}
export default async function HomeFetch() {
    const cookieStore = cookies()
    const user = cookieStore.get('user') ? JSON.parse(cookieStore.get('user').value) : ""
    const posts = await loadPost();
    const names = await loadNames();
    console.log(user)
    return (
        <div className="" style={{ paddingBottom: "120px" }}>
            <HomeComponent  postsFetch={posts} namesFetch={names} />

        </div>
    );
}
