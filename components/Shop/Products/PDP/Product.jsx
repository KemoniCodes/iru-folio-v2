import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, useInView } from "framer-motion";

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
    imageSrc: node.images.edges[0]?.node.src,
    imageAlt: node.title,
    price: node.variants.edges[0]?.node.priceV2.amount,
    slug: node.handle,
    variantId: node.variants.edges[0].node.id,
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

function Product({ product }) {
  const [cart, setCart] = useState({});
  const [isInCart, setIsInCart] = useState(false);

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

    if (cartData.cart.lines.edges.length > 0 ) {
      setCart(cartData);

      const foundProduct = cartData.cart.lines.edges.find(
        (line) => line.node.merchandise.id === product.variantId
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

  useEffect(() => {
    loadCart();
  }, []);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <>
     <div className="productImg pb-14 w-1/2 h-screen overflow-y-scroll relative">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          width={400}
          height={400}
          className="w-full"
        />
      </div>

      {/* <motion.div ref={ref} className=""> */}
      <div className="productInfo text-left w-1/2 sticky top-0 h-screen overflow-y-auto pl-8 pt-12">
      <div className="lg:sticky relative">
            <a href={`/product/${product.slug}`}></a>
            <h2>{product.title}</h2>
            <p className="mt-16">{formattedPrice.format(product.price)}</p>
            <p>{product.description}</p>

            <form onSubmit={handleAddToCart}>
              <input type="hidden" name="productId" value={product.variantId} />
              <input type="hidden" name="quantity" value={1} />
              <button disabled={isInCart}>
                {isInCart ? (
                  <>
                    Already in Cart{" "}
                    <span className="visually-hidden">{product.title}</span>
                  </>
                ) : (
                  <>
                    Add <span className="visually-hidden">{product.title}</span>{" "}
                    To Cart
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      {/* </motion.div> */}
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

      const products = data.products.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        description: node.description,
        imageSrc: node.images.edges[0]?.node.src,
        imageAlt: node.title,
        price: node.variants.edges[0]?.node.priceV2.amount,
        slug: node.handle,
        variantId: node.variants.edges[0].node.id,
      }));

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
      <div className="pdp lg:flex block w-screen">
        {product ? <Product product={product} /> : <p>Loading...</p>}
      </div>
    </>
  );
}
