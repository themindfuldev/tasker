App.Views.ViewAll = Backbone.View.extend({
	template : HandlebarsCompiler.get('view_all'),

	render : function() {
		this.$el.html(this.template());
	}
});