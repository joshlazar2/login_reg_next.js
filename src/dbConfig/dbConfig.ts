import mongoose from 'mongoose';

export async function Connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongDB Connected Successfully")
        })

        connection.on('error', (err) => {
            console.log("MongoDB connection error. Please Make Sure MongoDB is running" + err);
            process.exit();
        })
    }
    catch (error){
        console.log("Something went Wrong!")
        console.log(error)
    }
}