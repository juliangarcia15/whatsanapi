define(['jquery'], function($) {
    // start of with any constants
    const API_KEY_PUBLIC = "api_key=dc6zaTOxFJmzC";

    // helper functions TODO eventually make a util file
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

    var createSearchUrl = function(data) {
            var base = "http://api.giphy.com/v1/gifs/search?",
                query = "q=" + data['query'].replace(/ /g, "+"),
                limit = (limit) ? "&limit=" + limit : "",
                offset = (offset) ? "&offset=" + offset : "",
                rating = (rating) ? "&rating=" + rating : "";

            var url = base + query + limit + offset + rating + "&" + API_KEY_PUBLIC;

            return url;
        }
        // end helper functions

    // after everything is all set to go!
    $(document).ready(function() {
        // when the user submits the form
        $("form#searchForm").submit(function(e) {
            // stop the page from changing
            e.preventDefault();
            var self = $(this),
                // gather user inputed data & map it to JSON
                data = mapSerializedArrayToJSON(self.serializeArray()),
                // use helper to createSearchUrl
                searchUrl = createSearchUrl(data);

            $.ajax({
                url: searchUrl,
                type: "GET",
                success: function(response) {
                    if (response.meta.status == 200) {
                        var gifs = response.data,
                            html = "";

                        for (var i = 0; i < 5 && i < gifs.length; i++) {
                            var url = gifs[i]['images']['downsized']['url'],
                                id = gifs[i]['id']
                            html += "<img src='" + url + "' alt=giphy_" + id + ">";
                        }

                        $('#img_container').html(html);
                    }
                },
                error: function(response) {
                    console.log("Whoops something went wrong :(", response);
                }
            }); // end ajax
        }); // end button#mybutton click
    }); // end document ready
});
