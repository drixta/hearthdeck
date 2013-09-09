window.Deck = Backbone.Collection.extend({
	urlRoot: '/decks',
	idAttribute: '_id',
	name: "Your deck",
	description: "Enter description here!"
});

window.Decks = Backbone.Collection.extend({
	model: Deck,
	url: "/decks"
});