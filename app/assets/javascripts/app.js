App = new (Backbone.View.extend({
	/*
	 * App definitions
	 */
	Models : {},
	Views : {},
	Collections : {},
	Routers : {},

	StatusTypes : [ 'backlog', 'in_progress', 'verify', 'signed_off' ],

	/*
	 * App view setup
	 */
	name : 'app',

	events : {
		'click a[data-internal]' : function(event) {
			event.preventDefault();
			this.appRouter.navigate(event.currentTarget.pathname, {
				trigger : true
			});
		}
	},

	render : function() {
		var appTemplate = HandlebarsCompiler.get(this.name);
		this.$el.html(appTemplate());

		this.menuView = new App.Views.Menu({
			el : $('ul#menu')
		});
		this.menuView.render();
	},

	start : function() {
		this.appRouter = new App.Routers.App();

		// Starting backbone history
		Backbone.history.start({
			pushState : true
		});
	}
}))({
	el : document.body
});

$(function() {
	var lang = $.cookie('lang');

	if (!lang) {
		lang = $.i18n.browserLang();
	}

	$.i18n.properties({
		name : 'messages',
		path : 'assets/i18n/',
		mode : 'both',
		language : lang,
		callback : function() {
			App.render();
			App.start();
		}
	});
});