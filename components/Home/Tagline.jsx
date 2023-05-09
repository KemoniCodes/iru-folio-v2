import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import SplitText from "../utils/Split3.min";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Tagline() {
  const scrollRef = useRef(null);
  const ghostRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);

  useLayoutEffect(() => {
    scrollRef && setScrollRange(scrollRef.current.scrollWidth);
  }, [scrollRef]);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width);
    }
  }, []);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => onResize(entries));
    resizeObserver.observe(ghostRef.current);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  const { scrollYProgress } = useScroll();
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    [1, -scrollRange + viewportW]
  );
  const transform2 = useTransform(
    scrollYProgress,
    [1, 0],
    [1, -scrollRange + viewportW]
  );
  const physics = { damping: 5, mass: 0.1, stiffness: 10 };
  const spring = useSpring(transform, physics);
  const spring2 = useSpring(transform2, physics);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     import("gsap")
  //       .then((gsap) => {
  //         import("gsap/ScrollTrigger").then(() => {
  //           setTimeout(() => {
  //             console.log(ref.current.offsetWidth);
  //             console.log(ref.current.clientWidth);
  //             console.log({ current: ref.current });

  //             gsap.registerPlugin(ScrollTrigger);
  //             const sections = gsap.utils.toArray("h1");
  //             console.log(sections);

  //             gsap.to(sections, {
  //               xPercent: -100,
  //               ease: "none",
  //               scrollTrigger: {
  //                 start: "top top",
  //                 trigger: ref.current,
  //                 scroller: ".home",
  //                 pin: true,
  //                 scrub: 0.5,
  //                 snap: 1 / (sections.length - 1),
  //                 end: () => `+=${ref.current.offsetWidth}`,
  //               },
  //             });
  //             ScrollTrigger.refresh();
  //           });
  //         });
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, []);

  // position: fixed;
  // left: 0;
  // right: 0;
  // will-change: transform;

  return (
    <>
      <div className="section1 overflow-hidden will-change-transform -mx-8">
        <motion.section ref={scrollRef} style={{ x: spring }}>
          <h2 className="h1 z-[1] m-0 whitespace-nowrap relative py-14">
            elevating your
          </h2>
        </motion.section>

        <motion.section ref={scrollRef} style={{ x: spring2 }}>
          <h2 className="h1 z-[1] m-0 whitespace-nowrap relative py-14">
            online presence
          </h2>
        </motion.section>
      </div>
      <div ref={ghostRef} className="ghost" />
    </>
  );
}
