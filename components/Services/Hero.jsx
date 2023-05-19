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
      <div className="section-1 mx-auto mt-28 h-screen">
        <h2 id="service-title" className="w-fit mx-auto" data-scroll>
          enticing MINIMALIST
          <br /> <span className="ml-[31.8rem]">DESIGN</span>
          <br /> FOR MODERN
          <br /> <span className="ml-[31rem]">BRANDS.</span>
        </h2>

        <motion.div ref={ref}>
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

        <p id="service-p" className="-mt-8">
          AT IRU, our goal is TO COMBINE MINIMALISM AND <br /> PERSONAL
          AESTHETICS TO ACHIEVE YOUR BUSINESS’ <br /> GOALS.
          <br /> <br />
          CLEAN AND ATMOSPHERIC DESIGN BREEDS <br /> FUNCTIONALITY. ALLOWING
          YOUR BRAND TO ATTAIN <br />
          ITS IDEAL FINAL RESULTS. IRU’S MOST IMPORTANT <br /> MISSION IS TO
          UNDERSTAND CLIENT’S PROBLEMS AND <br /> OFFER A PRECISE RESOLUTION.
        </p>

        <hr className="w-screen border-[2px] border-solid border-dark-cocoa -ml-8 overflow-hidden" />
      </div>
    </>
  );
}
