import Backbone from "backbone";

export const Item = Backbone.Model.extend({
	urlRoot: "/api/example_route/items",
	idAttribute: "_id",
	defaults: function() {
		return {
			name: null,
			description: null
		};
	}
});

export const ItemCollection = Backbone.Collection.extend({
	comparator: function(mod) {
		return new Date(mod.get("createdAt")).getTime() * -1;
	},
	fetch: function(options) {
		
		if (options.data) {
			console.log(options.data)
			options.url = "/api/example_route/items/" + options.data.parentId;
		 	delete options.data
		}
		else{
			options.url = "/api/example_route/items"
		}
		Backbone.Collection.prototype.fetch.call(this, options);
	},
	model: Item
});