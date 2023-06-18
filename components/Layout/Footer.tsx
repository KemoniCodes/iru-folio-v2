import React, { useEffect, useRef } from "react";
import Mailto from "../utils/MailTo";
import Link from "next/link";
import { motion, useInView } from "framer-motion";


interface CustomWindow extends Window {
    fd: any;
}

declare let window: CustomWindow;

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.fd('form', {
                formId: '648e8f573b413b66d0ce7614',
                containerEl: '#fd-form-648e8f573b413b66d0ce7614'
            });
        }
    }, []);

    return (
        <>
            <footer className="absolute w-full bottom-0 left-0 overflow-hidden">
                <div ref={ref} id="fd-form-648e8f573b413b66d0ce7614" style={{
                    transform: isInView ? "none" : "translateY(-80px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1.1) 0.5s"
                }}></div>
                <ul className="flex justify-between lg:flex-row flex-col lg:text-start text-center">
                    <li className="w-full">© 2023 iru studios</li>
                    <li className="w-full m-auto">
                        <ul className="flex lg:gap-4 gap-2 m-auto justify-center">
                            <li><Link href="https://www.instagram.com/irustudios/" target="#">
                                instagram
                            </Link></li>
                            <li><Link href="https://www.behance.net/kemoniwilliams1" target="#">
                                behance
                            </Link></li>
                            <li><Link href="https://github.com/KemoniCodes" target="#">
                                github
                            </Link></li>
                        </ul>
                    </li>
                    <li className="text-end w-full">
                        <Mailto
                            email="hello@iru-studios.com"
                            // obfuscate={true}
                            subject="Re: Let's work together!"
                        >
                            hello@iru-studios.com
                        </Mailto>
                    </li>
                </ul>
            </footer >
        </>
    )
}