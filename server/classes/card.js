
var Card = function(value) {
	this.value = value;

	var __construct = function(){
		// ...
	}(this);
	
	this.compare = function(card) {
		console.log("Comparing this.value = ");
		console.log(this.value);
		console.log(" against ");
		console.log(card.getValue());

		if (this.value < card.getValue()) {
			return -1;
		}

		if (this.value == card.getValue()) {
			return 0;
		}

		if (this.value > card.getValue()) {
			return 1;
		}
	}

	this.isGreater = function(card) {
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