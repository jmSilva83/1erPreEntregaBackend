import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();
const manager = new CartManager();

router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    if (isNaN(cartId)) {
        return res
            .status(400)
            .send("Invalid cart ID ヽ(°〇°)ﾉ please try another.");
    }
    try {
        const productCart = await manager.showProductCart(cartId);
        if (!productCart) {
            return res
                .status(404)
                .send("Product Cart not found at this time (￢_￢)");
        }
        res.send(productCart);
    } catch (error) {
        res.status(500).send("Error retrieving product cart (ᗒᗣᗕ)");
    }
});

router.post("/", async (req, res) => {
    const { product } = req.body;
    if (!product) {
        return res.status(400).send("Product is required to add to cart (⊙_⊙)");
    }
    try {
        await manager.addProductCart(req.body);
        res.status(201).send("Product Cart added correctly ＼(＾▽＾)／");
    } catch (error) {
        res.status(500).send("Product Cart not added (ᗒᗣᗕ)");
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cartId = parseInt(cid);
    const productId = parseInt(pid);
    if (
        isNaN(cartId) ||
        isNaN(productId) ||
        !quantity ||
        typeof quantity !== "number"
    ) {
        return res.status(400).send("Invalid input data (⊙_⊙)");
    }
    try {
        await manager.updateCart(cartId, productId, quantity);
        res.status(200).send("Product Cart updated ＼(＾▽＾)／");
    } catch (error) {
        res.status(500).send("Product Cart not updated (ᗒᗣᗕ)");
    }
});

export default router;
