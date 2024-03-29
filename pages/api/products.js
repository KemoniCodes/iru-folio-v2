import { postToShopify } from '../../components/utils/Shop/PostToShopify';

export default async function getProducts(_req, res) {
  const data = await postToShopify({
    query: `
      query getProductList {
        products(sortKey: PRICE, first: 100) {
          edges {
            node {
              id
              handle
              description
              title
              totalInventory
              variants(first: 5) {
                edges {
                  node {
                    id
                    title
                    quantityAvailable
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 10) {
                edges {
                  node {
                    src
                    altText
                  }
                }
              }
              options(first: 5) {
                id
                name
                values
              }
              metafields( identifiers: [ {namespace: "custom", key: "demostorepassword"}, 
              {namespace: "custom", key: "demostore"}, {namespace: "custom", key: "keyfeatures"}, {namespace: "custom", key: "pages"},{namespace: "custom", key: "faq"}, ]) {
                id
                key
                value
              }
            }
          }
        }
      }
    `,
    variables: {},
  });

  console.log('Productdata:', data);

  res.status(200).json(data);
}
