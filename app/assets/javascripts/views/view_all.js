App.Views.ViewAll = Backbone.View.extend({
	name: 'view_all',
	className: 'start-collapsed',
	
	render : function() {
		if (this.collection.size > 0) {
			this.collection.forEach(this.addOne, this);
		}
		else {
			App.Helpers.alert('Não há projetos.', 'info');
		}
	},

	addOne : function(card) {
		var viewProjectView = new App.Views.ViewProject({ 
			model : card 
		});
		this.$el.append(viewProjectView.render());
	}

});