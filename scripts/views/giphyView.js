define(function(require) {
    // == dependencies == \\
    var $                   = require('jquery');
    var Backbone            = require('Backbone');
    var Mustache            = require('Mustache');
    var SearchView          = require('./searchView.js');
    var GiphyCollection     = require('../giphy/giphyCollection.js');

    var GifView = SearchView.extend({
        // el - stands for element. Every view has an element associated with HTML content, will be rendered.
        el: "#giphy-view",

        className: "", // TODO

        collection: GiphyCollection,

        // API_KEY_PUBLIC : "api_key=dc6zaTOxFJmzC", // TODO REMOVE

        mapCollectionFetch: function(models){
            var data = [];

            if (typeof models == 'undefined') {
                console.error('No models passed to mapCollectionFetch');
                return data;
            }

            for (var i = 0; i < models.length; i++) {
                var id = models[i].get('id'),
                    url = models[i].get('url');

                data.push({
                    'id': id,
                    'url': url
                });
            }

            return data;
        }
        // END UTIL FUNCTIONS
    });
    return GifView;
});
