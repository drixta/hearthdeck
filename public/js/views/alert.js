window.Alert = Backbone.View.extend({
	className: "alert alert-danger",
    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        $(this.el).append(this.options.message);
        return this;
    }

});