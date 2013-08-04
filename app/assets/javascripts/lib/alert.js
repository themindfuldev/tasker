App.Alert = {
	// Alert types are 'success', 'error' or 'info'
	alert : function(options) {
		var alertModel = new App.Models.Alert({
				message : options.message,
				type : options.type
			}), 
			alertView = new App.Views.Alert({
				model : alertModel
			});

		alertView.render();

		this.renderAlert(alertView);
	},
	
	renderAlert : function(alertView) {
		$('section#alert').append(alertView.el);
		App.AnimationBuffer.add(alertView.$el.fadeIn, alertView.$el);
	},
	
	dismissAlerts : function() {
		var alertView,
			currentAlerts = $('section#alert > div');
		
		if (currentAlerts.length > 0) {
			App.AnimationBuffer.add(currentAlerts.fadeOut, currentAlerts, function() {
				currentAlerts.remove();
			});
		}
	}
};