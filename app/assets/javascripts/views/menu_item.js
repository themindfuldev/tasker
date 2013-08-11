App.Views.MenuItem = Backbone.View.extend({
	name: 'menu_item',
	tagName: 'li',
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		
		this.$el.attr('id', 'menu_' + this.model.get('name'));
		this.$el.html(template(this.model.toJSON()));
	}
});