window.Deckbuilder = Backbone.View.extend({
    initialize:function () {
        this.render();
    },

    render:function () {
    	console.log(this.model);
        $(this.el).html(this.template());
        this.search = new Searchfield();
        this.cards = new CardSelect({model: this.model});
        this.$('#left').append(this.search.render().el);
        this.$('#left').append(this.cards.render().el);
        return this;
    }

});