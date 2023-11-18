import { UserProvider } from "@/context/UserContext";
import NavbarMain from "@/components/NavbarMain";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/card.css";
import "@/styles/login.css";
import "@/styles/t&c.css";
import "@/dist/output.css";
import LoadingHome from "@/components/Loading/LoadingHome";
import { Suspense } from "react";

import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "UNBiters",
    description: "Reseñas chazas Universidad Nacional de Colombia",
    keywords: ["UNBiters", "Reseñas", "Chazas"],
};

export default function RootLayout({ children }) {
    //console.log(window.sessionStorage.getItem('sesion'))
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head></head>{" "}
            <body className={inter.className}>
                <Suspense fallback={<LoadingHome />}>
                    <UserProvider>
                        <Navbar />
                        {children}
                        <Footer />
                    </UserProvider>
                </Suspense>
            </body>
        </html>
    );
}
