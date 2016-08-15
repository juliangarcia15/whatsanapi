define(function(require) {
    // == dependencies == \\
    var $                   = require('jquery');
    var Backbone            = require('Backbone');
    var Mustache            = require('Mustache');
    var SearchView          = require('./searchView.js');
    var GiphyCollection     = require('../giphy/giphyCollection.js');
    var GiphyResultsTmpl    = require('text!templates/giphyResultsView.tmpl');

    var GifView = SearchView.extend({
        el: "#giphy-view",
        // className: "giphy-view", // TODO

        extendingCollection: GiphyCollection,
        partials: {
            'resultView': GiphyResultsTmpl,
        },

        // afterRender: function() {
        //
        // },

        mapCollectionFetch: function(models){
            // console.log('giphy fetched models:',models);
            var data = [];

            if (typeof models == 'undefined') {
                console.error('No models passed to mapCollectionFetch');
                return data;
            }

            for (var i = 0; i < models.length; i++) {
                var name = models[i].get('id');
                var url = models[i].get('url');
                var images = models[i].get('images');
                // console.log('giphy images:',images);

                data.push({
                    'name': name,
                    'url': images.fixed_height.url
                });
            }
            return data;
        }
    });
    return GifView;
});
