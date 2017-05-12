var config= require('../config.js')
var squel = require('squel')
var mysql= require("mysql")
var connection= mysql.createConnection(config.mysql)

var getUserlist=function(req,res){

		var query=squel.select()
				.from("user as u,department d,office as o")
				.field("u.id ,u.email,d.id as deptid,d.deptname,o.id as officeid,o.name")
				.where("u.deptid=d.id and d.officeid=o.id")
				.toString()

				console.log(query);

		connection.query(query,function(err,rows){

			if (err)
				console.log(err)
			else 
				res.render('userlist.html',{ users: rows})
	})		



}

var addUser=function(req,res){

		var fn=req.body.fname
		var ln=req.body.lname
		var did=req.body.deptid
		var email=req.body.email
		var tel=req.body.tel
		var ps=req.body.password


		var query=squel.insert()
		        .into("user")
		        .set("first_name",fn)
		        .set("last_name", ln)
		        .set("email", email)
		        .set("password", ps)
		        .set("role",'2')
		        .set("contact", tel)
		        .set("deptid",did)
		        .toString()
						

				console.log(query);

		connection.query(query,function(err,rows){

			if (err)
				console.log(err)
			else 
				res.redirect('/users')
	})		



}

exports.getUserlist=getUserlist
exports.addUser=addUser