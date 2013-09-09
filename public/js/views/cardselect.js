window.CardSelect = Backbone.View.extend({
    initialize:function () {
        this.model.comparator = function (card){
            return card.get("Mana");
        };
        this.model.sort();
        var cardlist = this.model.filter(function(each){
            return each;
        });
        this.model = new Cards(cardlist);
        page = 0;
        maxpage = (this.model.length)/8;
        $(this.el).append('<button class="prev">Prev</button><button class="next">Next</button>');
    },


    events:{
        "click .next": "paginext",
        "click .prev": "pagiprev"
    },

    paginext: function(){
        if (page < (maxpage-1)){
            page++;
        }
        $('.thumbnails', this.el).remove();
        this.render();
    },

    pagiprev: function(){
        if (page > 0){
            page--;
        }
        $('.thumbnails', this.el).remove();
        this.render();
    },

    refresh: function(){
        $('.thumbnails', this.el).remove();
        page = 0;
        maxpage = (this.model.length)/8;
        this.render();
    },
    render:function () {
        this.model.comparator = function (card){
            return card.get("Mana");
        };        
    	var cardlist = this.model.filter(function(each){
            return each;
        });
    	var len = cardlist.length;
        $(this.el).append('<ul class ="thumbnails"></ul>');
        for (var i = page*8; (i < page*8 + 8) && (i < len); i++){
        	$('.thumbnails', this.el).append(new CardItem({model: cardlist[i]}).render().el);
        }
        return this;
    }
});

window.CardItem = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
    events: {
        "click .thumbnail":"add"
    },
    add : function(ev){
        if (deck.collection.length == 30){
            this.alertmessage("You already have 30 cards in your deck");
        };
        if (deck.collection.where({Name:this.model.get("Name"), Rarity: "Legendary"}).length == 1){
            return;
        };
        if (deck.collection.where({Name:this.model.get("Name")}).length < 2){
            deck.collection.add(this.model.toJSON());
        }
        else{
            this.alertmessage("You already have 2 cards of this type");
        };
        deck.render();
    },
    alertmessage: function(messages){
        console.log("CardSelect:",messages);
        alert = new Alert({message: messages});
        window.$(".top").html(alert.render().el);
    },
	render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});