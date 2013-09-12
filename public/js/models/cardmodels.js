window.Card = Backbone.Model.extend({
	urlRoot: "/api/cards"
});

window.Cards = Backbone.Collection.extend({
	model: Card,
	url: "/api/cards"
});