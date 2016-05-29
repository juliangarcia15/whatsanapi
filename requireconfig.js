require.config({
    // the root path to use for all module lookups
    baseUrl: 'scripts',
    // // app entry point
    // deps: ["app"],
    // path mappings for module names not found directly under baseUrl
    paths: {
        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
        "underscore": "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
        "text": "lib/text-master/text",

        "Backbone": "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min",
        "Mustache" : "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.2.1/mustache.min"
    }
});

require([// Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});
