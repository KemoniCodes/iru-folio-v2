import Link from "next/link";
import Logo from '@/public/logo.png';
import Image from "next/image";

// .menu {
//     & span {
//       font-style: normal;
//       top: 2.5rem;
//       position: relative;
//       margin-left: 1rem;
//       font-size: 24px;
//       font-family: "Helvetica Neue";
//       font-weight: 200;
//       line-height: 24px;
//       letter-spacing: -0.5%;
//       text-transform: uppercase;
//       color: $darkcocoa;
//       line-height: 2.5rem;
//     }
//     & a:active {
//       color: $powderiris;
//     }
//     & a:visited {
//       color: $powderiris;
//     }
//     & h2 {
//       line-height: 101.4px;
//       top: auto;
//       margin-left: 4rem;
//       transition: color 0.2s ease;
//       width: 355px;

//       &:hover {
//         color: $powderiris;
//       }
//       a:active {
//         color: $powderiris;
//       }
//     }
//     & ul {
//       margin-left: 1rem;
//       list-style: none;
//       margin-top: 6rem;

//       & li {
//         margin-bottom: -1rem;

//         & span {
//           line-height: 2.5rem;
//           font-style: normal;
//           top: 2.5rem;
//           position: relative;
//         }
//       }
//     }
//   }

export default function Menu() {
    return (
        <div className='menu mt-4 m-10'>
            {/* <Link href={'/'}>
                <Image className='m-auto relative -left-[1.2rem]' src={Logo} alt='Iru Studios Logo' width={130} />
            </Link> */}
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
