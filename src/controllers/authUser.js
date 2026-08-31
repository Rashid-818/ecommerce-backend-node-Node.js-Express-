import { User } from "../models/user.model.js";
import { generateJWT, hashPassword, verifyPassword } from "../utils/security.js";


// Signup Controllers
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
                userId: user._id,
                jwtToken
            }
        )
    } catch (error) {
        console.error("Signup Error Context: ", error);

        return res.status(500).json(
            {
                message: "Server Error !"
            }
        )
    }
}


// Login Controllers
const login = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if ((!username && !email) || !password) {
            return res.status(400).json(
                {
                    message: "All fields are required !"
                }
            )
        }

        const user = await User.findOne(
            {
                $or: [
                    { email },
                    { username }
                ]
            }
        )
        if (!user) {
            return res.status(404).json({
                message: "Invalid credentials"
            })
        }

        const isMatch = await verifyPassword(password, user.password)
        if (!isMatch) {
            return res.status(401).json(
                {
                    message: "Invalid credentials"
                }
            )
        }

        const token = generateJWT(
            {
                userId: user._id,
                userRole: user.role
            }
        )

        return res.status(200).json(
            {
                message: "Welcome Back 🎉",
                token
            }
        )

    } catch (error) {
        console.error("Login Error Context: ", error);
        return res.status(500).json(
            {
                message: "Server Error Problem"
            }
        )
    }
}

const userProfile = async (req, res) => {
    try {

        const userProfile = await User.findById(req.user.userId).select(" -password -role -email")
        if (!userProfile) {
            return res.status(404).json(
                {
                    message: "User not found"
                }
            )
        }
        return res.status(200).json(
            {
                message: "User Profile !",
                userProfile
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
//  Exporting
export {
    signUp,
    login,
    userProfile
}