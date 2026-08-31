import mongoose from "mongoose"
import { Product } from "../models/product.model.js"

const productCreate = async (req, res) => {
    try {
        const { title, price, brand, category, description, specs } = req.body
        if (!title || price === undefined || !category || !description || !specs) {
            return res.status(400).json(
                {
                    message: "Required fields are missing !"
                }
            )
        }

        const product = new Product(
            {
                title, price, brand, category, description, specs
            }
        )

        await product.save()

        return res.status(201).json(
            {
                message: "Product List Successful",
                product
            }
        )

    } catch (error) {
        console.log(error);

        return res.status(500).json(
            {
                message: "Server Error.."
            }
        )
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.find()
        return res.status(200).json(
            {
                message: "Here is All Products",
                product
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

const getOneProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json(
                {
                    message: "Invalid Id Format !"
                }
            )
        }

        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json(
                {
                    message: "Product not available"
                }
            )
        }

        return res.status(200).json(
            {
                message: "Product find",
                product
            }
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                message: 'Server Error'
            }
        )

    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json(
                {
                    message: "Invalid Id format !"
                }
            )
        }

        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        return res.status(200).json(
            {
                message: "Product deleted !",
                deletedProduct: product
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

const updateProduct = async (req, res) => {
    try {

        const id = req.params.id
        const { title, brand, description, price, category, specs } = req.body

        const updatedData = {}

        if(title !== undefined) updatedData.title = title
        if(brand !== undefined) updatedData.brand = brand
        if(description !== undefined) updatedData.description = description
        if(price !== undefined) updatedData.price = price
        if(category !== undefined) updatedData.category = category
        if(specs !== undefined) updatedData.specs = specs

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json(
                {
                    message: "Invalid Id format..."
                }
            )
        }

        const product = await Product.findByIdAndUpdate(
            id,
            updatedData,
            {
                returnDocument: "after",
                runValidators: true
            }
        )
        if (!product) {
            return res.status(404).json(
                {
                    message: "Product Not Found"
                }
            )
        }

        return res.status(200).json(
            {
                message: "Updated...."
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
    productCreate,
    getProduct,
    getOneProduct,
    deleteProduct,
    updateProduct
}