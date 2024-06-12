// import fs from "fs";
// import productManager from "../managers/productManager.js";

// const manager = new productManager();
// const PATH = "src/data/carts.json";

// class CartManager {
//     constructor() {
//         this.init();
//     }

//     async init() {
//         if (!fs.existsSync(PATH)) {
//             try {
//                 await fs.promises.writeFile(PATH, JSON.stringify([]));
//                 console.log("Cart file created successfully.");
//             } catch (error) {
//                 console.log("Error initializing cart file:", error);
//                 process.exit(1);
//             }
//         }
//     }

//     async getProductsCart() {
//         try {
//             const data = await fs.promises.readFile(PATH, "utf-8");
//             console.log("Cart data retrieved successfully.");
//             return JSON.parse(data);
//         } catch (error) {
//             console.log("Error reading cart data:", error);
//             process.exit(1);
//         }
//     }

//     async saveProductsCart(productsCart) {
//         try {
//             await fs.promises.writeFile(
//                 PATH,
//                 JSON.stringify(productsCart, null, "\t")
//             );
//             console.log("Cart data saved successfully.");
//             return true;
//         } catch (error) {
//             console.log("Error writing cart data:", error);
//             return false;
//         }
//     }

//     async addProductCart({ product }) {
//         const newProductCart = { product };
//         const dataProductCart = await this.getProductsCart();
//         if (dataProductCart.length === 0) {
//             newProductCart.id = 1;
//         } else {
//             newProductCart.id =
//                 dataProductCart[dataProductCart.length - 1].id + 1;
//         }
//         dataProductCart.push(newProductCart);
//         const saveSuccess = await this.saveProductsCart(dataProductCart);
//         if (saveSuccess) {
//             console.log(`Product added to cart with ID: ${newProductCart.id}`);
//         } else {
//             console.log("Failed to add product to cart.");
//         }
//     }

//     async showProductCart(id) {
//         const productCart = await this.getProductsCart();
//         const cart = productCart.find((u) => u.id === id);
//         if (cart) {
//             console.log(`Cart with ID: ${id} found.`);
//         } else {
//             console.log(`Cart with ID: ${id} not found.`);
//         }
//         return cart;
//     }

//     async updateCart(idCart, idProduct, quantity) {
//         const dataProductCart = await this.getProductsCart();
//         const cartIndex = dataProductCart.findIndex((cid) => cid.id === idCart);
//         if (cartIndex === -1) {
//             console.log(`Cart with ID: ${idCart} not found.`);
//             throw new Error("Cart index not found");
//         }
//         const dataProductManager = await manager.getProducts();
//         const product = dataProductManager.find((pid) => pid.id === idProduct);
//         if (!product) {
//             console.log(`Product with ID: ${idProduct} not found.`);
//             return false;
//         }
//         const cart = dataProductCart[cartIndex];
//         if (!Array.isArray(cart.product)) {
//             cart.product = [];
//         }
//         const existingProductIndex = cart.product.findIndex(
//             (p) => p.productId === idProduct
//         );
//         if (existingProductIndex !== -1) {
//             cart.product[existingProductIndex].quantity += quantity;
//             console.log(
//                 `Updated quantity for product ID: ${idProduct} in cart ID: ${idCart}.`
//             );
//         } else {
//             cart.product.push({ productId: product.id, quantity });
//             console.log(
//                 `Added product ID: ${idProduct} to cart ID: ${idCart}.`
//             );
//         }
//         dataProductCart[cartIndex] = cart;
//         await this.saveProductsCart(dataProductCart);
//     }
// }

// export default CartManager;

//hasta acá es la primer preentrega


// import fs from "fs/promises";
// import productManager from "../managers/productManager.js";

// const manager = new productManager();
// const PATH = "src/data/carts.json";

// class CartManager {
//     constructor() {
//         this.init();
//     }

//     async init() {
//         try {
//             const fileExists = await fs.access(PATH).then(() => true).catch(() => false);
//             if (!fileExists) {
//                 await fs.writeFile(PATH, JSON.stringify([]));
//                 console.log("Cart file created successfully.");
//             }
//         } catch (error) {
//             console.log("Error initializing cart file:", error);
//             process.exit(1);
//         }
//     }

//     async getProductsCart() {
//         try {
//             const data = await fs.readFile(PATH, "utf-8");
//             console.log("Cart data retrieved successfully.");
//             return JSON.parse(data);
//         } catch (error) {
//             console.log("Error reading cart data:", error);
//             process.exit(1);
//         }
//     }

//     async saveProductsCart(productsCart) {
//         try {
//             await fs.writeFile(PATH, JSON.stringify(productsCart, null, "\t"));
//             console.log("Cart data saved successfully.");
//             return true;
//         } catch (error) {
//             console.log("Error writing cart data:", error);
//             return false;
//         }
//     }

