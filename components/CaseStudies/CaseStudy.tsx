import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { CaseStudiesProps } from "./CaseStudiesProps";


function Case({ title, services, caseStudy }: CaseStudiesProps) {
    const { bannerImg = "", description = "", images = [], behance = "", website = "" } = caseStudy ? caseStudy[0] : {};

    let lastItem = services ? services[services.length - 1] : null;
    let modifiedTitle = title?.replace(/-/g, " ");

    const imageClassName = (index: number) => {
        const isLastImage = index === images.length - 1;
        const isCafeBruna = title === 'cafè-bruna';

        if (isLastImage && isCafeBruna) {
            return "lg:object-none object-cover bg-black lg:mb-0 mb-4 mx-auto w-[-webkit-fill-available] border-solid border-[3px] border-dark-cocoa";
        } else {
            return "lg:mb-0 mb-4 mx-auto w-[-webkit-fill-available] border-solid border-[3px] border-dark-cocoa";
        }
    };

    return (
        <>
            {/* <div className="banner w-screen relative left-1/2 right-1/2 -mr-[50vw] -ml-[50vw]">
                <img src={bannerImg} alt="Banner" className="w-screen" />

            </div> */}
            <div className="pb-20" key={title}>
                <h2 className="text-center italic">{modifiedTitle}</h2>
                <ul className="flex gap-1 justify-center pt-8">
                    {services?.map((service, index) => (
                        <>
                            <h4 key={index} className="font-normal">
                                {lastItem === service ? service : `${service}/`}
                            </h4>
                        </>
                    ))}
                </ul>
                <p className="lg:w-[45%] w-full text-center mx-auto pt-4 lg:text-[24px] text-[15px]">{description}</p>
                {behance !== '' ? (
                    console.log(behance),
                    <p className="pt-8">
                        <Link href={behance} target="#" className="flex justify-center">
                            behance
                            <Image src={'/Arrow2.png'} width={27} height={27} priority alt="arrow" />
                        </Link>
                    </p>
                ) : ''}
                {website !== '' ? (
                    <p className="pt-8">
                        <Link href={website} target="#" className="flex justify-center">
                            website
                            <Image src={'/Arrow2.png'} width={27} height={27} priority alt="arrow" />
                        </Link>
                    </p>
                ) : ''}
            </div>

            <div className="images relative -z-[1] lg:grid block grid-cols-[1fr,1fr] gap-2 items-center gap-x-8 gap-y-8">
                {images?.map((img, index) => (
                    <Image
                        src={img}
                        key={index}
                        alt="Case Study Layout"
                        width={600}
                        height={600}
                        className={imageClassName(index)}
                    />
                ))}
            </div>
        </>
    );
}

const caseStudyData: CaseStudiesProps[] = [
    {
        title: 'ceramica',
        services: ["branding", "collateral"],
        caseStudy: [
            {
                bannerImg: "",
                description: "ceramica⏤ Let your mind speak through your hands. At CERAMICA we encourage you to freely express your state of mind without hesitation.",
                images: [
                    "/ceramica1.png",
                    "/ceramicaGif1.gif",
                    "/ceramicaGif2.gif",
                    "/ceramica2.png",
                    "/ceramicaGif4.gif",
                    "/ceramica4.png",
                    "/ceramicaGif3.gif"
                ],
                behance: "",
                website: ""
            },
        ],
    },
    {
        title: 'cafè-bruna',
        services: ["branding", "collateral", "packaging"],
        caseStudy: [
            {
                bannerImg: "",
                description: "cafè bruna⏤ translating to 'to be tanned', 'to be dark brown', in Italian. cafè bruna is a cafe with Handmade Italian recipes crafted with so much love. Curating an atmosphere of family and sincerity.",
                images: [
                    "/cafeBruna-1.png",
                    "/cafeBruna-2.png",
                    "/cafeBruna-3.png",
                    "/cafeBruna-4.png",
                    "/cafeBruna-5.png",
                    "/cafeBruna-6.png",
                    "/cafeBruna-7.png",
                    "/cafeBruna-8.png",
                    "/cafeBruna-9.png",
                    "/cafeBruna-10.png",
                    "/cafeBruna-11.png",
                    "/cafeBruna-12.png",
                    "/cafeBrunaGif.gif"
                ],
                behance: "https://www.behance.net/gallery/176551277/Cafe-Bruna",
                website: ""
            },
        ],
    },
    {
        title: 'la-májeste',
        services: ["mini brand", "collateral", "web design"],
        caseStudy: [
            {
                bannerImg: "/sera-banner.png",
                description: "la májeste⏤ translating to “majesty” in French. la májeste is a high end skin care brand. Selling everything from face cleansers to rich body crémes. Meant for the woman who craves beauty in every step of her maintanence routine.",
                images: [
                    "/la-majeste-2.png",
                    "/la-majeste-3.png",
                    "/la-majeste-4.png",
                    "/la-majeste-5.png",
                    "/la-majeste-6.png",
                    "/la-majeste-web-video.gif",
                    "/la-majeste-web.png"
                ],
                behance: "",
                website: "https://la-majeste.vercel.app"
            },
        ],
    },
    {
        title: 'sera',
        services: ["branding", "web design"],
        caseStudy: [
            {
                bannerImg: "/sera-banner.png",
                description: "Será⏤ translating to “be” in Spanish. Será is a handcrafted, artisan-made, fine jewelry atelier. They were founded in Los Angeles, California, bred to be worn to capture still moments. To remind us to just be.",
                images: [
                    "/sera-2.png",
                    "/sera-5.png",
                    "/sera-3-new.png",
                    "/sera-4.png",
                    "/sera-6.png"
                ],
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
    //             images: ["/featured-1.png,/featured-1.png","/sera-3-new.png","/sera-5.png",],
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
