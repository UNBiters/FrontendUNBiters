import { NextResponse } from "next/server"

export async function middleware(request) {
    const jwt = request.cookies.get("token")
    const myPages = [
        "/unbiters/profile",
        "/unbiters/profile/comments",
        "/unbiters/profile/me",
        "/unbiters/profile/community",
        "/unbiters/profile/posts",
        "/unbiters/pricing/plan-especial"
    ]
    //console.log("jwt ", jwt)
    //console.log("path ", myPages.includes(request.nextUrl.pathname))
    //console.log("includes ", myPages.includes(request.nextUrl.pathname))
    if (myPages.includes(request.nextUrl.pathname) && !jwt) {
        return NextResponse.redirect(new URL("/unbiters/login", request.url))
    }

    return NextResponse.next()
}