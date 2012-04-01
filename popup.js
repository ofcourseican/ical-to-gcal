window.onload = function() {
  loadevents();
}

function loadevents() {
  var html = new String();
  chrome.tabs.getSelected(null,function(tab){
    chrome.tabs.sendRequest(tab.id, {getevents:true}, function(response){
      var events = JSON.parse(response);
      //console.log(events);
      for (var i=0; i<events.length; i++) {
        var start = checkDate(events[i].dtstart.value);
        var end = checkDate(events[i].dtend.value);
        var linkstring = "http://www.google.com/calendar/event?action=TEMPLATE&"
                                    +"text=" + events[i].summary.value.replace(/\\/g,'')
                                    +"&dates=" + events[i].dtstart.value + "/" + events[i].dtend.value;
        /*if (events[i].description != null) {
          linkstring = linkstring + "&details=" + events[i].description.value.replace(/\\/g,'');
        }*/
        if (events[i].location != null) {
          linkstring = linkstring + "&location=" + events[i].location.value.replace(/\\/g,'');
        }
        linkstring = encodeURI(linkstring);

        html = html + "<div class='event'>"
                    + "<div class='event_title'>" + events[i].summary.value.replace(/\\/g,'') + "</div>\n"
                    + "<div class='event_date'>" + start.toLocaleString() + " - " + end.toLocaleString() + "</div>\n"
                    + "<div class='event_link'><a href='" + linkstring +"' target='_blank'><img src='gc_button6.gif' border=0></a></div>\n</div>";
      }
      document.getElementById('calendar_links').innerHTML = html;
    });
  });
}
