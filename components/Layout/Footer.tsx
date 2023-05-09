import React from "react";
import Mailto from "../utils/MailTo";
import Link from "next/link";

export default function Footer() {
    return (
        <>
            <footer className="absolute bottom-0 w-full">
                <ul className="flex justify-between">
                    <li className="w-full">© 2023 iru studios</li>
                    <li className="w-full m-auto">
                        <ul className="flex gap-4 m-auto justify-center">
                            <li><Link href="https://github.com/KemoniCodes" target="#">
                                github
                            </Link></li>
                            <li><Link href="https://www.behance.net/kemoniwilliams1" target="#">
                                behance
                            </Link></li>
                            <li><Link href="https://www.instagram.com/irustudios/" target="#">
                                instagram
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
            </footer>
        </>
    )
}