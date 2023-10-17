"use client"
import NavbarMain from '../components/NavbarMain'
import Footer from '../components/Footer'
import '../styles/globals.css';
import '../styles/navbar.css';
import '../styles/card.css';
import '../styles/login.css';
import { Inter } from 'next/font/google'
import { useEffect } from 'react';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UNBiters',
  description: 'Reseñas chazas Universidad Nacional de Colombia',
  keywords: ["UNBiters", "Reseñas", "Chazas"],
}

export default function RootLayout({ children }) {
  var user = {
    "_id": "652dcf14f3bb2caef117ee50",
    "nombre": "David",
    "correo": "david123@gmail.com",
    "foto": "default.jpg",
    "rol": "usuario",
    "chaza": false,
    "createdAt": "2023-10-17T00:02:28.357Z",
    "updatedAt": "2023-10-17T00:02:28.357Z",
    "__v": 0
  }
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("id", user);
  }
  useEffect(() => {
    window.sessionStorage.setItem("id", user);
    //This code is executed in the browser
    console.log(window.innerWidth)
  }, [])
  return (
    <html lang="en">
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css" rel="stylesheet" />
      </head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js" async></script>

      <body className={inter.className}>
        <NavbarMain isLogin={true} />
        {children}
        <Footer />
      </body>
    </html>
  )
}

