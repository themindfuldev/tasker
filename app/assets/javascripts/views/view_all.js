App.Views.ViewAll = Backbone.View.extend({
	name: 'view_all',
	
	render : function() {
		this.$el.html('');
		this.collection.forEach(this.addOne, this);
	},

	addOne : function(card) {
		var viewProjectView = new App.Views.ViewProject({ 
			model : card 
		});
		this.$el.append(viewProjectView.render());
	}

});