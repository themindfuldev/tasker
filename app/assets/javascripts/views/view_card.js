App.Views.ViewCard = Backbone.View.extend({
	template : HandlebarsCompiler.get('view_card'),

	render : function() {
		this.$el.html(this.template());
	}
});