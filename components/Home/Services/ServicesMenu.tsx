import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ServicesMenuProps } from './ServicesMenuProps'

function Service({ number, title }: ServicesMenuProps) {
    return (
        <>
            <Link href={''}>
                <span>{number}</span>
                <h2>{title}</h2>
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
            <div className='section-2' data-scroll-section>
                <div className='services-menu'>
                    <>
                        {ServiceData.map(([number, title], index) => (
                            <Service number={number} title={title} key={index} />
                        ))}
                    </>

                    <Link href='/services'>
                        <Image alt="arrow" src="/Arrow2.png" height={100} width={100} className="hover" />
                    </Link>
                </div>
            </div>
        </>
    )
}