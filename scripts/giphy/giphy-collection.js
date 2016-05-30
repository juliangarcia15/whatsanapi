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
        url: "",
        baseURL: 'http://api.giphy.com',

        // Giphy API Public beta key
        API_KEY_PUBLIC: "api_key=dc6zaTOxFJmzC",

        initialize: function(options) {
            this.options = options || {};
            // set query params
            this.queryParams = options['queryParams'] ? options['queryParams'] : {};
            // set collection URL to API query
            this.url = this.createSearchUrl(this.queryParams);

            return this;
        },

        // TODO
        // when fetching a Collection from an API the real data
        // may be wrapped in metadata, transform the desired
        // portion of API data here
        parse: function(response) {
            var data = [];

            if (response.meta.status == 200) {
                var gifs = response.data;

                for (var i = 0; i < 5 && i < gifs.length; i++) {
                    var url = gifs[i]['images']['downsized']['url'],
                        images = gifs[i]['images'],
                        id = 'giphy_' + gifs[i]['id'];

                    data.push({
                        'id': id,
                        'images': images,
                        'url': url
                    });
                }
            }
            return data;
        },

        // If you also have to save your models,
        // maybe you will need to override Backbone.sync
        // sync: function() {}

        createSearchUrl: function(data) {
            var searchBase = "/v1/gifs/search?",
                query = "q=" + data['q'].replace(/ /g, "+"),
                // TODO make param option
                limit = (limit) ? "&limit=" + limit : "",
                // TODO make param option
                offset = (offset) ? "&offset=" + offset : "",
                // TODO make param option
                rating = (rating) ? "&rating=" + rating : "";

            var url = this.baseURL + searchBase + query + limit + offset + rating + "&" + this.API_KEY_PUBLIC;

            return url;
        }
    });
    return Gifs;
});
