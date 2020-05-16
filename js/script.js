// var APIKey = "AIzaSyAIfrYqV42vZikjEowH8Lh4CtsgCpKMQXI";
var video = "";
var APIKey = "AIzaSyAcAK8zAbrh0XiEyVmDFtrqIEnY7N4Qrag";
var userArrayArtist = JSON.parse(localStorage.getItem("Last Artist")) || [];
var userArraySong = JSON.parse(localStorage.getItem("Last Song")) || [];

$(".theButton").on("click", function(event){
    event.preventDefault();
    var userInputArtist = $("#searchArtist").val().trim();
    var userInputSong = $("#searchSong").val().trim();
    console.log(userInputArtist);
    console.log(userInputSong);    
    
    // videoSearch(APIKey, userInputArtist, 3);
    lyricSearch();
    storeDataArtist();
    storeDataSong();
    $("#searchArtist").val("");
    $("#searchSong").val("");

})

$(".input-group-field").on("keyup", function(event){
    if (event.keyCode === 13) {
        console.log("enter");
        $(".theButton").click();
    }
})

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
            console.log(index);
            
        });
    })
}

function lyricSearch (artist, song) {
    var artist = $("#searchArtist").val().trim().replace(/ /g, '+');
    var song = $("#searchSong").val().trim().replace(/ /g, '+');

    $.get("https://api.lyrics.ovh/v1/" + artist + "/" + song, function (data) {
        document.getElementById("lyricsDisplay").innerHTML = data.lyrics.replace(new RegExp("\n", "g"), "<br>");
        console.log(data.lyrics);
        console.log(artist);
        console.log(song);
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

}






