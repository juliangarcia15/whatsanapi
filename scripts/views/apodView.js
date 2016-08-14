define(function(require) {
    // == dependencies == \\
    var $                   = require('jquery');
    var Backbone            = require('Backbone');
    var Mustache            = require('Mustache');
    var SearchView          = require('./searchView.js');
    var ApodCollection      = require('../apod/apodCollection.js');

    var ApodView = SearchView.extend({
        el: "#apod-view",
        // className: "apod-view", // TODO

        extendingCollection: ApodCollection,

        mapCollectionFetch: function(models) {
            // console.log('apod fetched models:',models);
            var data = [];

            if (typeof models == 'undefined') {
                console.error('No models passed to mapCollectionFetch');
                return data;
            }

            for (var i = 0; i < models.length; i++) {
                var title = models[i].get('title');
                var hdurl = models[i].get('hdurl');
                var url   = models[i].get('url');

                data.push({
                    'id': title, // TODO change 'id' to val?
                    'url': (hdurl.length > 0) ? hdurl : url // default to HD
                });
            }
            return data;
        }
    });
    return ApodView;
})
