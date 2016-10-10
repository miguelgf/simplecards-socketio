
var Card = function(value) {
	this.value = value;

	var __construct = function(){
		// ...
	}(this);

	
	this.isGreater = function(card){		
		return this.value > card.getValue() ?  true :  false;
	};

	this.getValue = function(){
		return this.value;
	};

	this.prettyPrint = function(){
		console.log(this.getValue());
	}

}


module.exports = Card;