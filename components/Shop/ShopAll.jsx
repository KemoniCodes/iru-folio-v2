import { useState, useEffect } from "react";
import ProductCard from "./Products/ProductCard";

export default function ShopAll() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL(
          process.env.SHOPIFY_STORE_DOMAIN || "http://localhost:3000"
        );
        url.pathname = "/api/products";
        const res = await fetch(url.href);
        const data = await res.json();

        const products = data.products.edges.map(({ node }) => {
          if (node.totalInventory <= 0) {
            return false;
          }

          return {
            id: node.id,
            title: node.title,
            description: node.description,
            imageSrc: node.images.edges[0].node.src,
            imageAlt: node.title,
            price: node.variants.edges[0].node.priceV2.amount,
            slug: node.handle,
            variantId: node.variants.edges[0].node.id,
          };
        });
        // .filter(Boolean);

        setProducts(products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="ShopAll">
        <div className="products">
          {products ? (
            products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
