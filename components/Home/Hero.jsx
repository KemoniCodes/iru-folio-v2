import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import SplitText from "../utils/Split3.min";
import Mailto from "../utils/MailTo";
import ColorChanger from "@/public/COLOR CHANGER.png";
import Elipse from "@/public/Ellipse-1.png";
import Letters from "@/public/LETTERS.png";

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
    <div className="hero mt-16 h-screen" data-scroll data-scroll-section>
      <h2 className="" id="hero-text" data-scroll>
        KEMONI IS A BRAND DESIGNER & DEVELOPER BASED IN OC.
      </h2>
      <h2
        className="right lg:w-[998px] w-auto text-right float-right mt-[1.2rem]"
        id="hero-text"
        data-scroll
      >
        CURATING <br /> AESTHETICS FOR <br />
        <span>MODERN</span> BRANDS.
      </h2>

      <div className="logo-elipse relative lg:left-[50%] lg:bottom-[8.5%] lg:w-fit w-[20vw] z-[0] bottom-[15%] left-auto">
        <Image className="elipse" src={Elipse} alt="Dark Mode Button" />
        <Image
          className="letters absolute bottom-[.35rem] left-[.25rem] lg:w-[120px] w-[90%] lg:left-[.7rem] mt-[.7rem] lg:bottom-3"
          src={Letters}
          alt="Dark Mode Button"
          ref={letters}
        />
      </div>

      <div className="contact-menu relative top-[12%] lg:block hidden">
        <ul className="list-none mb-12">
          <li>
            <Mailto
              email="hello@iru-studios.com"
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
        className="color-changer fixed mr-[1.2rem] mb-[1rem] bottom-0 right-0 z-[1] hover:cursor-pointer"
        src={ColorChanger}
        alt="Dark Mode Button"
      />
    </div>
  );
}
