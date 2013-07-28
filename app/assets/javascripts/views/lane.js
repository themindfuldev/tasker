App.Views.Lane = Backbone.View.extend({
	name: 'lane',
	className: 'span3 lane',

	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		
		this.$el.html(template(this.model.toJSON()));
	}
});