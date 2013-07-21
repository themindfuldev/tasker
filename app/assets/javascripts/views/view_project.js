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
		this.model.remove({
			success: function(model, response, options) {
				App.Helpers.alert('Card ' + model.attributes.title + ' removido com sucesso!', 'success');
			},
			
			error: function(model, response, options) {
				App.Helpers.alert('Houve um erro ao remover o card!', 'error');
			}
		});
	}


});