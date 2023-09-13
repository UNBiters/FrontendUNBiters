import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/unbiters/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}