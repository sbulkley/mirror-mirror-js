var http = require("http");
var moment = require("moment");

function getIcon(code) {
  var icon = '';
  switch(code) {

    case '01':
      icon = 'icon-sun';
      break;
    case '02':
      icon = 'icon-cloudy';
      break;
    case '03':
      icon = 'icon-cloud2';
      break;
    case '04':
      icon = 'icon-cloudy2';
      break;
    case '09':
      icon = 'icon-rainy';
      break;
    case '10':
      icon = 'icon-rainy2';
      break;
    case '11':
      icon = 'icon-lightning3';
      break;
    case '50':
      icon = 'icon-weather3';
      break;
  }

  return icon;
}

$(document).ready(function() {
  var body = '';
  var dayOfWeekDict = {
    1: "Mon",
    2: "Tues",
    3: "Weds",
    4: "Thurs",
    5: "Fri",
    6: "Sat",
    0: "Sun"
  }

  var options = {
    hostname: 'api.openweathermap.org',
    port: 80,
    path: '/data/2.5/forecast/daily?id=5809844',
    method: 'GET',
    withCredentials: false
  };

  var req = http.get(options, function(res) {
    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function () {
      var days = (JSON.parse(body)).list;
      for(day in days) {
        itr = days[day];
        //date = moment.unix(itr.dt).format("MM-DD-YYYY");
        weekday = dayOfWeekDict[moment.unix(itr.dt).format("e")];
        date = weekday + ", " + moment.unix(itr.dt).format("MMM Do");
        morn = parseInt((itr.temp.morn - 273) * 1.8 + 32);
        temp = parseInt((itr.temp.day - 273) * 1.8 + 32);
        nght = parseInt((itr.temp.night - 273) * 1.8 + 32);
        icon = itr.weather[0].icon.replace('d', '').replace('n', '');
        main = itr.weather[0].main;
        desc = itr.weather[0].description;

        curr = {
          "Date": date,
          "Morning": morn,
          "Day": temp,
          "Night": nght,
          "code": icon,
          "Weather": main,
          "Detail": desc
        };

        weather.push(curr);

      };

      for(var item = 0; item < 5; item++) {
        $('#forecast').append(
          $('<li>').append(
            $('<div>').attr('class','date').append(weather[item].Date),
            $('<div>').attr('class','temperature').append(
              $('<div>').attr('class','morning').append(weather[item].Morning + "&deg;"),
              $('<div>').attr('class','day').append(weather[item].Day + "&deg;"),
              $('<div>').attr('class','night').append(weather[item].Night + "&deg;")
            ),
            $('<div>').attr('class','weather').append(
              $('<div>').attr('class','icon').append(
                $('<span>').attr('class',getIcon(weather[item].code))
              ),
              //$('<div>').attr('class','main').append(weather[item].Weather),
              $('<div>').attr('class','detail').append(weather[item].Detail)
            )
        ));
      };

      $("#forecast").children().first().css("border", "1px solid #ffff00");

    });
  });
});
