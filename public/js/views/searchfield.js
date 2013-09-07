window.Searchfield = Backbone.View.extend({
	tagName: "form",
	className: "input-group",
	events: {
		"click 	.btn": "pickclass",
		"click 	.mana": "pickmana",
		"submit form": "searchtext"
	},
	initialize:function () {
		this.render();
	},

	pickclass: function(ev){
		searchmodel = this.model;
		var classname = $(ev.currentTarget).find('input').val();
		var filterred_cards= this.model.filter(function(card){
			return card.get("Class") == classname;
		});
		cardselectView.model.set(filterred_cards); 
		cardselectView.refresh();
		console.log("Card Select's model:", cardselectView.model);
	},
	render:function () {
		$(this.el).html(this.template());
		return this;
	}

});