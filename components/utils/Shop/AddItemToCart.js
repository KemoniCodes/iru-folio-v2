import { postToShopify } from './PostToShopify'

export async function addItemToCart({ cartId, itemId, quantity }) {
  const response = postToShopify({
    query: `
          mutation addItemToCart($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
              cart {
                id
              }
            }
          }
        `,
    variables: {
      cartId,
      lines: [
        {
          merchandiseId: itemId,
          quantity,
        },
      ],
    },
  });

  console.log('AddItemToCartdata:', response)

  return response;
}