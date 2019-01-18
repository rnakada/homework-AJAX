
// list of arrays
var topics = ["Gym", "Food", "Money", "Happy", "BMW M3", "Lamborghini", "McLaren", "Audemars", "Hublot", "NASDAQ", "Poker"];

function display() {

    $("#gifs-view").empty();

    var topics = $(this).attr("data-name");
    // API key from website
    var API = "ADiPPX3uge4AgVzcZ8qPm90bVeoQ6Z04";
    // Added topics and API key to the URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=" + API + "&limit=20";
    console.log(queryURL);
    // JQuery is using AJAX to call the data from the URL and using the method "GET" to retrieve
    $.ajax({
        url: queryURL,
        method: "GET"
    // Creating a function with a variable response
    }).then(function (response) {
        console.log(response);

        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var images = $("<img>");
            images.attr("src", results[i].images.fixed_height_still.url);
            images.attr("data-still", results[i].images.fixed_height_still.url);
            images.attr("data-animate", results[i].images.fixed_height.url);
            images.attr("data-state", "still");
            images.addClass("images");

            gifDiv.append(p);
            gifDiv.append(images);
            $("#gifs-view").prepend(gifDiv);
        }

        $(".images").on("click", function() {
            var state = $(this).attr("data-state");        

            if ( state === "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }
        
        });

    });
};

// displaying more buttons
function renderButtons() {

    $("#gif-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var gifButton = $("<button>");
        gifButton.addClass("topic");
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#gif-buttons").append(gifButton);
    };
};

$("#addGifs").on("click", function (event) {
    event.preventDefault();

    var topic = $("#gif-input").val().trim();

    topics.push(topic);

    renderButtons();

});

$("input:text").focus(function() {
    $(this).val("");
});

$(document).on("click", ".topic", display);

renderButtons();