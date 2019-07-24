const express = require("express");
const bodyParser = require("body-parser");

let app = express();

//DATABASE
let database = [];
let id = 100;

//USER DATABASE
let registeredUsers = [];
let loggedUsers = [];

//MIDDLEWARE

app.use(bodyParser.json());

createToken = () => {
	let token = ""
	let letters = "abcdefghjiABCDEFGHJI0123456789"
	for(let i=0;i<1024;i++) {
		let temp = Math.floor(Math.random()*30);
		token = token + letters[temp]
	}
	return token;
}

isUserLogged = (req,res,next) => {
	if(req.headers.token) {
		token = req.headers.token;
		for(let i=0;i<loggedUsers.length;i++) {
			if(loggedUsers[i].token === token) {
				return next();
			}
		}
	}
	res.status(403).json({"message":"forbidden"});
}

app.use("/api",isUserLogged);

//LOGIN API

app.post("/register", function(req,res) {
	if(!req.body) {
		return res.status(409).json({"message":"provide credentials"});
	}
	if(!req.body.username || !req.body.password) {
		res.status(409).json({"message":"provide credentials"});		
	}
	if(req.body.username.length ===0 || req.body.password.length ===0) {
		res.status(409).json({"message":"provide credentials"});		
	}
	let user = {
		username:req.body.username,
		password:req.body.password
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(user.username === registeredUsers[i].username) {
			return res.status(409).json({"message":"username already in use"});
		}
	}
	registeredUsers.push(user);
	console.log(registeredUsers);
	res.status(200).json({"message":"success"});
});

app.post("/login", function(req,res) {
	if(!req.body) {
		return res.status(409).json({"message":"wrong credentials"});
	}
	if(!req.body.username || !req.body.password) {
		res.status(409).json({"message":"wrong credentials"});		
	}
	if(req.body.username.length ===0 || req.body.password.length ===0) {
		return res.status(409).json({"message":"wrong credentials"});		
	}
	let user = {
		username:req.body.username,
		password:req.body.password
	}
	for(let i=0;i<registeredUsers.length;i++) {
		if(user.username === registeredUsers[i].username) {
			if(user.password === registeredUsers[i].password) {
				let token = createToken();
				loggedUsers.push({
					"username":user.username,
					"token":token
				});
				return res.status(200).json({"token":token})
			}
		}
	}
	res.status(409).json({"message":"wrong credentials"});
});

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




