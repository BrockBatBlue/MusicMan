// var APIKey = "AIzaSyAIfrYqV42vZikjEowH8Lh4CtsgCpKMQXI";
var video = "";
var APIKey = "AIzaSyAcAK8zAbrh0XiEyVmDFtrqIEnY7N4Qrag";

$(".theButton").on("click", function(event){
    event.preventDefault();
    console.log("click");
    var userInputArtist = $("#searchArtist").val().trim();
    var userInputSong = $("#searchSong").val().trim();
    console.log(userInputArtist);
    console.log(userInputSong);
    
    videoSearch(APIKey, userInputArtist, 3);
    
    lyricSearch();


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

function lyricSearch () {
    var userInputArtist = $("#searchArtist").val().trim().replace(/ /g, '+');
    var userInputSong = $("#searchSong").val().trim().replace(/ /g, '+');

    console.log(userInputArtist);
    console.log(userInputSong);
    $.get("https://api.lyrics.ovh/v1/" + userInputArtist + "/" + userInputSong, function (data) {
        document.getElementById("lyricsDisplay").innerHTML = data.lyrics.replace(new RegExp("\n", "g"), "<br>");
        console.log(data.lyrics);
    })
}

