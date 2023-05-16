import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ServicesMenuProps } from './ServicesMenuProps'

function Service({ number, title }: ServicesMenuProps) {
    return (
        <>
            <Link href={'/services'}>
                <span className="relative top-10 text-[24px] font-extralight leading-[24px] -tracking-[.5%] uppercase text-dark-cocoa ml-4">{number}</span>
                <h2 className=" ml-16 transition-linkHover hover:text-powder-iris">{title}</h2>
            </Link>
        </>
    )
}

const ServiceData: [string, string][] = [
    ['.01', 'branding'],
    ['.02', 'web design'],
    ['.03', 'development']
]

export default function ServicesMenu() {
    return (
        <>
            <div className='services-menu mt-12'>
                <>
                    {ServiceData.map(([number, title], index) => (
                        <Service number={number} title={title} key={index} />
                    ))}
                </>

                {/* <Link href='/services'>
                        <Image alt="arrow" src="/Arrow2.png" height={100} width={100} className="hover relative float-right" />
                    </Link> */}
            </div>
        </>
    )
}