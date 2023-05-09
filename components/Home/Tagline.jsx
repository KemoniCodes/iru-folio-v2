import React, { useEffect, useRef, useState, useCallback } from "react";
import SplitText from "../utils/Split3.min";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Tagline() {
  const scrollRef = useRef(null);
  const ghostRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);

  useEffect(() => {
    scrollRef && setScrollRange(scrollRef.current.scrollWidth);
  }, [scrollRef]);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width);
    }
  }, []);

  useEffect(() => {
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
