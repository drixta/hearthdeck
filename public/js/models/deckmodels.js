window.Deck = Backbone.Collection.extend({
	urlRoot: '/decks',
	idAttribute: '_id',
});

window.Decks = Backbone.Collection.extend({
	model: Deck,
	url: "/decks"
});