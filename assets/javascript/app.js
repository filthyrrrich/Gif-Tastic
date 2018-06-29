$(document).ready(function () {

var movieArr = ["Step Brothers", "Old School", "Talladega Nights", "Deadpool", "Pulp Fiction", "Grandma's Boy", "Idiocracy", "Forest Gump", "Terminator", "Super Troopers", "Bad Boys", "Dumb and Dumber", "Kill Bill", "Encino Man" ];

var getMovie;
var queryURL;
var gifStill;
var gifAnimated;

generateButtons();

// click event for buttons
$("#movieButtons").on("click", ".btn-primary", function() {
    var movie = $(this).attr("data-value").replace(/\s/g, "+");
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=XmJWOu35PX836pT7csU5IJa7MEccOZEW&limit=12";
    generateGif();
    console.log(movie);
    console.log(queryURL);
});

// adds inputed value when clicked submit
$("#addMovie").on("click", function() {
    event.preventDefault();
    getMovie = $("#movieInput").val().trim();
    if (!getMovie) {
        alert("Please enter a movie!")
    } else {
        movieArr.push(getMovie);
        generateButtons();
        $("#movieInput").val("");
    }
    
});

// click event to animate gifs
$("#movies").on("click", "img", function() {
    var state = $(this).attr("data-state");

    if(state === "still"){
        var dAni = $(this).attr("data-animate")
        $(this).attr("src", dAni);
        $(this).attr("data-state", "animated");
        
    } else {
        var dStill = $(this).attr("data-still")
        $(this).attr("src", dStill);
        $(this).attr("data-state", "still");
    }
})


function generateButtons () {
    $("#movieButtons").empty();
    for (let i = 0; i < movieArr.length; i++) {
        var b = $("<button>");
        b.addClass("btn btn-primary").attr("data-value", movieArr[i]);
        b.text(movieArr[i]);
        $("#movieButtons").append(b);
    }    
}

function generateGif() {
    $("#movies").empty();
    for (let g = 0; g < 12; g++) {
        $.ajax({
            url: queryURL,
            method: "GET"
        })  
            .done(function(response) {
            var thumbnail = $("<div class='thumbnail'>");
            var gif = $("<img>");
            var rating = $("<p>");
            gifStill = response.data[g].images.fixed_width_still.url;
            gifAnimated = response.data[g].images.fixed_width.url;
            gifRating = response.data[g].rating;
            gif.attr("src", gifStill);
            gif.attr("data-still", gifStill);
            gif.attr("data-animate", gifAnimated);
            gif.attr("data-state", "still");
            rating.append("Rated: " + gifRating);
            thumbnail.append(gif);
            thumbnail.append(rating);
            $("#movies").append(thumbnail);
        });
        
    }
    
}

});