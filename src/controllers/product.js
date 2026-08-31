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
                title,price,brand,category,description,specs
            }
        )

        await productListed.save()

        return res.status(201).json(
            {
                message: "Product List Successful",
                product
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                message: "Server Error.."
            }
        )
    }
}

export {
    productCreate
}