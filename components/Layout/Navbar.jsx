import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";


export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <nav className="z-[1] relative">
        <ul className="flex list-none justify-between">
          <li className="nav-link" onClick={onOpen}>
            menu
          </li>

          <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"full"}
            motionPreset="scale"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton className=" text-light-creme" />
              <ModalBody className=" bg-powder-iris">
                <div className="menu mt-4 m-10">
                  <ul className="ml-4 list-none mt-24 relative top-[4.5rem]">
                    <li>
                      <Link href="/">
                        <span>.01</span>
                        <h2>home</h2>
                      </Link>
                    </li>
                    <li>
                      <Link href="/works">
                        <span>.02</span>
                        <h2>works</h2>
                      </Link>
                    </li>
                    <li>
                      <Link href="/services">
                        <span>.03</span>
                        <h2>services</h2>
                      </Link>
                    </li>
                    <li>
                      <Link href="/about-us">
                        <span>.04</span>
                        <h2>about</h2>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact">
                        <span>.05</span>
                        <h2>contact</h2>
                      </Link>
                    </li>
                  </ul>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>

          <li className="nav-link lg:block hidden">
            <Link href={"/"}>
              <Image src={Logo} alt="Iru Studios Logo" width={130} />
            </Link>
          </li>
          <li className="nav-link">
            <Link className="nav-link" href={"/contact"}>
              contact
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
