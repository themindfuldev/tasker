HandlebarsCompiler = (function() {
	var cache = {},
		path = '/assets/templates/';
	
	return {
		get: function(templateName) {
			var compiledTemplate = null;
			
			if (cache[templateName]) {
				compiledTemplate = cache[templateName];
			}
			else {
				$.ajax({
					url: path + templateName + '.hbs',
					async : false,
					success: function success(data) {
						compiledTemplate = cache[templateName] = Handlebars.compile(data);
					}
				});
			}
			
			return compiledTemplate;
		}
	};
})();