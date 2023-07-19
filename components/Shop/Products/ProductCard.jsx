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
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

  

    const defaultImage = product.imageSrc[0].node.src;
  const hoverImage = product.imageSrc[1].node.src;
    return (
      <>
        <div className="productCard lg:mb-0 mb-8 lg:w-[50vw] w-full">
          <Link href={`/shop/product/${product.slug}`}>
            <div
              className="relative w-full lg:h-[80vh] h-[450px] overflow-hidden"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              {product.imageSrc.map(
                (img, index) => (
                  console.log(img),
                  (
                    <Image
                    src={isHovering ? hoverImage : defaultImage}
                     alt={img.node.alt}
                      width={200}
                      height={200}
                      key={index}
                      className="w-full lg:h-[80vh] h-[450px] object-cover absolute top-0 left-0 transition-opacity duration-300 "
                      unoptimized
                    />
                  )
                )
              )}
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
