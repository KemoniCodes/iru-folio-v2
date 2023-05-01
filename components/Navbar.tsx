import Link from "next/link"
import Image from "next/image"
import Logo from '@/public/logo.png'


export default function Navbar() {
    return (
        <>
            <nav className="z-[1] relative">
                <ul className=" flex list-none justify-between">
                    <li className='nav-link'>
                        <Link href={'/menu'}>menu</Link>
                    </li>
                    <li className='nav-link'>
                        <Link href={'/'}>
                            <Image src={Logo} alt='Iru Studios Logo' width={130}/>
                        </Link>
                    </li>
                    <li className='nav-link'>
                        <Link className='nav-link' href={'/contact'}>
                            contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}