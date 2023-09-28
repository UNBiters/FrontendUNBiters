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
            <div className='containerProfile'>

                    <img src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'></img>

            </div>
            <NavbarProfile></NavbarProfile>
            <div className="CardProfile grid justify-items-center mt-5">
                {
                    cards.map((card) =>
                        <CardComent key={1} className={"ListComment"}></CardComent>
                    )

                }
            </div>
        </>
    )
}


