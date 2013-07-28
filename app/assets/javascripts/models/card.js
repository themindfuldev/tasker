App.Models.Card = Backbone.Model.extend({
	urlRoot : '/api/cards',
	validate : function(attrs) {
		var errors = [];

	    if (!attrs.title) {
	        errors.push({name: 'title', message: 'Este campo é obrigatório!'});
	    }
	    if (!attrs.description) {
	        errors.push({name: 'description', message: 'Este campo é obrigatório!'});
	    }
	    if (!attrs.assignee) {
	        errors.push({name: 'assignee', message: 'Este campo é obrigatório!'});
	    }

	    return errors.length > 0 ? errors : false;
	}
});
