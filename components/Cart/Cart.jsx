import { useEffect, useState } from "react";
import Link from "next/link";

export default function Cart() {
  const [cart, setCart] = useState({ id: null, lines: [] });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function getCart() {
      let localCartData = window.localStorage.getItem("iru-cart-id");
      if (localCartData != null) {
        const existingCart = await fetch(`/api/getCart`).then((res) =>
          res.json()
        );

        console.log("existingCartC:", existingCart);

        setCart({
          id: existingCart.cart.id,
          checkoutUrl: existingCart.cart.checkoutUrl,
          subtotalAmount: existingCart.cart.cost.subtotalAmount,
          totalAmount: existingCart.cart.cost.totalAmount,
          lines: existingCart.cart.lines.edges,
        });

        return;
      }
      // setCart({
      //   id: localCartData.cartId,
      //   checkoutUrl: localCartData.checkoutUrl,
      //   estimatedCost: null,
      //   lines: [],
      // });

      // window.localStorage.setItem(
      //   'jamstackconf:shopify:cart',
      //   JSON.stringify(localCartData),
      // );
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

  async function removeLineItem(lineId) {
    try {
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
    }
  }

  return (
    <div className="cart h-screen">
      {/* <button className="icon">
        <div className="count">{cart.lines.length}</div>
      </button> */}
      <div className={`drawer ${open ? "open" : ""}`}>
        <button className="close">&times; close</button>
        <Link href={"/shop"}>
          <h4>back to shop</h4>
        </Link>

        <h3>Your Cart</h3>
        {console.log(cart.lines)}
        {cart?.lines?.length ? (
          <>
            <button className="empty-cart" onClick={emptyCart}>
              empty cart
            </button>
            <ul>
              {cart.lines.map(({ node: item }) => (
                <li key={item.id}>
                  <p>
                    {item.quantity} &times; {item.merchandise?.product?.title}
                  </p>
                  <button onClick={() => removeLineItem(item.id)}>x</button>
                </li>
              ))}
              <li className="total">
                <p>Total: {cost === 0 ? "FREE" : `$${cost}`}</p>
              </li>
            </ul>
            <a className="button" href={`${cart?.checkoutUrl}`}>
              Check Out
            </a>
          </>
        ) : (
          <p className="no-items">your cart is empty</p>
        )}
      </div>
    </div>
  );
}
