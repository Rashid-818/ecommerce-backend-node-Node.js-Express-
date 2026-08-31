function requireAdmin(req, res, next) {
    try {
        if (req.user.userRole !== "admin") {

            return res.status(403).json(
                {
                    message: "Forbidden..."
                }
            )
        }
        next()
    } catch (error) {
        return res.status(403).json(
            {
                message: "Forbidden.."
            }
        )
    }
}

export {
    requireAdmin
}