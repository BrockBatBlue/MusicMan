// var APIKey = "AIzaSyAIfrYqV42vZikjEowH8Lh4CtsgCpKMQXI";
var video = "";
var APIKey = "AIzaSyAcAK8zAbrh0XiEyVmDFtrqIEnY7N4Qrag";
var userArrayArtist = JSON.parse(localStorage.getItem("Last Artist")) || [];
var userArraySong = JSON.parse(localStorage.getItem("Last Song")) || [];
var lastArtist = $("#lastSearches");
var lastSong = $("#lastSong");

lastSearchArtist();
lastSearchSong();
function lastSearchArtist () {
    lastArtist.empty()
    // console.log("connected");
    for (var i = 0; i < userArrayArtist.length; i ++) {
        var newLi = $("<a>").attr("class", "secondary button searchBtn").attr("data-name", userArrayArtist[i]);
        newLi.text(userArrayArtist[i]);
        // console.log(userArrayArtist[i]);
        lastArtist.prepend(newLi);
    }

    
}

function lastSearchSong () {
    lastSong.empty()
    // console.log("connected");
    for (var i = 0; i < userArraySong.length; i ++) {
        var newLi2= $("<a>").attr("class", "secondary button searchBtn").attr("data-name", userArraySong[i]);
        newLi2.text(userArraySong[i]);
        // console.log(userArraySong[i]);

        lastSong.prepend(newLi2);
    }
    $(".searchBtn").on("click", function(event){
        event.preventDefault();
        console.log("clicked last result");
        window.open("index.html");
        var userInputArtist = $(this).data("name");
        var userInputSong =$(this).data("name");
        // videoSearch(APIKey, userInputArtist, 3);
        console.log(userInputArtist);
        console.log(userInputSong);
        // lyricSearch(userInputArtist, userInputSong)


    })
    
}

