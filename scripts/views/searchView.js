define(function(require) {
    // == dependencies == \\
    var $                   = require('jquery');
    var Backbone            = require('Backbone');
    var Mustache            = require('Mustache');
    var searchFormTmpl      = require('text!templates/searchForm.tmpl');
    var resultsTmpl         = require('text!templates/resultsView.tmpl');

    var devError = function(param) {
        console.error('Views extending search-view.js must have the `'+ param +'` parameter/function.');
    }

    return Backbone.View.extend({

        // the el where this content will be rendered
        el: "#search-form-view",
        collection: '', // recreated every search action

        // defaults -- required, must be overwritten on extention
        extendingCollection: '',

        // defaults -- required, can be be overwritten on extention
        template: searchFormTmpl,
        partials: {
            'resultView': resultsTmpl,
        },
        afterRender: false, // must be function if overwritten

        events: {
            "click #search-form #search-submit": "search",
            "keypress #search-form": "checkKey"
        },

        initialize: function(options) {
            this.options = options || {};
            this.render();
        },

        render: function(data) {
            var data = data || {results: []};
            // console.log('searchView render data:',data);

            if (!this.hasTemplate()) {
                devError('template');
            }

            var mustacheHTML = Mustache.to_html(this.template, data, this.partials);
            // console.log('mustacheHTML',mustacheHTML);
            this.$el.html(mustacheHTML);

            // let the extended view do things after rendering the main search/results view
            if (this.afterRender && (typeof this.afterRender == "function")) {
                this.afterRender();
            }

            return this;
        },

        search: function(e) {
            e.preventDefault();
            var view = this; // used in callbacks

            // gather user inputed data & map it to JSON
            var $form = this.$el.find('#search-form input'); // TODO add validation
            var data = view.mapSerializedArrayToJSON($form.serializeArray());

            if (!this.hasCollection()) {
                devError('collection');
                return false;
            }

            this.collection = new this.extendingCollection(data);

            // Fetch the collection and call render the view
            this.collection.fetch({
                // data: data, // so this does send data to the backend, good to know
                success: function (results) {
                    if (results.length) {
                        if (typeof view.mapCollectionFetch == "function") {
                            var fetchedResults = view.mapCollectionFetch(results.models);
                            // console.log('fetchedResults',fetchedResults);
                            view.render({
                                'results': fetchedResults,
                            });
                            // Temporary: so the user can see what they searched for (add search header for last X # of searches)
                            view.$el.find('#search-form input').val(results.options.q);
                        } else {
                            devError('mapCollectionFetch');
                        }
                    }
                },
                error: function(params) {
                    console.error('Could not fetch collection:',params);
                }
            });
        },

        /**
         * Submit search form on `enter` keypress event
         */
        checkKey: function(e) {
            var ENTERKEY = '13';
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == ENTERKEY){
               this.$el.find('#search-form #search-submit').click();
            }
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
        },
    });
});
