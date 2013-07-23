App.Views.ViewProject = Backbone.View.extend({
	name: 'view_project',
	
	events : {
		'click a[data-action=delete]': 'removeProject'
	},
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.model.toJSON()));
		
		this.containerFragment = document.createDocumentFragment();
		
		if (this.model.attributes.children) {
			this.model.attributes.children.forEach(this.addOne, this);
		}
		
		this.$el.find('#project_' + this.model.id + '_stories').append(this.containerFragment);
	},

	addOne : function(card) {
		var storyModel, viewStoryView;
		
		storyModel = new App.Models.Card({});
		storyModel.attributes = card;
	
		viewStoryView = new App.Views.ViewStory({ 
			model : storyModel
		});
		viewStoryView.render();
		this.containerFragment.appendChild(viewStoryView.el);
	},
	
	removeProject : function() {
		this.model.destroy({
			success: function(model) {
				App.Alert.alert({
					message: 'Projeto ' + model.attributes.title + ' removido com sucesso!',
					type: App.AlertTypes.success,
					trigger: true
				});
				Backbone.history.loadUrl(Backbone.history.fragment);
			},
			
			error: function(model) {
				App.Alert.alert({
					message : 'Houve um erro ao remover o projeto ' + model.attributes.title + '.', 
					type: App.AlertTypes.error
				});
			}
		});
	}


});