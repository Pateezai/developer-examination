import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import itemRoute from './point/routes/item-route.js'
import cors from "cors"


const app = express()
dotenv.config()
const PORT = 3000
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
    } catch (error) {
        console.log(error)
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("database disconnected!")
})


app.use(cors())
app.use(express.json())
app.use("/api", itemRoute)
app.use((err, req, res, next) => {
    // return res.status(500).json("adasd")
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

app.listen(PORT, ()=>{
    connect()
    console.log(`connected to backend! localhost:${PORT}`)
})
