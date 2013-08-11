App.CardHelpers = {
		
	create : function(self, model, data) {
		model.save(data, {
			success : function(model, response, options) {
				var originalType = data.type.toLowerCase(),
					type = $.i18n.prop('type.' + originalType),
					gender = $.i18n.prop('gender.type.' + originalType),
					message;
				
				if (gender[0] !== '[') {
					message = $.i18n.prop('message.card_created_' + gender, data.title, type);
				}
				else {
					message = $.i18n.prop('message.card_created', data.title, type); 
				}
				
				App.Alert.push({
					message : message,
					type : 'success'
				});
				
				App.appRouter.navigate('/', { trigger : true });
			},

			error : function(model, xhr, options) {
				var originalType = data.type.toLowerCase(),
					type = $.i18n.prop('type.' + originalType),
					gender = $.i18n.prop('gender.type.' + originalType),
					message;
				
				if (gender[0] !== '[') {
					message = $.i18n.prop('message.card_not_created_' + gender, data.title, type);
				}
				else {
					message = $.i18n.prop('message.card_not_created', data.title, type); 
				}
				
				App.Alert.alert({
					message : message,
					type : 'error'
				});
			}
		});
	},
	
	update : function(self, data, newLaneElement) {
		self.model.save(data, {
			success: function(model) {
				App.AnimationBuffer.add(self.$el.fadeOut, self.$el, function() {
					var originalType = data.type.toLowerCase(),
						type = $.i18n.prop('type.' + originalType),
						gender = $.i18n.prop('gender.type.' + originalType),
						title = data.title,
						message;
					
					if (gender[0] !== '[') {
						message = $.i18n.prop('message.card_updated_' + gender, title, type);
					}
					else {
						message = $.i18n.prop('message.card_updated', title, type); 
					}
					
					App.Alert.alert({
						message: message,
						type: 'success'
					});

					// Re-rendering element
					newLaneElement.append(self.el);
					self.render();
					App.AnimationBuffer.add(self.$el.fadeIn, self.$el);

				});
			},
			
			error: function(model) {
				var originalType = data.type.toLowerCase(),
					type = $.i18n.prop('type.' + originalType),
					gender = $.i18n.prop('gender.type.' + originalType),
					title = data.title,
					message;
				
				if (gender[0] !== '[') {
					message = $.i18n.prop('message.card_not_updated_' + gender, title, type);
				}
				else {
					message = $.i18n.prop('message.card_not_updated', title, type); 
				}
	
				App.Alert.alert({
					message: message, 
					type: 'error'
				});
			}
		});		
	},
		
	remove : function(self) {
		
		self.model.destroy({
			success: function(model) {
				App.AnimationBuffer.add(self.$el.fadeOut, self.$el, function() {
					var originalType = self.model.get('type').toLowerCase(),
						type = $.i18n.prop('type.' + originalType),
						gender = $.i18n.prop('gender.type.' + originalType),
						title = self.model.get('title'),
						message;
					
					if (gender[0] !== '[') {
						message = $.i18n.prop('message.card_removed_' + gender, title, type);
					}
					else {
						message = $.i18n.prop('message.card_removed', title, type); 
					}
					
					self.remove();		
					
					App.Alert.alert({
						message: message,
						type: 'success'
					});
				});				
			},
			
			error: function(model) {
				var originalType = self.model.get('title').toLowerCase(),
					type = $.i18n.prop('type.' + originalType),
					gender = $.i18n.prop('gender.type.' + originalType),
					title = self.model.get('title'),
					message;
				
				if (gender[0] !== '[') {
					message = $.i18n.prop('message.card_not_removed_' + gender, title, type);
				}
				else {
					message = $.i18n.prop('message.card_not_removed', title, type); 
				}
	
				App.Alert.alert({
					message : message, 
					type: 'error'
				});
			}
		});
	}	

};