var AppRouter = Backbone.Router.extend({
	routes: {
		"": "home",
		"build/:heroes": "deckbuilder",
		"decks/:id": "deckviewer",
	},
	home: function(){
		if (!this.homeView) {
			this.homeView = new HeroPick();
			this.search = new SearchDeck();
		}
		$('#content').empty();
		$('#content').append(this.search.el);
		$('#content').append(this.homeView.el);
	},
	deckbuilder: function(heroes){
		var cardsList = new Cards();
		hero = heroes.charAt(0).toUpperCase() + heroes.slice(1);
		cardsList.fetch({success: function(){
			filteredCards = new Cards(cardsList.where({Class: hero}).concat(cardsList.where({Class: "Any"})));
			this.deckbuild = new Deckbuilder({model:filteredCards});
			$('#content').html(this.deckbuild.el);
		}});
	},
	deckviewer: function(id){
		var deck = new Deck({_id:id});
		deck.fetch({success: function(){
			console.log("This model", deck.toJSON());
            $("#content").html(new DeckView({model: deck}).el);
        }});
	}

});

utils.loadTemplate(['HeroPick','SearchDeck','Deckbuilder','Searchfield','CardItem','DeckTemplate','DeckItem','Alert','DeckView','DeckItemTemplate'], function() {
	app = new AppRouter();
	Backbone.history.start();
});


$('.btn-group').button();