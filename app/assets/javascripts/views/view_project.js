App.Views.ViewProject = Backbone.View.extend({
	name: 'view_project',
	tagName: 'article',
	className: 'project',
	
	events : {
		'click a.remove-project[data-action=delete]': 'removeProject'
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
		storyModel.id = card.id;
	
		viewStoryView = new App.Views.ViewStory({ 
			model : storyModel
		});
		viewStoryView.render();
		this.containerFragment.appendChild(viewStoryView.el);
	},
	
	removeProject : function() {
		var self = this;
		
		this.model.destroy({
			success: function(model) {
				App.Alert.alert({
					message: 'Project ' + model.attributes.title + ' removido com sucesso!',
					type: 'success'
				});

				App.AnimationBuffer.add(self.$el.fadeOut, self.$el, function() {
					self.remove();		
				});
			},
			
			error: function(model) {
				App.Alert.alert({
					message : 'Houve um erro ao remover o project ' + model.attributes.title + '.', 
					type: 'error'
				});
			}
		});
	}

});