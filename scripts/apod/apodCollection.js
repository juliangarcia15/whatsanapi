define(function(require){
    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('Backbone');

    // api.nasa.gov
    //     API_KEY: nSoN5hxS3lT3BiCTczESAmSFh3PG6jKbROQs1fT5
    //     example usage: https://api.nasa.gov/planetary/apod?api_key=nSoN5hxS3lT3BiCTczESAmSFh3PG6jKbROQs1fT5
    //
    //     apis:
    //         APOD (Astronomy Picture of the Day)
    //         QUERY PARAMETERS
    //
    //         Parameter    Type	    Default	  Description
    //         date	     YYYY-MM-DD	today	  The date of the APOD image to retrieve
    //         hd	         bool	    False	  Retrieve the URL for the high resolution image
    //         api_key	     string	    API_KEY

    var ApodCollection = Backbone.Collection.extend({
        model: Backbone.Model.extend({}),

        url: "",
        baseURL: "",

        API_KEY: "",

        initialize: function(options) {
            this.options = options || {};
            // set query params
            this.queryParams = "";
            // set collection URL to API query
            this.url = this.createSearchUrl(options);

            return this;
        },

        createSearchUrl: function(data) {
            var url = "https://api.nasa.gov/planetary/apod?api_key=nSoN5hxS3lT3BiCTczESAmSFh3PG6jKbROQs1fT5";

            return url;
        }
    });
    return ApodCollection;
});
