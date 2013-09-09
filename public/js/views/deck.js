window.DeckTemplate = Backbone.View.extend({
	className: "container",
    initialize:function () {
    	this.collection = new Deck();
    },

    render:function () {
        $(this.el).html(this.template());
        this.collection.comparator = function (card){
            return card.get("Mana");
        };
        var doubles = {};
        this.collection.each(function(item){
            var name = item.get("Name");
            if (deck.collection.where({Name: name}).length == 2) {
                if (!doubles[name]){
                    $('.deck', this.el).append(new DeckItem({model: item}).render().twocards().el);
                    doubles[name] = "1";
                }
            }
            else{
            $('.deck', this.el).append(new DeckItem({model: item}).render().el);
            console.log("Hi");
            }
        });
        return this;
    }

});

window.DeckItem = Backbone.View.extend({
	render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    twocards: function(){
        $('h5',this.el).append(" x2");
        return this;
    }
});