var config= require('../config.js')
var squel = require('squel')
var mysql= require("mysql")
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
				res.render('dept.html',{off:off})
	})
}

var addDept=function(req,res){

		var id=req.body.select;
		var dname=req.body.name;

		var query= squel.insert()
		        .into("department")
		        .set("deptname", dname)
		        .set("officeid", id)
				.toString()


		connection.query(query,function(err,msg){

			if (err)
				console.log(err)
			else 
				res.render('dept.html',{msg:msg})
		})



}

var getDeptlist=function(req,res){


	var offId= req.params.offId


	var query= squel.select()
				.from("department as d")
				.field("d.id,d.deptname")
				.where("officeid = ? ",offId)
				.toString()

	connection.query(query,function(err,rows){

			if (err)
				console.log(err)
			else 
				res.json({ depts: rows})
	})


}



exports.getOfficelist=getOfficelist
exports.addDept=addDept
exports.getDeptlist=getDeptlist