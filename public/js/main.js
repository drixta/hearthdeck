var AppRouter = Backbone.Router.extend({
	routes: {
		"": "home",
		"build/:heroes": "deckbuilder",
		"decks/:id": "deckviewer",
	},
	home: function(){
		if (!this.homeView) {
            this.homeView = new HeroPick();
        }
        $('#content').html(this.homeView.el);
        console.log(this.homeView.el);
	},
	deckbuilder: function(heroes){
		var cardsList = new Cards();
		var hero = heroes.charAt(0).toUpperCase() + heroes.slice(1);
		cardsList.fetch({success: function(){
			var filteredCards = cardsList.where({Class:hero, Class:"Any"});
		}});
		this.deckbuild = new Deckbuilder();
		$('#content').html(this.deckbuild.el);
	}

});

utils.loadTemplate(['HeroPick','Deckbuilder','Searchfield'], function() {
    app = new AppRouter();
    Backbone.history.start();
});


$('.btn-group').button();
$('.carousel').carousel()