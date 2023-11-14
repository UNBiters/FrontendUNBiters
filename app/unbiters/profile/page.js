import client from "@/config/client";
import { cookies } from "next/headers";
import CardProfile from "@/components/Cards/CardProfile";

async function loadChazas(token) {
    try {
        var res = await client.get("chazas/myChaza", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        //console.log(res.data.data)
        return res.data.data.myChaza;
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
export default async function ProfileView() {
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    const user = JSON.parse(cookieStore.get("user").value);
    console.log((user).chaza)
    const chazas = await loadChazas(token);
    //const names = await loadNames();
    //console.log(names)
    return (<CardProfile chazasFetch={chazas} user={user} />)
}
