import client from "@/config/client";
import { cookies } from 'next/headers'
import PostComponent from "./PostComponent";

async function loadPost(token) {
    try {
        var res = await client.get("publications/myPublications", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        //console.log(res.data.data)
        return res.data.data.publications;
    } catch (err) {
        console.log("err", err);
    }
}

async function loadNames() {
    var res = await client.get(`chazas/every`, { next: { revalidate: true | 0 | 60 } })
    if (!res.status == "200") {
        throw new Error('Failed to fetch data')
    }
    var data = res.data.data.data
    if (data.length > 0) {
        //console.log(data)
        return data;
    } else {
        console.log("No hay data")
    }
}
export default async function PostFetch() {

    const cookieStore = cookies()
    const token = cookieStore.get('token') ? cookieStore.get('token').value : ""
    const posts = await loadPost(token);
    const names = await loadNames();
    return (
        <div className=" ">
            {/*<HomeComponent postsFetch={posts} namesFetch={names} ></HomeComponent>*/}
            <PostComponent postsFetch={posts} namesFetch={names} token={token} />
        </div>
    );
}