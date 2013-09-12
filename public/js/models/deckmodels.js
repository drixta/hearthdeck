window.Deck = Backbone.Model.extend({
	parse: function (res,xhr){
		return {
			id: res.id,
			name: res.name,
			cards: res.cards,
			className: res.className,
			description: res.description
		};
	},
	urlRoot: '/api/decks',
	idAttribute: '_id',
	description: "Enter description here!",
	deck: new Backbone.Collection()
});

window.Decks = Backbone.Collection.extend({
	model: Deck,
	url: "/api/decks"
});