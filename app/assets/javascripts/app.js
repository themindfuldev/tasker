App = new (Backbone.View.extend({
	/*
	 * App definitions
	 */
	Models : {},
	Views : {},
	Collections : {},
	Routers : {},

	CardTypes : {
		'project' : 0,
		'story' : 1,
		'issue' : 2
	},

	StatusTypes : [
		'backlog',
		'in_progress',
		'verify',
		'signed_off'
	],

	AlertTypes : {
		'success' : 'success',
		'error' : 'error',
		'info' : 'info'
	},

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
			el: $('ul#menu')
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
	App.render();
	App.start();
});