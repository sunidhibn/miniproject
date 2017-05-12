
$(document).ready(function() {

// page is now ready, initialize the calendar...
$('#calendar').fullCalendar({
        // put your options and callbacks here
      utc:true,
      timezone:'local',
      ignoreTimezone: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
      defaultDate: new Date(),
      navLinks: true, // can click day/week names to navigate views
      editable: false,
      eventLimit: true,
      
       // allow "more" link when too many events
})


function getEvent(){
  var roomId =  $("#rooms").find(":selected").val()
  getEventsList(roomId)
}

function getEventsList(eventId){
  $.ajax({
    url:"/events/"+eventId, 
    success: function(res){
        updateCalender(res.events)
    }
  });
}

$("#rooms").on("change", function(){
  getEvent();
})

function updateCalender(eventList){
    $('#calendar').fullCalendar( 'removeEvents');
    $('#calendar').fullCalendar( 'removeEventSource', eventList);
    $('#calendar').fullCalendar( 'addEventSource', eventList);
    $('#calendar').fullCalendar( 'refetchEvents' );
}

getEvent()

});
