import express from "express";  

const app = express()


app.use(express.json())



// Importing Routes

// Auth Routes
import authRouter from "./routes/authRoute.js"

app.use("/ecommerce/api/v1/auth",authRouter)


// Product Routes
import productRouter from "./routes/productRoute.js"

app.use("/ecommerce/api/v1",productRouter)

// Cart Routes
import cartRouter from "./routes/cartRoute.js"

app.use("/ecommerce/api/v1",cartRouter)


export default app