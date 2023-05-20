import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CaseStudiesProps } from "./CaseStudiesProps";
import { motion, useInView, useScroll, useTransform } from "framer-motion";


function Case({ title, thumbnail, services }: CaseStudiesProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });

    let lastItem = services ? services[services.length - 1] : null;

    return (
        <motion.div
            ref={ref}
            className="caseStudy justify-center flex w-full items-center pb-14 even:justify-end"
        >
            <Link
                href={`/works/${title}`}
                key={title}
                style={{
                    transform: isInView ? "none" : "translateY(-80px)",
                    opacity: isInView ? 1 : 0,
                    transition:
                        "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s",
                }}
            >
                {thumbnail && <Image src={thumbnail} width={300} height={300} alt="thumbnail" />}
                <div className="info flex justify-between items-center">
                    <h4 className="py-2">{title}</h4>
                    <ul className="flex gap-1">
                        {services?.map((service, index) => (
                            <li key={index}>
                                <h4>{lastItem === service ? service : `${service}/`}</h4>
                            </li>
                        ))}
                    </ul>
                </div>
            </Link>
        </motion.div>
    );
}

const caseStudyData: CaseStudiesProps[] = [
    {
        thumbnail: "/featured-1.png",
        title: "sera",
        services: ["branding", "web design"],
    },
    // {
    //     thumbnail: "/soot-hover.png",
    //     title: "SOOT",
    //     services: ["branding", "web design"],
    // }
];

export default function CaseStudies() {
    return (
        <>
            <div className="title text-center fixed">
                <h2>RECENT <br />/WORKS</h2>
            </div>
            <div className="caseStudies px-16">
                {caseStudyData.map((caseData, index) => (
                    <Case key={index} {...caseData} />
                ))}
            </div>
        </>
    );
}

