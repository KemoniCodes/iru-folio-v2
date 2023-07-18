import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, useInView } from "framer-motion";

import { Box, IconButton } from "@chakra-ui/react";
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

  return (
    <>
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
        className="productImg pb-14 -ml-8 
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
      relativepl-8 pt-12"
      >
        <div className="lg:sticky relative">
          <a href={`/product/${product.slug}`}></a>
          <h2>{product.title}</h2>
          <h3 className="my-12 text-[2.5rem]">
            {formattedPrice.format(selectedOption.price)}
          </h3>

          <div className="productOptions mb-8">
            <h3 className="mt-8 mb-2">{product.optionsName}</h3>
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
                {mf.key == "demostorepassword" ? (
                  <p>
                    password:
                    <span className="!normal-case pl-2">{mf.value}</span>
                  </p>
                ) : (
                  ""
                )}
                {mf.key == "demostore" ? (
                  <p>
                    demo store:
                    <span className="!normal-case pl-2 italic">
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
              className="h4 hover:border-solid hover:border-[1px] hover:border-dark-cocoa 
              hover:!text-dark-cocoa hover:bg-transparent bg-dark-cocoa !text-light-creme !font-normal p-[.8rem] w-full"
            >
              {isInCart ? <>Already in Cart</> : <>Add To Cart</>}
            </button>
          </form>
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
      <div className="pdp lg:flex block w-full justify-between items-start relative">
        {product ? <Product product={product} /> : <p>Loading...</p>}
      </div>
    </>
  );
}
