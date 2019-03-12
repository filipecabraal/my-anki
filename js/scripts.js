//slick carousel


// phrases array
var phrases = [];

// add phrases in array and localstorage
function addPhrase(n, t){
	if(JSON.parse(localStorage.getItem("Phrases")) != null){ //checking if the arrays already was created
		phrases = []; //clear the array
		phrases = JSON.parse(localStorage.getItem("Phrases")); //including in array all phrases of localStorage
		phrases.push({normal: n, translate: t}); //including the new phrase in array 
		localStorage.setItem("Phrases", JSON.stringify(phrases)); //update the localstorage
	} else {
		phrases.push({normal: n, translate: t});
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

// how many cards do you have
// function fillNumber(){
// 	var nCards = $('')
// }

$(function(){
	phrases = JSON.parse(localStorage.getItem("Phrases"));
	console.log(phrases);

	// form action
	$('#form').on('submit', function(e){
		e.preventDefault();

		var textPhrase = $('#phrase').val(), //capturing the value of input 
			textTranslate = $('#translate').val(); //capturing the value of input
		addPhrase(textPhrase, textTranslate); //running the function to add phrases
		clearInputs(); //running the function to clear the inputs
	});

	$('#see-your-deck').on('click', function(e){
		e.preventDefault();

		if(!$('#form').hasClass('leave')){
			$('#form').addClass('leave');
			$('.loader').removeClass('leave');

			setTimeout(function(){
				if($('.deck').hasClass('leave')){
					$('.carousel').slick({
					  centerMode: true,
					  centerPadding: '60px',
					  slidesToShow: 3,
					  draggable: false,
					  prevArrow: false, 
					  nextArrow: $('.btn-warning') 
					});
					$('.loader').addClass('leave');	
					$('.deck').removeClass('leave');
				}
			}, 1000);
		}
	});

	$('#add-cards').on('click', function(e){
		e.preventDefault();

		if(!$('.deck').hasClass('leave')){
			$('.deck').addClass('leave');
			$('.loader').removeClass('leave');

			setTimeout(function(){
				if($('#form').hasClass('leave')){
					$('.loader').addClass('leave');	
					$('#form').removeClass('leave');
				}
			}, 1000);
		}
	});

	// randomize background color
	randomBg();
	
	// click on card
	clickSpin();
});