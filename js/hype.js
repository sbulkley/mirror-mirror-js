var hype = require("node-hypem")

var top50 = []

function handleTrack(rank, title, artist, id) {
  top50.push({title: title, artist: artist, id: id})
}

function displayTop50() {
  for(x = 0; x <= 49; x++) {
    $('#tracks').append(
      $('<li>').append(
        $('<span>').attr('class','track').append(" " + top50[x].title + " by " + top50[x].artist + " - " + (x + 1))
      )
    );
  };
}

function saveTop50() {
  for(x = 0; x <= 49; x++) {
    top50ids.push(top50[x].id);
  }
}

hype.playlist.popular("all", 1, function(err, res) {
  for(i = 0; i <= 19; i++) {
    handleTrack((i + 1), res[i.toString()]["title"], res[i.toString()]["artist"], res[i.toString()]["mediaid"])
  }
  hype.playlist.popular("all", 2, function(err, res) {
    for(i = 0; i <= 19; i++) {
      handleTrack((i + 21), res[i.toString()]["title"], res[i.toString()]["artist"], res[i.toString()]["mediaid"])
    }
    hype.playlist.popular("all", 3, function(err, res) {
      for(i = 0; i <= 9; i++) {
        handleTrack((i + 41), res[i.toString()]["title"], res[i.toString()]["artist"], res[i.toString()]["mediaid"])
      }
      displayTop50()
      saveTop50()
      //getChoice()
    })
  })
})

