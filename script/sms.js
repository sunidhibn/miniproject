var plivo = require('plivo');
var config = require('../config.js').plivo;

var p = plivo.RestAPI({
  authId: config.authId,
  authToken: config.authToken
});

var sendSms=function(event){

var usertext="Hello! Your Booking is confirmed  for the event : "+ event.title + " in Room :" + event.roomname + " and your Booking id :" + event.id+ " , Room incharge contact no. "+ event.inchargecontact+" Thankyou"
var inchtext="Hello!! " +event.roomname+" is booked from "+event.start+" to "+event.end+" for the event : "+event.title+". contact No of department : " +event.contact+" Thankyou"
	console.log(usertext);

	console.log(inchtext);

var param1 = {
    'src': '+917411640829', // Sender's phone number with country code
    'dst' :'+91'+event.contact, // Receiver's phone Number with country code
    'text' : usertext, // Your SMS Text Message - English
    'url' : "http://requestb.in/18ro4481", // The URL to which with the status of the message is sent
    'method' : "POST" // The method used to call the url
};

var param2={
    'src': '+917411640829', // Sender's phone number with country code
    'dst' :'+91'+event.inchargecontact, // Receiver's phone Number with country code
    'text' : inchtext, // Your SMS Text Message - English
    'url' : "http://requestb.in/18ro4481", // The URL to which with the status of the message is sent
    'method' : "POST" // The method used to call the url
};

p.send_message(param1, function (status, response) {
     console.log('Status: ', status);
     console.log('API Response:\n', response);
 });



p.send_message(param2, function (status, response) {
     console.log('Status: ', status);
     console.log('API Response:\n', response);
 });

}

exports.sendSms=sendSms