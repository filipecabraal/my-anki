//slick carousel


// phrases array
var phrases = [];

// add phrases in array and localstorage
function addPhrase(pNormal, pTranslate){
	if(JSON.parse(localStorage.getItem("Phrases")) != null){ //checking if the arrays already was created
		phrases = []; //clear the array
		phrases = JSON.parse(localStorage.getItem("Phrases")); //including in array all phrases of localStorage
		phrases.push({normal: pNormal, translate: pTranslate}); //including the new phrase in array 
		localStorage.setItem("Phrases", JSON.stringify(phrases)); //update the localstorage
	} else {
		phrases.push({normal: pNormal, translate: pTranslate});
		localStorage.setItem("Phrases", JSON.stringify(phrases));
	}
};

// remove phrases from array and localstorage
function removePhrase(thePhrase){
	for(var i=0; i<phrases.length; i++){
		if(phrases[i].normal == thePhrase){
			var index = phrases.indexOf(phrases[i]);
			phrases.splice(index, 1);
			localStorage.setItem("Phrases", JSON.stringify(phrases));
		};
	};
};

// clear contents of inputs to the form
function clearInputs(){
	$('#phrase').val("");
	$('#translate').val("");
};

// randomize background color
function randomBg(){
	$('.flip-card-content').each(function(){
		var randomColor = 'rgb(' + (Math.floor((256-199)*Math.random()) + 200) + ',' + (Math.floor((256-199)*Math.random()) + 200) + ',' + (Math.floor((256-199)*Math.random()) + 200) + ')';
		$(this).css('background-color', randomColor);
	});
};

// click on card
function clickSpin(){
	$('.slick-slider').on('click', '.slick-center', function(){
		if($(this).hasClass('spin')){
			$(this).removeClass('spin');
		} else {
			$(this).addClass('spin');
		}
	});

	$('.slick-next').on('click', function(){
		$('.slick-center').removeClass('spin');
	});
};

// fill the content of your cards
function popCards(){
	phrases = JSON.parse(localStorage.getItem("Phrases"));

	for(var i=0;i<phrases.length;i++){
		console.log(phrases[i].normal);
		$('.carousel').append('<div class="flip-card"><div class="flip-card-content"><div class="front"><p>'+phrases[i].normal+'</p></div><div class="back"><p>'+phrases[i].translate+'</p></div></div></div>');
	}
};

$(function(){
	popCards();
	$('.carousel').slick({
	  centerMode: true,
	  centerPadding: '60px',
	  slidesToShow: 3,
	  draggable: false,
	  prevArrow: false, 
	  nextArrow: $('.btn-warning') 
	});

	// form action
	$('#form').on('submit', function(e){
		e.preventDefault();

		var textPhrase = $('#phrase').val(), //capturing the value of input 
			textTranslate = $('#translate').val(); //capturing the value of input
		addPhrase(textPhrase, textTranslate); //running the function to add phrases
		clearInputs(); //running the function to clear the inputs
	});

	// button to show your deck
	$('#see-your-deck').on('click', function(e){
		e.preventDefault();

		$('#form').hide();
		$('.loader').show();
		setTimeout(function(){
			$('.loader').hide();
			if($('.deck').hasClass('leave')){
				$('.deck').removeClass('leave');
			}
		}, 1000);
	});

	// button to add more phrases
	$('#add-cards').on('click', function(e){
		e.preventDefault();

		if(!$('.deck').hasClass('leave')){
			$('.deck').addClass('leave');
		}
		$('.loader').show();
		setTimeout(function(){
			$('.loader').hide();
			$('#form').show();
		}, 1000);
	});

	// randomize background color
	randomBg();
	
	// click on card
	clickSpin();
});