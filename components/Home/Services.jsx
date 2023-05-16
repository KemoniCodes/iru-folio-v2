import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Services() {
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
  const physics = { damping: 5, mass: 0.1, stiffness: 10 };
  const spring = useSpring(transform, physics);

  return (
    <>
      <div className="section2 overflow-hidden will-change-transform -mx-8">
        <motion.section
          ref={scrollRef}
          style={{ x: spring }}
          className="flex gap-16"
        >
          <h2 className="h1 z-[1] m-0 relative py-14 ">services</h2>
          <h2 className="h1 z-[1] m-0 relative py-14 ">services</h2>
          <h2 className="h1 z-[1] m-0 relative py-14 ">services</h2>
        </motion.section>
      </div>
      <div ref={ghostRef} className="ghost" />
    </>
  );
}
