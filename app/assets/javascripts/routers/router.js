App.Routers.App = Backbone.Router.extend({
	
	initialize : function(options) {
		var self = this;
		
		this.route(/^card\/(\d+)\/new-story$/, 'newStory');
		this.route(/^card\/(\d+)\/new-issue\/(\w+)$/, 'newIssue');
	},

	routes : {
		'' : 'viewAll',
		'card/new-project' : 'newProject',
		'*path' : 'viewAll'
	},

	before : function(route, params) {
		var handler = this.routes[route];
		console.log('Navigated to ' + handler + ' route.');
		
		App.Alert.dismissAlerts();
	},
	
	/*
	 * Routing functions
	 */
	viewAll : function() {
		var self = this,
			cardCollection = new App.Collections.Cards();

		cardCollection.fetch({
			success : function(collection, response, options) {
				var view = new App.Views.ViewAll({
					collection : collection
				});

				self.render(view);
			},
			error : function(collection, response, options) {
				$('section#contents').html('');
				App.Alert.alert({
					message : 'Não foi possível obter os projects.',
					type : 'error'
				});
			}
		});
	},

	newProject : function() {
		var view = new App.Views.NewCard({
			type : 'PROJECT',
			menuItemId: 'new_project'
		});

		this.render(view);
	},

	newStory : function(id) {
		var view = new App.Views.NewCard({
			type : 'STORY',
			id : id,
			title: 'Criar story',
			menuItemId: 'new_story'
		});

		this.render(view);
	},

	newIssue : function(id, type) {
		var view = new App.Views.NewCard({
			type : type.toUpperCase(),
			id : id,
			title : 'Criar ' + type,
			menuItemId: 'new_issue'
		});

		this.render(view);
	},
	
	/*
	 * Renderization functions
	 */
	render : function(view) {
		var previousView = this.currentView,
			self = this;
		
		this.currentView = view;
		// Dismissing previous view
		if (previousView) {
			App.AnimationBuffer.add(previousView.$el.fadeOut, previousView.$el, function() {
				previousView.remove();
				self.displayCurrentView();
			});
		}
		else {
			this.displayCurrentView();
		}
	},
	
	displayCurrentView : function() {
		var self = this;
		
		// Selecting menu
		this.selectMenu();

		// Rendering new view
		this.currentView.render();
		$('section#contents').html(this.currentView.el);
		App.AnimationBuffer.add(this.currentView.$el.fadeIn, this.currentView.$el, function() {
			console.log('Rendered ' + self.currentView.name + ' view.');
		});		
	},

	selectMenu : function() {
		var menuItemId;
		
		// Re-render menu
		App.menuView.render();
		
		if (this.currentView.name === 'view_all') {
			menuItemId = this.currentView.name;
		}
		else if (this.currentView instanceof App.Views.NewCard){
			menuItemId = this.populateNewCardMenuItem(this.currentView);
		}
		
		if (menuItemId) {
			$("ul#menu li.active").removeClass('active');
			$("li#menu_" + menuItemId).addClass('active');
		}
	},
	
	populateNewCardMenuItem : function(view) {
		var menuItemModel, menuItemView;
		
		if (this.currentView.options.type !== 'PROJECT') {
			menuItemModel = new App.Models.MenuItem({
				name : this.currentView.options.menuItemId,
				url : '/' + Backbone.history.fragment,
				title : this.currentView.options.title
			}), 
			menuItemView = new App.Views.MenuItem({
				model : menuItemModel
			});
			
			menuItemView.render();
			$('ul#menu').append(menuItemView.el);
		}
		
		return this.currentView.options.menuItemId;
	}
	
});