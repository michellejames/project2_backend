const express = require('express'), 		//helps turn node into a server that handles http requests
	dotenv = require('dotenv').config(),
	app = express(),
	mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost/test');

	app.get('/', function(req, res) {
		res.send("Hello World!");
	})

	var Robot = mongoose.model('Robot', { 
		name: {type: String, required: true},
		evil: Boolean,
		movement: String,
		literature: String,
		catchphrases: [String],
		url: String,
	});

	app.get('/robots', function(req, res) {			
		
		Robot.find({}, function(err, robots) {			//find all the robots
			console.log(err, robots);

			if (err) {
				res.send(500, "Server Error")
			} else if (!robots){
				res.send(400, "Couldn't find robots!")
			} else {
				res.json(robots);
			}

		})		

		Robot.find({url: "wallee"}, function(err, robots) {
			console.log(err, robots);
		})		
	})

	app.get('/robots/:url', function(req, res) {			
		
		Robot.findOne({url: req.params.url}, function(err, robot) {			//find ONE the robots
			console.log(err, robot);
			
			if (err) {
				res.send(500, "Server Error")
			} else if (!robot){
				res.send(400, "Couldn't find the robot!")
			} else {
				res.json(robot);
			}
		})	
	})


	app.get('/seed', function(req, res) {

		var roboKid = new Robot({ 
			name: 'roboKid',
			evil: true,
			movement: "fast",
			literature: "Shelly's RoboWorld",
			catchphrases: [
				"Oil me up",
				"Trash Talk",
				],
			url: "robokid"
		});

		roboKid.save(function (err) {
		  if (err) {
		    console.log(err);
		  } else {
		    console.log(roboKid.catchphrases[0]);
		  }
		});

		var wallee = new Robot({ 
			name: 'walle-E',
			evil: null,
			movement: "slow",
			literature: "walle-E",
			catchphrases: [
				"wall-eeeeeee",
				"Evaaaaaaaa",
				],
			url: "wallee"
		});

		wallee.save(function (err) {
		  if (err) {
		    console.log(err);
		  } else {
		    console.log(wallee.catchphrases[1]);
		  }
		});

		res.send("Seeded!");
	})

app.listen(process.env.SERVER_PORT, function () {
  console.log(`Example app listening on port ${process.env.SERVER_PORT}!`);
})