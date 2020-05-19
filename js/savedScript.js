// var APIKey = "AIzaSyAIfrYqV42vZikjEowH8Lh4CtsgCpKMQXI";
var APIKey = "AIzaSyAdV2wbcQnrRAYhPMUNa2fvWPog0KKf3Dk"
// var APIKey ="AIzaSyC06MD-KSKvZjt5u-g6QR7T2LZpXQclNs8"
// var APIKey = "AIzaSyAcAK8zAbrh0XiEyVmDFtrqIEnY7N4Qrag";
var userArrayArtist = JSON.parse(localStorage.getItem("Last Artist")) || [];
var userArraySong = JSON.parse(localStorage.getItem("Last Song")) || [];
var lastArtist = $("#lastSearches");
var lastSong = $("#lastSong");
var video = "";

lastSearchArtist();
lastSearchSong();

function lastSearchArtist () {
    lastArtist.empty()
    // console.log("connected");
    for (var i = 0; i < userArrayArtist.length; i ++) {
        var newLi = $("<a>").attr("class", "secondary button searchBtnArt").attr("data-artist", userArrayArtist[i]).attr("data-song", userArraySong[i]);
        newLi.text(userArrayArtist[i]);
        lastArtist.prepend(newLi);
    }
};

function lastSearchSong () {
    lastSong.empty()
    for (var i = 0; i < userArraySong.length; i ++) {
        var newLi2= $("<a>").attr("class", "secondary button searchBtnSng").attr("data-song", userArraySong[i]).attr("data-artist", userArrayArtist[i]);
        newLi2.text(userArraySong[i]);

        lastSong.prepend(newLi2);
    }    
};

function lyricSearchSuggest (song) {

    $.get("https://api.lyrics.ovh/suggest/" + song, function (data) {
        // document.getElementById("lyricsDisplay").innerHTML = data.lyrics.replace(new RegExp("\n", "g"), "<br>");
        console.log(data.lyrics);
        console.log(song);
        console.log(data);
        localStorage.setItem("Saved Lyrics", JSON.stringify(data));
        console.log(storedLyrics);
    })
};

function searchVideo (artist) {
    console.log("clicked last result");
    var userInputArtist = artist;
    // videoSearch(APIKey, userInputArtist, 3);

};
function lyricSearchPrueba (artist, song) {

    $.get("https://api.lyrics.ovh/v1/" + artist + "/" + song, function (data) {

        $("#lyricsDisplaySaved").html(data.lyrics.replace(new RegExp("\n", "g"), "<br>"));
        console.log(data.lyrics);
        localStorage.setItem("Saved Lyrics", JSON.stringify(data));
    })
};

// All event listeners

$(".searchBtnArt").on("click", function(event){
    event.preventDefault();
    searchVideo($(this).data("artist"));
    console.log($(this).data("artist"));
});

$(".searchBtnSng").on("click", function(event){
    event.preventDefault();
    lyricSearchPrueba($(this).data("artist"), $(this).data("song"));
    console.log($(this).data("song"));
    console.log($(this).data("artist"));
});

var dataSong;

$(".searchBtnSng").on("click", function(event){
    event.preventDefault();
    // searchSong($(this).data("artist"), $(this).data("song"));
    // console.log($(this).data("song"));
    dataSong = $(this).data("song");
    console.log(dataSong);
    console.log(userArrayArtist);
    console.log(userArraySong[1]);
})







