const { runAllocationLogic } = require('./allocationLogic'); 

const UNINAME = 'your_uniware_tenant_name';
const UNIFACILITY = 'your_facility_code';
const UNI_AUTH_TOKEN = 'YOUR_UNIWARE_ACCESS_TOKEN'; 


const SHOPIFY_DOMAIN = 'your-store-name.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'shpat_YOUR_PRIVATE_APP_TOKEN';
const SHOPIFY_API_VERSION = '2023-10'; 

const ORDER_TARGET_LOTS = 4;
const UNITS_PER_LOT = 30;
const REQUIRED_UNITS_TOTAL = ORDER_TARGET_LOTS * UNITS_PER_LOT; // 120

const PRODUCT_SKUS = ['RedCase', 'BlueCase', 'GreenCase', 'BlackCase'];


async function getUniwareInventory(skus) {
    console.log('--- Step 1: Fetching Inventory ---');
    const mockInventory = [
        { sku: 'RedCase', available: 100 },
        { sku: 'BlueCase', available: 50 },
        { sku: 'GreenCase', available: 30 },
        { sku: 'BlackCase', available: 10 },
        { sku: 'YellowCase', available: 500 }, 
    ];

    const inventoryData = mockInventory.filter(item => skus.includes(item.sku));
    
    inventoryData.sort((a, b) => b.available - a.available);
    
    console.log('Available & Sorted Inventory:', inventoryData);
    return inventoryData;
}

async function updateShopifyFulfillment(allocationResult) {
    console.log('\n--- Step 3: Updating Fulfillment System (MOCK) ---');
    
    if (allocationResult.fulfilled) {
        console.log(SUCCESS! Total Units Allocated: ${allocationResult.totalAllocated});
        console.log('Details to be sent to Shopify/Uniware for fulfillment:', allocationResult.details);
        
    } else {
        console.log(FAILURE: Could not fulfill lot order. Shortfall: ${REQUIRED_UNITS_TOTAL - allocationResult.totalAllocated} units.);
    }
}

async function processLotOrder() {
    const inventory = await getUniwareInventory(PRODUCT_SKUS);

    const allocationResult = runAllocationLogic(inventory, REQUIRED_UNITS_TOTAL);
    
    await updateShopifyFulfillment(allocationResult);
}

processLotOrder();const { runAllocationLogic } = require('./allocationLogic'); 

const UNINAME = 'your_uniware_tenant_name';
const UNIFACILITY = 'your_facility_code';
const UNI_AUTH_TOKEN = 'YOUR_UNIWARE_ACCESS_TOKEN'; 


const SHOPIFY_DOMAIN = 'your-store-name.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'shpat_YOUR_PRIVATE_APP_TOKEN';
const SHOPIFY_API_VERSION = '2023-10'; 

const ORDER_TARGET_LOTS = 4;
const UNITS_PER_LOT = 30;
const REQUIRED_UNITS_TOTAL = ORDER_TARGET_LOTS * UNITS_PER_LOT; // 120

const PRODUCT_SKUS = ['RedCase', 'BlueCase', 'GreenCase', 'BlackCase'];


async function getUniwareInventory(skus) {
    console.log('--- Step 1: Fetching Inventory ---');
    const mockInventory = [
        { sku: 'RedCase', available: 100 },
        { sku: 'BlueCase', available: 50 },
        { sku: 'GreenCase', available: 30 },
        { sku: 'BlackCase', available: 10 },
        { sku: 'YellowCase', available: 500 }, 
    ];

    const inventoryData = mockInventory.filter(item => skus.includes(item.sku));
    
    inventoryData.sort((a, b) => b.available - a.available);
    
    console.log('Available & Sorted Inventory:', inventoryData);
    return inventoryData;
}

async function updateShopifyFulfillment(allocationResult) {
    console.log('\n--- Step 3: Updating Fulfillment System (MOCK) ---');
    
    if (allocationResult.fulfilled) {
        console.log(SUCCESS! Total Units Allocated: ${allocationResult.totalAllocated});
        console.log('Details to be sent to Shopify/Uniware for fulfillment:', allocationResult.details);
        
    } else {
        console.log(FAILURE: Could not fulfill lot order. Shortfall: ${REQUIRED_UNITS_TOTAL - allocationResult.totalAllocated} units.);
    }
}

