define(function(require) {
    // == dependencies == \\
    var $                   = require('jquery');
    var Backbone            = require('Backbone');
    var Mustache            = require('Mustache');
    var searchFormTmpl      = require('text!templates/searchForm.tmpl');

    var devError = function(param) {
        console.error('Views extending search-view.js must overwrite the `'+ param +'` parameter/function.');
    }

    return Backbone.View.extend({
        // the el where this content will be rendered
        el: "#search-form-view",
        // defaults -- required, but can be overwritten on extention
        template: searchFormTmpl,
        collection: '',
        // defaults -- optional and overwritable
        partials: {
        },

        events: {
            "submit #search-form": "search",
        },

        initialize: function(options) {
            this.options = options || {};
            this.render();
        },

        render: function(data) {
            var data = data || {results: []};

            if (!this.hasTemplate()) {
                devError('template');
            }

            var mustacheHTML = Mustache.to_html(this.template, data);
            this.$el.html(mustacheHTML);

            return this;
        },

        search: function(e) {
            e.preventDefault();
            var view = this; // used in callbacks
            var form = $('form');
            // gather user inputed data & map it to JSON
            var data = view.mapSerializedArrayToJSON(form.serializeArray());

            if (!this.hasCollection()) {
                devError('collection');
                return false;
            }

            this.collection = new this.collection();

            // Fetch the collection and call render the view
            this.collection.fetch({
                data: data,
                success: function (results) {
                    if (results.length) {
                        if (typeof view.mapCollectionFetch == "function") {
                            var fetchedResults = view.mapCollectionFetch(results.models);
                            view.render({
                                'results': fetchedResults,
                            });
                        } else {
                            devError('mapCollectionFetch');
                        }
                    }
                }
            });
        },

        // == Util Functions == \\
        mapSerializedArrayToJSON: function(data) {
            if (data.length < 1) {
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

        // == Has ___ Functions == \\
        hasCollection: function() {
            return (this.template.length > 1);
        },

        hasTemplate: function() {
            return (this.template.length > 1);
        },

        hasPartials: function() {
            return (this.partials.length > 1);
        }
    });
});