window.Searchfield = Backbone.View.extend({
	className: "input-group",
    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

});