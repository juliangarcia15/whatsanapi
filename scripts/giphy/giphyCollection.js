define(function(require){
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('Backbone');

    var GiphyCollection = Backbone.Collection.extend({
        model: Backbone.Model.extend({
            defaults: {
                id: '',
                images: [],
                rating: '',
                type: '',
                url: ''
            }
        }),

        // the base URL for the Giphy API
        url: "",
        baseURL: 'http://api.giphy.com',

        // Giphy API Public beta key
        API_KEY_PUBLIC: "api_key=dc6zaTOxFJmzC",

        initialize: function(options) {
            this.options = options || {};
            // set collection URL to API query
            this.url = this.createSearchUrl(this.options);

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

                for (var i = 0; i < 10 && i < gifs.length; i++) {
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
            var searchBase = "/v1/gifs/search?";
            var params = [];// something wrong here TODO
            if (data.q      && data.q.length > 0)       params.push("q=" + data.q.replace(/ /g, "+"));
            if (data.limit  && data.limit.length > 0)   params.push("limit="  + data.limit);
            if (data.offset && data.offset.length > 0)  params.push("offset=" + data.offset);
            if (data.rating && data.rating.length > 0)  params.push("rating=" + data.rating);
            params.push(this.API_KEY_PUBLIC);
            var truthyParams = _.compact(params);

            var url = this.baseURL + searchBase + truthyParams.join('&');
            return url;
        }
    });
    return GiphyCollection;
});
