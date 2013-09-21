window.Deckbuilder = Backbone.View.extend({
    initialize:function () {
        this.render();
    },
    className: "container",
    
    render:function () {
        $(this.el).html(this.template());
        this.search = new Searchfield({model: this.model});
        cardselectView = new CardSelect({model: this.model});
        deck = new DeckTemplate();
        this.$('#left').append(this.search.render().el);
        this.$('#left').append(cardselectView.render().el);
        this.$('#right').append(deck.render().el);
        return this;
    }

});