const express=require("express");
const router=express.Router();
const getHistoryController=require("../controllers/getHistoryController");

router.get('/',getHistoryController.getHistory);
module.exports=router;