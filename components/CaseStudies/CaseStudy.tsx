import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { CaseStudiesProps } from "./CaseStudiesProps";


function Case({ title, services, caseStudy }: CaseStudiesProps) {
    const { bannerImg = "", description = "", caseStudyLayoutImg = "", behance = "", website = "" } = caseStudy ? caseStudy[0] : {};

    let lastItem = services ? services[services.length - 1] : null;

    return (
        <>
            {/* <div className="banner w-screen relative left-1/2 right-1/2 -mr-[50vw] -ml-[50vw]">
                <img src={bannerImg} alt="Banner" className="w-screen" />

            </div> */}
            <div className="pb-20">
                <h2 className="text-center italic">{title}</h2>
                <ul className="flex gap-1 justify-center pt-8">
                    {services?.map((service, index) => (
                        <>
                            <h4 key={index} className=" font-normal">
                                {lastItem === service ? service : `${service}/`}
                            </h4>
                        </>
                    ))}
                </ul>
                <p className="lg:w-[45%] w-full text-center mx-auto pt-4 lg:text-[24px] text-[15px]">{description}</p>
                <p className="pt-8">
                    <Link href={behance} target="#" className="flex justify-center">
                        behance
                        <Image src={'/Arrow2.png'} width={27} height={27} alt="arrow" />
                    </Link>
                </p>
            </div>

            <div className="image relative -z-[1]">
                <Image src={caseStudyLayoutImg} alt="Case Study Layout" width={900} height={900} className="w-[80%] mx-auto border-solid border-[3px] border-dark-cocoa" />
            </div>
        </>
    );
}

const caseStudyData: CaseStudiesProps[] = [
    {
        title: 'sera',
        services: ["branding", "web design"],
        caseStudy: [
            {
                bannerImg: "/sera-banner.png",
                description: "Será⏤ translating to “be” in Spanish. Será is a handcrafted, artisan-made, fine jewelry atelier. They were founded in Los Angeles, California, bred to be worn to capture still moments. To remind us to just be.",
                caseStudyLayoutImg: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cc4485114701005.60402ff1460ab.png",
                behance: "https://www.behance.net/gallery/114701005/Sera-jewelry-atelier"
            },
        ],
    },
    // {
    //     title: 'SOOT',
    //     caseStudy: [
    //         {
    //             bannerImg: "/featured-1.png",
    //             description: "soot description",
    //             caseStudyLayoutImg: "/featured-1.png",
    //             website: "https://example.com",
    //         },
    //     ],
    // }
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
            <div className="caseStudy">
                <Case title={caseData.title} services={caseData.services} caseStudy={caseData.caseStudy} />
            </div>

            {/* <div className="pagination">
                {caseStudyData.length > 1 ? <Link href={''}><h2>NEXT</h2></Link> : null}
            </div> */}
        </>
    );
}
