import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import SplitText from "../utils/Split3.min";

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    const split = new SplitText("#service-title", {
      type: "lines",
      linesClass: "lineChildren",
    });

    const splitParent = new SplitText("#service-title", {
      linesClass: "lineParent",
    });

    gsap.to(split.lines, {
      duration: 1.1,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power2",
    });
  }, []);

  useEffect(() => {
    const split = new SplitText("#service-p", {
      type: "lines",
      linesClass: "lineChildren",
    });

    const splitParent = new SplitText("#service-p", {
      linesClass: "lineParent",
    });

    gsap.to(split.lines, {
      duration: 1.2,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power2",
    });
  }, []);

  return (
    <>
      <div className="section-1 mx-auto lg:mt-28 mt-16 overflow-hidden">
        <h2 id="service-title" className="w-fit mx-auto lg:mb-0 mb-4" data-scroll>
          enticing MINIMALIST
          <br /> <span className="lg:ml-[31.8rem] ml-32">DESIGN</span>
          <br /> FOR MODERN
          <br /> <span className="lg:ml-[31rem] ml-32">BRANDS.</span>
        </h2>

        <motion.div ref={ref} className="lg:block hidden">
          <Image
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmM3MDc3OTU1ODMzNDlkYjM5NTRiYTA1ZjhmZjk5NWM0ZjliZTAxMiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/8p3TQWrABOT0A/giphy.gif"
            width={250}
            height={250}
            alt="gif"
            className="rounded-[3.4rem] border-[3px] border-solid border-dark-cocoa float-right relative bottom-64"
            style={{
              transform: isInView ? "none" : "translateX(50px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s",
            }}
          />
        </motion.div>

        <p
          id="service-p"
          className="-mt-8 mb-12 lg:block hidden"
        >
          AT IRU, our goal is TO COMBINE MINIMALISM AND <br /> PERSONAL
          AESTHETICS TO ACHIEVE YOUR BUSINESS’ <br /> GOALS.
        </p>
        <p
          id="service-p"
          className="-mt-8 lg:block hidden"
        >
          CLEAN AND ATMOSPHERIC DESIGN BREEDS <br /> FUNCTIONALITY. ALLOWING
          YOUR BRAND TO ATTAIN <br />
          ITS IDEAL FINAL RESULTS. IRU’S MOST IMPORTANT <br /> MISSION IS TO
          UNDERSTAND CLIENT’S PROBLEMS AND <br /> OFFER A PRECISE RESOLUTION.
        </p>

        <div className="mobile lg:hidden block pb-4">
          <p className="text-[15px]">
            AT IRU, our goal is TO COMBINE MINIMALISM AND PERSONAL
            AESTHETICS TO ACHIEVE YOUR BUSINESS’ GOALS. <br />
            CLEAN AND ATMOSPHERIC DESIGN BREEDSFUNCTIONALITY. ALLOWING
            YOUR BRAND TO ATTAIN ITS IDEAL FINAL RESULTS. IRU’S MOST IMPORTANT 
            MISSION IS TO UNDERSTAND CLIENT’S PROBLEMS AND OFFER A PRECISE RESOLUTION.
          </p>
        </div>

        <hr className="w-screen border-[2px] border-solid border-dark-cocoa overflow-hidden" />
      </div>
    </>
  );
}
