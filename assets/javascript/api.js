$(document).ready(function () {

    //GIFY endpoint -->
    //https://api.giphy.com/v1/gifs/search?api_key=5LUQ4rstm0r46r5SCZgc99E9VXdIFIMo&q=football&limit=10&offset=0&rating=G&lang=en

    let sports = ["soccer", "football", "baseball", "hockey", "boxing", "golf", "tennis", "basketball"];

    function displayGif() {

        let apiKey = "5LUQ4rstm0r46r5SCZgc99E9VXdIFIMo"
        let sport = $(this).attr("data-name");
        let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${sport}&limit=10&offset=0&rating=G`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            let results = response.data;

            for (let i = 0; i < results.length; i++) {

                let gifDiv = $("<div>");
                gifDiv.addClass("gifdiv");

                let pRating = $("<p>");
                pRating.text("Rating: " + results[i].rating);

                let sportImage = $("<img>");
                sportImage.addClass("sportgif");
                sportImage.attr("src", results[i].images.fixed_height_still.url);
                gifDiv.append(pRating);
                gifDiv.append(sportImage);

                $("#gifs-view").prepend(gifDiv);
            }
        });
    }

    $(".sportgif").on("click", function() {

        let src = $(this).attr(sportImage);
        if($(this).hasClass('playing')) {
            $(this).attr(sportImage, src.replace(/\.gif/i, "_s.gif"))
            $(this).removeClass('playing');
        }
        else {
            $(this).addClass('playing');
            $(this).attr(sportImage, src.replace(/\_s.gif/i, ".gif"))
        }

    });

    function displayButtons() {

        $("#buttons-view").empty();

        for (let i = 0; i < sports.length; i++) {
            let sportBtn = $("<button>");
            sportBtn.addClass("sport");
            sportBtn.attr("data-name", sports[i]);
            sportBtn.text(sports[i]);
            $("#buttons-view").append(sportBtn);
        }
    }

    $("#add-gif").on("click", function (event) {
        event.preventDefault();

        let sportGif = $("#gif-input").val().trim();
        sports.push(sportGif);
        displayButtons();
    });

    $(document).on("click", ".sport", displayGif);
    displayButtons();

})