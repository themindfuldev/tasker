App.Views.ViewAll = Backbone.View.extend({
	name : 'view_all',
	className : 'start-collapsed',

	render : function() {
		if (this.collection.length > 0) {
			this.elFragment = document.createDocumentFragment();
			this.collection.forEach(this.addOne, this);
			this.$el.append(this.elFragment);
		} else {
			App.Helpers.Alert.alert({
				message : 'Não há projetos.',
				type : App.AlertTypes.info
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