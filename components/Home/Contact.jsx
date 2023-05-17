import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  return (
    <>
      <div
        ref={ref}
        className=" lg:mt-auto -mt-[30rem] contact section4 overflow-hidden will-change-transform py-20 data-scroll-section"
      >
        <Link
          href="/contact"
          className="flex justify-center flex-col relative top-[15vh]"
        >
          <h1
            id="c-title"
            className=" leading-[18rem] border-b-[5px] border-solid border-dark-cocoa w-fit"
            style={{
                transform: isInView ? "none" : "translateY(100px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 1s",
              }}
          >
            get in
          </h1>
          <h1
            id="c-title"
            className=" leading-[18rem] border-b-[5px] border-solid border-dark-cocoa self-end"
            style={{
                transform: isInView ? "none" : "translateY(100px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 1s",
              }}
          >
            touch
          </h1>
          <Image
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmQ1ZWY2MDczNzM2NGM5ZWVhZDEzNDUxZGFhNjYyYTBlODc4MzRhZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/lRvB43J4WdKfjL4mVq/giphy.gif"
            alt="contact"
            height={400}
            width={400}
            className="lg:w-[400px] w-[80%] lg:mb-[inherit] mb-32 lg:mt-[inherit] mt-8 lg:m-[inherit] m-auto border-[3px] border-solid border-dark-cocoa relative lg:bottom-[16rem] left-0 bottom-0 lg:left-[3rem] rounded-[45%]"
            style={{
                transform: isInView ? "none" : "translateX(-50px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 1.1s",
              }}
          />
        </Link>
      </div>
    </>
  );
}
