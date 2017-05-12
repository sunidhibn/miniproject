var config= require('../config.js')
var squel = require('squel')
var mysql= require("mysql")
var connection= mysql.createConnection(config.mysql)


var getIncharge= function (req,res){

	var offId= req.params.iId

	// var query= squel.select()
	// 			.from("department d,room as r,incharge as i")
	// 			.field("i.id")
	// 			.distinct()
	// 			.field("i.inchargename,i.inchargecontact")
	// 			.where("d.id=r.deptid")
	// 			.where("d.officeid = ? ",offId)
	// 			.where("r.inchargeid=i.id")
	// 			.toString() 


	var query=squel.select()
			  .from("incharge")
			  .field("id,inchargename,inchargecontact")
			  .toString()



	connection.query(query,function(err,rows){
		if (err)
				console.log(err)
			else 
				res.json({ incharge : rows})
	})


}

var addInch= function (req,res){

		var name=req.body.name
		var num=req.body.num

		query=squel.insert()
		        .into("incharge")
		        .set("inchargename",name)
		        .set("inchargecontact",num)
		        .toString()

		connection.query(query,function(err,rows){
		if (err)
				console.log(err)
			else 
				res.redirect('/rooms/new')
	})


}

exports.getIncharge= getIncharge
exports.addInch=addInch