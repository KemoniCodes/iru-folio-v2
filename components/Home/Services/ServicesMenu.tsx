import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ServicesMenuProps } from './ServicesMenuProps'

function Service({ number, title, hoverImg }: ServicesMenuProps) {
    const cursorRef = useRef<HTMLDivElement>(null);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    useEffect(() => {
        const cursor = cursorRef.current;

        document.addEventListener("mousemove", (e) => {
            const x = e.clientX;
            const y = e.clientY;

            if (cursor) {
                cursor.style.left = `${x}px`;
                cursor.style.top = `${y}px`;
            }
        });
    }, []);

    return (
        <>
            <motion.div ref={ref} className="service flex" style={{
                transform: isInView ? "none" : "translateY(50px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s"
            }}>
                <Link href={'/services'}>
                    <span className="relative lg:top-10 top-4 lg:text-[24px] text-[15px] font-extralight leading-[24px] -tracking-[.5%] uppercase text-dark-cocoa ml-4">{number}</span>
                    <h2 className="lg:ml-16 ml-12 transition-linkHover hover:text-powder-iris">{title}</h2>
                    <div className="cursor-follow" ref={cursorRef}>
                        <div className="relative -top-40">
                            <Image alt={'service'} src={hoverImg} width={350} height={350} className="border-[3px] border-solid border-dark-cocoa rounded-[50%]" />
                        </div>
                    </div>
                </Link>
            </motion.div>
        </>
    )
}

const ServiceData: [string, string, string][] = [
    ['.01', 'branding', '/cafeBruna-5.png'],
    ['.02', 'web design', '/web-design-hover.png'],
    ['.03', 'development', '/web-dev-hover.png']
]

export default function ServicesMenu() {
    return (
        <>
            <div className='services-menu mt-16 flex flex-col items-center overflow-hidden lg:h-auto h-[30vh]'>
                <>
                    {ServiceData.map(([number, title, hoverImg], index) => (
                        <Service number={number} title={title} hoverImg={hoverImg} key={index} />
                    ))}
                </>
            </div>
        </>
    )
}
