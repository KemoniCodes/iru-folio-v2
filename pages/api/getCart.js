import { postToShopify } from '../../components/utils/Shop/PostToShopify';

export default async function getCart(req, res) {

  function parseCartIdFromConsoleLog(log) {
    const targetString = 'iru-cart-id=';
    const startIndex = log.indexOf(targetString);
    if (startIndex !== -1) {
      const endIndex = log.indexOf(';', startIndex);
      let cartId = '';
      if (endIndex !== -1) {
        cartId = log.substring(startIndex, endIndex);
      } else {
        cartId = log.substring(startIndex);
      }
      const cartIdValue = cartId.split('=')[1];
      const decodedValue = decodeURIComponent(cartIdValue);

      return decodedValue.replace(/"/g, '');
    }
    return null;
  }

  const cookieString = JSON.stringify(req.headers.cookie);

  const cartId = parseCartIdFromConsoleLog(cookieString);

  const response = await postToShopify({
    query: `
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          createdAt
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
            totalTaxAmountEstimated
          }
          id
          lines(first: 10) {
            edges {
              cursor
              node {
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                  amountPerQuantity {
                    amount
                    currencyCode
                  }
                }
                id
                quantity
                ... on CartLine {
                  id
                  quantity
                  cost {
                    amountPerQuantity {
                      amount
                      currencyCode
                    }
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                  merchandise {
                    ... on ProductVariant {
                      id
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        id
                        handle
                        title
                      }
                    }
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    price {
                      amount
                      currencyCode
                    }
                    title
                    product {
                      id
                      handle
                      title
                    }
                  }
                }
              }
            }
          }
          totalQuantity
        }
      }
    `,
    variables: {
      cartId: cartId
    }
  });

  console.log('getCart:', response);

  res.json(response);
}




