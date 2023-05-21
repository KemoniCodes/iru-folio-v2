import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";


export default function AboutFounder() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    return (
        <>
            <div className="aboutFounder  py-16 border-b-solid border-b-[3px] border-b-dark-cocoa lg:mb-0 mb-64">
                <motion.div ref={ref} className="lg:flex block" style={{
                    transform: isInView ? "none" : "translateY(50px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s",
                }}>
                    <h3 className="font-normal lg:w-[40%] w-full lg:mb-0 mb-2">about founder</h3>
                    <div className="aboutMe lg:w-[85%] w-full">
                        <p className="lg:w-[60%] w-full">
                            A DEVELOPER TURNED DESIGNER. GETTING MY START
                            IN PROGRAMMING, I LOVE TO UTILIZE BOTH MY LEFT
                            AND RIGHT BRAIN.<br /><br /> INFUSING LOGIC AND CREATIVITY,
                            I HAVE A MINIMALISTIC APPROACH TO MY WORK.<br /> PASSIONATE
                            ABOUT CREATING LOFTY DIGITAL EXPERIENCES FOR MY CLIENTS.
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    )
}