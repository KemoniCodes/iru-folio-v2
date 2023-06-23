import React, { useState, useEffect } from "react";
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
  const [cart, setCart] = useState({ id: null, totalQuantity: "", lines: [] });
  const [showShopNav, setShowShopNav] = useState(false);

  useEffect(() => {
    async function getCart() {
      let localCartData = window.localStorage.getItem("iru-cart-id");
      if (localCartData != null) {
        const existingCart = await fetch(`/api/getCart`).then((res) =>
          res.json()
        );

        setCart({
          id: existingCart.cart.id,
          checkoutUrl: existingCart.cart.checkoutUrl,
          subtotalAmount: existingCart.cart.cost.subtotalAmount,
          totalAmount: existingCart.cart.cost.totalAmount,
          lines: existingCart.cart.lines.edges,
          totalQuantity: existingCart.cart.totalQuantity,
        });

        return;
      }
    }

    getCart();
  }, []);

  let cost = Number(cart?.totalAmount?.amount) || 0;

  useEffect(() => {
    const shopNavState = localStorage.getItem("shopNavState");
    if (shopNavState) {
      setShowShopNav(JSON.parse(shopNavState));
    }
  }, []);

  const handleShopClick = () => {
    setShowShopNav(true);
    localStorage.setItem("shopNavState", JSON.stringify(true));
  };

  const handleBackClick = () => {
    setShowShopNav(false);
    localStorage.setItem("shopNavState", JSON.stringify(false));
  };

  return (
    <>
      <nav className="z-[1] relative">
        {!showShopNav && (
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
                  <div className="menu mt-4 lg:m-10 m-0">
                    <ul className="ml-4 list-none mt-24 relative top-[4.5rem]">
                      <li>
                        <Link href="/">
                          <span>.01</span>
                          <h2>home</h2>
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop">
                          <span>.02</span>
                          <h2>shop</h2>
                        </Link>
                      </li>
                      <li>
                        <Link href="/works">
                          <span>.03</span>
                          <h2>works</h2>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services">
                          <span>.04</span>
                          <h2>services</h2>
                        </Link>
                      </li>
                      <li>
                        <Link href="/about">
                          <span>.05</span>
                          <h2>about</h2>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact">
                          <span>.06</span>
                          <h2>contact</h2>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </ModalBody>
              </ModalContent>
            </Modal>

            <li className="nav-link lg:w-auto w-[25%]">
              <Link href={"/"}>
                <Image src={Logo} alt="Iru Studios Logo" width={130} />
              </Link>
            </li>
            <li className="nav-link">
              <Link
                className="nav-link"
                href={"/shop"}
                onClick={handleShopClick}
              >
                shop
              </Link>
            </li>
          </ul>
        )}

        {showShopNav && (
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
                  <div className="menu mt-4 lg:m-10 m-0">
                    <ul className="ml-4 list-none relative">
                      <li>
                        <Link href="/">
                          <span>.01</span>
                          <h2>home</h2>
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop">
                          <span>.02</span>
                          <h2>shop</h2>
                        </Link>
                      </li>
                      <li>
                        <Link href="/works">
                          <span>.03</span>
                          <h2>works</h2>
                        </Link>
                      </li>
                      <li>
                        <Link href="/services">
                          <span>.04</span>
                          <h2>services</h2>
                        </Link>
                      </li>
                      <li>
                        <Link href="/about">
                          <span>.05</span>
                          <h2>about</h2>
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact">
                          <span>.06</span>
                          <h2>contact</h2>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </ModalBody>
              </ModalContent>
            </Modal>

            <li className="nav-link lg:w-auto w-[25%]">
              <Link href={"/"} onClick={handleBackClick}>
                <Image src={Logo} alt="Iru Studios Logo" width={130} />
              </Link>
            </li>
            <li className="nav-link">
              <Link className="nav-link" href={"/cart"}>
                {console.log(cart.totalQuantity)}
                cart ({cart?.totalQuantity || "0"})
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}
