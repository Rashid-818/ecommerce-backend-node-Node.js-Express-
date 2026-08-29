import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,

        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true,
        collection: "Users"
    }
)

export const User = mongoose.model("User", userSchema)