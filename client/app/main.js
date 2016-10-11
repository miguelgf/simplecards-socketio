
function renderCard(card) {
	return '<div class="card" onclick="selectCard(' + card.value + ');" id="card' + card.value + '" data-value="' + card.value + '">' + card.value + '</div>';
}

function selectCard(cardValue) {
	$('.card').removeClass('selected');

	$('#card' + cardValue).addClass('selected');

	socket.emit('cardSelected', cardValue);
}