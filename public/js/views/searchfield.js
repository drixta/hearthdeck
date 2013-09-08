window.Searchfield = Backbone.View.extend({
	tagName: "form",
	className: "input-group",
	events: {
		"click 	.classname": "pickclass",
		"click 	.mana": "pickmana",
		"keyup .input-lg": "searchtext"
	},
	initialize:function () {
		classname = "both";
		mana = "all";
		text = "";
	},

	pickclass: function(ev){
		classname = $(ev.currentTarget).find('input').val();
		this.filterfields();	
	},

	pickmana: function(ev){
		mana = $(ev.currentTarget).find('input').val();
		this.filterfields();
	},

	searchtext: function(ev){
		text = $(ev.currentTarget).val();
		this.filterfields();
	},

	filterfields: function(){
		var filterred_cards = this.model;
		if (classname != "both"){
			filterred_cards = filterred_cards.filter(function(card){
				return card.get("Class") == classname;
			});
		}
		if (text != ""){
			filterred_cards = filterred_cards.filter(function(card){
				return card.get("Name").indexOf(text) != -1 || (card.get("Description").indexOf(text) != -1) || card.get("Rarity").indexOf(text) != -1 || card.get("Subtype").indexOf(text) != -1;
			});
		}
		if (mana == "7"){
			filterred_cards = filterred_cards.filter(function(card){
				return card.get("Mana") >= 7;
			});
		}
		if (mana != "all" && mana != "7"){
			filterred_cards = filterred_cards.filter(function(card){
				return card.get("Mana") == mana;
			});
		}
		if (mana == "all"){
			filterred_cards = filterred_cards.filter(function(card){return card;});
		}
		cardselectView.model.set(filterred_cards); 
		cardselectView.refresh();
	},
	render:function () {
		$(this.el).html(this.template());
		return this;
	}

});