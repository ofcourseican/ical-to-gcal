/*
 * These functions are fom Keith Woods icalendar jquery plugin. Thanks!
 *
 * http://keith-wood.name/icalendar.html
 * Written by Keith Wood (kbwood{at}iinet.com.au) October 2008.
 * Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and·
 * MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses.· 
 */

/* Pattern for a date/time field: yyyymmddThhmmss[Z] */
var DATETIME = /^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)$/;
/* Pattern for a date/time range field: yyyymmddThhmmss[Z]/yyyymmddThhmmss[Z] */
var DATETIME_RANGE = /^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)\/(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)$/;
/* Pattern for a date only field: yyyymmdd */
var DATEONLY = /^(\d{4})(\d\d)(\d\d)$/;

/* Convert a value into a Date object or array of Date objects if appropriate.
   @param  value  (string) the value to check
   @return  (string or Date) the converted value (if appropriate) */
function checkDate(value) {
  var matches = DATETIME.exec(value);
  if (matches) {
    return makeDate(matches);
  }
  matches = DATETIME_RANGE.exec(value);
  if (matches) {
    return {start: makeDate(matches), end: makeDate(matches.slice(7))};
  }
  matches = DATEONLY.exec(value);
  if (matches) {
    return makeDate(matches.concat([0, 0, 0, '']));
  }
  return value;
}

/* Create a date value from matches on a string.
   @param  matches  (string[]) the component parts of the date
   @return  (Date) the corresponding date */
function makeDate(matches) {
  var date = new Date(matches[1], matches[2] - 1, matches[3], matches[4], matches[5], matches[6]);
  date._type = (matches[7] ? 'UTC' : 'float');
  return utcDate(date);
}

/* Standardise a date to UTC.
   @param  date  (Date) the date to standardise
   @return  (Date) the equivalent UTC date */
function utcDate(date) {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
}