async function processLotOrder() {
    const inventory = await getUniwareInventory(PRODUCT_SKUS);

    const allocationResult = runAllocationLogic(inventory, REQUIRED_UNITS_TOTAL);
    
    await updateShopifyFulfillment(allocationResult);
}

processLotOrder();const { runAllocationLogic } = require('./allocationLogic'); 

const UNINAME = 'your_uniware_tenant_name';
const UNIFACILITY = 'your_facility_code';
const UNI_AUTH_TOKEN = 'YOUR_UNIWARE_ACCESS_TOKEN'; 


const SHOPIFY_DOMAIN = 'your-store-name.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'shpat_YOUR_PRIVATE_APP_TOKEN';
const SHOPIFY_API_VERSION = '2023-10'; 

const ORDER_TARGET_LOTS = 4;
const UNITS_PER_LOT = 30;
const REQUIRED_UNITS_TOTAL = ORDER_TARGET_LOTS * UNITS_PER_LOT; // 120

const PRODUCT_SKUS = ['RedCase', 'BlueCase', 'GreenCase', 'BlackCase'];


async function getUniwareInventory(skus) {
    console.log('--- Step 1: Fetching Inventory ---');
    const mockInventory = [
        { sku: 'RedCase', available: 100 },
        { sku: 'BlueCase', available: 50 },
        { sku: 'GreenCase', available: 30 },
        { sku: 'BlackCase', available: 10 },
        { sku: 'YellowCase', available: 500 }, 
    ];

    const inventoryData = mockInventory.filter(item => skus.includes(item.sku));
    
    inventoryData.sort((a, b) => b.available - a.available);
    
    console.log('Available & Sorted Inventory:', inventoryData);
    return inventoryData;
}

async function updateShopifyFulfillment(allocationResult) {
    console.log('\n--- Step 3: Updating Fulfillment System (MOCK) ---');
    
    if (allocationResult.fulfilled) {
        console.log(SUCCESS! Total Units Allocated: ${allocationResult.totalAllocated});
        console.log('Details to be sent to Shopify/Uniware for fulfillment:', allocationResult.details);
        
    } else {
        console.log(FAILURE: Could not fulfill lot order. Shortfall: ${REQUIRED_UNITS_TOTAL - allocationResult.totalAllocated} units.);
    }
}

async function processLotOrder() {
    const inventory = await getUniwareInventory(PRODUCT_SKUS);

    const allocationResult = runAllocationLogic(inventory, REQUIRED_UNITS_TOTAL);
    
    await updateShopifyFulfillment(allocationResult);
}

processLotOrder();const { runAllocationLogic } = require('./allocationLogic'); 

const UNINAME = 'your_uniware_tenant_name';
const UNIFACILITY = 'your_facility_code';
const UNI_AUTH_TOKEN = 'YOUR_UNIWARE_ACCESS_TOKEN'; 


const SHOPIFY_DOMAIN = 'your-store-name.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'shpat_YOUR_PRIVATE_APP_TOKEN';
const SHOPIFY_API_VERSION = '2023-10'; 

const ORDER_TARGET_LOTS = 4;
const UNITS_PER_LOT = 30;
const REQUIRED_UNITS_TOTAL = ORDER_TARGET_LOTS * UNITS_PER_LOT; // 120

const PRODUCT_SKUS = ['RedCase', 'BlueCase', 'GreenCase', 'BlackCase'];


async function getUniwareInventory(skus) {
    console.log('--- Step 1: Fetching Inventory ---');
    const mockInventory = [
        { sku: 'RedCase', available: 100 },
        { sku: 'BlueCase', available: 50 },
        { sku: 'GreenCase', available: 30 },
        { sku: 'BlackCase', available: 10 },
        { sku: 'YellowCase', available: 500 }, 
    ];

    const inventoryData = mockInventory.filter(item => skus.includes(item.sku));
    
    inventoryData.sort((a, b) => b.available - a.available);
    
    console.log('Available & Sorted Inventory:', inventoryData);
    return inventoryData;
}

