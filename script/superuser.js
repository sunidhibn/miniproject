var squel = require('squel')
var mysql = require("mysql")
var config = require("./../config.js").mysql
var connection = mysql.createConnection(config)

module.exports= function(first_name,last_name,email,password,phone,role){
	var query = squel.insert()
			.into("user")
			.setFields({ first_name: first_name,
				         last_name: last_name,
					     email: email,
					     password: password,
					     contact: phone,
					     role: role})
			.toString()
			
	connection.query(query, function(err){
		if(err)
			console.log(err)
		else
			console.log("created")
	})
}