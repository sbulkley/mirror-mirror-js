(function($) {

var hypeURL = "https://api.hypem.com/v2/popular?mode=now&page=1&count=50&key=swagger";

$.ajax({
    url: hypeURL,
    dataType: 'json',
    success: function(data) {
        for(item in data) {
            top50ids.push(data[item].itemid);
            $('#tracks').append(
                $('<li>').append(
                    $('<span>').attr('class','track').append(" " + data[item].title + " by " + data[item].artist + " - " + (parseInt(item) + 1))
                )
            );
        }
    }
});

})(jQuery);