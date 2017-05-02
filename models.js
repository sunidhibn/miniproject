var async = require("async")
var mysql = require("mysql")
var config = require("./config.js").mysql
var connection = mysql.createConnection(config)

var role = { 0:"superuser", 1: "staff", 2: "user"}

var office = "CREATE TABLE IF NOT EXISTS office ( \
			  id SERIAL NOT NULL PRIMARY KEY, \
			  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
			  udpated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
			  name VARCHAR(25) NOT NULL,\
			  address TEXT);"

var department = "CREATE TABLE IF NOT EXISTS department ( \
			  id SERIAL NOT NULL PRIMARY KEY, \
			  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
			  udpated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
			  deptname VARCHAR(25) NOT NULL,\
			  officeid int REFERENCES office(id));"

var room= "CREATE TABLE IF NOT EXISTS room ( \
			  id SERIAL NOT NULL PRIMARY KEY, roomid VARCHAR(10), \
			  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
			  udpated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
			  roomname VARCHAR(25) NOT NULL,\
			  deptid int REFERENCES department(id),\
			  inchargeid int REFERENCES incharge(id));"


var incharge= "CREATE TABLE IF NOT EXISTS incharge ( \
			  id SERIAL NOT NULL PRIMARY KEY, \
			  inchargename VARCHAR(25) NOT NULL,\
			  inchargecontact VARCHAR(10) NOT NULL);"


var user= "CREATE TABLE IF NOT EXISTS user ( \
			  id SERIAL NOT NULL PRIMARY KEY, \
			  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
			  udpated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
			  first_name VARCHAR(25) NOT NULL,\
			  last_name VARCHAR(25) NOT NULL,\
			  password VARCHAR(25) NOT NULL,\
			  role int,\
			  email VARCHAR(30) UNIQUE,contact VARCHAR(10) UNIQUE,\
			  deptid int);"

var booking= "CREATE TABLE IF NOT EXISTS booking ( \
			  id SERIAL NOT NULL PRIMARY KEY,bookingid VARCHAR(15),\
			  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
			  udpated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
			  name VARCHAR(25) NOT NULL,\
			  start DATETIME NOT NULL,\
			  end DATETIME NOT NULL,\
			  roomid int REFERENCES room(id),\
			  userid int REFERENCES user(id));"

var tables = [office, department, room, incharge, user, booking]

var createTable = function(){
	async.each(tables, function(table,callback){
		connection.query(table, function(err){
			if(err)
				console.log(err,table)
		})
	})
}


exports.createTable = createTable