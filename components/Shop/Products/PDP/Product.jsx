import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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

    if (cartData.lines) {
      setCart(cartData);
    }
  }

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
    // router.push("/cart");
  }

  useEffect(() => {
    loadCart();
  }, []);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="">
      <a href={`/product/${product.slug}`}>
        {/* <Image src={product.imageSrc} alt={product.imageAlt} width={400} height={400} /> */}
      </a>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p className={""}>{formattedPrice.format(product.price)}</p>
      <form onSubmit={handleAddToCart}>
        <input type="hidden" name="productId" value={product.variantId} />
        <input type="hidden" name="quantity" value={1} />
        <button>
          Add <span className="visually-hidden">{product.title}</span>
          To Cart
        </button>
      </form>
    </div>
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
    <div className={""}>
      <main className={""}>
        <div className={""}>
          {product ? <Product product={product} /> : <p>Loading...</p>}
        </div>
      </main>
    </div>
  );
}
