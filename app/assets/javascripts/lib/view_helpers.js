App.Helpers = {
	alert: function(message, type) {
		var alertTemplate = HandlebarsCompiler.get('alert'),
			model = {
				message: message,
				type: type
			};
		
		$('#alert').append(alertTemplate(model));
	}
}