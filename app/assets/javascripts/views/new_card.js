App.Views.NewCard = Backbone.View.extend({
	template : HandlebarsCompiler.get('new_card'),

	render : function() {
		this.$el.html(this.template());
	}
});