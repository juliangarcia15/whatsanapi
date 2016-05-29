define([
      'jquery'
    , 'underscore'
    , 'Backbone'
], function(
      $
    , _
    , Backbone
) {
    Gif = Backbone.Model.extend({
        defaults: {
            id: '',
            images: [],
            rating: '',
            type: '',
            url: ''
        }
    });

    return Gif;
});
