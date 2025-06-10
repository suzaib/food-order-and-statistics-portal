const Order=require("../models/orders.js");

const placeOrder=async(req,res)=>{
    const {orderid,brand,cuisine,venue,time,orderdate,ordertime,quantity}=req.body;
    if(!orderid || !brand || !cuisine || !venue || !time || !orderdate || !ordertime || !quantity){
        return res.status(400).json({error:"All Fields are required"});
    }

    const newOrder=new Order({
        orderid,
        brand,
        cuisine,
        venue,
        time,
        orderdate,
        ordertime,
        quantity,
    });

    const savedOrder=await newOrder.save();

    res.status(201).json({
        message:'Order Placed Successfully',
        order:savedOrder,
    });
}

module.exports={
    placeOrder
}