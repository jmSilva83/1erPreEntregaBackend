import fs from 'fs';

const PATH = 'src/data/products.json';

class ProductManager {
  constructor() {
    this.init();
  }

  async init() {
    if (!fs.existsSync(PATH)) {
      try {
        await fs.promises.writeFile(PATH, JSON.stringify([]));
        console.log('Product file created successfully.');
      } catch (error) {
        console.log('Error initializing product file:', error);
        process.exit(1);
      }
    }
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(PATH, 'utf-8');
      console.log('Product data retrieved successfully.');
      return JSON.parse(data);
    } catch (error) {
      console.log('Error reading product data:', error);
      process.exit(1);
    }
  }

  async saveProducts(products) {
    try {
      await fs.promises.writeFile(PATH, JSON.stringify(products, null, '\t'));
      console.log('Product data saved successfully.');
      return true;
    } catch (error) {
      console.log('Error writing products:', error);
      return false;
    }
  }

  async createProducts({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  }) {
    const newProduct = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    const products = await this.getProducts();

    if (products.length === 0) {
      newProduct.id = 1;
    } else {
      newProduct.id = products[products.length - 1].id + 1;
    }
    products.push(newProduct);
    const saveSuccess = await this.saveProducts(products);
    if (saveSuccess) {
      console.log(`Product created with ID: ${newProduct.id}`);
    } else {
      console.log('Failed to create product.');
    }
  }

  async showProducts(id) {
    const products = await this.getProducts();
    const product = products.find((product) => product.id === id);
    if (product) {
      console.log(`Product with ID: ${id} found.`);
    } else {
      console.log(`Product with ID: ${id} not found.`);
    }
    return product;
  }

  async updateProducts(id, productUpdate) {
    const products = await this.getProducts();
    const index = products.findIndex((prod) => prod.id === id);
    if (index === -1) {
      console.log(`Product with ID: ${id} not found.`);
      throw new Error('Product not found');
    }
    products[index] = { ...products[index], ...productUpdate };
    const saveSuccess = await this.saveProducts(products);
    if (saveSuccess) {
      console.log(`Product with ID: ${id} updated successfully.`);
    } else {
      console.log('Failed to update product.');
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filteredProducts = products.filter((prod) => prod.id !== id);
    if (filteredProducts.length === products.length) {
      console.log(`Product with ID: ${id} not found.`);
      throw Error('Product not found');
    }
    const saveSuccess = await this.saveProducts(filteredProducts);
    if (saveSuccess) {
      console.log(`Product with ID: ${id} deleted successfully.`);
    } else {
      console.log('Failed to delete product.');
    }
  }
}

export default ProductManager;
