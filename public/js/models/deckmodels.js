window.Deck = new Backbone.Model.extend({
	urlRoot: '/decks',
	idAttribute: '_id'
	defaults: {
		_id: null,
		name: "",
		classname:"",
		description:"",
		cards: []
	} 
});

window.Decks = new Backbone.Collection.extend({
	model: Deck,
	url: "/decks"
});