App.Helpers = {
		
	showLoading: function(selector) {
		var loadingTemplate = HandlebarsCompiler.get('loading');

		$(selector).html(loadingTemplate());
	}
};