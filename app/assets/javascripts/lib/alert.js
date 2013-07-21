App.Alert = {
	alertQueue: [],
		
	// Alert types are described in App.AlertTypes
	alert : function(options) {
		var alertModel = new App.Models.Alert({
				message : options.message,
				type : options.type
			}), 
			alertView = new App.Views.Alert({
				model : alertModel
			});

		alertView.render();

		if (options.trigger) {
			App.Alert.alertQueue.push(alertView);
		} else {
			this.renderAlert(alertView);
		}
	},
	
	renderAlert : function(alertView) {
		$('section#alert').append(alertView.el);
		alertView.$el.fadeIn();
	},
	
	dismissAlerts : function(callback) {
		var alertView,
			currentAlerts = $('section#alert > div');
		
		if (currentAlerts.length > 0) {
			currentAlerts.fadeOut({
				complete: function() {
					$('section#alert > div').remove();
				}
			});
		}
		App.appRouter.trigger('readyToAlert', [callback]);
	},
	
	renderTriggeredAlerts : function() {
		// Render triggered alerts
		while (App.Alert.alertQueue.length) {
			alertView = App.Alert.alertQueue.pop(); 
			this.renderAlert(alertView);
		}
	}

}