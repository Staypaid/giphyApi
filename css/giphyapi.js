
var emotionsGiphyArry = ["Cardi B", "Panda", "GOT", "Communism", "Vladimir Lenin", "Donald Trump",
  "Ariana Grande", "Drake", "Noah Centineo", "Sassy", "Drunk", "Quavo", "Girl Fight"];
var currentGiphy;
var arryOfGif;
var arryOfPausedGif;
var newGiphy;
var giph;

function displayGiphy(){

	$("#giphyDiv").html('');
	var giphyChoice = $(this).attr('data-name');
	var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" +giphyChoice+ "&api_key=euFDbUjVPVGaEwfMF5IvRkOY44l00ykD";
	$.ajax({ url: giphyURL, method: 'GET'})
	.done(function(giphyData){
		console.log(giphyURL);
	currentGiphy = giphyData.data;
	
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
$(document).on('mouseover','.choice', function(){
           $(this).attr('src', $(this).data('play'));                 
}); 
$(document).on('mouseleave','.choice', function(){
           $(this).attr('src', $(this).data('paused'));                   
});

// show list of the button
function addNewGiphyButton(){
	$("#giphyList").html('');
	for (var i=0; i<emotionsGiphyArry.length; i++){
		giph = $('<button id="btn" class="btn btn-warning">');
		giph.addClass("giphyChoice");
		giph.attr('data-name', emotionsGiphyArry[i]);
		giph.text(emotionsGiphyArry[i]);
		$("#giphyList").append(giph);
	}
}
// add new buttons
$("#addButton").on('click', function(){
	var giphyChoice = $("#giphy-add").val().trim();
	emotionsGiphyArry.push(giphyChoice);
	addNewGiphyButton();
	return false;
});
addNewGiphyButton();
$(document).on('click', '.giphyChoice', displayGiphy);
