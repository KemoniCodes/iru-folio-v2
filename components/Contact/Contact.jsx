import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useInView } from "framer-motion";
import contact from "@/public/contact.jpeg";
import Elipse from "@/public/Ellipse-1.png";
import Letters from "@/public/LETTERS.png";
import Image from "next/image";

export default function Contact() {
  const letters = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `(function(h,b,s,n,i,p,e,t) {
        h._HB_ = h._HB_ || {};h._HB_.pid = i;;;;
        t=b.createElement(s);t.type="text/javascript";t.async=!0;t.src=n;
        e=b.getElementsByTagName(s)[0];e.parentNode.insertBefore(t,e);
        })(window,document,"script","https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js","5fb85402902329000db6b393");
`;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  useEffect(() => {
    gsap.to(letters.current, 5, {
      rotation: "+=360",
      ease: "none",
      repeat: -1,
    });

    gsap.from(".logo-elipse", {
      duration: 1.1,
      y: 80,
      opacity: 1,
      stagger: 0.1,
      ease: "power2",
    });
  }, []);


  return (
    <>
      <Image
        src={contact}
        width={500}
        height={500}
        alt="contact"
        className="w-screen h-[500px] object-cover relative -mx-[50vw] max-w-[100vw] left-1/2 -top-36"
      />
      <div className="logo-elipse lg:hidden block absolute right-0 top-[26.5rem] lg:w-fit w-[20vw] z-[0]">
        <Image className="elipse" src={Elipse} alt="Dark Mode Button" />
        <Image
          className="letters absolute bottom-[.35rem] left-[.25rem] lg:w-[120px] w-[90%] lg:left-[.7rem] mt-[.7rem] lg:bottom-3"
          src={Letters}
          alt="Dark Mode Button"
          ref={letters}
        />
      </div>
      <motion.div
        ref={ref}
        className="lg:flex block flex-col"
        style={{
          transform: isInView ? "none" : "translateY(50px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s",
        }}
      >
        <h2 className="w-full mx-auto text-center lg:mb-16 mb-4 lg:mt-0 -mt-16">
          Contact Us
        </h2>
        <div className="hb-p-5fb85402902329000db6b393-5"></div>
        <Image
          height={1}
          width={1}
          src="https://www.honeybook.com/p.png?pid=5fb85402902329000db6b393"
          alt="form"
        />
      </motion.div>
    </>
  );
}
