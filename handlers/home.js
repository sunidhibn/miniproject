var config= require('../config.js')
var squel = require('squel')
var mysql= require("mysql")
var sms=require('../script/sms.js')
var connection= mysql.createConnection(config.mysql)

var getHomepage = function(req,res){

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

var getBooklist=function(req,res){

		var id=req.session.user.id;

		var query=squel.select()
				.from("booking as b,room as r")
				.field("b.id,b.title,b.roomid,b.start,b.end,r.roomname")
				.where("userid = ? and b.roomid=r.id",id)
				.toString()

		connection.query(query,function(err,rows){

			if (err)
				console.log(err)
			else 
				res.render('bookinglist.html',{ bookings: rows})
	})		



}



var bookRoom= function(req,res)
{
	var userid= req.session.user.id
	var ename=req.body.eventname
	var start=req.body.stdate
	var end=req.body.enddate
	var room=req.body.roomselect


	var query = "INSERT INTO booking (title,start,end,roomid,userid)\
				 select ?,?,?,?,? from DUAL\
	             WHERE NOT EXISTS (SELECT id from booking where ((roomid = ?) AND\
	             (start<= ? and end>= ? )OR (start<= ? AND end>= ? )));"





	connection.query(query,[ename,start,end,room,userid,room,start,start,end,end],function(err,row)
	{
			if(row)
			{ 
				getBookinfo(ename);
				res.redirect('/')
			}
			else
				console.log(err)
		})

}


var getBookinfo=function(event){

		var query= squel.select()
				.from("booking as b,user as u,room as r,incharge as i")
				.field("b.id,b.title,b.start,b.end")
				.field("u.first_name,u.contact,r.roomname,i.inchargecontact")
				.where(" u.id=b.userid and b.title= ? and b.roomid=r.id and i.id=r.inchargeid",event)
				.toString() 


		connection.query(query,function(err,row)
		{
			if(row)
				sms.sendSms(row[0])

		})


}


var deleteBooking=function(req,res){

		var bid=req.body.bookid;

		console.log(bid);

		var query= squel.delete()
        		   .from("booking")
        		   .where("id = ? ",bid)
        		   .toString()

        		   console.log(query)


		connection.query(query,function(err,row)
		{
			if (err)
				console.log(err)
			else 
				res.redirect('/showbooking')

		})


}




exports.getHomepage=getHomepage
exports.bookRoom=bookRoom
exports.getBookinfo=getBookinfo
exports.getBooklist=getBooklist
exports.deleteBooking=deleteBooking