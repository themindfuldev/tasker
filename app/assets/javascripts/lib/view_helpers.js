App.Helpers = {
	Alert : new function() {
		var renderAlert, renderTriggeredAlerts;
		
		renderAlert = function(alertView) {
			$('section#alert').append(alertView.el);
			alertView.$el.fadeIn();
		};
		
		renderTriggeredAlerts = function() {
			while (App.alertQueue.length) {
				alertView = App.alertQueue.pop(); 
				renderAlert(alertView);
			}
		};
		
		// Alert types are described in App.AlertTypes
		this.alert = function(options) {
			var alertModel = new App.Models.Alert({
					message: options.message,
					type: options.type			
				}),
				alertView = new App.Views.Alert({
					model: alertModel
				});
			
			alertView.render();
			
			if (options.trigger) {
				App.alertQueue.push(alertView);
			}
			else {
				renderAlert(alertView);
			}
		};
		
		this.renewAlerts = function() {
			var alertView,
				currentAlerts = $('section#alert > div');
			
			if (currentAlerts.length > 0) {
				currentAlerts.fadeOut({
					complete: function() {
						$('section#alert > div').remove();
						renderTriggeredAlerts();
					}
				});
			}
			else {
				renderTriggeredAlerts();
			}
		};
	},
		
	showLoading: function(selector) {
		var loadingTemplate = HandlebarsCompiler.get('loading');

		$(selector).html(loadingTemplate());
	}
}