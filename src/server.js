import dotenv from "dotenv"
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config(
    {
        path: "./.env"
    }
)

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server is running !!!");
        
    })
})
.catch((err)=>{
    console.error("DB connection failed: ",err);
      process.exit(1)  
})