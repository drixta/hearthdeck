window.HeroPick = Backbone.View.extend({
	className: "heropick",
    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }
});