import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  console.log("PRODIES:", product);
  const { id, title, description, imageSrc, imageAlt, price, slug, variantId } =
    product;
  // const [cart, setCart] = useState({});

  // const router = useRouter();

  // async function loadCart() {
  //   const cartId = window.localStorage.getItem("iru-cart-id");
  //   console.log("cartId:", cartId);

  //   if (!cartId) {
  //     console.log("no cart");
  //     setCart({});
  //     return;
  //   }

  //   const cartData = await fetch(`${window.location.origin}/api/getCart`, {
  //     method: "GET",
  //   }).then((res) => res.json());

  //   if (cartData.lines) {
  //     setCart(cartData);
  //   }
  // }

  // async function handleAddToCart(event) {
  //   event.preventDefault();

  //   const cartId = window.localStorage.getItem("iru-cart-id");

  //   const form = new FormData(event.target);

  //   const response = await fetch(`${window.location.origin}/api/addToCart`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       cartId: cartId || "",
  //       itemId: form.get("productId"),
  //       quantity: parseInt(form.get("quantity")),
  //     }),
  //   });

  //   const cart = await response.json();
  //   window.localStorage.setItem("iru-cart-id", cart.id);

  //   setCart(cart);
  // }

  // useEffect(() => {
  //   loadCart();
  // }, []);

  function Card({ product }) {
    console.log(product)
    return (
      <>
        <div className="productCard lg:mb-0 mb-8 w-[50vw]">
          <Link href={`/shop/product/${product.slug}`}>
            <div className="img-container">
              <Image
                className="w-full lg:h-[80vh] h-[450px] object-cover"
                src={imageSrc}
                alt="alttext"
                width={200}
                height={200}
                unoptimized
              />
            </div>
            <div className="product-deets flex justify-between mt-2">
              <h3>{title}</h3>
              <h3 className="font-thin">
                <i>${Math.floor(price)}</i>
              </h3>
            </div>
          </Link>
          {/* 
          <form onSubmit={handleAddToCart}>
            <input type="hidden" name="productId" value={variantId} />
            <input type="hidden" name="quantity" value={1} />
            <button>
              Add <span className="visually-hidden">{title}</span>
              To Cart
            </button>
          </form> */}
        </div>
      </>
    );
  }

  return (
    <>
      <Card product={product} />
    </>
  );
}
