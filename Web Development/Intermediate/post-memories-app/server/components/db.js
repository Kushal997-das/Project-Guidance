import mongoose from "mongoose";

const Connection = () => {
    try {
        mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Database connected successfuly")
    } catch (error) {
        console.log(`Error ${error}`)
    }
}

export default Connection;