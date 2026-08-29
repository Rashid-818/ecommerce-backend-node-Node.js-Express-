import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// Hashing Password
const hashPassword = async (password) => {
    const salt = 12
   return await bcrypt.hash(password,salt)

} 

// Verify Password
const verifyPassword = async (password,userPass) => {
 return await bcrypt.compare(password,userPass)
} 


// Generating JWT
const generateJWT = (payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn: process.env.JWT_KEY_Expiry})
}

// Verify JWT
const verifyJWT = (token) => {
    return jwt.verify(token,process.env.JWT_SECRET_KEY)
}





export {
    hashPassword,
    verifyPassword,
    generateJWT,
    verifyJWT
}
