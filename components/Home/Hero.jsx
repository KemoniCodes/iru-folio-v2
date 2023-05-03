import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import SplitText from "../utils/Split3.min";
import Mailto from "../utils/MailTo";
import ColorChanger from "@/public/COLOR CHANGER.png";
import Elipse from "@/public/Ellipse-1.png";
import Letters from "@/public/LETTERS.png";

// .contact {
//   position: relative;
//   top: 12rem;
//   height: 100vh;
//   margin-top: 32rem;
//   margin-bottom: 8rem;
//   transition: color 0.2s ease;

//   & h1 {
//     border-bottom: 5px solid $darkcocoa;
//     width: 789px;
//     height: 17rem;
//     margin-left: 4rem;

//     &:hover {
//       color: $powderiris;
//       border-bottom: 5px solid $powderiris;
//     }

//     .lineParent {
//       overflow: hidden;
//       .lineChildren {
//         transform: translate(0, 500px);
//       }
//     }

//     &.right {
//       width: 848px;
//       margin-right: 4rem;
//     }
//   }
// }

// .menu {
//   & span {
//     font-style: normal;
//     top: 2.5rem;
//     position: relative;
//     margin-left: 1rem;
//     font-size: 24px;
//     font-family: "Helvetica Neue";
//     font-weight: 200;
//     line-height: 24px;
//     letter-spacing: -0.5%;
//     text-transform: uppercase;
//     color: $darkcocoa;
//     line-height: 2.5rem;
//   }
//   & a:active {
//     color: $powderiris;
//   }
//   & a:visited {
//     color: $powderiris;
//   }
//   & h2 {
//     line-height: 101.4px;
//     top: auto;
//     margin-left: 4rem;
//     transition: color 0.2s ease;
//     width: 355px;

//     &:hover {
//       color: $powderiris;
//     }
//     a:active {
//       color: $powderiris;
//     }
//   }
//   & ul {
//     margin-left: 1rem;
//     list-style: none;
//     margin-top: 6rem;

//     & li {
//       margin-bottom: -1rem;

//       & span {
//         line-height: 2.5rem;
//         font-style: normal;
//         top: 2.5rem;
//         position: relative;
//       }
//     }
//   }
// }

// nav {
//   z-index: 1;
//   position: relative;
//   & ul {
//     display: flex;
//     list-style: none;
//     justify-content: space-between;
//     margin-left: 1rem;
//     margin-right: 1rem;
//     margin-top: 1rem;

//     & img {
//       width: 130px;
//     }
//   }
// }

// .home {
//   height: 716vh;

//   & .hero {
//     margin-top: 5rem;
//     height: 100vh;
//     h2 {
//       margin-left: 1rem;
//     }

//     .lineParent {
//       overflow: hidden;
//       .lineChildren {
//         transform: translate(0, 500px);
//       }
//     }

//     .contact-menu {
//       margin-left: 1rem;
//       position: relative;
//       top: 12%;

//       & ul {
//         list-style: none;
//         margin-bottom: 3rem;
//       }
//     }

//     & hr {
//       width: 100%;
//       border: 2px solid;
//       position: relative;
//       bottom: -2rem;
//     }

//     & .logo-elipse {
//       position: relative;
//       left: 79%;
//       bottom: 35%;

//       & .elipse {
//       }

//       & .letters {
//         position: absolute;
//         left: 0.7rem;
//         margin-top: 0.7rem;
//       }
//     }
//   }

export default function Hero() {
  const letters = useRef(null);

  useEffect(() => {
    gsap.to(letters.current, 5, {
      rotation: "+=360",
      ease: "none",
      repeat: -1,
    });

    gsap.from(".logo-elipse", {
      duration: 1.1,
      y: 80,
      opacity: 1,
      stagger: 0.1,
      ease: "power2",
    });
  }, []);

  useEffect(() => {
    const split = new SplitText("#hero-text", {
      type: "lines",
      linesClass: "lineChildren",
    });

    const splitParent = new SplitText("#hero-text", {
      linesClass: "lineParent",
    });

    gsap.to(split.lines, {
      duration: 1.1,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power2",
    });
  }, []);

  useEffect(() => {
    const split = new SplitText(".contact-menu li", {
      type: "lines",
      linesClass: "lineChildren",
    });

    const splitParent = new SplitText(".contact-menu li", {
      linesClass: "lineParent",
    });

    gsap.to(split.lines, {
      duration: 1.2,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power2",
    });
  }, []);
  return (
    <div className="hero mt-20 h-screen" data-scroll data-scroll-section>
      <h2 className="" id="hero-text" data-scroll>
        KEMONI IS A BRAND DESIGNER & DEVELOPER BASED IN LA.
      </h2>
      <h2
        className="right w-[998px] text-right float-right mt-[1.2rem]"
        id="hero-text"
        data-scroll
      >
        CURATING <br /> AESTHETICS FOR <br />
        <span>MODERN</span> BRANDS.
      </h2>

      <div className="logo-elipse relative left-[47%] bottom-[8.5%] w-fit z-[0]">
        <Image className="elipse" src={Elipse} alt="Dark Mode Button" />
        <Image
          className="letters absolute left-[.7rem] mt-[.7rem] bottom-3"
          src={Letters}
          alt="Dark Mode Button"
          ref={letters}
        />
      </div>

      <div className="contact-menu relative top-[12%]">
        <ul className=" list-none mb-12">
          <li>
            <Mailto
              email="hello@irustudios.com"
              // obfuscate={true}
              subject="Re: Let's work together!"
            >
              email
            </Mailto>
          </li>
          <li>
            <Link href="https://www.behance.net/kemoniwilliams1" target="#">
              behance
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/irustudios/" target="#">
              instagram
            </Link>
          </li>
          <li>
            <Link href="https://github.com/KemoniCodes" target="#">
              github
            </Link>
          </li>
        </ul>
      </div>

      <Image
        className="color-changer fixed mr-[1.2rem] mb-[.5rem] bottom-0 right-0 z-[1] hover:cursor-pointer"
        src={ColorChanger}
        alt="Dark Mode Button"
      />
      <hr className=" w-full border-[2px solid] relative -bottom-8" />
    </div>
  );
}
