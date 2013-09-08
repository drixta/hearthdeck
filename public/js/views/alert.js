window.Alert = Backbone.View.extend({
	className: "alert alert-warning",
    initialize:function () {
        this.render();
    },

    render:function () {
    	console.log(this.options.message);
        $(this.el).html(this.template());
        $(this.el).append(this.options.message);
        return this;
    }

});