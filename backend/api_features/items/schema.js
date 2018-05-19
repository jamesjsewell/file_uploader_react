const mongoose = require("mongoose")

// mongoose schema class
const Schema = mongoose.Schema

// instance of mongoose Schema class 
var Item = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
   
}, { collection: 'key_data_findings', timestamps: true })

// exports mongoose model to the itemController.js file
module.exports = mongoose.model("Item", Item)