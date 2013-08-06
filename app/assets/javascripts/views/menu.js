App.Views.Menu = Backbone.View.extend({
	name: 'menu',
	
	render : function() {
		var menuItemModel, menuItemView,
			template = HandlebarsCompiler.get(this.name);
		
		this.$el.html(template());
		
		// New project
		menuItemModel = new App.Models.MenuItem({
			name : 'new_project',
			url : '/card/new-project',
			title : 'Criar projeto'
		}), 
		menuItemView = new App.Views.MenuItem({
			model : menuItemModel
		});
		menuItemView.render();
		this.$el.append(menuItemView.el);
	}
});