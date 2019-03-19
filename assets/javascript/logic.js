$(document).ready(function () {

    let buttArray = ["Blackberries", "Elephant", "J.Cole"];

    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

        //<button class ="button" data-topic="cat">meow</button>

    for (let i = 0; i<buttArray.length; i++) {
        let button = $("<button>");
        button.addClass("button");
        button.attr("data-topic", buttArray[i]);
        button.text(buttArray[i]);
        console.log(buttArray[i]);
        $("#button-here").append(button);
    }

    //$("button").on("click", function () {
        $("#button-here").on("click", ".button", function () {
        // Grabbing and storing the data-topic property value from the button
        var topic = $(this).attr("data-topic");

        // Constructing a queryURL using the animal name
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=dc6zaTOxFJmzC&limit=20";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
    
            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);
                console.log(response);


                const results = response.data;

                console.log(results);

                for (var i = 0; i < results.length; i++) {

                    //Creating and storing a div tag
                    var topicDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var topicImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    topicImage.attr("src", results[i].images.fixed_height_still.url);
                    topicImage.addClass("gif");
                    topicImage.attr("data-state", "still");
                    topicImage.attr("data-animate", results[i].images.fixed_height.url)
                    topicImage.attr("data-still", results[i].images.fixed_height_still.url)
                    // Appending the paragraph and image tag to the animalDiv
                    topicDiv.append(p);
                    topicDiv.append(topicImage);

                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(topicDiv);
                }
            });
        });
    

    $("#gifs-appear-here").on("click", "img", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

// function to display buttons

    function renderButtons(buttonName) {

        let button = $("<button>");
        button.addClass("button");
        button.attr("data-topic", buttonName);
        button.text(buttonName);
        console.log(buttonName);
        $("#button-here").append(button);
    }
      // This function handles events where one button is clicked
      $("#add-topic").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var newTopic = $("#search-input").val().trim();
       

        
        renderButtons(newTopic);
      });
}); //End of Document.ready
