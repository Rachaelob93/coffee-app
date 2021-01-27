const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    coffee:{
        type: String,
    },
    size:{
        type: String,
    },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = {
    Order,
}