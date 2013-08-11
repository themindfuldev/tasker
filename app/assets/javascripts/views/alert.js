App.Views.Alert = Backbone.View.extend({
	name : 'alert',
	className : 'alert',

	events : {
		'click button.close' : 'collapse'
	},

	render : function() {
		var template = HandlebarsCompiler.get(this.name),
			type = this.model.get('type');
		
		this.$el.html(template(this.model.toJSON()));

		if (type) {
			this.$el.addClass('alert-' + type);
		}
	},

	collapse : function(event) {
		event.preventDefault();

		this.$el.fadeOut({
			complete : function() {
				this.remove();
			}
		});
	}
});