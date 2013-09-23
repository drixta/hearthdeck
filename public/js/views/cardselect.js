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
        $(this.el).append('<ul class="pager"><li><a class="prev">&lt;&lt;</a></li><li><a class="next">&gt;&gt;</a></li></ul>');
    },


    events:{
        "click .next": "paginext",
        "click .prev": "pagiprev",
        "mouseover .thumbnail": "opacity",
        "mouseout .thumbnails": "reop"
    },
    opacity: function(ev){
        $('.thumbnail', this.el).css('opacity',0.4);
        $(ev.currentTarget).css('opacity',1);
    },
    reop: function(){
        $('.thumbnail',this.el).css('opacity',1);
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
        var carddeck = deck.model.deck;
        if (carddeck.length == 30){
            this.alertmessage("You already have <b>30</b> cards in your deck");
            return;
        };
        if (carddeck.where({Name:this.model.get("Name"), Rarity: "Legendary"}).length == 1){
            return;
        };
        if (carddeck.where({Name:this.model.get("Name")}).length < 2){
            carddeck.add(this.model.toJSON());
        }
        else{
            this.alertmessage("You already have <b>2</b> cards of this type");
        };
        window.$('#cardcount').html(carddeck.length+"/30");
        deck.render();
    },
    alertmessage: function(messages){
        container = window.$(".top");
        container.fadeIn(0)
        alert = new Alert({message: messages});
        container.html(alert.render().el);
        setTimeout("container.fadeOut(400)",2000);
    },
	render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});