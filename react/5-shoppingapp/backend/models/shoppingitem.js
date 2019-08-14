const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	type:String,
	price:Number,
	count:Number,
	username:{type:String,indexed:true}
});

module.exports = mongoose.model("ShoppingItem",Schema);