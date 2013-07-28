App.Views.ViewStory = Backbone.View.extend({
	name: 'view_story',
	lanes: {},
	
	events : {
		'click a.remove-story[data-action=delete]': 'removeStory'
	},
	
	render : function() {
		var self = this,
			template = HandlebarsCompiler.get(this.name);
		
		this.$el.html(template(this.model.toJSON()));
		
		if (this.model.attributes.children) {
			_.each(App.StatusTypes, function(value) {
				self.lanes[value] = document.createDocumentFragment();
				$(self.lanes[value]).append(value.toUpperCase());
			});

			this.model.attributes.children.forEach(this.addOne, this);
		}
		
		$.each(this.lanes, function(key, value) {
			self.$el.find('#story_' + self.model.id + '_issues_' + key).html(value);	
		});		 
	},

	addOne : function(card) {
		var issueModel, viewIssueView;
		
		issueModel = new App.Models.Card({});
		issueModel.attributes = card;
		issueModel.id = card.id;
		
		viewIssueView = new App.Views.ViewIssue({ 
			model : issueModel 
		});
		viewIssueView.render();
		
		this.lanes[card.status.toLowerCase()].appendChild(viewIssueView.el);
	},
	
	removeStory : function() {
		this.model.destroy({
			success: function(model) {
				App.Alert.alert({
					message: 'Estória ' + model.attributes.title + ' removida com sucesso!',
					type: App.AlertTypes.success,
					trigger: true
				});
				Backbone.history.loadUrl(Backbone.history.fragment);
			},
			
			error: function(model) {
				App.Alert.alert({
					message : 'Houve um erro ao remover a estória ' + model.attributes.title + '.', 
					type: App.AlertTypes.error
				});
			}
		});
	}

});