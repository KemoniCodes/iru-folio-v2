// import { serialize } from 'cookie';
// import { createCartWithItem } from '../../components/utils/Shop/CreateCartWithItem';
// import { addItemToCart } from '../../components/utils/Shop/AddItemToCart';

// export default async function addToCart(req, res) {
//   console.log('hello?');
//   const {
//     itemId,
//     quantity: quantityStr,
//     cartId,
//   } = req.body || {};

//   console.log('headers:', JSON.parse(req.body));

//   const quantity = Number(quantityStr);
//   const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Content-Type': 'application/json; charset=utf8',
//   };

//   let cart;
//   // console.log(window.localStorage.getItem('iru-cart-id'))
//   if (cartId) {
//     const response = await addItemToCart({
//       cartId,
//       itemId,
//       quantity,
//     });

//     console.log('itemId:', itemId);

//     console.log('response1:', response);

//     cart = response.cartLinesAdd.cart;
//   } else {
//     const response = await createCartWithItem({
//       itemId,
//       quantity,
//     });

//     cart = response.cartCreate.cart;
//     console.log('response2:', response);

//     const cartCookie = serialize('iru-cart-id', cart.id, {
//       secure: true,
//       sameSite: 'none',
//       path: '/',
//       maxAge: 1000 * 60 * 60 * 24 * 14,
//     });

//     headers['Set-Cookie'] = cartCookie;
//   }

//   res.writeHead(200, headers);
//   res.end(JSON.stringify(cart));
// }
