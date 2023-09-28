'use client';

import CardComent from '../../../components/CardComment';
import NavbarProfile from '../../../components/NavbarProfile';

export default function ProfileView() {
    var cards = [
        { name: "sad" },
        { name: "sad" },
        { name: "sad" },
        { name: "sad" }
    ]
    return (
        <>
            <div className='containerProfile mt-10'>

                    <img src='/images/logo.png'></img>

            </div>
            <NavbarProfile></NavbarProfile>
            <div className="CardProfile grid justify-items-center">
                {
                    cards.map((card) =>
                        <CardComent key={1} className={"ListComment"}></CardComent>
                    )

                }
            </div>
        </>
    )
}


