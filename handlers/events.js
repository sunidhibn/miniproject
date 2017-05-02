var config= require('../config.js')
var squel = require('squel')
var mysql= require("mysql")
var connection= mysql.createConnection(config.mysql)


var getEvents= function (req,res){

	var roomId= req.params.roomId

	var query= squel.select()
				.from("booking as b")
				.field("b.id,b.title,b.start,b.end")
				.where("roomid = ? ",roomId)
				.toString()

	connection.query(query,function(err,rows){

			if (err)
				console.log(err)
			else 
				res.json({ events: rows})
	})


}

exports.getEvents= getEvents