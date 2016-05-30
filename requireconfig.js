require.config({
    // the root path to use for all module lookups
    baseUrl: 'scripts',
    // path mappings for module names not found directly under baseUrl
    paths: {
        // Util Libraries
        "jquery": "https://code.jquery.com/jquery-2.2.4.min",
        "underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
        "text": "_lib/text-master/text",
        "Backbone": "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min",
        "Mustache" : "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.2.1/mustache.min",

        // Simplified project paths
        "templates": "views/templates"
    }
});

require([// Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});
