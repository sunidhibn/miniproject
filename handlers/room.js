var config= require('../config.js')
var squel = require('squel')
var mysql= require("mysql")
var bodyParser = require('body-parser')
var connection= mysql.createConnection(config.mysql)

var getOfficelist=function(req,res){

	var query= squel.select()
		        .from("office as o") 
				.field("o.id,o.name")
				.toString()


	connection.query(query,function(err,off){

			if (err)
				console.log(err)
			else 
				res.render('room.html',{off:off})
	})

}

var getRoomslist=function(req,res){

	var query=squel.select()
			  .from("office o,department d,room r")
			  .field("r.id,r.roomname,d.id as deptid, d.deptname, o.id as offid, o.name")
			  .where("r.deptid=d.id and d.officeid=o.id")
			   .order('d.id')
			  .toString()

	connection.query(query,function(err,rows){

			if (err)
				console.log(err)
			else 
				res.render('roomlist.html',{list:rows})
	})


}



var addRoom=function(req,res){

		
	var name=req.body.name
	var iid=req.body.inchid
	var off=req.body.office
	var deps=req.body.cb


		for(i=0; i<deps.length;i++){

		  	var query = squel.insert()
		          .into("room")
		          .set("roomname", name)
		          .set("deptid",deps[i])
		          .set("inchargeid",iid)
		  		  .toString()


			connection.query(query,function(err,msg){

		 	if (err)
		 		console.log(err)
		 	})

			

		}

		res.redirect('/rooms')

		

	

}


exports.getOfficelist=getOfficelist
exports.addRoom=addRoom
exports.getRoomslist=getRoomslist