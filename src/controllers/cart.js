import { Cart } from "../models/cart.model.js"
import { Product } from "../models/product.model.js"

const addToCart = async (req, res) => {
    try {

        const { productId, quantity } = req.body
        const userId = req.user.userId

        if (!productId || quantity === undefined || quantity < 1) {
            return res.status(400).json(
                {
                    message: "valid product ID and quantity required"
                }
            )
        }

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json(
                {
                    message: "Product not found"
                }
            )
        }

        let cart = await Cart.findOne({ user: userId })
        if (!cart) {
            cart = new Cart(
                {
                    user: userId,
                    items: []
                }
            )
        }


        const existingItems = cart.items.find(
            item => item.product.toString() === productId
        )

        if (existingItems) {
            existingItems.quantity += quantity
        } else {
            cart.items.push({
                product: productId,
                quantity
            })
        }

        await cart.save()

        return res.status(201).json(
            {
                message: "Product added to cart",
                cart
            }
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                message: "Server Error"
            }
        )
    }
}

export {
    addToCart
}