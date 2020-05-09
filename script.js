var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://mourits-lyrics.p.rapidapi.com/errors",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "mourits-lyrics.p.rapidapi.com",
		"x-rapidapi-key": "5b4351e4f6msh3dab5ef62a861f4p1c281fjsn1afdcc00f58e"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});