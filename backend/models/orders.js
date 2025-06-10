const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    orderid:{
        type:Number,
        unique:true,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    cuisine:{
        type:String,
        required:true,
    },
    venue:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    orderdate:{
        type:Number,
        required:true,
    },
    ordertime:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
},{timestamps:true});

const Order=mongoose.model("Order",orderSchema);
module.exports=Order;