define(function(require) {
    // == dependencies == \\
    var $                   = require('jquery');
    var Backbone            = require('Backbone');
    var Mustache            = require('Mustache');
    var apodCollection      = require('../apod/apodCollection.js');

    return Backbone.View.extend({
        el: "#apod-view",

        collection: '',
        events: {
            "click #apod-form button": "search", // TODO can we set the selector to this => form#search-form
        },

        initialize: function(options) {
            this.options = options || {};
            this.render();
        },

        render: function(data) {
            var data = data || {results: []};
            var mustacheHTML = Mustache.to_html(//this.template,data);
                    // main template
                    this.template,
                    // data
                    data,
                    // partials
                    {
                        resultsTmpl: resultsTmpl
                    }
                );

            this.$el.html(mustacheHTML);
            // $('[data-toggle="tooltip"]').tooltip();

            return this;
        },

        search: function(e) {
            e.preventDefault();
            var view = this; // used in callbacks
            this.collection = new apodCollection();

            // Fetch the collection and call render the view
            this.collection.fetch({
                success: function (results) {
                    console.log('collection results:',results);
                    if (results.length) {
                        var fetchedResults = view.mapCollectionFetch(results.models);
                        view.render({
                            'results': fetchedResults,
                        });
                    }
                }
            });
        },

        mapCollectionFetch: function(models) {
            var data = [];

            if (typeof models == 'undefined') {
                console.error('No models passed to mapCollectionFetch');
                return data;
            }

            for (var i = 0; i < models.length; i++) {
                var id = models[i].get('title'),
                    url = models[i].get('url');

                data.push({
                    'id': id,
                    'url': url
                });
            }
            return data;
        }
    });
})
