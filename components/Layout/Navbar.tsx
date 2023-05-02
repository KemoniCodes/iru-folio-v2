import Link from "next/link";
import Image from "next/image";
import Logo from '@/public/logo.png';
import {useState} from 'react';
import Menu from "../../pages/menu";

// import { slide as Menu } from 'react-burger-menu';

export default function Navbar() {
    const [isShown, setIsShown] = useState(false);

    const handleClick = (event: any) => {
      setIsShown(current => !current);
    };
    return (
        <>
            <nav className="z-[1] relative">
                <ul className="flex list-none justify-between">
                    <li className='nav-link'>
                        <Link href={'/menu'}>menu</Link>
                    </li>

                    {/* {isShown && <Menu />} */}
                    <li className='nav-link'>
                        <Link href={'/'}>
                            <Image src={Logo} alt='Iru Studios Logo' width={130} />
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