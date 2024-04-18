import { useState, useEffect } from "react";
import ProductCard from "./Products/ProductCard";

export default function ShopAll() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL(
          process.env.SHOPIFY_STORE_DOMAIN ||
             "http://localhost:3000" ||
             "https://iru-studios.com"
        );
        url.pathname = "/api/products";
        const res = await fetch(url.href);
        const data = await res.json();
        console.log('DATA',data)

        const products = data.products.edges.map(({ node }) => {
          if (node.totalInventory <= 0) {
            return false;
          }

          return {
            id: node.id,
            title: node.title,
            description: node.description,
            imageSrc: node.images.edges,
            imageAlt: node.title,
            price: node.variants.edges[0].node.priceV2.amount,
            slug: node.handle,
            variantId: node.variants.edges[0].node.id,
            
          };
          
        });
        setProducts(products);

        // .filter(Boolean);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log(products)
  return (
    <>
      <div className="ShopAll mt-28 h-screen lg:mb-0 mb-80">
        <div className="products lg:flex block gap-6 justify-center">
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
