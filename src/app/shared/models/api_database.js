i try to create some admin api to learn how shopify works

const axios = require('axios');

const SHOPIFY_DOMAIN = 'your-store-name.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'shpat_YOUR_PRIVATE_APP_TOKEN'; 
const SHOPIFY_API_VERSION = '2023-10'; 

async function getShopifyProducts() {
    const url = https://${SHOPIFY_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/products.json;

    try {
        console.log(Attempting to fetch data from: ${url});
        
        const response = await axios.get(url, { 
            headers: {
                
                'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
                'Content-Type': 'application/json',
            }
        });

        const products = response.data.products;
        
        console.log('--- Successfully Fetched Products ---');
        console.log(Total Products Found: ${products.length});
        
        if (products.length > 0) {
            console.log('\nDetails of the first product:');
            console.log(ID: ${products[0].id});
            console.log(Title: ${products[0].title});
            console.log(Variants Count: ${products[0].variants.length});
        }
        
        return products;

    } catch (error) {
        console.error('--- Shopify API Error ---');
        if (error.response) {
            console.error(Status: ${error.response.status} - ${error.response.statusText});
            console.error('API Response Data:', error.response.data);
        } else {
            console.error('Network or Request Error:', error.message);
        }
    }
}

getShopifyProducts();i try to create some admin api to learn how shopify works

const axios = require('axios');

const SHOPIFY_DOMAIN = 'your-store-name.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'shpat_YOUR_PRIVATE_APP_TOKEN'; 
const SHOPIFY_API_VERSION = '2023-10'; 

async function getShopifyProducts() {
    const url = https://${SHOPIFY_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/products.json;

    try {
        console.log(Attempting to fetch data from: ${url});
        
        const response = await axios.get(url, { 
            headers: {
                
                'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
                'Content-Type': 'application/json',
            }
        });

        const products = response.data.products;
        
        console.log('--- Successfully Fetched Products ---');
        console.log(Total Products Found: ${products.length});
        
        if (products.length > 0) {
            console.log('\nDetails of the first product:');
            console.log(ID: ${products[0].id});
            console.log(Title: ${products[0].title});
            console.log(Variants Count: ${products[0].variants.length});
        }
        
        return products;

    } catch (error) {
        console.error('--- Shopify API Error ---');
        if (error.response) {
            console.error(Status: ${error.response.status} - ${error.response.statusText});
            console.error('API Response Data:', error.response.data);
        } else {
            console.error('Network or Request Error:', error.message);
        }
    }
}

getShopifyProducts();i try to create some admin api to learn how shopify works

const axios = require('axios');

const SHOPIFY_DOMAIN = 'your-store-name.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'shpat_YOUR_PRIVATE_APP_TOKEN'; 
const SHOPIFY_API_VERSION = '2023-10'; 

async function getShopifyProducts() {
    const url = https://${SHOPIFY_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/products.json;

    try {
        console.log(Attempting to fetch data from: ${url});
        
        const response = await axios.get(url, { 
            headers: {
                
                'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
                'Content-Type': 'application/json',
            }
        });

        const products = response.data.products;
        
        console.log('--- Successfully Fetched Products ---');
        console.log(Total Products Found: ${products.length});
        
        if (products.length > 0) {
            console.log('\nDetails of the first product:');
            console.log(ID: ${products[0].id});
            console.log(Title: ${products[0].title});
            console.log(Variants Count: ${products[0].variants.length});
        }
        
        return products;

    } catch (error) {
        console.error('--- Shopify API Error ---');
        if (error.response) {
            console.error(Status: ${error.response.status} - ${error.response.statusText});
            console.error('API Response Data:', error.response.data);
        } else {
            console.error('Network or Request Error:', error.message);
        }
    }
}

getShopifyProducts();