async function updateShopifyFulfillment(allocationResult) {
    console.log('\n--- Step 3: Updating Fulfillment System (MOCK) ---');
    
    if (allocationResult.fulfilled) {
        console.log(SUCCESS! Total Units Allocated: ${allocationResult.totalAllocated});
        console.log('Details to be sent to Shopify/Uniware for fulfillment:', allocationResult.details);
        
    } else {
        console.log(FAILURE: Could not fulfill lot order. Shortfall: ${REQUIRED_UNITS_TOTAL - allocationResult.totalAllocated} units.);
    }
}

async function processLotOrder() {
    const inventory = await getUniwareInventory(PRODUCT_SKUS);

    const allocationResult = runAllocationLogic(inventory, REQUIRED_UNITS_TOTAL);
    
    await updateShopifyFulfillment(allocationResult);
}

processLotOrder();const { runAllocationLogic } = require('./allocationLogic'); 

const UNINAME = 'your_uniware_tenant_name';
const UNIFACILITY = 'your_facility_code';
const UNI_AUTH_TOKEN = 'YOUR_UNIWARE_ACCESS_TOKEN'; 


const SHOPIFY_DOMAIN = 'your-store-name.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'shpat_YOUR_PRIVATE_APP_TOKEN';
const SHOPIFY_API_VERSION = '2023-10'; 

const ORDER_TARGET_LOTS = 4;
const UNITS_PER_LOT = 30;
const REQUIRED_UNITS_TOTAL = ORDER_TARGET_LOTS * UNITS_PER_LOT; // 120

const PRODUCT_SKUS = ['RedCase', 'BlueCase', 'GreenCase', 'BlackCase'];


async function getUniwareInventory(skus) {
    console.log('--- Step 1: Fetching Inventory ---');
    const mockInventory = [
        { sku: 'RedCase', available: 100 },
        { sku: 'BlueCase', available: 50 },
        { sku: 'GreenCase', available: 30 },
        { sku: 'BlackCase', available: 10 },
        { sku: 'YellowCase', available: 500 }, 
    ];

    const inventoryData = mockInventory.filter(item => skus.includes(item.sku));
    
    inventoryData.sort((a, b) => b.available - a.available);
    
    console.log('Available & Sorted Inventory:', inventoryData);
    return inventoryData;
}

async function updateShopifyFulfillment(allocationResult) {
    console.log('\n--- Step 3: Updating Fulfillment System (MOCK) ---');
    
    if (allocationResult.fulfilled) {
        console.log(SUCCESS! Total Units Allocated: ${allocationResult.totalAllocated});
        console.log('Details to be sent to Shopify/Uniware for fulfillment:', allocationResult.details);
        
    } else {
        console.log(FAILURE: Could not fulfill lot order. Shortfall: ${REQUIRED_UNITS_TOTAL - allocationResult.totalAllocated} units.);
    }
}

async function processLotOrder() {
    const inventory = await getUniwareInventory(PRODUCT_SKUS);

    const allocationResult = runAllocationLogic(inventory, REQUIRED_UNITS_TOTAL);
    
    await updateShopifyFulfillment(allocationResult);
}

processLotOrder();const { runAllocationLogic } = require('./allocationLogic'); 

const UNINAME = 'your_uniware_tenant_name';
const UNIFACILITY = 'your_facility_code';
const UNI_AUTH_TOKEN = 'YOUR_UNIWARE_ACCESS_TOKEN'; 


const SHOPIFY_DOMAIN = 'your-store-name.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'shpat_YOUR_PRIVATE_APP_TOKEN';
const SHOPIFY_API_VERSION = '2023-10'; 

const ORDER_TARGET_LOTS = 4;
const UNITS_PER_LOT = 30;
const REQUIRED_UNITS_TOTAL = ORDER_TARGET_LOTS * UNITS_PER_LOT; // 120

