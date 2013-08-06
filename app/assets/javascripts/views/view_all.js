App.Views.ViewAll = Backbone.View.extend({
	name : 'view_all',

	render : function() {
		if (this.collection.length > 0) {
			this.elFragment = document.createDocumentFragment();
			this.collection.forEach(this.addOne, this);
			this.$el.append(this.elFragment);
		} else {
			App.Alert.alert({
				message : $.i18n.prop('message.there_is_no', $.i18n.prop('type.project')),
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