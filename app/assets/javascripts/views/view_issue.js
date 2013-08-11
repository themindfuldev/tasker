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
		
		this.insertButtons();
		this.$el.html(template(this.model.toJSON()));
	},
	
	removeIssue : function() {
		App.CardHelpers.remove(this);
	},
	
	movePrevious : function() {
		var currentLaneIndex = this.getCurrentLaneIndex(),
			newLaneIndex = currentLaneIndex - 1,
			newLane = App.StatusTypes[newLaneIndex],
			newLaneElement = this.options.parentView.$el.find('td[data-lane=' + newLane + ']');	
		
		this.model.set('status', App.StatusTypes[newLaneIndex].toUpperCase());
		this.update(newLaneElement);
	},
	
	moveNext : function() {
		var currentLaneIndex = this.getCurrentLaneIndex(),
			newLaneIndex = currentLaneIndex + 1,
			newLane = App.StatusTypes[newLaneIndex],
			newLaneElement = this.options.parentView.$el.find('td[data-lane=' + newLane + ']');	
	
		this.model.set('status', App.StatusTypes[newLaneIndex].toUpperCase());
		this.update(newLaneElement);
	},
	
	insertButtons : function() {
		var previousLane, nextLane,
			currentLaneIndex = this.getCurrentLaneIndex();
		
		if (currentLaneIndex !== App.StatusTypes.indexOf('signed_off')) {
			if (currentLaneIndex > 0) {
				previousLane = App.StatusTypes[currentLaneIndex - 1];
				this.model.set('previous', $.i18n.prop('status.' + previousLane)); 
			}
			if (currentLaneIndex < App.StatusTypes.length - 1) {
				nextLane = App.StatusTypes[currentLaneIndex + 1];
				this.model.set('next', $.i18n.prop('status.' + nextLane)); 
			}
		}		
	},
	
	getCurrentLaneIndex : function() {
		var currentLane = this.model.get('status').toLowerCase();
		return App.StatusTypes.indexOf(currentLane);
	},
	
	update : function(newLaneElement) {
		var data = this.model.attributes;
		
		delete data['class'];
		delete data['next'];
		delete data['previous'];
		
		App.CardHelpers.update(this, data, newLaneElement);
	}
});