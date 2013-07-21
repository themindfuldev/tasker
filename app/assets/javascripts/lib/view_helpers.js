App.Helpers = {
	// Alert types are: error, success, info (or nothing)
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
	
	showLoading: function(selector) {
		var loadingTemplate = HandlebarsCompiler.get('loading');

		$(selector).html(loadingTemplate());
	}
}