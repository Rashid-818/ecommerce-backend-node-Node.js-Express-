import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: [1,"required 1 quantity atleast"],
                    default: 1
                }
            }
        ],
    },
    {
        timestamps: true,
        collection: "Carts",
    }
)

export const Cart = mongoose.model("Cart", cartSchema)