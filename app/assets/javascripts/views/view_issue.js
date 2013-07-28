App.Views.ViewIssue = Backbone.View.extend({
	name: 'view_issue',
	tagName: 'article',
	className: 'issue',
	
	events : {
		'click button.remove-issue[data-action=delete]': 'removeIssue',
		'click a[data-action=move_previous]': 'movePrevious',
		'click a[data-action=move_next]': 'moveNext'
	},
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.model.toJSON()));
	},
	
	removeIssue : function() {
		var self = this;
		
		this.model.destroy({
			success: function(model) {
				App.Alert.alert({
					message: 'Issue ' + model.attributes.title + ' removido com sucesso!',
					type: App.AlertTypes.success
				});
				
				self.$el.fadeOut({
					complete: function() {
						self.remove();		
					}
				});				
			},
			
			error: function(model) {
				App.Alert.alert({
					message : 'Houve um erro ao remover a issue ' + model.attributes.title + '.', 
					type: App.AlertTypes.error
				});
			}
		});
	},
	
	movePrevious : function() {
		var data,
			self = this,
			currentLane = this.model.attributes.status.toLowerCase(),
			currentLaneIndex = App.StatusTypes.indexOf(currentLane);
		
		this.model.attributes.status = App.StatusTypes[currentLaneIndex - 1].toUpperCase();
		
		data = this.model.attributes;
		delete data['class'];
		delete data['next'];
		delete data['previous'];
		
		this.model.save(data, {
			success: function(model) {
				App.Alert.alert({
					message: 'Issue ' + model.attributes.title + ' atualizada com sucesso!',
					type: App.AlertTypes.success,
					trigger: true
				});
				
				Backbone.history.loadUrl(Backbone.history.fragment);		
			},
			
			error: function(model) {
				App.Alert.alert({
					message : 'Houve um erro ao atualizar a issue ' + model.attributes.title + '.', 
					type: App.AlertTypes.error
				});
			}
		});
	},
	
	moveNext : function() {
		var data,
			self = this,
			currentLane = this.model.attributes.status.toLowerCase(),
			currentLaneIndex = App.StatusTypes.indexOf(currentLane);
	
		this.model.attributes.status = App.StatusTypes[currentLaneIndex + 1].toUpperCase();

		data = this.model.attributes;
		delete data['class'];
		delete data['next'];
		delete data['previous'];
		
		this.model.save(data, {
			success: function(model, response, options) {
				App.Alert.alert({
					message: 'Issue ' + model.attributes.title + ' atualizada com sucesso!',
					type: App.AlertTypes.success,
					trigger: true
				});
				
				Backbone.history.loadUrl(Backbone.history.fragment);					
			},
			
			error: function(model, response, options) {
				App.Alert.alert({
					message : 'Houve um erro ao atualizar a issue ' + model.attributes.title + '.', 
					type: App.AlertTypes.error
				});
			}
		});
	}
});