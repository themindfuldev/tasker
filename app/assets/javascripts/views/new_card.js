App.Views.NewCard = Backbone.View.extend({
	name : 'new_card',
	
	render : function() {
		var template = HandlebarsCompiler.get(this.name);
		this.$el.html(template(this.options));
		this.$el.slideDown();
	},
	
	collapse : function() {
		this.$el.slideUp();
	},

	events: {
	  'submit': 'save',
	  'click input#cancel_button': 'cancel'
	},
	
	save: function(e) {
		e.preventDefault();
		var newDescription = this.$('input[name=description]').val();
		this.model.save({description: newDescription});
	},
	
	cancel: function(e) {
		App.navigate('/');
	}
});