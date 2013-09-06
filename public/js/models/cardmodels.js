window.Card = Backbone.Model.extend({
	urlRoot: "/cards"
});

window.Cards = Backbone.Collection.extend({
	model: Card,
	url: "/cards"
});