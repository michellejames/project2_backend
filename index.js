const express = require('express'), 		//helps turn node into a server that handles http requests
	bodyParser = require('body-parser'),
	cors = require('cors'),
	mongoose = require('mongoose'),
	app = express();	

	app.use(cors())
	app.use(bodyParser.urlencoded({extended: true}));
	mongoose.connect('mongodb://localhost:4006');


	//GET 		/item 			get all the items		(read)
	//POST 		/item 			add a new item 			(create)
	//GET 		/item/1 		get item 1 				(read)
	//POST 		/item/1			edit item 1 			(update)
	//DELETE 	/item/1			delete item 1 			(delete)

	//GET 		/item1/comment	get comments for item 1	(read)



app.listen(4006, function () {
  console.log('Example app listening on port 4006!');
})