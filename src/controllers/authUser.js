import { User } from "../models/user.model.js";
import { generateJWT, hashPassword } from "../utils/security.js";

const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !password || !email) {
            return res.status(400).json(
                {
                    message: "All fields are required !"
                }
            )
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json(
                {
                    message: "User already exists"
                }
            )
        }

        const hashPass = await hashPassword(password)

        const user = new User(
            {
                username,
                email,
                password: hashPass
            }
        )

        await user.save()

        const jwtToken = generateJWT(
            {
                userId: user._id,
                email: user.email
            }
        )

        return res.status(201).json(
            {
                message: "User created 😊",
                userId: user._id
            }
        )
    } catch (error) {
        console.error("Signup Error Context: ",error);
        
        return res.status(500).json(
            {
                message: "Server Error !"
            }
        )
    }
}

export {
    signUp
}