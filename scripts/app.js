define([
      'jquery'
    , 'Backbone'

    , 'scripts/views/search-results-view.js'
], function(
      $
    , Backbone

    , GiphyView
) {
    // le entry to the whole shabang
    var AppView = Backbone.View.extend({
        // el - stands for element. Every view has an element associated with HTML content, will be rendered.
        el: '#loading_container',
        // It's the first function called when this view is instantiated.
        initialize: function(options) {
            this.options = options || {};
            this.render();
        },
        // $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content. Like the Hello TutorialsPoint in this case.
        render: function() {
            var giphyView = new GiphyView();

            // go away loading...
            this.$el.html('');
        }
    });

    return new AppView();
});
