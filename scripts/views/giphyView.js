define(function(require) {
    // == dependencies == \\
    var $                   = require('jquery');
    var Backbone            = require('Backbone');
    var Mustache            = require('Mustache');
    var SearchView          = require('./searchView.js');
    var GiphyCollection     = require('../giphy/giphyCollection.js');

    var GifView = SearchView.extend({
        el: "#giphy-view",
        // className: "giphy-view", // TODO

        extendingCollection: GiphyCollection,

        mapCollectionFetch: function(models){
            // console.log('giphy fetched models:',models);
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
    });
    return GifView;
});
