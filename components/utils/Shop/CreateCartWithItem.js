import { postToShopify } from './PostToShopify';

export async function createCartWithItem({ itemId, quantity }) {

  try {
    const response = await postToShopify({
      query: `
          mutation createCart($cartInput: CartInput) {
            cartCreate(input: $cartInput) {
              cart {
                id
                createdAt
                updatedAt
                attributes {
                  key
                  value
                }
                checkoutUrl
                cost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalAmount {
                    amount
                    currencyCode
                  }
                  totalTaxAmount {
                    amount
                    currencyCode
                  }
                }
                lines(first:10) {
                  edges {
                    node {
                      id
                    }
                  }
                  nodes {
                    attributes {
                      key
                      value
                    }
                    cost {
                      amountPerQuantity {
                        amount
                        currencyCode
                      }
                      subtotalAmount {
                        amount
                        currencyCode
                      }
                      totalAmount {
                        amount
                        currencyCode
                      }
                    }
                    id
                    merchandise {
                      ... on ProductVariant {
                        id
                      }
                    }
                    quantity
                    ... on CartLine {
                      id
                      attributes {
                        key
                        value
                      }
                      quantity
                      merchandise {
                        ... on ProductVariant {
                          id
                        }
                      }
                    }
                  }
                }
                metafields(identifiers: {namespace: "", key: ""}) {
                  id
                  key
                  namespace
                  value
                }
                totalQuantity
                note              
              }
            }
              }
        `,
      variables: {
        cartInput: {
          lines: [
            {
              quantity: quantity,
              merchandiseId: itemId,
            },
          ],
        },
      },
    });

    console.log('createCartDAta:', response)

    return response;

  } catch (error) {
    console.log(error);
  }
};
