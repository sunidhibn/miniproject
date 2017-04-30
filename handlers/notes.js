var config= require('../config.js')
var squel = require('squel')
var mysql= require("mysql")
var request = require('request');
var connection= mysql.createConnection(config.mysql)

function addNote(user_name,pass,callbak){
		


      var query="select * from user where username= ? and password= ? ;"



	connection.query(query,[user_name,pass],function(err, row){
		
		if (err)
			callbak(err)
		else
			callbak(null,row)
		
	})

}
function getinfo(user_name,callbak){
		



      var query="select * from user,rooms where username= ?;"


	connection.query(query,[user_name],function(err, row){
		
		if (err)
			callbak(err)
		else
			callbak(null,row)
		
	})

}






exports.addNote = addNote
exports.getinfo= getinfo