//     async addProductCart(productId, quantity) {
//         const dataProductCart = await this.getProductsCart();
//         const product = await manager.showProducts(productId);
//         if (!product) {
//             console.error(`Product with ID: ${productId} not found.`);
//             return false;
//         }
//         const newProductCart = {
//             id: dataProductCart.length > 0 ? dataProductCart[dataProductCart.length - 1].id + 1 : 1,
//             products: [{ ...product, quantity }]
//         };
//         dataProductCart.push(newProductCart);
//         const saveSuccess = await this.saveProductsCart(dataProductCart);
//         if (saveSuccess) {
//             console.log(`Product added to cart with ID: ${newProductCart.id}`);
//             return newProductCart.id;
//         } else {
//             console.log("Failed to add product to cart.");
//             return false;
//         }
//     }

//     async showProductCart(id) {
//         const productCart = await this.getProductsCart();
//         const cart = productCart.find((u) => u.id === id);
//         if (cart) {
//             console.log(`Cart with ID: ${id} found.`);
//         } else {
//             console.log(`Cart with ID: ${id} not found.`);
//         }
//         return cart;
//     }

//     async updateCart(idCart, idProduct, quantity) {
//         const dataProductCart = await this.getProductsCart();
//         const cartIndex = dataProductCart.findIndex((cid) => cid.id === idCart);
//         if (cartIndex === -1) {
//             console.log(`Cart with ID: ${idCart} not found.`);
//             throw new Error("Cart index not found");
//         }
//         const product = await manager.showProducts(idProduct);
//         if (!product) {
//             console.log(`Product with ID: ${idProduct} not found.`);
//             return false;
//         }
//         const cart = dataProductCart[cartIndex];
//         const existingProductIndex = cart.products.findIndex((p) => p.id === idProduct);
//         if (existingProductIndex !== -1) {
//             cart.products[existingProductIndex].quantity += quantity;
//             console.log(`Updated quantity for product ID: ${idProduct} in cart ID: ${idCart}.`);
//         } else {
//             cart.products.push({ ...product, quantity });
//             console.log(`Added product ID: ${idProduct} to cart ID: ${idCart}.`);
//         }
//         dataProductCart[cartIndex] = cart;
//         await this.saveProductsCart(dataProductCart);
//     }
// }

// export default CartManager;
//hasta aca anda bien, agrega el producto entero con su id, pero agrega otro producto arriba del agregado al poner erroneamente otro id por ende falta esa validación

import fs from 'fs/promises';
import path from 'path';

const PATH = path.resolve('src/data/carts.json');
const PRODUCTS_PATH = path.resolve('src/data/products.json');

class CartManager {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const exists = await fs.access(PATH).then(() => true).catch(() => false);
            if (!exists) {
                await fs.writeFile(PATH, JSON.stringify([]));
                console.log("Cart file created successfully.");
            }
        } catch (error) {
            console.log("Error initializing cart file:", error);
        }
    }

    async getProductsCart() {
        try {
            const data = await fs.readFile(PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log("Error reading cart data:", error);
            return [];
        }
    }

    async saveProductsCart(productsCart) {
        try {
            await fs.writeFile(PATH, JSON.stringify(productsCart, null, 2));
            console.log("Cart data saved successfully.");
            return true;
        } catch (error) {
            console.log("Error writing cart data:", error);
            return false;
        }
    }

    async getProducts() {
        try {
            const data = await fs.readFile(PRODUCTS_PATH, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log("Error reading products file:", error);
            return [];
        }
    }

    async addProductCart({ productId, quantity }) {
        const dataProductCart = await this.getProductsCart();
        const productData = await this.getProducts();
        const product = productData.find(p => p.id === productId);

        if (!product) {
            console.error(`Product with ID: ${productId} not found.`);
            return false;
        }

        const newProductCart = {
            id: dataProductCart.length ? dataProductCart[dataProductCart.length - 1].id + 1 : 1,
            products: [{ ...product, quantity }]
        };

        dataProductCart.push(newProductCart);
        await this.saveProductsCart(dataProductCart);
        return newProductCart;
    }

    async showProductCart(id) {
        const productCart = await this.getProductsCart();
        return productCart.find(cart => cart.id === id) || null;
    }

    async updateCart(idCart, idProduct, quantity) {
        const dataProductCart = await this.getProductsCart();
        const cartIndex = dataProductCart.findIndex(cart => cart.id === idCart);
        if (cartIndex === -1) {
            console.log(`Cart with ID: ${idCart} not found.`);
            throw new Error("Cart index not found");
        }

        const cart = dataProductCart[cartIndex];
        const productIndex = cart.products.findIndex(p => p.id === idProduct);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
            console.log(`Updated quantity for product ID: ${idProduct} in cart ID: ${idCart}.`);
        } else {
            console.log(`Product with ID: ${idProduct} not found in cart ID: ${idCart}.`);
            return false;
        }

        dataProductCart[cartIndex] = cart;
        await this.saveProductsCart(dataProductCart);
        return true;
    }
}

export default CartManager;
