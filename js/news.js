var cheerio = require("cheerio");
var http = require("http");

var titles = [];

function scroller(i) {
  if (i === 14) {
    i = 0;
  }

  $("#news").animateCSS('slideOutDown', function() {
    $("#news").hide();
    $("#news").html(titles[i])
    $("#news").animateCSS('slideInUp');
  });
  

  i++;

  var t = setTimeout(function() {
    scroller(i)
  }, 5000);
}

var options = {
  hostname: 'www.npr.org',
  port: 80,
  path: '/rss/rss.php?id=1001',
  method: 'GET',
  withCredentials: false
};

var req = http.get(options, function(res) {
  var body = '';
  res.on('data', function (chunk) {
    body += chunk;
  });

  res.on('end', function() {
    _$ = cheerio.load(body);
    for(var x = 0; x < 15; x++) {
      titles.push(_$(_$('item')[x]).find('title').text());
    }

    scroller(0);

  });
});



