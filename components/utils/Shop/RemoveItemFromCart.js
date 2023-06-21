import { postToShopify } from './PostToShopify'

export async function removeItemFromCart({ cartId, lineId }) {
  try {
    const response = await postToShopify({
      query: `
            mutation removeItemFromCart($cartId: ID!, $lineIds: [ID!]!) {
              cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
                cart {
                  id
                  lines(first: 10) {
                    edges {
                      node {
                        id
                        quantity
                        merchandise {
                          ... on ProductVariant {
                            id
                            title
                            priceV2 {
                              amount
                              currencyCode
                            }
                            product {
                              title
                              handle
                            }
                          }
                        }
                      }
                    }
                  }
                  estimatedCost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                    subtotalAmount {
                      amount
                      currencyCode
                    }
                    totalTaxAmount {
                      amount
                      currencyCode
                    }
                    totalDutyAmount {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          `,
      variables: {
        cartId,
        lineIds: [lineId],
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }

  console.log('RemoveItemToCartdata:', response)

  return response;
}