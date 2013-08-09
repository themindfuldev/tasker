App.Views.ViewIssue = Backbone.View.extend({
	name: 'view_issue',
	tagName: 'article',
	className: 'issue',
	
	events : {
		'click a.remove-issue[data-action=delete]': 'removeIssue',
		'click a[data-action=move_previous]': 'movePrevious',
		'click a[data-action=move_next]': 'moveNext'
	},
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.model.toJSON()));
	},
	
	removeIssue : function() {
		App.CardHelpers.remove(this);
	},
	
	movePrevious : function() {
		var currentLane = this.model.attributes.status.toLowerCase(),
			currentLaneIndex = App.StatusTypes.indexOf(currentLane);
		
		this.model.attributes.status = App.StatusTypes[currentLaneIndex - 1].toUpperCase();
		this.update();
	},
	
	moveNext : function() {
		var currentLane = this.model.attributes.status.toLowerCase(),
			currentLaneIndex = App.StatusTypes.indexOf(currentLane);
	
		this.model.attributes.status = App.StatusTypes[currentLaneIndex + 1].toUpperCase();
		this.update();
	},
	
	update : function() {
		var data = this.model.attributes;
		
		delete data['class'];
		delete data['next'];
		delete data['previous'];
		
		App.CardHelpers.update(this, data);
	}
});