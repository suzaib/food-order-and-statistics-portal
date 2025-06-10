const Order=require("../models/orders.js");

const getHistory=async(req,res)=>{
    try{
        const orders=await Order.find().sort({createdAt:-1});
        res.json(orders);
    } catch(error){
        console.error("Error fetching orders",error.message);
        res.status(500).json({message:"Failed to fetch orders. Please try again later."})
    }
}

module.exports={
    getHistory
}