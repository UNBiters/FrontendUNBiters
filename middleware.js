import { NextResponse } from "next/server"

export async function middleware(request) {
    const jwt = request.cookies.get("token")
    const myPages = ["/unbiters/profile"]
    if (request.nextUrl.pathname.includes(myPages)) {
        return NextResponse.redirect(new URL("/unbiters/login", request.url))
    }

    return NextResponse.next()
}