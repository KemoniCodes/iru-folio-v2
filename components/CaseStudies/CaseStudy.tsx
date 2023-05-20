import React from "react";
import { useRouter } from "next/router";
import { CaseStudiesProps } from "./CaseStudiesProps";


function Case({ title, caseStudy }: CaseStudiesProps) {
    const { bannerImg = "", description = "", caseStudyLayoutImg = "", website = "" } = caseStudy ? caseStudy[0] : {};

    return (
        <>
            <h3>{title}</h3>
            <img src={bannerImg} alt="Banner" />
            <p>{description}</p>
            <img src={caseStudyLayoutImg} alt="Case Study Layout" />
            <a href={website}>Visit Website</a>
        </>
    );
}

const caseStudyData: CaseStudiesProps[] = [
    {
        title: 'sera',
        caseStudy: [
            {
                bannerImg: "/featured-1.png",
                description: "sera description",
                caseStudyLayoutImg: "/featured-1.png",
                website: "https://example.com",
            },
        ],
    },
    {
        title: 'SOOT',
        caseStudy: [
            {
                bannerImg: "/featured-1.png",
                description: "soot description",
                caseStudyLayoutImg: "/featured-1.png",
                website: "https://example.com",
            },
        ],
    }
];

export default function CaseStudy() {
    const router = useRouter();
    const title = router.query.slug;

    const caseData = caseStudyData.find((caseData) => caseData.title === title);

    if (!caseData) {
        return <h3 className="h-screen">Case study not found</h3>;
    }

    return (
        <>
            <div className="h-screen">
                <h1>CASE STUDY PAGE</h1>
                <Case title={caseData.title} caseStudy={caseData.caseStudy} />
            </div>
        </>
    );
}
