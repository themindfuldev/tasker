App.Views.Alert = Backbone.View.extend({
	name: 'alert',
	className: 'alert',
	
	events : {
		'click button.close' : 'collapse'
	},
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.model.toJSON()));
		
		if (this.model.attributes.type) {
			this.$el.addClass('alert-' + this.model.attributes.type);
		}
	},
	
	collapse : function(event) {
		event.preventDefault();
		
		this.$el.fadeOut({
			complete: function() {
				this.remove();				
			}
		});
	}
});