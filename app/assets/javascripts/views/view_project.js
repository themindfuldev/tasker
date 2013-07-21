App.Views.ViewProject = Backbone.View.extend({
	name: 'view_project',
	
	events : {
		'click a[data-action=delete]': 'removeProject'
	},
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.model.toJSON()));
		
		if (this.model.attributes.children) {
			this.model.attributes.children.forEach(this.addOne, this);
		}
	},

	addOne : function(card) {
		var viewStoryView = new App.Views.ViewStory({ 
			model : card 
		});
		this.$el.append(viewStoryView.render());
	},
	
	removeProject : function() {
		this.model.destroy({
			success: function(model) {
				App.Helpers.Alert.alert({
					message: 'Projeto ' + model.attributes.title + ' removido com sucesso!',
					type: App.AlertTypes.success,
					trigger: true
				});
				Backbone.history.loadUrl(Backbone.history.fragment);
			},
			
			error: function(model) {
				App.Helpers.Alert.alert({
					message : 'Houve um erro ao remover o projeto ' + model.attributes.title + '.', 
					type: App.AlertTypes.error
				});
			}
		});
	}


});