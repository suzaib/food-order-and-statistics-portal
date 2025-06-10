const express=require("express");
const router=express.Router();
const getVendorHistoryController=require("../controllers/getVendorHistoryController");

router.get('/',getVendorHistoryController.getVendorHistory);
module.exports=router;