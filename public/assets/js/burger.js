$(function () {
  // When devour-button clicked, makes ajax request to PUT new data 
  $(".devour").on("click", function (event) {
    var id = $(this).data("id");
    var newDevour = $(this).data("newdevour");

    var newlyDevoured = {
      devoured: newDevour
    };

    // PUT request.
    $.ajax("/api/devoured/" + id, {
      type: "PUT",
      data: newlyDevoured
    }).then(
      function () {
        // Reloads page
        location.reload();
      }
    );
  });
  // When submitted, whether clicked or entered, sends new data to be added to database
  $(".create-form").on("submit", function (event) {
    event.preventDefault();
    var newBurger = {
      name: $("#ca").val().trim(),
    };
    // POST request.
    $.ajax("/api/devoured", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        // Reloads page
        location.reload();
      }
    );
  });
});
