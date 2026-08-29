import { verifyJWT } from "../utils/security"

const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json(
            {
                message: "Authorization header missing !"
            }
        )
    }

    try {
        const [schema, token] = authHeader.split(" ")
        if (schema !== "Bearer " || !token) {
            return res.statu(401).json(
                {
                    message: "Invalid authorization format..."
                }
            )
        }

        const decoded = verifyJWT(token)
        req.user = decoded
        next()

    } catch (error) {
        return res.status(401).json(
            {
                message: "Invalid tor expired token..."
            }
        )
    }
}

export {
    requireAuth
}