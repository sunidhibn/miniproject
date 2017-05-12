
$(document).ready(function() {



$('#submit').click(function(){
    
    var d=new Date();

    var ds=document.getElementById('date').value;
    var de=document.getElementById('date1').value;

    var d1=new Date(ds);
    var d2=new Date(de);

     if((d1>d2) || d1<d || d2<d)
         alert("Enter proper dates");
     else{
       $.ajax({
          type: "POST",
          url: "/",
           });
      }

});


});