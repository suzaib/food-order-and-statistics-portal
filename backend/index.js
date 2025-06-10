const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./connect.js');
const authRoute=require('./routes/authRoute.js');
const orderRoute=require('./routes/orderRoute.js');
const getHistoryRoute=require("./routes/getHistoryRoute.js");
const getVendorHistoryRoute=require("./routes/getVendorHistoryRoute.js")
const {verifyToken,checkRole}=require('./middlewares/authMiddleware.js');
const  cors=require("cors");


dotenv.config();

//Initialize express
const app=express();

//Connecting to database
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth/login',authRoute);
app.use('/api/placeorder',orderRoute);
app.use('/api/history',getHistoryRoute);
app.use('/api/vendorhistory',getVendorHistoryRoute);

//Example of a protected route
app.post('/api/admin',verifyToken,checkRole('admin'),(req,res)=>{
    res.send('Welcome Admin');
})

const PORT=process.env.PORT || 5000;
app.listen(PORT);