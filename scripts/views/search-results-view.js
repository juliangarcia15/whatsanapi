define([
    'jquery', 'Backbone', 'Mustache'

    , '../giphy/giphy-collection.js'

    , 'text!templates/search-form.tmpl'
], function(
    $, Backbone, Mustache

    , gifCollection

    , searchFormTmpl
) {
    // UGLY AND AWFUL TODO REFACTOR OUT
    // START UTIL FUNCTIONS TODO REFACTOR OUT
    var mapSerializedArrayToJSON = function(data) {
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
    }

    var createSearchUrl = function(data, api_key) {
            var base = "http://api.giphy.com/v1/gifs/search?",
                query = "q=" + data['q'].replace(/ /g, "+"),
                // TODO make param option
                limit = (limit) ? "&limit=" + limit : "",
                // TODO make param option
                offset = (offset) ? "&offset=" + offset : "",
                // TODO make param option
                rating = (rating) ? "&rating=" + rating : "";

            var url = base + query + limit + offset + rating + "&" + api_key;

            return url;
    }
    // END UTIL FUNCTIONS TODO REFACTOR OUT



    var GifView = Backbone.View.extend({
        // el - stands for element. Every view has an element associated with HTML content, will be rendered.
        el: "#giphy-view_container", // TODO

        className: "giphy-view", // TODO

        template: searchFormTmpl,

        collection: gifCollection,

        API_KEY_PUBLIC : "api_key=dc6zaTOxFJmzC",

        events: {
            "submit": "search", // TODO can we set the selector to this => form#search-form
        },

        initialize: function(options) {
            this.options = options || {};
            this.render();
        },

        render: function() {
            var mustacheHTML = Mustache.to_html(this.template);
            this.$el.html(mustacheHTML);

            return this;
        },

        // START EVENT FUNCTIONS
        search: function(e) {
            // stop the page from changing
            e.preventDefault();
            var form = $('form#search-form'),

            // TODO move these calls and util functions to
            // the giphy-collection.js file
                // gather user inputed data & map it to JSON
                data = mapSerializedArrayToJSON(form.serializeArray());
                // use helper to createSearchUrl
                searchUrl = createSearchUrl(data, this.API_KEY_PUBLIC);

            var logMe = {
                'self': self,
                'self.serializeArray()': form.serializeArray(),
                'data': data,
                'searchUrl': searchUrl,
            }
            console.log('Julians logMe - giphy-view search:',logMe);

            // TODO handle this call in the giphy-collection.js file
                // $.ajax({
                //     url: searchUrl,
                //     type: "GET",
                //     success: function(response) {
                //         if (response.meta.status == 200) {
                //             var gifs = response.data,
                //                 html = "";
                //
                //             console.log("gifs:",gifs);
                //
                //             for (var i = 0; i < 5 && i < gifs.length; i++) {
                //                 var url = gifs[i]['images']['downsized']['url'],
                //                     id = gifs[i]['id']
                //                 html += "<img src='" + url + "' alt=giphy_" + id + ">";
                //             }
                //
                //             $('#img_container').html(html);
                //         }
                //     },
                //     error: function(response) {
                //         console.log("Whoops something went wrong :(", response);
                //     }
                // }); // end ajax
        },
        // END EVENT FUNCTIONS
    });

    return GifView;
});
