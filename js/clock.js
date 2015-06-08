function startTime() {
  var today = new Date();
    
  var h = today.getHours();
  if (h > 12) {
    half = "pm";
    h -= 12;
  } else if (h === 0) {
    h = 12;
    half = "am"
  } else {
    half = "am";
  }
    
  var m = today.getMinutes();
    
  m = checkTime(m);
    
  $('#clock').html(h + ":" + m + half);
    
  var t = setTimeout(function() {
      startTime()
  }, 500);
};

function checkTime(t) {
  if (t < 10) {
    t = "0" + t
  };
    
  return t;
}

$(document).ready(function() {
    startTime();
});
