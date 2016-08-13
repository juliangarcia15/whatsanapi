define(function(require) {
    // == dependencies == \\
    var $                   = require('jquery');
    var Backbone            = require('Backbone');
    var Mustache            = require('Mustache');
    var HomeTmpl            = require('text!templates/homeView.tmpl');
    var GifView             = require('scripts/views/giphyView.js');
    // var ApodView            = require('views/apodView.js');

    // le entry to the whole shabang
    var AppView = Backbone.View.extend({
        // el - stands for element. Every view has an element associated with HTML content, will be rendered.
        el: 'body',

        // It's the first function called when this view is instantiated.
        initialize: function(options) {
            // console.log('app initialized');
            this.options = options || {};
            this.render();
        },
        // $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content. Like the Hello TutorialsPoint in this case.
        render: function() {
            this.$el.find('#home-view').html(Mustache.to_html(HomeTmpl));

            var giphyView = new GifView();
            // var apodView = new ApodView();

            $('.tab-pane').tab();
        }
    });

    return AppView;
});
