var config= require('../config.js')
var squel = require('squel')
var mysql= require("mysql")
var connection= mysql.createConnection(config.mysql)


var addOffice = function(req,res){
	
	var name=req.body.name
	var adr=req.body.officeadr
	

	var query= squel.insert()
		        .into("office")
		        .set("name", name)
		        .set("address", adr)
				.toString()


	connection.query(query,function(err,msg){

			if (err)
				console.log(err)
			else 
				res.render('office.html',{msg:msg})
	})

}

exports.addOffice=addOffice