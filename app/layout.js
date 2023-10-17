
import NavbarMain from '../components/NavbarMain'
import Footer from '../components/Footer'
import '../styles/globals.css';
import '../styles/navbar.css';
import '../styles/card.css';
import '../styles/login.css';
import '../styles/t&c.css';
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UNBiters',
  description: 'Reseñas chazas Universidad Nacional de Colombia',
  keywords: ["UNBiters", "Reseñas", "Chazas"],
}

export default function RootLayout({ children }) {

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

