// // export default function Cart() {
// //     return (
// //         <>
// //         <h1>cart</h1>

// //         </>
// //     )
// // }
// import { useState, useEffect } from "react";

// export default function Cart() {
//   const [cart, setCart] = useState({});

//   async function loadCart() {
//     const cartId = window.localStorage.getItem("iru-cart-id");

//     if (!cartId) {
//       console.log("no cart");
//       setCart({});
//       return;
//     }

//     const cartData = await fetch(`${window.location.origin}/api/cart`, {
//       method: "POST",
//       body: JSON.stringify({ cartId }),
//     }).then((res) => res.json());

//     if (cartData.lines) {
//       setCart(cartData);
//     }
//   }

//   useEffect(() => {
//     loadCart();
//   }, []);
//   return (
//     <>
//       {console.log(cart)}
//       <h1>cart</h1>;
//     </>
//   );

//   //   if (!cart) {
//   //     return <p className="empty">loading...</p>;
//   //   }

//   //   if (cart && !cart.lines) {
//   //     return (
//   //       <p className="empty">
//   //         your cart is empty! maybe boop it with a sticker or two?
//   //       </p>
//   //     );
//   //   }

//   //   if (cart && cart.lines.length > 0) {
//   //     return (
//   //       <>
//   //         <ul className="cart-items">
//   //           {cart.lines.map((item) => {
//   //             const cartItem = item.merchandise;

//   //             return (
//   //               <li key={item.id}>
//   //                 <p className="cart-item-details">
//   //                   <span className="cart-item-name">
//   //                     {cartItem.product.title}
//   //                   </span>
//   //                   <span className="cart-item-subtotal">
//   //                     {format(cartItem, item.quantity)}
//   //                   </span>
//   //                 </p>
//   //                 <p className="cart-item-quantity">
//   //                   <span className="cart-item-count">Qty. {item.quantity}</span>
//   //                   <span className="cart-item-unit-price">
//   //                     {format(cartItem)} each
//   //                   </span>
//   //                 </p>
//   //               </li>
//   //             );
//   //           })}
//   //         </ul>
//   //         <p className="subtotal">
//   //           {format({
//   //             priceV2: cart.estimatedCost.totalAmount,
//   //           })}
//   //         </p>
//   //         {cart.id && (
//   //           <form action="/api/v2/store/create-checkout" method="POST">
//   //             <input type="hidden" name="cartId" value={cart.id} />
//   //             <button>Check Out</button>
//   //           </form>
//   //         )}
//   //         <p className="empty-cart">
//   //           <button onClick={emptyCart}>empty cart</button>
//   //         </p>
//   //       </>
//   //     );
//   //   }
// }

import { useEffect, useState } from "react";

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

  return (
    <div className="cart h-screen">
      {/* <button className="icon">
        <div className="count">{cart.lines.length}</div>
      </button> */}
      <div className={`drawer ${open ? "open" : ""}`}>
        <button className="close">&times; close</button>

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
