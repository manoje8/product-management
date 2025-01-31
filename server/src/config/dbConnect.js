import mongoose from "mongoose"

class Mongo
{
    static async connect()
    {
        const MONGODB_URI = process.env.MONGODB_URI;
        const DATABASE_NAME = process.env.DATABASE_NAME;
        if(!MONGODB_URI || !DATABASE_NAME) throw new Error("MONGODB Credential is missing!")
        
        await mongoose.connect(MONGODB_URI, {
            dbName: DATABASE_NAME,
            bufferCommands: false
        })
        .then(() => console.log("MongoDB is connected"))
        .catch((error) => console.error("Error connection to MongoDB", error))
    }
}

export default Mongo