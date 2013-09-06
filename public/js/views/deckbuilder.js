window.Deckbuilder = Backbone.View.extend({
    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        this.search = new Searchfield();
        this.$('#left').append(this.search.render().el);
        return this;
    }

});