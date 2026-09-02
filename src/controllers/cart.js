import mongoose from "mongoose"
import { Cart } from "../models/cart.model.js"
import { Product } from "../models/product.model.js"

const addToCart = async (req, res) => {
    try {
        const userId = req.user.userId
        const { productId, quantity } = req.body

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid Id format" })
        }

        if (!productId || quantity === undefined) {
            return res.status(400).json(
                {
                    message: "Required fields are missing..."
                }
            )
        }
        if (quantity < 1) {
            return res.status(400).json(
                {
                    message: "Quantity must be at least 1"
                }
            )
        }


        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: "Invalid productId format" })
        }

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        let cart = await Cart.findOne({ user: userId })
        if (!cart) {
            cart = new Cart({
                user: userId,
                items: []
            })
        }

        const existingItems = cart.items.find(
            item => item.product.toString() === productId
        )
        if (existingItems) {
            existingItems.quantity += quantity
        } else {
            cart.items.push(
                {
                    product: productId,
                    quantity
                }
            )
        }

        await cart.save()


        return res.status(200).json(
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

const getMyCart = async (req, res) => {
    try {
        const userId = req.user.userId
        if(!mongoose.isValidObjectId(userId)){
            return res.status(401).json({message: "Invalid Id Format"})
        }
        const cart = await Cart.findOne({user: userId}).populate("items.product")
        if(!cart){
            return res.status(404).json(
                {
                    message: "Cart not found"
                }
            )
        }

        return res.status(200).json(
            {
                message: "here is yours Cart",
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
    addToCart,
    getMyCart
}