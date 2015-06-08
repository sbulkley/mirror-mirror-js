var cheerio = require("cheerio");

function getUrlById(id) {
    url = 'http://hypem.com/track/' + id + '/?ax=1';

    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            try {
                _$ = cheerio.load(data);
            } catch (e) {
                return console.log(e);
            }

            key = _$('#displayList-data').html();

            if (!key) {
                console.log("No Key!");
            }

            try {
                key = JSON.parse(key).tracks[0].key;
            } catch (e) {
                console.log("Can't Parse Key!");
            }

            url = 'http://hypem.com/serve/source/' + id + '/' + key + '?_=' + Date.now();

            $.ajax({
                url: url,
                type: 'GET',
                success: function(data) {
                    //console.log(id + ": " + data.url);
                    pop50[id].url = data.url; 
                }
            });
        }
    });
}

function getTracksAndIds() {
    var hypeURL = "https://api.hypem.com/v2/popular?mode=now&page=1&count=50&key=swagger";
    $.ajax({
        url: hypeURL,
        dataType: 'json',
        success: function(data) {
            for(item in data) {
                var curr = data[item];
                pop50[curr.itemid] = {"track": curr.title, "artist": curr.artist};
                pop50ids[item] = curr.itemid;
                $('#tracks').append(
                    $('<li>').append(
                        $('<span>').attr('class','track').append(" " + curr.title + " by " + curr.artist + " - " + (parseInt(item) + 1))
                    )
                );
                getUrlById(curr.itemid);
            }
        }
    });
}
    
//getUrlById("1x76v");
getTracksAndIds();
