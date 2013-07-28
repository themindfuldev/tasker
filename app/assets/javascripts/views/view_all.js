App.Views.ViewAll = Backbone.View.extend({
	name : 'view_all',
	className : 'start-collapsed',

	render : function() {
		if (this.collection.length > 0) {
			this.elFragment = document.createDocumentFragment();
			this.collection.forEach(this.addOne, this);
			this.$el.append(this.elFragment);
		} else {
			App.Alert.alert({
				message : 'Não há projects.',
				type : 'info'
			});
		}
	},

	addOne : function(card) {
		var viewProjectView = new App.Views.ViewProject({
			model : card
		});
		viewProjectView.render();
		$(this.elFragment).append(viewProjectView.el);
	}

});