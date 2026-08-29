import express from "express";  

const app = express()


app.use(express.json())



// Importing Routes

// Auth Routes
import AuthRouter from "./routes/authRoute.js"

app.use("/ecommerce/api/v1/auth",AuthRouter)


export default app