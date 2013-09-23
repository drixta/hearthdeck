var AppRouter = Backbone.Router.extend({
	routes: {
		"": "home",
		"build/:heroes": "deckbuilder",
		"decks/:id": "deckviewer",
		"search?q=:query": "search"
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
	search: function(q){
		$.get("/ajax/decks?q="+q, function(data){
			$("#content").html(new SearchResult({model:new Cards(data)}).el);
		});
	},	
	deckbuilder: function(heroes){
		var cardsList = new Cards();
		hero = heroes.charAt(0).toUpperCase() + heroes.slice(1);
		cardsList.fetch({success: function(){
			filteredCards = new Cards(cardsList.where({Class: hero}).concat(cardsList.where({Class: "Any"})));
			$('#content').html(new Deckbuilder({model:filteredCards}).el);
		}});
	},
	deckviewer: function(id){
		var deck = new Deck({_id:id});
		deck.fetch({success: function(){
            $("#content").html(new DeckView({model: deck}).el);
        }});
	}

});

utils.loadTemplate(['HeroPick','SearchResult','SearchResultItem','SearchDeck','Deckbuilder','Searchfield','CardItem','DeckTemplate','DeckItem','Alert','DeckView','DeckItemTemplate'], function() {
	app = new AppRouter();
	Backbone.history.start();
});


$('.btn-group').button();