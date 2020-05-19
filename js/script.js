// var APIKey = "AIzaSyAIfrYqV42vZikjEowH8Lh4CtsgCpKMQXI";
var video = "";
// var APIKey = "AIzaSyAcAK8zAbrh0XiEyVmDFtrqIEnY7N4Qrag";
var userArrayArtist = JSON.parse(localStorage.getItem("Last Artist")) || [];
var userArraySong = JSON.parse(localStorage.getItem("Last Song")) || [];
var arrayForSearch = [];
var storedLyrics = JSON.parse(localStorage.getItem("Saved Lyrics")) || [];

function newSearch () {
    var userInputArtist = $("#searchArtist").val().trim();
    var userInputSong = $("#searchSong").val().trim();
    console.log(userInputArtist);
    console.log(userInputSong);    

    // videoSearch(APIKey, userInputArtist, 3);
    lyricSearch();

}

function videoSearch (key, search, maxResults) {
    $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function(data){
        console.log(data.items);
        data.items.forEach(function(item, index) {
            video = `
            <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
             `
            $("#video" + (index + 1)).html(video);
            // var video1 = $("<iframe>").attr("class", "embed-responsive-item").attr("src", `http://www.youtube.com/embed/${item.id.videoId}`).attr("style", "height: 315; width:420")
            // $("#video1").append(video1);
            // console.log(index);
            
        });
    })
}

function lyricSearch () {
    var userInputArtist = $("#searchArtist").val().trim().replace(/ /g, '+');
    var userInputSong = $("#searchSong").val().trim().replace(/ /g, '+');

    console.log(userInputArtist);
    console.log(userInputSong);
    $.get("https://api.lyrics.ovh/v1/" + userInputArtist + "/" + userInputSong, function (data) {
        document.getElementById("lyricsDisplay").innerHTML = data.lyrics.replace(new RegExp("\n", "g"), "<br>");
        console.log(data.lyrics);
        console.log(artist);
        console.log(song);
        console.log(data);
        localStorage.setItem("Saved Lyrics", JSON.stringify(data));
        console.log(storedLyrics);
    })
}


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

}

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
}

var emptyArray = userArrayArtist || [];
var emptySongArray = userArraySong || [];
var objectArtist;
var objectSong;

function prueba(){
    // console.log(emptyArray.length);
    emptyArray.forEach(function(artist){
        // console.log(artist);
        // console.log(index);
        objectArtist = {
            Artist: artist,
        }
        // arrayForSearch.push(objectArtist);
        // console.log(objectArtist);
    });
    emptySongArray.forEach(function(song){
        // console.log(song);
        objectSong = {
            Song: song,
        }
        // arrayForSearch.push(objectSong);
    });

    console.log(objectArtist);
    console.log(objectSong);

    var finalSearchObj = {
        ...objectArtist,
        ...objectSong
}
    
    arrayForSearch.push(finalSearchObj);
    console.log(finalSearchObj);
    console.log(arrayForSearch);


    // toObject(objectArtist, objectSong);
};
prueba();
console.log(storedLyrics);
// function toObject (objArt, objSon) {
//     var finalObject = {
//         ...objArt,
//         ...objSon
//     }
//     arrayForSearch.push(finalObject);
//     console.log(finalObject);
// }

// All Event Listeners
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

// Fun mode event listener
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
})

$(".theButton").on("click", function(event){
    event.preventDefault();
    newSearch();

})

$(".input-group-field").on("keyup", function(event){
    if (event.keyCode === 13) {
        console.log("enter");
        newSearch();
    }
})



