window.CardSelect = Backbone.View.extend({
    initialize:function () {
        page = 0;
        maxpage = (this.model.length)/8;
        $(this.el).append('<button class="prev">Prev</button><button class="next">Next</button>');
    },


    events:{
        "click .next": "paginext",
        "click .prev": "pagiprev"
    },

    paginext: function(){
        if (page == maxpage){
            page = maxpage; 
        }
        else {
            page = page + 1;
        }
        $('.thumbnails', this.el).remove();
        this.render();
    },

    pagiprev: function(){
        if (page == 0){
            page = 0;
        }
        else {
            page = page - 1;
        }
        $('.thumbnails', this.el).remove();
        this.render();
    },

    render:function () {
    	var cardlist = this.model;
    	var len = cardlist.length;
        console.log("render:",page);
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