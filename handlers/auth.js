var config= require('../config.js')
var squel = require('squel')
var mysql= require("mysql")
var connection= mysql.createConnection(config.mysql)


var login = function(email, password, callback){
	var query = squel.select()
				.from("user, department as d,office as o")
				.field("user.email, user.id, user.first_name, user.last_name, user.role, user.deptid, o.name,d.deptname")
				.where("email = ? AND password = ? and user.deptid=d.id and d.officeid=o.id", email, password)
				.toString()
				
	connection.query(query, function(error, rows){
		if(error)
			callback(error);
		else
			callback(null, rows[0])
	})
}

exports.login = login