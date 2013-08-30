window.Card = new Backbone.Model.extend({
	urlRoot = "/cards",
	defaults: {
		"Name": "",
		"Rarity": "",
		"Class": "",
		"Mana": "",
		"Description": "",
		"Picture": ""
	}

});

window.Cards = new Backbone.Collection.extend({
	model: Card,
	url: "/cards"
})