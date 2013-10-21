$(document).ready(function() {

function add() {
	var value = $("#newTodo").val();
    $('#todos').append("<li>" + value + "</li>");

}

function clear() {
	if (confirm ("Take it all down?"))
    $('#todos').empty();

}


$("#addTodoBtn").on("click", add);



$("#dele").on("click", clear);



  /////////
  // EXERCISE 3



});
