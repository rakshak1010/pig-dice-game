/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var current=0, active=0;
var playing = true;

$(".btn-new").on('click', init);

function init(){
	playing = true;
	$("#score-0").html('0');
	$("#score-1").html('0');
	$("#current-0").html('0');
	$("#current-1").html('0');
	$(".player-"+active+"-panel").removeClass('winner');
	
	var player = active+1;
	$("#name-"+active).html('Player ' + player);


	$(".player-0-panel").addClass("active");
	$(".player-1-panel").removeClass("active");
	$(".dice").show();	
	active = 0;
	current = 0;
}

$(".btn-roll").on('click', function(){
	rollButton();
});

$(".btn-hold").on('click', function(){
	holdButton();
});

$(document).on('keyup', function(e){
	if(playing){
		if(e.key === 'Enter'){
			holdButton();
		}else if(e.key === ' '){
			rollButton();
		}
	}
});

function togglePlayer() {
	$(".player-0-panel").toggleClass("active");
	$(".player-1-panel").toggleClass("active");
	$("#current-"+active).html('0');
	
	active ^= 1;
	current = 0;
}

function sound(key){
	var audio = new Audio('./sounds/' + key + '.mp3');
	audio.play();
}

function holdButton(){
	if(playing){
		var score = Number($("#score-" + active).html());
		$("#score-"+active).html(score + current);

		if(score+current > 100){
			sound('win');
			$(".player-"+active+"-panel").addClass('winner');
			$(".player-"+active+"-panel").removeClass('active');
			$("#name-"+active).html('Winner!');
			$(".dice").hide();
			playing = false;	
		}
		else{
			togglePlayer();
		}
	}
}

function rollButton(){
	if(playing){
		var dice = Math.floor(Math.random()*6 + 1);
		var image = "./images/dice-" + dice + ".png"

		$(".dice").attr("src", image);
		if(dice==1){
			sound('wrong');
			setTimeout(togglePlayer, 400);
		}else{
			current += dice;
			$("#current-"+active).html(current);
		}
	}
}