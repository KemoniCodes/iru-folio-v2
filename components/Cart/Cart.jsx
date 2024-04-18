import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
  const [cart, setCart] = useState({ id: null, lines: [] });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCart() {
      const cartId = window.localStorage.getItem("iru-cart-id");
      if (!cartId) {
        console.log("No cart ID found in local storage");
        return;
      }
      console.log('cartid',cartId)

      try {
        const response = await fetch(`/api/getCart?id=${cartId}`);
        const cartData = await response.json();
        console.log('cd',cartData)
        if (response.ok && cartData.cart != null) {
          setCart({
            id: cartData.cart.id,
            checkoutUrl: cartData.cart.checkoutUrl,
            subtotalAmount: cartData.cart.cost.subtotalAmount,
            totalAmount: cartData.cart.cost.totalAmount,
            lines: cartData.cart.lines.edges,
          });
        } else {
          console.error("Error fetching cart data:", cartData.message);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }

    getCart();
  }, []);

  let cost = Number(cart?.totalAmount?.amount) || 0;

  // function toggleCart() {
  //   setOpen(!open);
  // }

  function emptyCart() {
    setCart({});
    window.localStorage.removeItem("iru-cart-id");
  }

  async function removeLineItem(lineId, setLoading, setCart) {
    try {
      setLoading(true);

      setCart((prevCart) => ({
        ...prevCart,
        lines: prevCart.lines.filter(({ node }) => node.id !== lineId),
      }));

      const response = await fetch("/api/removeFromCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: cart.id,
          lineId: lineId,
        }),
      });

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });


  let check = cart?.checkoutUrl;
  if (check != undefined) {
  var newCheckoutUrl = check.replace(
    'https://iru-studios.com',
    'https://jewelry-theme-testing.myshopify.com'
    
  );
  }
  return (
    <div className="cart lg:h-screen h-full">
      {/* <button className="icon">
        <div className="count">{cart.lines.length}</div>
      </button> */}
      <div className={`drawer ${open ? "open" : ""}`}>
      {/* <button className="close">&times; close</button> */}
      <Link href={"/shop"}>
        <h4 className="border-b-solid border-b-[.9px] border-b-dark-cocoa w-fit">
          back to shop
        </h4>
      </Link>

      <h2 className="mt-8 mb-16 text-center">Your Cart</h2>
      {cart?.lines?.length ? (
        <>
        <div className="flex justify-between mb-4 border-b-solid border-b-[1px] border-b-dark-cocoa pb-4">
      <h3><i>{cart.lines.length === 1 ? cart.lines.length + ' '+"item" : cart.lines.length +' '+ "items"}</i></h3>
      <button className="empty-cart h4 !font-normal border-b-solid border-b-[1px] border-b-dark-cocoa" onClick={emptyCart}>
            empty cart
          </button>
        </div>
        {console.log(cart.lines)}
        
          <ul>
            {cart.lines.map(({ node: item }) => (
              <li key={item.id} className="lg:flex block justify-between items-center mb-4 border-b-solid border-b-[1px] border-b-dark-cocoa pb-4">
                {loading && item.loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                  <Link className="contents" href={`/shop/product/${item.merchandise?.product?.handle}`}>
                  <Image src={item.merchandise.image.src} width={100} height={100} alt={item.merchandise?.product?.title} className="w-[150px] h-[150px] object-cover" unoptimized/>
                    <p className="lg:w-[30%] w-full pt-4 pb-2">
                      {item.quantity} &times; {item.merchandise?.product?.title}
                    </p>
                    <p>${Math.floor(item.cost.amountPerQuantity.amount)}</p>
                    </Link>
                    
                    <button
                      onClick={() =>
                        removeLineItem(item.id, setLoading, setCart)
                      }

                      className="float-right lg:float-none relative lg:bottom-0 bottom-[10rem]"
                    >
                      &times;
                    </button>
                  </>
                )}
              </li>
            ))}
            <li className="total text-right mt-6">
              <p>Total: {cost === 0 ? "FREE" : `$${cost}`}</p>
            </li>
          </ul>
          {console.log('checkout',cart?.checkoutUrl)}
          <a className="h4 mt-4 p-4 button float-right border-solid border-[1px] border-dark-cocoa bg-dark-cocoa !text-light-creme lg:w-[15%] w-full text-center" href={cart?.checkoutUrl}>
            Check Out
          </a>
        </>
      ) : (
        <p className="no-items text-center">your cart is empty</p>
      )}
      </div>
    </div>
  );
}
