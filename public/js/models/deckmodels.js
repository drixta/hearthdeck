window.Deck = Backbone.Model.extend({
	urlRoot: '/decks',
	idAttribute: '_id',
	name: "Your deck",
	description: "Enter description here!",
	deck: new Backbone.Collection()
});

window.Decks = Backbone.Collection.extend({
	model: Deck,
	url: "/decks"
});