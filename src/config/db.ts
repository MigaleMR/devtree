import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const url = 'mongodb+srv://alemarra98:Ljndr0812*@devtree.qqnluca.mongodb.net/?retryWrites=true&w=majority&appName=DevTree'
        const { connection } = await mongoose.connect(url)
        const url2 = `${connection.host}:${connection.port}`
        console.log(`MongoDB conectado en ${url2}`)
    } catch(error) {
        console.log(error.message);
        process.exit(1);
    }
}