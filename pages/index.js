import Hero from '@/components/Home/Hero'
import gsap from "gsap";
import SplitText from "@/components/utils/Split3.min";
import React, { useState, useRef, useEffect } from "react";
import Tagline from '@/components/Home/Tagline';


export default function Home() {
  // const [preLoader, setPreloader] = useState(true);

  // // useLocoScroll(!preLoader);

  // const [timer, setTimer] = useState(1);

  // const id = useRef(null);

  // const clear = () => {
  //   window.clearInterval(id.current);
  //   setPreloader(false);
  // };

  // useEffect(() => {
  //   id.current = window.setInterval(() => {
  //     setTimer((timer) => timer - 1);
  //   }, 1000);
  // }, []);

  // useEffect(() => {
  //   if (timer === 0) {
  //     clear();
  //   }
  // }, [timer]);
  return (
    <>
      {/* {preLoader ? (
        <div className='loader-wrapper'>
          <div className='biglogo'>
            <h1 className='left'>Iru</h1>
            <hr />
            <h1 className='right'>Studios</h1>
          </div>
        </div>
      ) : ( */}
        {/* <main
          className={'flex min-h-screen flex-col items-center justify-between bg-light-creme'}
        > */}
          <div className="home w-full">
            <Hero />
            <Tagline/>
          </div>
        {/* </main> */}
      {/* )} */}
    </>
  )
}
