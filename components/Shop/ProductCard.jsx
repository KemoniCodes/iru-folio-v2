import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  console.log("PRODIES:", product);
  const { id, title, description, imageSrc, imageAlt, price, slug } = product;
  return (
    <>
      <div className="productCard">
        <Image src={imageSrc} alt="alttext" width={200} height={200} />
        <h4>{title}</h4>
        <h4>{price}</h4>
      </div>
    </>
  );
}
