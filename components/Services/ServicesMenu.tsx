import React from "react";
import { ServicesProps } from "./ServicesProps";
import Image from "next/image";

function ServiceMenuHeading({ number, title }: ServicesProps) {
    return (
        <>
            <span>{number}</span>
            <h2>{title}</h2>
        </>
    );
}

function MenuInfo({ description, deliverables, timeline, investment }: ServicesProps) {
    return (
        <>
            <div className="info">
                <div className="services-info">
                    <p className="desc">{description}</p>

                    <h3 className="incl">What's Included</h3>
                    <ul>
                        {deliverables?.map((d) => (
                            <li key={d}>
                                <div className="deliverable">
                                    <Image src={"/COLOR CHANGER.png"} alt="bullet" width={21} height={21} />
                                    <span>{d}</span>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <h3>
                        Timeline:
                        <p>{timeline}</p>
                    </h3>
                    <h3>
                        Investment:
                        <p className="margin">
                            starting at<span>{investment}</span>
                        </p>
                    </h3>
                </div>
            </div>
        </>
    );
}

const serviceMenuData: [string, string][] = [
    ['01', 'branding'],
    ['02', 'web design'],
    ['03', 'web development'],
    ['04', 'Á la carte'],
    ['05', 'monthly retainer'],
];

const menuInfoData: [string, string[], string, string][] = [
    [
        'WE UNDERSTAND THAT The aesthetics of your BRAND has a direct impact on THE USER’S OVERALL sentiment. this is why our branding emphasizes strategy led design.',
        [
            'LOGO SUITE/ PRIMARY + SECONDARY + SUBMARK',
            'TYPOGRAPHY SUITE + STYLING',
            'CURATED COLOR PALATTE',
            'BRAND STRATEGY CONSULTING',
            'BRAND GUIDeLINES',
        ],
        '3-4 WEEKS',
        '$5,600',
    ],
    ['02', ['value'], 'Info 2', 'Description 2'],
    ['03', ['value'], 'Info 3', 'Description 3'],
    ['03', ['value'], 'Info 3', 'Description 3'],
    ['03', ['value'], 'Info 3', 'Description 3'],
];

export default function ServicesMenu() {
    return (
        <div className="services-menu">
            <ul>
                {serviceMenuData.map(([number, title], index) => (
                    <li key={index}>
                        <ServiceMenuHeading number={number} title={title} />
                    </li>
                ))}
            </ul>

            <div className="services-info">
                {menuInfoData.map(([description, deliverables, timeline, investment]) => (
                    <MenuInfo
                        key={description}
                        description={description}
                        deliverables={deliverables}
                        timeline={timeline}
                        investment={investment}
                    />
                ))}
            </div>
            <hr />
        </div>
    );
}
