var config= require('../config.js')
var squel = require('squel')
var mysql= require("mysql")
var connection= mysql.createConnection(config.mysql)

var getHomepage = function(req,res){
	debugger;
	var deptId= req.session.user.deptid;

	var query= squel.select()
				.from("room as r")
				.field("r.id,r.roomid,r.roomname")
				.where("deptid = ? ",deptId)
				.toString()


	connection.query(query,function(err,rows){

			if (err)
				console.log(err)
			else 
				res.render('home.html',{ rooms: rows, user:req.session.user})
	})

}

var bookRoom= function(req,res)
{
	var userid= req.session.user.id
	var ename=req.body.eventname
	var start=req.body.stdate
	var end=req.body.enddate
	var room=req.body.roomselect

	var query = squel.insert()
		        .into("booking")
		        .set("name", ename)
		        .set("start", start)
		        .set("end", end)
		        .set("roomid",room)
		        .set("userid",userid)
				.toString()


	console.log(query)

	connection.query(query,function(err,msg){

			if (err)
				console.log(err)
			else 
				res.render('home.html',{msg:msg})
		})


}

exports.getHomepage=getHomepage
exports.bookRoom=bookRoom