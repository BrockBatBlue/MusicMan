var APIKey = "AIzaSyAIfrYqV42vZikjEowH8Lh4CtsgCpKMQXI";
var video = "";


$(".theButton").on("click", function(event){
    event.preventDefault();
    console.log("click");
    var userInput = $("#search").val().trim();
    console.log(userInput);
    videoSearch(APIKey, userInput, 5);

})

function videoSearch (key, search, maxResults) {
    $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search, function(data){
        console.log(data.items);
        data.items.forEach(function(item) {
            video = `
            <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
             `
            $(".videos").append(video);
        });
    })
}