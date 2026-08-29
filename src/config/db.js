import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MongoDB_URL}`)
        console.log("Database connected Successful 🎉");
        
    } catch (error) {
        console.log("Something Went Wrong");
    }
}

export default connectDB