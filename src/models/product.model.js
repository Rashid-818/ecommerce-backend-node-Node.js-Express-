import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Product title is required"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price can't be negative"]
        },
        brand: {
            type: String,
            trim: true
        },
        category: {
            type: String,
            required: [true, "Product category is required"]
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
        },
        specs: {
            type: Map,
            of: String,
            required: [true, "Product specifications are required"]
        }
    },
    {
        timestamps: true,
        collection: "Products"
    }
)

export const Product = mongoose.model("Product", productSchema)