import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";


export default function AboutFounder() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    return (
        <>
            <div className="aboutFounder  py-16 border-b-solid border-b-[3px] border-b-dark-cocoa lg:mb-0 mb-64">
                <motion.div ref={ref} className="lg:flex block flex-col" style={{
                    transform: isInView ? "none" : "translateY(50px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s",
                }}>
                    <h3 className="font-normal lg:w-[40%] w-full lg:mb-0 mb-2 pb-4">about founder</h3>
                    <div className="aboutMe lg:w-[85%] w-full">
                        <p className="lg:w-[75%] w-full">
                            A DEVELOPER TURNED DESIGNER. GETTING MY START
                            IN PROGRAMMING, I LOVE TO UTILIZE BOTH MY LEFT
                            AND RIGHT BRAIN.<br /><br /> INFUSING LOGIC AND CREATIVITY,
                            I HAVE A MINIMALISTIC APPROACH TO MY WORK.<br /> PASSIONATE
                            ABOUT CREATING LOFTY DIGITAL EXPERIENCES FOR MY CLIENTS.
                        </p>
                    </div>

                    <h3 className="font-normal lg:w-[40%] w-full lg:mb-0 mb-2 mt-12 pb-4">work xp</h3>
                    <div className="aboutMe lg:w-[85%] w-full">
                        <p className="lg:w-[75%] w-full border-b-solid border-b-[1.2px] border-b-dark-cocoa border-t-solid border-t-[1.2px] border-t-dark-cocoa py-2">
                            IRU STUDIOS: DESIGN + DEVELOPMENT 20&rsquo;- PRESENT
                        </p>
                        <p className="lg:w-[75%] w-full border-b-solid border-b-[1.2px] border-b-dark-cocoa py-2">
                            OVERDOSE DIGITAL: FRONT END DEVELOPER 20&rsquo;- 23&rsquo; (3 YEARS)
                        </p>
                    </div>

                    <h3 className="font-normal lg:w-[40%] w-full lg:mb-0 mb-2 mt-12 pb-4">featured clients</h3>
                    <div className="lg:w-[85%] w-full">
                        <ul className="lg:w-[75%] w-full flex lg:gap-8 gap-4 items-center lg:flex-nowrap flex-wrap">
                            <li>
                                <Image src={'/lb.png'} width={200} height={200} alt={'featuredClient'} />
                            </li>
                            <li>
                                <Image src={'/toh.png'} width={200} height={200} alt={'featuredClient'} />
                            </li>
                            <li>
                                <Image src={'/rd.png'} width={200} height={200} alt={'featuredClient'} />
                            </li>
                            <li>
                                <Image src={'/jw.png'} width={200} height={200} alt={'featuredClient'} />
                            </li>
                            <li>
                                <Image src={'/theo.png'} width={200} height={200} alt={'featuredClient'} />
                            </li>
                            <li>
                                <Image src={'/kokatat.png'} width={200} height={200} alt={'featuredClient'} />
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </>
    )
}