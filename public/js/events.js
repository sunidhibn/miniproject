$(document).ready(function() {

// page is now ready, initialize the calendar...


$('#calendar').fullCalendar({
    // put your options and callbacks here
    header: {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay,listWeek'
  },
  defaultDate: '2017-05-12',
  navLinks: true, // can click day/week names to navigate views
  editable: false,
  eventLimit: true, // allow "more" link when too many events
  events: [
    {
      title: 'All Day Event',
      start: '2017-05-01'
    },
    {
      title: 'Long Event',
      start: '2017-05-07',
      end: '2017-05-10'
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: '2017-05-09T16:12:00'
    },
  ]
});

});
