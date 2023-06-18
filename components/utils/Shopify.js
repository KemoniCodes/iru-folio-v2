import { default as fetch } from 'node-fetch';

export const postToShopify = async ({ query, variables = {} }) => {
  try {
    const response = await fetch(process.env.SHOPIFY_STORE_DOMAIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }


    const result = await response.json();


    if (result.errors) {
      console.log({ errors: result.errors });
    } else if (!result || !result.data) {
      console.log({ result });
      return 'No results found.';
    }

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

