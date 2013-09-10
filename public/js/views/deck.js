window.DeckTemplate = Backbone.View.extend({
	className: "container",
    initialize:function () {
    	this.model = new Deck();
    },
    events: {
        "click .save": "savedeck",
    },

    savedeck: function(){
        var model = this.model
        var name = $('.name', this.el).val();
        console.log("trying to save");
        model.save({name: name, className: hero,description: "",cards:model.deck},
            {success: function(){
            console.log("Saved");
            console.log(model);
            app.navigate("/decks/" + model.id, {trigger:true});
            },
            error: function(){
            console.log("Failed miserably");
            }
            }
        )
    },


    render:function () {
        var cardDeck = this.model.deck;
        $(this.el).html(this.template());
        cardDeck.comparator = function (card){
            return card.get("Mana");
        };
        var doubles = {};
        cardDeck.each(function(item){
            var name = item.get("Name");
            if (cardDeck.where({Name: name}).length == 2) {
                if (!doubles[name]){
                    $('.deck', this.el).append(new DeckItem({model: item}).render().twocards().el);
                    doubles[name] = "1";
                }
            }
            else{
            $('.deck', this.el).append(new DeckItem({model: item}).render().el);
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