import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CaseStudiesProps } from "./CaseStudiesProps";

function Case({ title, thumbnail, services }: CaseStudiesProps) {
    return (
        <Link href={`/case-studies/${title}`} key={title}>
            {thumbnail && (
                <Image src={thumbnail} width={200} height={200} alt="thumbnail" />
            )}
            <h3>{title}</h3>
            <ul>
                {services?.map((service, index) => (
                    <li key={index}>{service}</li>
                ))}
            </ul>
        </Link>
    );
}

const caseStudyData: CaseStudiesProps[] = [
    {
        thumbnail: "/featured-1.png",
        title: "sera",
        services: ["branding", "web design"],
    },
    {
        thumbnail: "/soot-hover.png",
        title: "SOOT",
        services: ["branding", "web design"],
    },
];

export default function CaseStudies() {
    return (
        <>
            <h1>CASE STUDIES PAGE</h1>
            {caseStudyData.map((caseData, index) => (
                <Case key={index} {...caseData} />
            ))}
        </>
    );
}
