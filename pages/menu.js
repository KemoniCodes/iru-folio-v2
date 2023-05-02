import Link from "next/link";
import Logo from '@/public/logo.png';
import Image from "next/image";


export default function Menu() {
    return (
        <div className='menu mt-4 m-10'>
            <ul>
                <li>
                    <Link href='/'>
                        <span>.01</span>
                        <h2>home</h2>
                    </Link>
                </li>
                <li>
                    <Link href='/works'>
                        <span>.02</span>
                        <h2>works</h2>
                    </Link>
                </li>
                <li>
                    <Link href='/services'>
                        <span>.03</span>
                        <h2>services</h2>
                    </Link>
                </li>
                <li>
                    <Link href='/about-us'>
                        <span>.04</span>
                        <h2>about</h2>
                    </Link>
                </li>
                <li>
                    <Link href='/contact'>
                        <span>.05</span>
                        <h2>contact</h2>
                    </Link>
                </li>
            </ul>
        </div>
    );
};
