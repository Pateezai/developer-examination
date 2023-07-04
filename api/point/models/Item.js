import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    quantity:{
        type:Number,
        require:true,
    },
    desc:{
        type:String,
        require:false,
    },
},{
    timestamps:true
})

export default mongoose.model("Item", ItemSchema)

