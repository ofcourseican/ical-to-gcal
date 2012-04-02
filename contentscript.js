var re = new RegExp(".*ics.*|.*ical.*|.*cal.*");
var allLinks = document.links;
var events = [];

function get_events() {
  var event_list = new Array();
  for (var i=0; i<document.links.length; i++) {
    if (re.exec(document.links[i].href)) {
      var oRequest = new XMLHttpRequest();
      try {
        oRequest.open("GET",document.links[i].href,false);
        oRequest.send(null);
      }
      catch(err)
      {
        console.log(err);
      }
      if (oRequest.status==200) {
        icalParser.parseIcal(oRequest.response);
        var dates = icalParser.getEvents();
        if (dates != []){
          for (var j=0; j<dates.length; j++) {
            // Check for minimum information
            if (dates[j].summary != undefined && dates[j].dtstart != undefined && dates[j].dtend != undefined ){
              // put the event in our list
              event_list.push(dates[j]);
            }
          }
        }
      }
    }
  }
  return event_list;
}

/*this gets called when the popup opens and sends the іcs links*/
chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  if (request.getevents) {
    sendResponse(JSON.stringify(events));
  }
});

/*this gets called for every page and shows the page action button if an ics link is found*/
/* look for an event entry and only than show the button */

events = get_events();
if (events.length >= 1){
  chrome.extension.sendRequest({show_page_action:true});
}
