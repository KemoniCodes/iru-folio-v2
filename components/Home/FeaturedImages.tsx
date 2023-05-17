import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

interface FeaturedImgProps {
    text: string;
    img: string;
}

function FeaturedImg1({ text, img }: FeaturedImgProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    return (
        <>
            <motion.div ref={ref} className=" justify-center flex w-full items-center  pb-14"
            >
                <div className='ft-img-1' style={{
                    transform: isInView ? "none" : "translateY(-80px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s"
                }}>
                    <Link href='/works/project'>
                        <Image className='border-[1px] border-dark-cocoa border-solid' src={img} width={308} height={462} alt={text} />
                    </Link>
                    <h4 className='text-right pt-2' style={{
                        transform: isInView ? "none" : "translateY(40px)",
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s"
                    }}>{text}</h4>
                </div>
            </motion.div>
        </>
    );
}

function FeaturedImg2({ text, img }: FeaturedImgProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    return (
        <>
            <motion.div ref={ref} className="justify-center flex w-full items-center  pb-14"
            >
                <div className='ft-img-2 w-[308px] relative top-52' style={{
                    transform: isInView ? "none" : "translateY(80px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s"
                }}>
                    <Link href='/works/project'>
                        <Image className='border-[3.63584px] border-dark-cocoa border-solid' src={img} width={308} height={462} alt={text} />
                    </Link>
                    <h4 className='text-right pt-2' style={{
                        transform: isInView ? "none" : "translateY(40px)",
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s"
                    }}>{text}</h4>
                </div>
            </motion.div>
        </>
    )
}

const featuredImgData: [string, string] = [
    'BRANDING', '/featured-1.png',
];
const featuredImg2Data: [string, string] = [
    'WEB DESIGN', '/featured-2.png'
];

export default function FeaturedImages() {
    return (
        <>
            <div className="ft-images section3 overflow-hidden will-change-transform py-20 flex data-scroll-section">
                <FeaturedImg1 text={featuredImgData[0]} img={featuredImgData[1]} />
                <FeaturedImg2 text={featuredImg2Data[0]} img={featuredImg2Data[1]} />
            </div>
        </>
    );
}
