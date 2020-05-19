// var APIKey = "AIzaSyAIfrYqV42vZikjEowH8Lh4CtsgCpKMQXI";
// var APIKey = "AIzaSyAcAK8zAbrh0XiEyVmDFtrqIEnY7N4Qrag";
var userArrayArtist = JSON.parse(localStorage.getItem("Last Artist")) || [];
var userArraySong = JSON.parse(localStorage.getItem("Last Song")) || [];
var video = "";


$(".theButton").on("click", function(event){
    event.preventDefault();
    newSearch();

});

function newSearch () {
    var userInputArtist = $("#searchArtist").val().trim();
    var userInputSong = $("#searchSong").val().trim();

    // videoSearch(APIKey, userInputArtist + "+" + userInputSong, 3);
    lyricSearch();
    storeDataArtist();
    storeDataSong();
    $("#searchArtist").val("");
    $("#searchSong").val("");

};

$(".input-group-field").on("keyup", function(event){
    if (event.keyCode === 13) {
        console.log("enter");
        newSearch();
    }
});

function videoSearch (key, search, maxResults) {
    $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function(data){
        console.log(data.items);
        data.items.forEach(function(item, index) {
            video = `
            <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
             `
            $("#video" + (index + 1)).html(video);
            
        })
    })
};

function lyricSearch (artist, song) {
    var artist = $("#searchArtist").val().trim().replace(/ /g, '+');
    var song = $("#searchSong").val().trim().replace(/ /g, '+');

    $.get("https://api.lyrics.ovh/v1/" + artist + "/" + song, function (data) {
        $("#lyricsDisplay").html(data.lyrics.replace(new RegExp("\n", "g"), "<br>"));
        
        localStorage.setItem("Saved Lyrics", JSON.stringify(data));
    })
};

function storeDataArtist () {
    var userInputArtist = $("#searchArtist").val().trim().replace(/ /g, '+');
    var containsSearch = false;

    if (userArrayArtist != null) {
        
        $(userArrayArtist).each(function(x) {
            if (userArrayArtist[x] === userInputArtist) {
                containsSearch = true;
            }
        });
    }

    if (containsSearch === false) {
        userArrayArtist.push(userInputArtist)
    }

    localStorage.setItem("Last Artist", JSON.stringify(userArrayArtist));
    console.log(userArrayArtist);

};

function storeDataSong () {
    var userInputSong = $("#searchSong").val().trim().replace(/ /g, '+');
    var containsSearch = false;

    if (userArraySong != null) {
        
        $(userArraySong).each(function(x) {
            if (userArraySong[x] === userInputSong) {
                containsSearch = true;
            }
        });
    }

    if (containsSearch === false) {
        userArraySong.push(userInputSong)
    }

    localStorage.setItem("Last Song", JSON.stringify(userArraySong));
    console.log(userArraySong);

};

// This makes the karaoke button change the background to a more 'fun' animated video

$(".karaoke").on("click", function(){
    var background = document.getElementById("bgvid");
    var body = document.getElementById("app-body")

    if (background.style.display === "none") {
    background.style.display = "block";
    body.style.color = "white";

    } else {
      background.style.display = "none";
      body.style.color = "black";
    }
});

// This makes the the carousel sticky

(function($) {
	var $window = $(window);
	var $videoWrap = $('.videos');
	var $video = $('.orbit');
	var videoHeight = $video.outerHeight();

	$window.on('scroll', function() {
		var windowScrollTop = $window.scrollTop();
		var videoBottom = videoHeight + $videoWrap.offset().top;
		
		if (windowScrollTop > videoBottom) {
			$videoWrap.height(videoHeight);
			$video.addClass('stuck');
		} else {
			$videoWrap.height('auto');
			$video.removeClass('stuck');
		}
	});
}(jQuery));

