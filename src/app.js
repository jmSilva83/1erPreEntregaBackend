import express from 'express';
import productsRouter from './router/products.router.js';
import cartsRouter from './router/carts.router.js';
import __dirname from './utils.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
