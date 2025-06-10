const Order = require("../models/orders.js");

const getVendorHistory = async (req, res) => {
  try {
    // Access 'brand' from the query parameters
    const { brand } = req.query; 

    // Check if 'brand' is provided
    if (!brand) {
      return res.status(400).json({ message: "Brand is required" });
    }

    // Fetch orders based on the brand
    const orders = await Order.find({ brand }).sort({ createdAt: -1 });

    // Return the orders as a JSON response
    res.json(orders);
  } catch (error) {
    console.log("Error fetching orders", error.message);
    res.status(500).json({ message: "Failed to fetch orders. Please try again" });
  }
};

module.exports = {
  getVendorHistory
};

