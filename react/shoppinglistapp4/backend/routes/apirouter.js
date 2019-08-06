const express = require("express");
const mongoose = require("mongoose");
const shoppingModel = require("../models/shoppingitem");

//DATABASE
let database = [];
let id = 100;


let router = express.Router();

router.get("/shopping", function(req,res) {
	res.status(200).json(database);
});

router.post("/shopping", function(req,res) {
	let item = {
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		id:id
	}
	id++;
	database.push(item);
	res.status(200).json({"message":"success"});
});

router.delete("/shopping/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			database.splice(i,1);
			return res.status(200).json({"message":"success"});
		}
	}
	res.status(404).json({"message":"not found"});
});

router.put("/shopping/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	let item = {
			type:req.body.type,
			price:req.body.price,
			count:req.body.count,
			id:tempId
	}	
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			database.splice(i,1,item);
			return res.status(200).json({"message":"success"});
		}
	}
	res.status(404).json({"message":"not found"});
})

module.exports = router;