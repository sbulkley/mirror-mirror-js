var cheerio = require("cheerio");
var http = require("http");

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
      newsTitles.push(_$(_$('item')[x]).find('title').text());
    }
  });
});



