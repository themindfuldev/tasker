App.Helpers = {
	// Alert types are described in App.AlertTypes
	alert: function(message, type) {
		var alertModel = new App.Models.Alert({
				message: message,
				type: type			
			}),
			alertView = new App.Views.Alert({
				model: alertModel
			});
		
		alertView.render();
		$('section#alert').append(alertView.el);
		alertView.$el.fadeIn();
	},
	
	dismissAlerts: function() {
		$('section#alert > div > button.close').click();
	},

	showLoading: function(selector) {
		var loadingTemplate = HandlebarsCompiler.get('loading');

		$(selector).html(loadingTemplate());
	}
}