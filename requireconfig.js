require.config({
    // the root path to use for all module lookups
    baseUrl: 'scripts',
    // app entry point
    deps: ["giphy"],
    // path mappings for module names not found directly under baseUrl
    paths: {
        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
        "underscore": "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js",
        "backbone": "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js"
    }
});
