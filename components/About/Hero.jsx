import React,{useEffect} from "react";
import gsap from "gsap";
import SplitText from "../utils/Split3.min";

export default function Hero() {
  useEffect(() => {
    const split = new SplitText("#about-title", {
      type: "lines",
      linesClass: "lineChildren",
    });

    const splitParent = new SplitText("#about-title", {
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
    const split = new SplitText("#about-p", {
      type: "lines",
      linesClass: "lineChildren",
    });

    const splitParent = new SplitText("#about-p", {
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
            <div className="hero border-b-solid border-b-[3px] border-b-dark-cocoa pb-12">
                <h2 id="about-title">iru studios is an independent design studio based in OC, CA. Founded by creative developer, <em>Kemoni</em>.</h2>
                <h3 id="about-p" className="py-4 font-normal">Here we &lt;3 less is more. <br /> Intentional design that&apos;s <br />made to feel.</h3>
            </div>
        </>
    )
}