const PRODUCT_SKUS = ['RedCase', 'BlueCase', 'GreenCase', 'BlackCase'];


async function getUniwareInventory(skus) {
    console.log('--- Step 1: Fetching Inventory ---');
    const mockInventory = [
        { sku: 'RedCase', available: 100 },
        { sku: 'BlueCase', available: 50 },
        { sku: 'GreenCase', available: 30 },
        { sku: 'BlackCase', available: 10 },
        { sku: 'YellowCase', available: 500 }, 
    ];

    const inventoryData = mockInventory.filter(item => skus.includes(item.sku));
    
    inventoryData.sort((a, b) => b.available - a.available);
    
    console.log('Available & Sorted Inventory:', inventoryData);
    return inventoryData;
}

async function updateShopifyFulfillment(allocationResult) {
    console.log('\n--- Step 3: Updating Fulfillment System (MOCK) ---');
    
    if (allocationResult.fulfilled) {
        console.log(SUCCESS! Total Units Allocated: ${allocationResult.totalAllocated});
        console.log('Details to be sent to Shopify/Uniware for fulfillment:', allocationResult.details);
        
    } else {
        console.log(FAILURE: Could not fulfill lot order. Shortfall: ${REQUIRED_UNITS_TOTAL - allocationResult.totalAllocated} units.);
    }
}

async function processLotOrder() {
    const inventory = await getUniwareInventory(PRODUCT_SKUS);

    const allocationResult = runAllocationLogic(inventory, REQUIRED_UNITS_TOTAL);
    
    await updateShopifyFulfillment(allocationResult);
}

processLotOrder();const { runAllocationLogic } = require('./allocationLogic'); 

const UNINAME = 'your_uniware_tenant_name';
const UNIFACILITY = 'your_facility_code';
const UNI_AUTH_TOKEN = 'YOUR_UNIWARE_ACCESS_TOKEN'; 


const SHOPIFY_DOMAIN = 'your-store-name.myshopify.com';
const SHOPIFY_ACCESS_TOKEN = 'shpat_YOUR_PRIVATE_APP_TOKEN';
const SHOPIFY_API_VERSION = '2023-10'; 

const ORDER_TARGET_LOTS = 4;
const UNITS_PER_LOT = 30;
const REQUIRED_UNITS_TOTAL = ORDER_TARGET_LOTS * UNITS_PER_LOT; // 120

const PRODUCT_SKUS = ['RedCase', 'BlueCase', 'GreenCase', 'BlackCase'];


async function getUniwareInventory(skus) {
    console.log('--- Step 1: Fetching Inventory ---');
    const mockInventory = [
        { sku: 'RedCase', available: 100 },
        { sku: 'BlueCase', available: 50 },
        { sku: 'GreenCase', available: 30 },
        { sku: 'BlackCase', available: 10 },
        { sku: 'YellowCase', available: 500 }, 
    ];

    const inventoryData = mockInventory.filter(item => skus.includes(item.sku));
    
    inventoryData.sort((a, b) => b.available - a.available);
    
    console.log('Available & Sorted Inventory:', inventoryData);
    return inventoryData;
}

async function updateShopifyFulfillment(allocationResult) {
    console.log('\n--- Step 3: Updating Fulfillment System (MOCK) ---');
    
    if (allocationResult.fulfilled) {
        console.log(SUCCESS! Total Units Allocated: ${allocationResult.totalAllocated});
        console.log('Details to be sent to Shopify/Uniware for fulfillment:', allocationResult.details);
        
    } else {
        console.log(FAILURE: Could not fulfill lot order. Shortfall: ${REQUIRED_UNITS_TOTAL - allocationResult.totalAllocated} units.);
    }
}

async function processLotOrder() {
    const inventory = await getUniwareInventory(PRODUCT_SKUS);

    const allocationResult = runAllocationLogic(inventory, REQUIRED_UNITS_TOTAL);
    
    await updateShopifyFulfillment(allocationResult);
}

processLotOrder();