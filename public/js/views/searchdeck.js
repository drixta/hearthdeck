window.SearchDeck = Backbone.View.extend({
	className: "jumbotron searchdeck",
    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }
});