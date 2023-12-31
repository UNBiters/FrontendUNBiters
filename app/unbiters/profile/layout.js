
import NavbarProfile from '@/components/NavbarProfile';
import UploadImage from '@/components/Forms/UploadImage';
import client from "@/config/client"
import Image from 'next/image';

import '@/styles/profile.css';
import Navbar from '@/components/Navbar/Navbar';
export default function ProfileLayout({ children }) {

    return (
        <>
            <div className=' containerProfile mt-0 md:mt-10'
            >
                <button type="button"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                    data-modal-target="upload" data-modal-toggle="upload" >
                    <Image
                        sizes="100vw"
                        style={{
                            height: 'auto',
                        }}
                        width={600}
                        height={600}
                        alt=""
                        src='/images/logo.png'>

                    </Image>

                </button>
                {/*<UploadImage modal="upload"></UploadImage>*/}
            </div>
            <Navbar profile={true}></Navbar>
            {children}
        </>
    )
}