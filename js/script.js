// var APIKey = "AIzaSyAIfrYqV42vZikjEowH8Lh4CtsgCpKMQXI";
// var APIKey = "AIzaSyAcAK8zAbrh0XiEyVmDFtrqIEnY7N4Qrag";
var userArrayArtist = JSON.parse(localStorage.getItem("Last Artist")) || [];
var userArraySong = JSON.parse(localStorage.getItem("Last Song")) || [];
var video = "";
var carousel = $(".videos")

$(document).ready(function(){
    carousel.css("display", "none");

});

// This is what happens when you click the search button

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

// Function for searching videos using Youtube API

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

// Function for searching lyrics using Lyrics OVH

function lyricSearch (artist, song) {
    var artist = $("#searchArtist").val().trim().replace(/ /g, '+');
    var song = $("#searchSong").val().trim().replace(/ /g, '+');

    $.get("https://api.lyrics.ovh/v1/" + artist + "/" + song, function (data) {
        $("#lyricsDisplay").html(data.lyrics.replace(new RegExp("\n", "g"), "<br>"));
        
        localStorage.setItem("Saved Lyrics", JSON.stringify(data));
    })
};

// Function for storing de artist name in local storage

function storeDataArtist () {
    var userInputArtist = $("#searchArtist").val().trim().replace(/ /g, '+');
    var containsSearch = false;

    if (userArrayArtist != null) {
        
        $(userArrayArtist).each(function(x) {
            if (userArrayArtist[x] === userInputArtist) {
                // containsSearch = true;
            }
        });
    }

    if (containsSearch === false) {
        userArrayArtist.push(userInputArtist)
    }

    localStorage.setItem("Last Artist", JSON.stringify(userArrayArtist));
    console.log(userArrayArtist);

};

// Function for storing the song name in local storage

function storeDataSong () {
    var userInputSong = $("#searchSong").val().trim().replace(/ /g, '+');
    var containsSearch = false;

    if (userArraySong != null) {
        
        $(userArraySong).each(function(x) {
            if (userArraySong[x] === userInputSong) {
                // containsSearch = true;
            }
        });
    }

    if (containsSearch === false) {
        userArraySong.push(userInputSong)
    }

    localStorage.setItem("Last Song", JSON.stringify(userArraySong));

};

// Function for making the carousel sticky

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

// This hides the carousel, if the user wants to hide it, but he doesn't have to... personal choice

    $("#hide").click(function(){
      $(".orbit-container").hide();
      $(".orbit-bullets").hide();
      $(".orbit-previous").hide();
      $(".orbit-next").hide();
    });

    $("#show").click(function(){
      $(".orbit-container").show();
      $(".orbit-bullets").show();
      $(".orbit-previous").show();
      $(".orbit-next").show();
    });

// Event listener for the search button

$(".theButton").on("click", function(event){
    event.preventDefault();
    newSearch();
    $('.videos').css("display","block");
    $('ul li:first-child').addClass("is-active");

});

// Event listener for Enter Key

$(".input-group-field").on("keyup", function(event){
    if (event.keyCode === 13) {
        newSearch();
        $('.videos').css("display","block");
        $('ul li:first-child').addClass("is-active");
    
    }
});

// This makes the karaoke button change the background to a more 'fun' animated video

$(".karaoke").on("click", function(){
    var background = $("#bgvid");
    var body = $("#app-body")
    if (background.css("display") === "none") {
        background.css("display", "block");
        body.css("color", "white");
    } else {
      background.css("display","none");
      body.css("color","black");

    }
});





