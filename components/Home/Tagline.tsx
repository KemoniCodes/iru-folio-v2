import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

interface TaglineProps {
  text: string;
  gif: string;
}

function Tagline1({ text, gif }: TaglineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <>
      <motion.div ref={ref} className="elevate flex w-full items-center justify-between pb-14"
      >
        <h2 className="z-[1] m-0 relative text-left" style={{
          transform: isInView ? "none" : "translateX(-200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s"
        }}>
          {text}
        </h2>
        <div className="elevate-gif float-right" style={{
          transform: isInView ? "none" : "translateX(200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s"
        }}>
          <Image
            alt="gif"
            className=" rounded-[4.5rem]"
            src={gif}
            width={600}
            height={600}
          />
        </div>
      </motion.div>
    </>
  );
}

function Tagline2({ text, gif }: TaglineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <>
      <motion.div ref={ref} className="functional flex w-full items-end justify-between pb-20">
        <Image
          alt="gif"
          className=" rounded-[4.5rem] absolute"
          src={gif}
          width={300}
          height={300}
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s"
          }}
        />
        <h2 className="m-0 text-right w-full whitespace-pre-wrap" style={{
          transform: isInView ? "none" : "translateX(200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s"
        }}>
          {text}
        </h2>
      </motion.div>
    </>
  )
}

const tagline1Data: [string, string] = [
  'elevating your online presence', 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTljNjZiYzQxMjcyZWI5ZTE1OWE4MTMyNTcwZTI1NTMzMWY4NmQwZSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/l1J9HZMI8IpXXVY5i/giphy.gif',
];
const tagline2Data: [string, string] = [
  'Aesthetic design \n& functional development', 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTU5M2ZhM2QzNTMyN2JjOWJlYmIwYjk4YmE0NDQ2Y2RmMmM0N2Y1NyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/uWv3uPfWOz088/giphy.gif'
];

export default function Tagline() {
  return (
    <>
      <div className="section1 will-change-transform -mt-16">
        <Tagline1 text={tagline1Data[0]} gif={tagline1Data[1]} />
        <Tagline2 text={tagline2Data[0]} gif={tagline2Data[1]} />
      </div>
    </>
  );
}
