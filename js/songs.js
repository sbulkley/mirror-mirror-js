var fs = require("fs");

fs.readdir("../tracks/", function (err, files) { 
	if (!err) { 
		hasTrack = [];
		for(file in files) {
			hasTrack.push(files[file].split('.')[0]);
		}
	} else {
		throw err;
	}
});
