import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, useInView } from "framer-motion";
import {
  Box,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import Slider from "react-slick";

export async function getStaticPaths() {
  const url = new URL(process.env.URL || "http://localhost:3000");
  url.pathname = "/api/products";

  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error(res);
    return { props: {} };
  }

  const data = await res.json();

  return {
    paths: data.products.edges.map(({ node }) => `/product/${node.handle}`),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const url = new URL(process.env.URL || "http://localhost:3000");
  url.pathname = "/api/products";

  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error(res);
    return { props: {} };
  }

  const data = await res.json();

  const products = data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    description: node.description,
    imageSrc: node.images.edges,
    imageAlt: node.title,
    price: node.variants.edges[0]?.node.priceV2.amount,
    slug: node.handle,
    variantId: node.variants.edges[0].node.id,
    variant: node.variants.edges[0],
    metafield: node.metafields,
  }));

  const currentSlug = new URL(window.location.href).pathname.split(
    "/product/"
  )[1];
  const product = products.find(({ slug }) => slug === currentSlug);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
  };
}

const settings = {
  dots: false,
  arrows: true,
  fade: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Product({ product }) {
  console.log(product);
  const [cart, setCart] = useState({});
  const [isInCart, setIsInCart] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    option: product.options[0],
    price: product.price,
  });

  async function loadCart() {
    const cartId = window.localStorage.getItem("iru-cart-id");

    if (!cartId) {
      console.log("no cart");
      setCart({});
      return;
    }

    const cartData = await fetch(`${window.location.origin}/api/getCart`, {
      method: "GET",
    }).then((res) => res.json());

    // console.log("cartData", cartData.cart.lines.edges.length > 0);

    if (cartData.cart != null) {
      if (cartData.cart.lines.edges.length > 0) {
        setCart(cartData);

        const foundProduct = cartData.cart.lines.edges.find(
          (line) => line.node.merchandise.id === foundProductVariant.id
          // console.log(line.node.merchandise.id,product.variantId)
        );
        setIsInCart(!!foundProduct);

        console.log("foundProduct:", foundProduct);
      }
    }
  }

  const router = useRouter();

  async function handleAddToCart(event) {
    event.preventDefault();

    const cartId = window.localStorage.getItem("iru-cart-id");

    const form = new FormData(event.target);

    const response = await fetch(`${window.location.origin}/api/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartId: cartId || "",
        itemId: form.get("productId"),
        quantity: parseInt(form.get("quantity")),
      }),
    });

    const cart = await response.json();
    window.localStorage.setItem("iru-cart-id", cart.id);

    setCart(cart);
    setIsInCart(true);
    router.push("/cart");
  }

  let productVariant = product.variant;
  let pMap = productVariant.map((pv) => {
    return pv.node;
  });

  console.log(pMap);

  const foundProductVariant = pMap.find(
    ({ title }) => title === selectedOption.option
  );

  console.log(foundProductVariant.id);

  const [activeOption, setActiveOption] = useState(null);

  function handleOptionChange(option) {
    setSelectedOption({ option, price: foundProductVariant.priceV2.amount });
    setActiveOption(option);
  }

  console.log("option", selectedOption);

  useEffect(() => {
    loadCart();
    if (foundProductVariant) {
      setSelectedOption({
        ...selectedOption,
        price: foundProductVariant.priceV2.amount,
      });
    }
  }, [foundProductVariant]);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [slider, setSlider] = useState({ ...Slider });

  const jsonStringP = product.metafield.map((mf, index) => {
    if (mf != null && mf.key === "pages") {
      return mf.value;
    }
    return null;
  });

  const jsonStringKF = product.metafield.map((mf, index) => {
    if (mf != null && mf.key === "keyfeatures") {
      return mf.value;
    }
    return null;
  });

  const jsonStringF = product.metafield.map((mf, index) => {
    if (mf != null && mf.key === "faq") {
      return mf.value;
    }
    return null;
  });

  // console.log("json", jsonStringKF[2]);

  const data = JSON.parse(jsonStringP[3]);
  const data1 = JSON.parse(jsonStringKF[2]);
  const data2 = JSON.parse(jsonStringF[4]);

  const textValues = data.children[0].children
    .filter(
      (child) => child.type === "list-item" && child.children[0].type === "text"
    )
    .map((child) => child.children[0].value);

  const textValues1 = data1.children[0].children
    .filter(
      (child) => child.type === "list-item" && child.children[0].type === "text"
    )
    .map((child) => {
      let title = child.children[0].value;
      let text = child.children[1].value;
      return { title, text };
    });

  const textValues2 = data2.children[0].children
    .filter(
      (child) => child.type === "list-item" && child.children[0].type === "text"
    )
    .map((child) => {
      let title = child.children[0].value;
      let text = child.children[1].value;
      return { title, text };
    });
  return (
    <>
      <div className="mainPDPContainer border-b-solid border-b-[1px] border-b-dark-cocoa justify-between pb-8 lg:flex block w-screen">
        <Box
          position={"relative"}
          height={"auto"}
          width={"full"}
          overflow={"hidden"}
          className="lg:hidden block"
        >
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <IconButton
            position="absolute"
            left={".35rem"}
            top={"50%"}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
            className="!bg-transparent !text-[2rem]"
          >
            <ChevronLeftIcon className="!text-light-creme" />
          </IconButton>

          <IconButton
            position="absolute"
            right={".35rem"}
            top={"50%"}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
            className="!bg-transparent !text-[2rem]"
          >
            <ChevronRightIcon className="!text-light-creme" />
          </IconButton>

          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {product.imageSrc.map(
              (img, index) => (
                console.log(img),
                (
                  <Box
                    key={index}
                    position="relative"
                    className="object-cover flex m-auto"
                  >
                    <Image
                      src={img.node.src}
                      alt={img.node.alt}
                      width={400}
                      height={400}
                      key={index}
                      className="w-full"
                      unoptimized
                    />
                  </Box>
                )
              )
            )}
          </Slider>
        </Box>

        <div
          className="productImg lg:pb-0 pb-14 -ml-8 
      w-full sticky top-0 lg:h-screen h-auto max-w-[50%] overflow-scroll overflow-y-auto overflow-x-hidden lg:block hidden
    "
        >
          {product.imageSrc.map(
            (img, index) => (
              console.log(img),
              (
                <Image
                  src={img.node.src}
                  alt={img.node.alt}
                  width={400}
                  height={400}
                  key={index}
                  className="w-full"
                  unoptimized
                />
              )
            )
          )}
        </div>

        <div
          className="productInfo text-left w-full lg:max-w-[50%] max-w-none
      relativepl-8 pt-12 pr-8 lg:pl-0 pl-8"
        >
          <div className="lg:sticky relative">
            <a href={`/product/${product.slug}`}></a>
            <h2>{product.title}</h2>
            <h3 className="my-12 text-[2.5rem] font-normal italic">
              {formattedPrice.format(selectedOption.price)}
            </h3>

            <div className="productOptions mb-8">
              <h3 className="mt-8 mb-2 font-normal">{product.optionsName}</h3>
              {product.options.map((option, index) => (
                <>
                  <button
                    key={index}
                    className={`mr-4 h4 border-solid border-[1px] border-dark-cocoa hover:!text-light-creme
            ${
              activeOption === option
                ? "!text-light-creme bg-dark-cocoa"
                : "text-dark-cocoa bg-transparent"
            } 
            hover:bg-dark-cocoa ${
              activeOption === option ? "hover:!text-light-creme" : ""
            } 
            !font-normal p-[.5rem]`}
                    onClick={() => handleOptionChange(option)}
                  >
                    {option}
                  </button>
                </>
              ))}
            </div>

            <div className="flex flex-col-reverse mt-6 mb-10">
              {product.metafield.map((mf, index) => (
                <>
                  {mf != null && mf.key == "demostorepassword" ? (
                    <p className="font-normal pb-2">
                      password:
                      <span className="!normal-case pl-2 font-extralight">
                        {mf.value}
                      </span>
                    </p>
                  ) : (
                    ""
                  )}
                  {mf != null && mf.key == "demostore" ? (
                    <p className="font-normal">
                      demo store:
                      <span className="!normal-case pl-2 italic font-extralight">
                        <Link href={mf.value}>{product.title}</Link>
                      </span>
                    </p>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </div>

            <p className="normal-case mt-10 mb-12">
              {product.description.toString()}
            </p>

            <form onSubmit={handleAddToCart}>
              <input
                type="hidden"
                name="productId"
                value={foundProductVariant.id}
              />
              <input type="hidden" name="quantity" value={1} />
              <button
                disabled={isInCart}
                className="h4 
                border-solid border-[1px] border-dark-cocoa hover:border-solid hover:border-[1px] hover:border-dark-cocoa 
              hover:!text-dark-cocoa hover:bg-transparent bg-dark-cocoa !text-light-creme !font-normal p-[.8rem] w-full"
              >
                {isInCart ? <>Already in Cart</> : <>Add To Cart</>}
              </button>
            </form>

            <div className="faq mt-8">
              <Accordion allowMultiple>
                {textValues2.map((item, index) => (
                  <AccordionItem className="items-center !border-0" key={index}>
                    <AccordionButton className=" bg-transparent hover:!bg-transparent !ps-0 !pe-0 border-b-solid border-b-[1px] border-b-dark-cocoa">
                      <Box as="span" flex="1" textAlign="left" className="">
                        <h3 className="font-normal">{item.title}</h3>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} className=" !ps-0 !pe-0">
                      <pre className="p pt-1 whitespace-pre-wrap !normal-case font-helvetica">
                        {item.text}
                      </pre>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <div className="pdpSection-2 lg:flex block border-b-solid border-b-[1px] border-b-dark-cocoa">
        <div className="row lg:border-r-solid lg:border-r-[1px] lg:border-r-dark-cocoa border-r-none lg:pl-16 pl-8 lg:pt-8 pt-16 lg:max-w-[50%] max-w-none">
          <h2 className=" [text-align-last:center] lg:pr-0 pr-8">
            key/ features
          </h2>
          <div className="keyFeatures pr-12 lg:mt-20 mt-8">
            <ul className="list-none">
              {textValues1.map((item, index) => (
                <li className="flex items-center pb-8" key={index}>
                  {/* <Image
                    src={"/COLOR CHANGER.png"}
                    alt="bullet"
                    width={12}
                    height={12}
                    className="mr-2 w-[12px] h-[12px]"
                  /> */}
                  <div className="">
                    <h3 className="font-normal underline pb-2">{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row lg:pl-16 pl-8 pt-8 lg:max-w-[50%] max-w-none">
          <h2 className=" lg:[text-align-last:center]  [text-align-last:auto] lg:pr-0 pr-8">
            theme/ pages
          </h2>
          <div className="pages w-fit lg:mt-20 mt-8">
            <ul className="list-none lg:pb-0 pb-4">
              {textValues.map((value, index) => (
                <li className="flex items-center pb-2" key={index}>
                  <Image
                    src={"/COLOR CHANGER.png"}
                    alt="bullet"
                    width={12}
                    height={12}
                    className="mr-2 w-[12px] h-[12px]"
                  />
                  <span>{value}</span>
                </li>
              ))}
            </ul>

            {/* {product.metafield.map((mf, index) => (
              <>
                {mf != null && mf.key == "pages" ? (
                  <div key={index}>
                 {mf.value}
                  </div>
                ) : (
                  ""
                )}
              </>
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default function PDPProduct() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const url = new URL(process.env.URL || "http://localhost:3000");
      url.pathname = "/api/products";

      const res = await fetch(url.toString());

      if (!res.ok) {
        console.error(res);
        return;
      }

      const data = await res.json();

      console.log("DATA", data);

      const products = data.products.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        description: node.description,
        imageSrc: node.images.edges,
        imageAlt: node.title,
        price: node.variants.edges[0]?.node.priceV2.amount,
        slug: node.handle,
        variantId: node.variants.edges[0].node.id,
        options: node.options[0].values,
        optionsName: node.options[0].name,
        variant: node.variants.edges,
        metafield: node.metafields,
      }));

      console.log("THIS", products);

      const currentSlug = new URL(window.location.href).pathname.split(
        "/product/"
      )[1];
      const foundProduct = products.find(({ slug }) => slug === currentSlug);

      if (!foundProduct) {
        console.log("Product not found");
        return;
      }

      setProduct(foundProduct);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="breadcrumbs flex items-center mb-8">
        <Link href={"/shop"} className="pr-[.5rem]">
          <h4 className="border-b-solid border-b-[.9px] border-b-dark-cocoa">
            shop
          </h4>
        </Link>
        /
        {product && product.title && (
          <h4 className="current pl-[.5rem]">{product.title}</h4>
        )}
      </div>

      <div className="pdp w-screen overflow-x-clip justify-between items-start relative -ml-8 h-auto">
        {product ? <Product product={product} /> : <p>Loading...</p>}
      </div>
    </>
  );
}
