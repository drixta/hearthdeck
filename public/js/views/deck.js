window.DeckTemplate = Backbone.View.extend({
	className: "container",
    initialize:function () {
    	this.collection = new Backbone.Collection([],{model: Card});
    },

    render:function () {
        $(this.el).html(this.template());
        console.log(this.collection);
        this.collection.each(function(item){
        	$('.deck', this.el).append(new DeckItem({model: item}).render().el);
        });
        return this;
    }

});

window.DeckItem = Backbone.View.extend({
	render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});