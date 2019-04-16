//create array and set variables
var myGiphyArry = ["Cardi B", "Panda", "GOT", "Communism", "Vladimir Lenin", "Donald Trump",
  "Ariana Grande", "Drake", "Noah Centineo", "Sassy", "Drunk", "Quavo", "Girl Fight"];
var currentGiphy;
var arryOfGif;
var arryOfPausedGif;
var newGiphy;
var giph;


//the hardest part
function displayGiphy(){

	$("#giphyDiv").html('');
  var giphyChoice = $(this).attr('data-name');
  //put url plus var plus my api key//
  var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" +giphyChoice+ "&api_key=euFDbUjVPVGaEwfMF5IvRkOY44l00ykD";
  //call ajax //
	$.ajax({ url: giphyURL, method: 'GET'})
	.done(function(giphyData){
		console.log(giphyURL);
	currentGiphy = giphyData.data;
	//read array, play/pause giphies, append the newly added giphies to the end//
	$.each(currentGiphy, function(index, value){
	arryOfGif= value.images.original.url;
	arryOfPausedGif = value.images.original_still.url;
	newGiphy = $('<img class="img-rounded">');
	newGiphy.attr('src', arryOfPausedGif);
	newGiphy.addClass('choice');
	newGiphy.attr('data-play', arryOfGif);
	newGiphy.attr('data-paused', arryOfPausedGif);
	$("#giphyDiv").append(newGiphy);
	});
});
}
// attribute class.
//videos play when mouse hovers over and stop on mouseleave
$(document).on('mouseover','.choice', function(){
           $(this).attr('src', $(this).data('play'));                 
}); 
$(document).on('mouseleave','.choice', function(){
           $(this).attr('src', $(this).data('paused'));                   
});

// show list of the button
function addNewGiphyButton(){
	$("#giphyList").html('');
	for (var i=0; i<myGiphyArry.length; i++){
		giph = $('<button id="btn" class="btn btn-warning">');
		giph.addClass("giphyChoice");
		giph.attr('data-name', myGiphyArry[i]);
		giph.text(myGiphyArry[i]);
		$("#giphyList").append(giph);
	}
}
// add new buttons
$("#addButton").on('click', function(){
	var giphyChoice = $("#giphy-add").val().trim();
	myGiphyArry.push(giphyChoice);
	addNewGiphyButton();
	return false;
});
//on click function
addNewGiphyButton();
$(document).on('click', '.giphyChoice', displayGiphy);
