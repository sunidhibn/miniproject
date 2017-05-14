
$(document).ready(function() {


function getDept(){
  var offId = $("#office").find(":selected").val()
  
  getDeptList(offId)
}

function getDeptList(offId){
  $.ajax({
    url:"/dept/"+offId, 
    success: function(res){
        updateDept(res.depts)
    }
  });
}

$("#office").on("change", function(){
  getDept()
})

function updateDept(deptList){

		
	$('#append').empty();

	for (var i =0 ; i< deptList.length ;i++ ) {

		
		var radioBtn = $('<input type="checkbox" name="cb" value="'+deptList[i].id+'" id="'+deptList[i].id+'"/>');
		var lab=$('<label>'+deptList[i].deptname+'</label><br>');
		    radioBtn.appendTo('#append');
		    lab.appendTo('#append');

 	}
}

function getIncharge(){
  var iId = $("#office").find(":selected").val()
  console.log(iId)
  getinchList(iId)
}

function getinchList(iId){
  $.ajax({
    url:"/incharge/"+iId, 
    success: function(res){
    	console.log(res.incharge)
        updateinchlist(res.incharge)
    }
  });
}

$("#office").on("change", function(){
  getIncharge()
});


function updateinchlist(incharge){

	$("#inchlist tr").remove();
    	for(i=0; i<incharge.length; i++){
			$("#inchlist").append("<tr>\
				<td>"+incharge[i].id+"</td>\
				<td>"+incharge[i].inchargename+"</td>\
				<td>"+incharge[i].inchargecontact+"</td>\
				</tr>");
		}
}

getDept();
getIncharge();

});
