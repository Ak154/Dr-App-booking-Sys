import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); // Exit if connection fails
    }
};

mongoose.connection.on('connected', ()=>{
    console.log('MongoDB is connected');
})
mongoose.connection.on('Error', (error)=>{
    console.log('Error in mongoDB connection', error);
})

export default connectDB;
