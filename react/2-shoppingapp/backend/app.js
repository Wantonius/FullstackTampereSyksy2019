const express = require("express");
const bodyParser = require("body-parser");

let app = express();

//DATABASE
let database = [];
let id = 100;

//MIDDLEWARE

app.use(bodyParser.json());

// REST API

app.get("/api/shopping", function(req,res) {
	res.status(200).json(database);
});

app.post("/api/shopping", function(req,res) {
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

app.delete("/api/shopping/:id", function(req,res) {
	let tempId = parseInt(req.params.id,10);
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			database.splice(i,1);
			return res.status(200).json({"message":"success"});
		}
	}
	res.status(404).json({"message":"not found"});
});

app.put("/api/shopping/:id", function(req,res) {
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

app.listen(3001);

console.log("Running in port 3001");




