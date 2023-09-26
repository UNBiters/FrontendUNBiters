import NavbarHome from '../components/NavbarMain'
import '../styles/globals.css'
import '../styles/navbar.css'
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
      <NavbarHome isLogin={true}/>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

