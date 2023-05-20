import React, { useState } from "react";
import { ServicesProps } from "./ServicesProps";
import Image from "next/image";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import useEmblaCarousel from 'embla-carousel-react'


function ServiceMenuHeading({ number, title }: ServicesProps) {
    return (
        <>
            <span className="relative top-2 pr-2 text-[24px] lg:block hidden">{number}</span>
            <h2 className="hover:text-powder-iris transition-linkHover">{title}</h2>
        </>
    );
}

function MenuInfo({ description, deliverables, timeline, investment, id }: ServicesProps) {
    return (
        <>
            <div className="info lg:w-[75%] w-full" key={id}>
                <p className="desc pb-12 whitespace-pre-wrap">{description}</p>

                <h3 className="incl font-normal underline pb-4">What&rsquo;s Included</h3>
                <ul className="mb-4">
                    {deliverables?.map((deliverable, index) => (
                        <li key={index} className="pb-4">
                            <div className="deliverable flex">
                                <Image src={"/COLOR CHANGER.png"} alt="bullet" width={20} height={20} className="mr-2 w-[20px] h-[20px]" />
                                <span>{deliverable}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                <h3 className="flex font-normal mb-2">
                    Timeline:
                    <p className="ml-1">{timeline}</p>
                </h3>
                <h3 className="flex font-normal mb-2">
                    Investment:
                    <p className="margin ml-1">
                        starting at<span className="ml-1 font-normal italic">{investment}</span>
                    </p>
                </h3>
            </div>
        </>
    );
}

const serviceMenuData: [string, string, number, string, string[], string, string][] = [
    ['01', 'bran\n/ding', 1, 'WE UNDERSTAND THAT The aesthetics of your BRAND has a direct impact on THE USER’S OVERALL sentiment. this is why our branding emphasizes strategy led design.',
        [
            'LOGO SUITE/ PRIMARY + SECONDARY + SUBMARK',
            'TYPOGRAPHY SUITE + STYLING',
            'CURATED COLOR PALATTE',
            'LAUNCH GRAPHICS',
            'BRAND STRATEGY CONSULTING',
            'BRAND GUIDeLINES',
        ],
        '3-4 WEEKS',
        '$5,600'
    ],
    ['02', 'web\n/des\nign', 2, 'TO COMPLETE YOUR BRANDS AURA, TRANSFERRING YOUR VISUAL AESTHETICS TO YOUR WEBSITE IS ESSENTIAL. THIS IS THE REFRENCE POINT OF CONTact for your audience, so ensuring an impactful impression is vital.',
        [
            'WEBSITE STRATEGY',
            '5 CUSTOM PAGES',
            'WEBFLOW,SQUARESPACE,SHOWIT,SHOPIFY',
            'CUSTOM CODE',
            'SEO OPTIMIZATION',
            'MOBILE OPTIMIZATION',
            'LINK IN BIO PAGE',
            '1 WEEK OF WEB MAINTANENCE POST LAUNCH'
        ],
        '3-4 WEEKS',
        '$7000',],
    ['03', 'deve\n/lop\nment', 3, "WE BRING YOUR DESIGN TO LIFE WITH CODE. COMPLETELY BESPOKE SOLUTIONS THAT DIFFER FROM BORING WEB TEMPLATES.\n\nWHETHER YOU'RE AN ECOMMERCE BRAND AND WANT AN INCREDIBLY FAST BROWSING EXPERIENCE, OR A SERVICE BASED BRAND LOOKING TO WOW YOUR AUDIENCE WITH A WEB EXPERIENCE LIKE THEY HAVE NEVER SEEN, THIS PACKAGE IS FOR YOU! (SOMETHING LIKE MY PORTFOLIO 😉)",
        [
            'UI/UX STRATEGY',
            'DESIGN TO CODE',
            'REACT',
            'NEXT.JS',
            'HEADLESS ECOOMERCE',
            'MOBILE OPTIMIZATION',
            'SITE INSTILLATION + WALKTHROUGH',
            '1 WEEK OF WEB MAINTANENCE POST LAUNCH'
        ],
        '4-8 WEEKS',
        '$10,000',],
    ['04', 'Á\nla\n/car\nte', 4, 'IN ADDITION TO FULL SERVICE PACKAGES, WE OFFER SUPLEMENTARY DESIGN WORK TO AID IN THE FULL THE SPECTRUM OF YOUR BRAND.',
        [
            'IG TEMPLATES',
            'BIZ CARD DESIGN',
            'MERCH DESIGN',
            'PACKAGING DESIGN',
            'ADDITIONAL WEB PAGES',
            'EMAIL MARKETING DESIGN'
        ],
        'GET A QOUTE',
        'GET A QOUTE',],
];

export default function ServicesMenu() {
    const [tabIndex, setTabIndex] = useState(0);
    const [emblaRef] = useEmblaCarousel()


    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    };

    return (
        <Tabs index={tabIndex} onChange={handleTabsChange}>

            <div className="services-menu flex lg:flex-row flex-col overflow-hidden">
                <ul className="lg:w-[40%] lg:border-r-[4px] lg:border-r-solid lg:border-r-dark-cocoa border-r-none pr-4 lg:overflow-visible overflow-hidden w-full !border-b-[4px] !border-b-solid !border-b-dark-cocoa lg:!border-b-0" ref={emblaRef}>
                    <TabList className="lg:!flex-col flex-row !border-none relative lg:right-0 right-16 lg:gap-0 gap-2">
                        {serviceMenuData.map(
                            ([number, title, id, description], index) => (
                                <li
                                    className="flex align-top py-4 lg:border-r-0 border-r-[3px] border-r-solid border-r-dark-cocoa lg:px-0 px-4"
                                    key={`${id}-${index}`}
                                >
                                    <Tab _selected={{ border: 'none' }} className="!text-left !place-items-start !font-[24px]">
                                        <ServiceMenuHeading
                                            number={number}
                                            title={title}
                                            id={id}
                                            description={description}
                                        />
                                    </Tab>
                                </li>
                            )
                        )}
                    </TabList>
                </ul>

                <div className="services-info pt-8 lg:pl-16 pl-0">
                    <TabPanels>
                        {serviceMenuData.map(
                            (
                                [number, title, id, description, deliverables, timeline, investment],
                                index
                            ) => (
                                <TabPanel key={`${id}-${index}`}>
                                    <MenuInfo
                                        id={id}
                                        description={description}
                                        deliverables={deliverables}
                                        timeline={timeline}
                                        investment={investment}
                                    />
                                </TabPanel>
                            )
                        )}
                    </TabPanels>
                </div>
            </div>
            <hr className="border-[2px] border-solid border-dark-cocoa overflow-hidden" />
        </Tabs>
    );
}


