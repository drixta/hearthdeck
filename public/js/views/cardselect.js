window.CardSelect = Backbone.View.extend({
    initialize:function () {
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
    	var cardlist = this.model.filter(function(each){
            return each;
        });
    	var len = cardlist.length;
        $(this.el).append('<ul class ="thumbnails"></ul>');
        for (var i = page*8; i < page*8 + 8; i++){
        	$('.thumbnails', this.el).append(new CardItem({model: cardlist[i]}).render().el);
        }
        return this;
    }
});

window.CardItem = Backbone.View.extend({
    className:"",

	initialize: function(){
		this.render();
	},
	render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});