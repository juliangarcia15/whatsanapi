define([
      'jquery'
    , 'underscore'
    , 'Backbone'

    , './giphy-model.js'
], function(
      $
    , _
    , Backbone

    , gifModel
) {
    var Gifs = Backbone.Collection.extend({
        // TODO
        model: gifModel,

        // the base URL for the Giphy API
        url: 'http://api.giphy.com',

        // Giphy API Public beta key
        API_KEY_PUBLIC: "api_key=dc6zaTOxFJmzC",

        // TODO
        // when fetching a Collection from an API the real data
        // may be wrapped in metadata, transform the desired
        // portion of API data here
        parse: function(data) {

        },

        // If you also have to save your models,
        // maybe you will need to override Backbone.sync
        // sync: function() {}
    });

    return Gifs;
});
