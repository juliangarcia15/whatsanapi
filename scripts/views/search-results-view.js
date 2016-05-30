define([
    'jquery', 'Backbone', 'Mustache'

    , '../giphy/giphy-collection.js'

    , 'text!templates/search-form.tmpl'
    , 'text!templates/results.tmpl'
], function(
    $, Backbone, Mustache

    , gifCollection

    , searchFormTmpl
    , resultsTmpl
) {
    var GifView = Backbone.View.extend({
        // el - stands for element. Every view has an element associated with HTML content, will be rendered.
        el: "#search-results-view-container", // TODO

        className: "search-results-view", // TODO

        template: searchFormTmpl,

        collection: '',

        API_KEY_PUBLIC : "api_key=dc6zaTOxFJmzC",

        events: {
            "submit": "search", // TODO can we set the selector to this => form#search-form
        },

        initialize: function(options) {
            this.options = options || {};
            this.render();
        },

        render: function(data) {
            var data = data || {results: []},
                mustacheHTML = Mustache.to_html(//this.template,data);
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
            return this;
        },

        // START EVENT FUNCTIONS
        search: function(e) {
            // stop the page from changing
            e.preventDefault();
            var view = this, // hold on to this for later functions
                form = $('form#search-form'),
                // gather user inputed data & map it to JSON
                data = view.mapSerializedArrayToJSON(form.serializeArray());

            this.collection = new gifCollection({'queryParams': data});

            // Fetch the collection and call render the view
            this.collection.fetch({
                success: function (results) {
                    var fetchedResults = view.mapCollectionFetch(results.models);

                    view.render({
                        'results': fetchedResults,
                    });
                }
            });
        },
        // END EVENT FUNCTIONS
        
        // START UTIL FUNCTIONS
            // TODO if we start using these in other files, REFACTOR
        mapSerializedArrayToJSON: function(data) {
            if (!data && !data.length) {
                console.error('No data passed to mapSerializedArray');
                return false;
            }

            var maps = $.map(data, function(item, index) {
                var map = {};
                map[item.name] = item.value;
                return map;
            });

            return (maps.length == 1) ? maps[0] : maps;
        },

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
